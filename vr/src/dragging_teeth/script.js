import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import * as dat from 'dat';
//import * as fs from '../../node_modules/fs';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

import * as CANNON from 'cannon-es';
import { getFirstMesh, getFirstBufferGeometry, threeMeshToConvexThreeMesh, threeMeshToConvexCannonMesh, threeMeshToCannonMesh, checkTime, cannonMeshToCannonConvexPolyhedron, vec3ToVector3, vector3ToVec3, threeQuaternionToCannonQuaternion } from './util.js'


let container;
let camera, scene, renderer;
let controller1, controller2;
let controllerGrip1, controllerGrip2;
let controls;
let raycaster;

const intersected = [];     // global list that holds the first objects the controllers are pointing at
const tempMatrix = new THREE.Matrix4();

let world;
let frameNum = 0;

// lowerjaw and upperjaw are instances of class Jaw
let lowerjaw, upperjaw;
let floor_body;

const teethMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});
const slipperyMaterial = new CANNON.Material('slippery');   // disabling friction leads to slightly better performance
const sphereMaterial = teethMaterial;
const targetMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});

const objLoader = new OBJLoader();

// parameters
let TIMESTEP = 1/30;
let IMPULSE_REACTIVITY = 0.1;
let ANGULAR_REACTIVITY = 0.1;
let LINEAR_DAMPING = 0.5;       // cannon.js default: 0.01
let ANGULAR_DAMPING = 0.5;      // idem



class Jaw {
    mesh;   // THREE.Mesh
    body;   // CANNON.Body
    sphere; // THREE.Mesh
    target; // THREE.Mesh
    loaded = false;
    selected = false;

    constructor(path) {
        let sphere_geo = new THREE.SphereGeometry(0.05,10,5);
        this.target = new THREE.Mesh(sphere_geo, targetMaterial);     // (invisible) THREE.Object3D, dat aanduidt waar de jaw zou moeten zijn obv de controller selection
        scene.add(this.target);
        this.target.visible = false;

        // add sphere for center of mass
        this.sphere = new THREE.Mesh(sphere_geo, sphereMaterial);
        scene.add(this.sphere);
        this.sphere.visible = true;     // true for debugging purposes

        // add body
        this.body = new CANNON.Body({
            mass: 1,
            material: slipperyMaterial,
            linearDamping: LINEAR_DAMPING,
            angularDamping: ANGULAR_DAMPING,
        });
        this.body.position.set(0,2,0);
        let xaxis = new CANNON.Vec3(1,0,0);
        this.body.quaternion.setFromAxisAngle(xaxis, -Math.PI/2);
        world.addBody(this.body);

        this.loadMeshAndShape(path);
    }

    loadMeshAndShape(path) {
        const jaw = this;

        objLoader.load(
            path,
            
            // called when resource is loaded
            function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
                const buffergeo = getFirstBufferGeometry(object);
                jaw.mesh = new THREE.Mesh(buffergeo, teethMaterial.clone());
                
                jaw.mesh.geometry.scale(0.01, 0.01, 0.01);
                jaw.mesh.position.x = 0;
                jaw.mesh.position.y = 0;
                jaw.mesh.position.z = 0;
                jaw.mesh.rotation.x = 1.5 * Math.PI;
                
                scene.add(jaw.mesh);
                
                // const convexmesh = threeMeshToConvexThreeMesh(jaw.mesh);
                // const shapex = threeMeshToCannonMesh(convexmesh);
                // const shape = cannonMeshToCannonConvexPolyhedron(shapex);
                // console.log("mesh: ", jaw.mesh);
                // console.log("convexmesh: ", shapex);
                // console.log("shape: ", shape);
                // console.log("convexshape: ", shape);

                const shape = threeMeshToConvexCannonMesh(jaw.mesh);

                console.log("loading mesh succeeded");
                jaw.body.addShape(shape);
                jaw.loaded = true;
                afterLoad();
            },
            
            // called when loading in progress
            function (xhr) {
                // pass
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened while loading mesh: ' + error);
            }
        );
    }

    syncPhysics() {
        // Copy coordinates from Cannon.js to Three.js
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
        this.sphere.position.copy(this.body.position);
    }

    setTarget() {
        this.target.position.copy(this.body.position);
        this.target.quaternion.copy(this.body.quaternion);
        this.target.visible = true;
    }

    applyForces() {
        if (this.selected) {
            this.body.applyImpulse(this.impulseToTarget());
            this.body.applyTorque(this.torqueToTarget());
        }
    }

    impulseToTarget() {
        const worldPosition = vector3ToVec3(this.target.getWorldPosition(new THREE.Vector3()));
        const dp = worldPosition.vsub(this.body.position);
        const impulse = dp.scale(IMPULSE_REACTIVITY);
        return impulse;
    }

    torqueToTarget() {
        const worldQuaternion = threeQuaternionToCannonQuaternion(this.target.getWorldQuaternion(new THREE.Quaternion()));
        const dtheta = worldQuaternion.mult(this.body.quaternion.inverse());
        return dtheta;
    }
}


// for both cannon.js and three.js: x=red, y=green, z=blue
initCannon();
initThree();
loadObjects();  // animation is started after both objects are loaded



function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,0,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.broadphase.useBoundingBoxes = true;
    world.solver.iterations = 10;     //10
    console.log(world);

    floor_body = new CANNON.Body({ mass: 0 });
    let floor_shape = new CANNON.Plane();
    floor_body.addShape(floor_shape);
    floor_body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);  // rotate floor with normal along positive y axis
    world.addBody(floor_body);
}


function initThree() {
    // create container
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // create scene and camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x808080 );
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 1.6, 3 );

    // add controls
    controls = new OrbitControls( camera, container );
    controls.target.set( 0, 1.6, 0 );
    controls.update();

    // axis
    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    // add floor
    const floorGeometry = new THREE.PlaneGeometry( 4, 4 );
    const floorMaterial = new THREE.MeshStandardMaterial( {
        color: 0xeeeeee,
        roughness: 1.0,
        metalness: 0.0
    } );
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    scene.add( floor );

    // light sources
    scene.add( new THREE.HemisphereLight( 0x808080, 0x606060 ) );

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 6, 0 );
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = - 2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = - 2;
    light.shadow.mapSize.set( 4096, 4096 );
    scene.add( light );

 
    // add renderer and enable VR

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild( renderer.domElement );

    document.body.appendChild( VRButton.createButton( renderer ) );

    // save scene

    var step = 0;

        var controls = new function () {
            this.saveScene = function () {
                //const exporter = new OBJExporter();
                // Parse the input and generate the OBJ output
                //const data = exporter.parse( scene );
                //var target = new THREE.Vector3();
                //uj_mesh.getWorldPosition(target);
                //console.log("X:",target.x,"Y:",target.y,"Z:",target.z);
            }

            this.importScene = function () {
                // var json = (localStorage.getItem('scene'));
                // var sceneLoader = new THREE.SceneLoader();

                // sceneLoader.parse(JSON.parse(json), function (e) {
                //     scene = e.scene;
                // }, '.');
                uj_mesh.position.x = upperX
                uj_mesh.position.y = upperY
                uj_mesh.position.Z = upperZ

                lj_mesh.position.x = lowerX
                lj_mesh.position.y = lowerY
                lj_mesh.position.z = lowerZ
                
            }
        };

        //var gui = new dat.GUI();
        //gui.add(controls, "saveScene");
        //gui.add(controls, "importScene");

    // controllers

    controller1 = renderer.xr.getController( 0 );
    controller1.addEventListener( 'selectstart', onSelectStart );
    controller1.addEventListener( 'selectend', onSelectEnd );
    scene.add( controller1 );

    controller2 = renderer.xr.getController( 1 );
    controller2.addEventListener( 'selectstart', onSelectStart );
    controller2.addEventListener( 'selectend', onSelectEnd );
    scene.add( controller2 );


    // add controller models

    const controllerModelFactory = new XRControllerModelFactory();

    controllerGrip1 = renderer.xr.getControllerGrip( 0 );
    controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
    scene.add( controllerGrip1 );

    controllerGrip2 = renderer.xr.getControllerGrip( 1 );
    controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
    scene.add( controllerGrip2 );


    // lines pointing from controllers

    const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

    const line = new THREE.Line( geometry );
    line.name = 'line';
    line.scale.z = 5;

    controller1.add( line.clone() );
    controller2.add( line.clone() );

    raycaster = new THREE.Raycaster();

    // resize

    window.addEventListener( 'resize', onWindowResize );

}

function loadObjects() {
    lowerjaw = new Jaw('../../assets/simplified/lower_180.obj');
    upperjaw = new Jaw('../../assets/simplified/upper_218.obj');
}


function afterLoad() {
    if (lowerjaw.loaded && upperjaw.loaded) {
        lowerjaw.body.position.set(0,2,0);
        upperjaw.body.position.set(0,3,0);
        lowerjaw.mesh.name = "lowerjaw.mesh";
        lowerjaw.sphere.name = "lowerjaw.sphere";
        lowerjaw.target.name = "lowerjaw.target";
        upperjaw.mesh.name = "upperjaw.mesh";
        upperjaw.sphere.name = "lowerjaw.sphere";
        upperjaw.target.name = "lowerjaw.target";

        console.log("starting animation");
        renderer.setAnimationLoop( animate );
    }
}

function animate() {
    //checkTime(lj_mesh);

    frameNum += 1;
    updatePhysics();
    render();
}

function render() {

    cleanIntersected();

    intersectObjects( controller1 );
    intersectObjects( controller2 );

    renderer.render( scene, camera );
}

function updatePhysics() {
    // Apply impulses and torques for both jaws
    lowerjaw.applyForces();
    upperjaw.applyForces();

    // Step the physics world
    world.step(TIMESTEP);

    // Copy coordinates from Cannon.js to Three.js
    lowerjaw.syncPhysics();
    upperjaw.syncPhysics();
}


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}


// when controller pushes select button, select the object it is pointing to

function onSelectStart( event ) {

    const controller = event.target;

    const intersections = getIntersections( controller );

    if ( intersections.length > 0 ) {

        const intersection = intersections[ 0 ];
        const jaw = meshToJaw(intersection.object);

        if (!jaw.selected) {
            jaw.mesh.material.emissive.b = 1;
            jaw.setTarget();
            controller.attach( jaw.target );
            jaw.selected = true;
            controller.userData.selected = jaw;
        }
    }

}


// when controller releases select button

function onSelectEnd( event ) {

    const controller = event.target;

    if ( controller.userData.selected !== undefined ) {

        const jaw = controller.userData.selected;

        jaw.mesh.material.emissive.b = 0;
        scene.attach( jaw.target );
        jaw.target.visible = false;
        jaw.selected = false;
        controller.userData.selected = undefined;

    }


}


// find objects the controller is pointing at and return as an Array sorted by distance

function getIntersections( controller ) {

    tempMatrix.identity().extractRotation( controller.matrixWorld );

    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

    return raycaster.intersectObjects( [lowerjaw.mesh, upperjaw.mesh], true );

}


// highlight the object the controller points at

function intersectObjects( controller ) {

    // Do not highlight when already selected

    if ( controller.userData.selected !== undefined ) return;

    const line = controller.getObjectByName( 'line' );
    const intersections = getIntersections( controller );

    if ( intersections.length > 0 ) {

        const intersection = intersections[ 0 ];

        const object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );

        line.scale.z = intersection.distance;   // make line not pass through the object

    } else {

        line.scale.z = 5;

    }

}

function cleanIntersected() {

    while ( intersected.length ) {

        const object = intersected.pop();
        object.material.emissive.r = 0;

    }

}




// create zoom buttons

// import "./styles.css";

// export const ZoomBar = () => {
//   return (
//     <div className="zoom-wrapper">
//       <div className="zoom-bar">
//         <div className="button" id="zoom-out">
//           -
//         </div>
//         <div className="button" id="zoom-in">
//           +
//         </div>
//       </div>
//     </div>
//   );
// };

const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");

const zoomInFunction = (e) => {
  const fov = getFov();
  camera.fov = clickZoom(fov, "zoomIn");
  camera.updateProjectionMatrix();
};

//zoomInButton.addEventListener("click", zoomInFunction);

const zoomOutFunction = (e) => {
  const fov = getFov();
  camera.fov = clickZoom(fov, "zoomOut");
  camera.updateProjectionMatrix();
};

//zoomOutButton.addEventListener("click", zoomOutFunction);

const clickZoom = (value, zoomType) => {
  if (value >= 20 && zoomType === "zoomIn") {
    return value - 5;
  } else if (value <= 75 && zoomType === "zoomOut") {
    return value + 5;
  } else {
    return value;
  }
};

const getFov = () => {
  return Math.floor(
    (2 *
      Math.atan(camera.getFilmHeight() / 2 / camera.getFocalLength()) *
      180) /
      Math.PI
  );
};


function meshToJaw(mesh) {
    if (mesh === lowerjaw.mesh) {
        return lowerjaw;
    } else if (mesh === upperjaw.mesh) {
        return upperjaw;
    } else {
        console.warn("Selected mesh is not a jaw, returning null");
        return null;
    }
}
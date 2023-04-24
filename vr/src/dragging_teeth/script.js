import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import * as dat from 'dat';
//import * as fs from '../../node_modules/fs';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

import * as CANNON from 'cannon-es';
import { getFirstMesh, getFirstBufferGeometry, threeMeshToConvexCannonMesh, threeMeshToCannonMesh, checkTime } from './util.js'


let container;
let camera, scene, renderer;
let controller1, controller2;
let controllerGrip1, controllerGrip2;
let controls;
let group
let raycaster;

const intersected = [];     // global list that holds the first objects the controllers are pointing at
const tempMatrix = new THREE.Matrix4();


let world, timeStep=1/10;
let frameNum = 0;

let floor_shape, floor_body;

// lj_mesh is een THREE.Mesh
// lj_shape is een CANNON.Trimesh
// lj_body is een CANNON.Body
let lj_mesh, lj_shape, lj_body;
let uj_mesh, uj_shape, uj_body;
let lj_loaded = false, uj_loaded = false;

const teeth_material = new THREE.MeshStandardMaterial({color: 0x0000ff});


initCannon();
initThree();
loadObjects();  // animation is started after both objects are loaded


// for both cannon.js and three.js: x=red, y=green, z=blue


function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,-0.01,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.broadphase.useBoundingBoxes = true;
    world.solver.iterations = 4;     //10
    console.log(world);

    const slipperyMaterial = new CANNON.Material('slippery');   // disabling friction leads to slightly better performance

    lj_body = new CANNON.Body({mass: 1, material: slipperyMaterial});
    uj_body = new CANNON.Body({mass: 1, material: slipperyMaterial});
    lj_body.position.set(0,2,0);
    uj_body.position.set(0,3,0);
    let xaxis = new CANNON.Vec3(1,0,0);
    lj_body.quaternion.setFromAxisAngle(xaxis, -Math.PI/2);
    uj_body.quaternion.setFromAxisAngle(xaxis, -Math.PI/2);
    world.addBody(lj_body);
    world.addBody(uj_body);

    floor_body = new CANNON.Body({ mass: 0 });
    floor_shape = new CANNON.Plane();
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


   
    // add all objects to an object group

    group = new THREE.Group();
    scene.add( group );

 
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
    // load lower jaw
    const loader = new OBJLoader();
    loader.load(
        '../../assets/simplified/lower_180.obj',
        
        // called when resource is loaded
        function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
            let lj_buffergeo = getFirstBufferGeometry(object);
            lj_mesh = new THREE.Mesh(lj_buffergeo, teeth_material);
            
            lj_mesh.geometry.scale(0.01, 0.01, 0.01);
            lj_mesh.position.x = 0;
            lj_mesh.position.y = 0;
            lj_mesh.position.z = 0;
            lj_mesh.rotation.x = 1.5 * Math.PI;

            console.log("lj_mesh: ", lj_mesh);
            group.add(lj_mesh);
            
            lj_shape = threeMeshToConvexCannonMesh(lj_mesh);
            console.log("loading lj_mesh succeeded");
            lj_body.addShape(lj_shape);
            lj_loaded = true;
            startAnimation();
        },
        
        // called when loading in progress
        function (xhr) {
            // pass
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading lj_mesh: ' + error);
        }
    );
 
    // load upper jaw
    loader.load(
        '../../assets/simplified/upper_218.obj',

        // called when resource is loaded
        function (object) {
            let uj_buffergeo = getFirstBufferGeometry(object);
            uj_mesh = new THREE.Mesh(uj_buffergeo, teeth_material);
            
            uj_mesh.geometry.scale(0.01, 0.01, 0.01);
            uj_mesh.position.x = 0;
            uj_mesh.position.y = 0;
            uj_mesh.position.z = 0;
            uj_mesh.rotation.x = 1.5 * Math.PI;

            console.log(uj_mesh);
            group.add(uj_mesh);
            
            uj_shape = threeMeshToConvexCannonMesh(uj_mesh);
            console.log("loading uj_mesh succeeded");
            uj_body.addShape(uj_shape);
            uj_loaded = true;
            startAnimation();
        },
        
        // called when loading in progress
        function (xhr) {
            // pass
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading uj_mesh: ' + error);
        }
    );
}


function startAnimation() {
    if (lj_loaded && uj_loaded) {
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
    // Step the physics world
    world.step(timeStep);

    // Copy coordinates from Cannon.js to Three.js
    lj_mesh.position.copy(lj_body.position);
    lj_mesh.quaternion.copy(lj_body.quaternion);
    uj_mesh.position.copy(uj_body.position);
    uj_mesh.quaternion.copy(uj_body.quaternion);
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

        const object = intersection.object;
        object.material.emissive.b = 1;
        controller.attach( object );

        controller.userData.selected = object;

    }

}


// when controller releases select button

function onSelectEnd( event ) {

    const controller = event.target;

    if ( controller.userData.selected !== undefined ) {

        const object = controller.userData.selected;
        object.material.emissive.b = 0;
        group.attach( object );

        controller.userData.selected = undefined;

    }


}


// find objects the controller is pointing at and return as an Array sorted by distance

function getIntersections( controller ) {

    tempMatrix.identity().extractRotation( controller.matrixWorld );

    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

    return raycaster.intersectObjects( group.children, true );

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
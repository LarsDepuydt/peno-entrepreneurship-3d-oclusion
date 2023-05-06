import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
//import * as dat from 'dat';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

import * as CANNON from 'cannon-es';
import { getFirstMesh, getFirstBufferGeometry, threeMeshToConvexThreeMesh, threeMeshToConvexCannonMesh, threeMeshToCannonMesh, checkTime, cannonMeshToCannonConvexPolyhedron, vec3ToVector3, vector3ToVec3, threeQuaternionToCannonQuaternion, applyQuaternion, sqnorm, quatDot, minusQuat } from './util.js'

// axis locking parameters
var movement_mode;
var session;
const prevGamePads = new Map();

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
const TIMESTEP = 1/30;
const BODYMASS = 1;               // when the body is not selected, the mass is 0 (= stationary)
const IMPULSE_REACTIVITY = 1;
const ANGULAR_REACTIVITY = 5;
const LINEAR_DAMPING = 0.9;       // cannon.js default: 0.01
const ANGULAR_DAMPING = 0.9;      // idem


// set to true for debugging / development
const DEBUGGING_MODE = false;



class Jaw {
    mesh;   // THREE.Mesh
    body;   // CANNON.Body
    sphere; // THREE.Mesh
    target; // THREE.Mesh
    loaded = false;
    body_loaded = false;
    mesh_loaded = false;
    selected = false;

    /**
     * 
     * @param {*} bodypath path to the body obj file used for collision detection
     * @param {*} meshpath path to the mesh obj file (visual), in debugging mode, use the body model instead
     */
    constructor(bodypath, meshpath) {
        let sphere_geo = new THREE.SphereGeometry(0.05,10,5);
        this.target = new THREE.Mesh(sphere_geo, targetMaterial);     // (invisible) THREE.Object3D, dat aanduidt waar de jaw zou moeten zijn obv de controller selection
        scene.add(this.target);
        this.target.visible = false;

        // add sphere for center of mass
        this.sphere = new THREE.Mesh(sphere_geo, sphereMaterial);
        scene.add(this.sphere);
        this.sphere.visible = DEBUGGING_MODE;     // true for debugging purposes

        // add body
        this.body = new CANNON.Body({
            mass: BODYMASS,
            material: slipperyMaterial,
            linearDamping: LINEAR_DAMPING,
            angularDamping: ANGULAR_DAMPING,
            type: CANNON.Body.STATIC,
        });
        this.body.position.set(0,2,0);
        let xaxis = new CANNON.Vec3(1,0,0);
        this.body.quaternion.setFromAxisAngle(xaxis, -Math.PI/2);
        world.addBody(this.body);

        if (DEBUGGING_MODE) {
            this.loadMeshAndBody(bodypath);
        } else {
            this.loadMesh(meshpath);
            this.loadBody(bodypath);
        }
    }

    loadMeshAndBody(path) {
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

                const shape = threeMeshToConvexCannonMesh(jaw.mesh);
                jaw.body.addShape(shape);

                console.log("loading mesh succeeded");
                jaw.loaded = true;
                afterLoad();
            },
            
            // called when loading in progress
            function (xhr) {},

            // called when loading has errors
            function (error) {
                console.log('An error happened while loading mesh and body: ' + error);
            }
        );
    }

    loadMesh(path) {
        const jaw = this;

        objLoader.load(
            path,
            
            // called when resource is loaded
            function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
                jaw.mesh = getFirstMesh(object);
                jaw.mesh.geometry.scale(0.01, 0.01, 0.01);
                jaw.mesh.position.x = 0;
                jaw.mesh.position.y = 0;
                jaw.mesh.position.z = 0;
                jaw.mesh.rotation.x = 1.5 * Math.PI;
                scene.add(jaw.mesh);

                console.log("loading mesh succeeded");
                jaw.mesh_loaded = true;
                if (jaw.mesh_loaded && jaw.body_loaded) {       // actually this is a race condition, let's ignore that for now
                    jaw.loaded = true;
                    afterLoad();
                }
            },
            
            // called when loading in progress
            function (xhr) {},

            // called when loading has errors
            function (error) {
                console.log('An error happened while loading mesh: ' + error);
            }
        );
    }

    loadBody(path) {
        const jaw = this;

        objLoader.load(
            path,
            
            // called when resource is loaded
            function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
                const buffergeo = getFirstBufferGeometry(object);
                const mesh = new THREE.Mesh(buffergeo, teethMaterial.clone());
                mesh.geometry.scale(0.01, 0.01, 0.01);
                mesh.position.x = 0;
                mesh.position.y = 0;
                mesh.position.z = 0;
                mesh.rotation.x = 1.5 * Math.PI;

                const shape = threeMeshToConvexCannonMesh(mesh);
                jaw.body.addShape(shape);

                console.log("loading mesh succeeded");
                jaw.body_loaded = true;
                if (jaw.mesh_loaded && jaw.body_loaded) {       // actually a race condition
                    jaw.loaded = true;
                    afterLoad();
                }
            },
            
            // called when loading in progress
            function (xhr) {},

            // called when loading has errors
            function (error) {
                console.log('An error happened while loading body: ' + error);
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
        this.target.visible = DEBUGGING_MODE;
    }

    applyForces() {
        if (this.selected) {
            this.body.applyImpulse(this.impulseToTarget());
            if (movement_mode == 3) {
                this.body.applyTorque(this.torqueToTarget());
            }
        }
    }

    impulseToTarget() {
        const targetWorldPosition = vector3ToVec3(this.target.getWorldPosition(new THREE.Vector3()));   // Vec3

        let dp;
        switch (movement_mode) {
            case 0: { // Restricted to x axis
                dp = new CANNON.Vec3(targetWorldPosition.x - this.body.position.x, 0, 0);
                showAxes(0, curr_jaw);
                break;
            }
            case 1: { // Restricted to y axis
                dp = new CANNON.Vec3(0, targetWorldPosition.y - this.body.position.y, 0);
                showAxes(1, curr_jaw);
                break;
            }
            case 2: { // Restricted to z axis
                dp = new CANNON.Vec3(0, 0, targetWorldPosition.z - this.body.position.z);
                showAxes(2, curr_jaw);
                break;
            }
            case 3: { // Free movement (default)
                dp = targetWorldPosition.vsub(this.body.position);    // Vec3
                showAxes(3, curr_jaw);
                break;
            }
        }

        const impulse = dp.scale(IMPULSE_REACTIVITY);               // Vec3 
        return impulse;
    }

    dthetaToTarget() {
        let targetWorldQuaternion = this.target.getWorldQuaternion(new THREE.Quaternion());
        targetWorldQuaternion = threeQuaternionToCannonQuaternion(targetWorldQuaternion);       // Cannon.Quaternion

        // https://forum.unity.com/threads/shortest-rotation-between-two-quaternions.812346/
        if (quatDot(targetWorldQuaternion, this.body.quaternion) < 0) {
            return targetWorldQuaternion.mult(minusQuat(this.body.quaternion.inverse()));
        } else {
            return targetWorldQuaternion.mult(this.body.quaternion.inverse());
        }
    }

    torqueToTarget() {
        const identityQuat = new CANNON.Quaternion(0,0,0,1);
        return identityQuat.slerp(this.dthetaToTarget(), ANGULAR_REACTIVITY);
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
    if (DEBUGGING_MODE) {
        var axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );
    }

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
                uj_mesh.position.z = upperZ

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

    // allow additional button inputs (for axis locking)
    session = renderer.xr.getSession();


    // resize

    window.addEventListener( 'resize', onWindowResize );

}

function loadObjects() {
    lowerjaw = new Jaw('../../assets/simplified/lower_180.obj', '../../assets/lower_ios_6.obj');
    //upperjaw = new Jaw('../../assets/simplified/upper_218.obj');
    upperjaw = new Jaw('../../assets/simplified/upper_209.obj', '../../assets/upper_ios_6.obj');
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

let currentOption = 3; // initialize to free movement
let optionChanged = false; // flag to indicate that the option has changed
let prevButtonState = 0; // initialize previous button state to not pressed

// using X/A buttons on the controllers
function beforeRender(controller) {
  session = renderer.xr.getSession();
  let ii = 0;
  if (session) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        var handedness = source.handedness; //left or right controllers
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(ii++);
      const old = prevGamePads.get(source);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0)
      };
      if (data.buttons[0] == 1 && prevButtonState == 0 && !optionChanged) {
        currentOption = (currentOption + 1) % 4; // cycle through 0, 1, 2, 3
        optionChanged = true; // set flag to true to indicate that the option has changed
      } else if (data.buttons[0] == 0 && prevButtonState == 0 && optionChanged) {
        optionChanged = false; // reset flag when squeeze button is released
      }
      prevButtonState = data.buttons[0]; // save button state for next frame
      console.log(currentOption);

      movement_mode = currentOption;
    }
  }
}

var Axis;
var ArrowHelper;
function showAxes(axis_num, curr_jaw) {
    switch (axis_num) {
        case 0: {
            //console.log(ArrowHelper);
            curr_jaw.mesh.remove(ArrowHelper);
            Axis = new THREE.Vector3(1, 0, 0);
            break;
        }
        case 1: {
            curr_jaw.mesh.remove(ArrowHelper);
            Axis = new THREE.Vector3(0, 1, 0);
            break;
        }
        case 2: {
            curr_jaw.mesh.remove(ArrowHelper);
            Axis = new THREE.Vector3(0, 0, 1);
            break;
        }
        case 3: {
            curr_jaw.mesh.remove(ArrowHelper);
            return;
        }

    }
    // Create the axes
   
    //const yAxis = new THREE.Vector3(0, 1, 0);
    //const zAxis = new THREE.Vector3(0, 0, 1);

    const axisLength = 100;
  
    //ArrowHelper = new THREE.ArrowHelper(Axis, new THREE.Vector3(0.3, 0.3, 0.3), axisLength, 0xff0000);
    //const yArrowHelper = new THREE.ArrowHelper(yAxis, new THREE.Vector3(0, 0, 0), axisLength, 0x00ff00);
    //const zArrowHelper = new THREE.ArrowHelper(zAxis, new THREE.Vector3(0, 0, 0), axisLength, 0x0000ff);
  
    // Add the axes to the scene
    //curr_jaw.mesh.add(ArrowHelper);

    // create an ArrowHelper
    const direction = new THREE.Vector3(1, 0, 0); // specify the direction of the arrow
    const origin = new THREE.Vector3(0, 0, -0.3); // specify the starting point of the arrow
    const length = 1; // specify the length of the arrow
    const color = 0x00ff00; // specify the color of the arrow
    ArrowHelper = new THREE.ArrowHelper(Axis, origin, length, color);

    // add the arrow to the scene
    curr_jaw.mesh.add(ArrowHelper);
  } 

function render() {
    beforeRender(controller1);
    beforeRender(controller2);

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
            jaw.body.type = CANNON.Body.DYNAMIC;
            controller.userData.selected = jaw;
            console.log(jaw.body);
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
        jaw.body.type = CANNON.Body.STATIC;
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

        // anders intersect het soms met de pijl om een of andere reden
        if (object.parent.type == 'ArrowHelper') {
            return;
        }

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

var curr_jaw;
function meshToJaw(mesh) {
    if (mesh === lowerjaw.mesh) {
        curr_jaw = lowerjaw;
        return lowerjaw;
    } else if (mesh === upperjaw.mesh) {
        curr_jaw = lowerjaw;
        return upperjaw;
    } else {
        console.warn("Selected mesh is not a jaw, returning null");
        return null;
    }
}
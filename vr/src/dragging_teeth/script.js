import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
//import * as dat from 'dat';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

import * as CANNON from 'cannon-es';
import { getFirstMesh, getFirstBufferGeometry, threeMeshToConvexThreeMesh, threeMeshToConvexCannonMesh, threeMeshToCannonMesh, checkTime, cannonMeshToCannonConvexPolyhedron, vec3ToVector3, vector3ToVec3, threeQuaternionToCannonQuaternion, applyQuaternion, sqnorm, quatDot, minusQuat } from './util.js'
import { findSepAxisNoEdges } from './findSepAxis.js'


// overload cannon.js function findSeparatingAxis with an equivalent that doesn't check for edge collisions
CANNON.ConvexPolyhedron.prototype.findSeparatingAxis = findSepAxisNoEdges;


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

const intersected = []; // global list that holds the first objects the controllers are pointing at
const tempMatrix = new THREE.Matrix4();

let world;
let frameNum = 0;

// lowerjaw and upperjaw are instances of class Jaw
let lowerjaw, upperjaw;
let floor_body;

const teethMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const slipperyMaterial = new CANNON.Material("slippery"); // disabling friction leads to slightly better performance
const sphereMaterial = teethMaterial;
const targetMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const teethContactMaterial = new CANNON.ContactMaterial(
    teethMaterial, teethMaterial, {
        friction: 0,
        contactEquationStiffness: 1e10,
});

const objLoader = new OBJLoader();

// parameters
const TIMESTEP = 1 / 30;
const BODYMASS = 1; // when the body is not selected, the mass is 0 (= stationary)
const IMPULSE_REACTIVITY = 0.1;
const ANGULAR_REACTIVITY = 5;
const LINEAR_DAMPING = 0.9; // cannon.js default: 0.01
const ANGULAR_DAMPING = 0.9; // idem

// parameters that put the center-of-mass in the middle of the objects; determined based on the center locations of both jaws
const LJ_OFFSET = new THREE.Vector3(-2.24, 45.35, 42.25);
const UJ_OFFSET = new THREE.Vector3(-3.72, 46.93, 28.3);

// set to true for debugging / development
const DEBUGGING_MODE = false;


class Jaw {
  name; // 'lowerjaw' or 'upperjaw'
  offset; // THREE.Vector3
  mesh; // THREE.Mesh
  body; // CANNON.Body
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
  constructor(name, bodypath, meshpath) {

    // common part for upper and lower jaw

    if (name != 'lowerjaw' && name != 'upperjaw') {
        throw Error("jaw name should be 'lowerjaw' or 'upperjaw', instead of " + name);
    }
    this.name = name;

    let sphere_geo = new THREE.SphereGeometry(0.05, 10, 5);
    this.target = new THREE.Mesh(sphere_geo, targetMaterial); // (invisible) THREE.Object3D, dat aanduidt waar de jaw zou moeten zijn obv de controller selection
    scene.add(this.target);
    this.target.visible = false;

    // add sphere for center of mass
    this.sphere = new THREE.Mesh(sphere_geo, sphereMaterial);
    scene.add(this.sphere);
    this.sphere.visible = DEBUGGING_MODE; // true for debugging purposes

    // add body
    this.body = new CANNON.Body({
      mass: BODYMASS,
      material: slipperyMaterial,
      linearDamping: LINEAR_DAMPING,
      angularDamping: ANGULAR_DAMPING,
      type: CANNON.Body.STATIC,
    });
    
    let xaxis = new CANNON.Vec3(1, 0, 0);
    this.body.quaternion.setFromAxisAngle(xaxis, -Math.PI / 2);
    world.addBody(this.body);


    // lowerjaw / upperjaw specific

    if (this.name == 'lowerjaw') {
        this.offset = LJ_OFFSET;
    } else {
        this.offset = UJ_OFFSET;
    }


    // loading the objects

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
      function (object) {
        // object is a 'Group', which is a subclass of 'Object3D'
        const buffergeo = getFirstBufferGeometry(object);
        jaw.mesh = new THREE.Mesh(buffergeo, teethMaterial.clone());
        jaw.mesh.userData.originalScale = jaw.mesh.scale.clone();

        jaw.mesh.geometry.translate(jaw.offset.x, jaw.offset.y, jaw.offset.z);
        jaw.mesh.geometry.scale(0.01, 0.01, 0.01);
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
        console.log("An error happened while loading mesh and body: " + error);
      }
    );
  }

  loadMesh(path) {
    const jaw = this;

    objLoader.load(
      path,

      // called when resource is loaded
      function (object) {
        // object is a 'Group', which is a subclass of 'Object3D'
        jaw.mesh = getFirstMesh(object);
        jaw.mesh.geometry.translate(jaw.offset.x, jaw.offset.y, jaw.offset.z);
        jaw.mesh.geometry.scale(0.01, 0.01, 0.01);
        scene.add(jaw.mesh);

        console.log("loading mesh succeeded");
        jaw.mesh_loaded = true;
        if (jaw.mesh_loaded && jaw.body_loaded) {
          // actually this is a race condition, let's ignore that for now
          jaw.loaded = true;
          afterLoad();
        }
      },

      // called when loading in progress
      function (xhr) {},

      // called when loading has errors
      function (error) {
        console.log("An error happened while loading mesh: " + error);
      }
    );
  }

  loadBody(path) {
    const jaw = this;

    objLoader.load(
      path,

      // called when resource is loaded
      function (object) {
        // object is a 'Group', which is a subclass of 'Object3D'
        const buffergeo = getFirstBufferGeometry(object);
        const mesh = new THREE.Mesh(buffergeo, teethMaterial.clone());
        mesh.geometry.translate(jaw.offset.x, jaw.offset.y, jaw.offset.z);
        mesh.geometry.scale(0.01, 0.01, 0.01);

        const shape = threeMeshToConvexCannonMesh(mesh);
        jaw.body.addShape(shape);

        console.log("loading mesh succeeded");
        jaw.body_loaded = true;
        if (jaw.mesh_loaded && jaw.body_loaded) {
          // actually a race condition
          jaw.loaded = true;
          afterLoad();
        }
      },

      // called when loading in progress
      function (xhr) {},

      // called when loading has errors
      function (error) {
        console.log("An error happened while loading body: " + error);
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
            break;
        }
        case 1: { // Restricted to y axis
            dp = new CANNON.Vec3(0, targetWorldPosition.y - this.body.position.y, 0);
            break;
        }
        case 2: { // Restricted to z axis
            dp = new CANNON.Vec3(0, 0, targetWorldPosition.z - this.body.position.z);
            break;
        }
        case 3: { // Free movement (default)
            dp = targetWorldPosition.vsub(this.body.position);    // Vec3
            break;
        }
    }

    const impulse = dp.scale(IMPULSE_REACTIVITY);               // Vec3 
    return impulse;
}

  dthetaToTarget() {
    let targetWorldQuaternion = this.target.getWorldQuaternion(
      new THREE.Quaternion()
    );
    targetWorldQuaternion = threeQuaternionToCannonQuaternion(
      targetWorldQuaternion
    ); // Cannon.Quaternion

    // https://forum.unity.com/threads/shortest-rotation-between-two-quaternions.812346/
    if (quatDot(targetWorldQuaternion, this.body.quaternion) < 0) {
      return targetWorldQuaternion.mult(
        minusQuat(this.body.quaternion.inverse())
      );
    } else {
      return targetWorldQuaternion.mult(this.body.quaternion.inverse());
    }
  }

  torqueToTarget() {
    const identityQuat = new CANNON.Quaternion(0, 0, 0, 1);
    return identityQuat.slerp(this.dthetaToTarget(), ANGULAR_REACTIVITY);
  }
}

// for both cannon.js and three.js: x=red, y=green, z=blue
initCannon();
initThree();
loadObjects(); // animation is started after both objects are loaded

function initCannon() {
  world = new CANNON.World();
  world.gravity.set(0, 0, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.broadphase.useBoundingBoxes = true;
  world.solver.iterations = 10; //10
  world.addContactMaterial(teethContactMaterial);
  console.log(world);

  floor_body = new CANNON.Body({ mass: 0 });
  let floor_shape = new CANNON.Plane();
  floor_body.addShape(floor_shape);
  floor_body.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    -Math.PI / 2
  ); // rotate floor with normal along positive y axis
  world.addBody(floor_body);
}

function initThree() {
  // create container
  container = document.createElement("div");
  document.body.appendChild(container);

  // create scene and camera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x808080);
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.6, 3);

  // add controls
  controls = new OrbitControls(camera, container);
  controls.target.set(0, 1.6, 0);
  controls.update();

  // axis
  if (DEBUGGING_MODE) {
    var axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
  }

  // add floor
  const floorGeometry = new THREE.PlaneGeometry(4, 4);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 1.0,
    metalness: 0.0,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // light sources
  scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 6, 0);
  light.castShadow = true;
  light.shadow.camera.top = 2;
  light.shadow.camera.bottom = -2;
  light.shadow.camera.right = 2;
  light.shadow.camera.left = -2;
  light.shadow.mapSize.set(4096, 4096);
  scene.add(light);

  // add renderer and enable VR

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  document.body.appendChild(VRButton.createButton(renderer));

  // save scene

  var step = 0;

  var controls = new (function () {
    this.saveScene = function () {
      //const exporter = new OBJExporter();
      // Parse the input and generate the OBJ output
      //const data = exporter.parse( scene );
      //var target = new THREE.Vector3();
      //uj_mesh.getWorldPosition(target);
      //console.log("X:",target.x,"Y:",target.y,"Z:",target.z);
    };

    this.importScene = function () {
      // var json = (localStorage.getItem('scene'));
      // var sceneLoader = new THREE.SceneLoader();

      // sceneLoader.parse(JSON.parse(json), function (e) {
      //     scene = e.scene;
      // }, '.');
      uj_mesh.position.x = upperX;
      uj_mesh.position.y = upperY;
      uj_mesh.position.z = upperZ;

      lj_mesh.position.x = lowerX;
      lj_mesh.position.y = lowerY;
      lj_mesh.position.z = lowerZ;
    };
  })();

  //var gui = new dat.GUI();
  //gui.add(controls, "saveScene");
  //gui.add(controls, "importScene");

  // controllers

  controller1 = renderer.xr.getController(0);
  controller1.addEventListener("selectstart", onSelectStart);
  controller1.addEventListener("selectend", onSelectEnd);
  controller1.addEventListener("squeezestart", onSqueezeStartRight);
  controller1.addEventListener("squeezeend", onSqueezeEndRight);
  scene.add(controller1);

  controller2 = renderer.xr.getController(1);
  controller2.addEventListener("selectstart", onSelectStart);
  controller2.addEventListener("selectend", onSelectEnd);
  controller2.addEventListener("squeezestart", onSqueezeStartLeft);
  controller2.addEventListener("squeezeend", onSqueezeEndLeft);
  scene.add(controller2);

  // add controller models

  const controllerModelFactory = new XRControllerModelFactory();

  controllerGrip1 = renderer.xr.getControllerGrip(0);
  controllerGrip1.add(
    controllerModelFactory.createControllerModel(controllerGrip1)
  );
  scene.add(controllerGrip1);

  controllerGrip2 = renderer.xr.getControllerGrip(1);
  controllerGrip2.add(
    controllerModelFactory.createControllerModel(controllerGrip2)
  );
  scene.add(controllerGrip2);

  // lines pointing from controllers

  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1),
  ]);

  const line = new THREE.Line(geometry);
  line.name = "line";
  line.scale.z = 5;

  controller1.add(line.clone());
  controller2.add(line.clone());

  raycaster = new THREE.Raycaster();

  // allow additional button inputs (for axis locking)
  session = renderer.xr.getSession();

  // resize

  window.addEventListener("resize", onWindowResize);
}

function loadObjects() {
    lowerjaw = new Jaw(
        'lowerjaw',
        '../../assets/simplified/lower_1341.obj',
        '../../assets/lower_ios_6.obj',
    );
    upperjaw = new Jaw(
        'upperjaw',
        '../../assets/simplified/upper_1480.obj',
        '../../assets/upper_ios_6.obj'
    );

    curr_jaw = upperjaw;
}

// define VR Headset position
const VRHeadsetPosition = new THREE.Vector3();
VRHeadsetPosition.setFromMatrixPosition(camera.matrixWorld);

function afterLoad() {
  if (lowerjaw.loaded && upperjaw.loaded) {
    lowerjaw.body.position.set(
      VRHeadsetPosition.x,
      VRHeadsetPosition.y + 0.3,
      VRHeadsetPosition.z - 5.5
    );
    upperjaw.body.position.set(
      VRHeadsetPosition.x,
      VRHeadsetPosition.y + 0.45,
      VRHeadsetPosition.z - 5.5
    );
    lowerjaw.mesh.name = "lowerjaw.mesh";
    lowerjaw.sphere.name = "lowerjaw.sphere";
    lowerjaw.target.name = "lowerjaw.target";
    upperjaw.mesh.name = "upperjaw.mesh";
    upperjaw.sphere.name = "lowerjaw.sphere";
    upperjaw.target.name = "lowerjaw.target";

    console.log("starting animation");
    renderer.setAnimationLoop(animate);
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
var optionChanged_A = false;
var prevButtonState_A = 0;
var optionChanged_B = false;
var prevButtonState_B = 0;

// using X/A buttons on the controllers
function beforeRender(controller) {
    //console.log(curr_jaw);
    if (curr_jaw.selected) {
        switch (movement_mode) {
            case 0: { // Restricted to x axis
                showAxes(0, curr_jaw);
                break;
            }
            case 1: { // Restricted to y axis
                showAxes(1, curr_jaw);
                break;
            }
            case 2: { // Restricted to z axis
                showAxes(2, curr_jaw);
                break;
            }
            case 3: { // Free movement (default)
                showAxes(3, curr_jaw);
                break;
            }
        }
    }
    else {
        curr_jaw.mesh.remove(ArrowHelper);
    }
  session = renderer.xr.getSession();
  let ii = 0;
  if (session) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        var handedness = source.handedness; //left or right controllers
        if (handedness == 'right') {continue} // we willen enkel de 'X' knop van de rechtercontroller
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(ii++);
      const old = prevGamePads.get(source);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0)
      };
      //console.log(source.handedness);
      if (data.buttons[4] == 1 && prevButtonState == 0 && !optionChanged) {
        currentOption = (currentOption + 1) % 4; // cycle through 0, 1, 2, 3
        optionChanged = true; // set flag to true to indicate that the option has changed
      } else if (data.buttons[4] == 0 && prevButtonState == 0 && optionChanged) {
        optionChanged = false; // reset flag when squeeze button is released
      }
      prevButtonState = data.buttons[4]; // save button state for next frame
      //console.log(currentOption);

      movement_mode = currentOption;
    }
  }
}

var Axis;
var ArrowHelper;
function showAxes(axis_num, curr_jaw) {
    switch (axis_num) {
        case 0: {
            Axis = new THREE.Vector3(1, 0, 0);
            break;
        }
        case 1: {
            Axis = new THREE.Vector3(0, 0, 1);
            break;
        }
        case 2: {
            Axis = new THREE.Vector3(0, 1, 0);
            break;
        }
        case 3: {
            curr_jaw.mesh.remove(ArrowHelper);
            return;
        }

    }

    curr_jaw.mesh.remove(ArrowHelper);

    const axisLength = 100;
  
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
  positionReset();
  undoWhenPressed();
  redoWhenPressed();

  intersectObjects(controller1);
  intersectObjects(controller2);

  renderer.render(scene, camera);
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

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// when controller pushes select button, select the object it is pointing to

function onSelectStart(event) {
  const controller = event.target;

  const intersections = getIntersections(controller);

  if (intersections.length > 0) {
    const intersection = intersections[0];
    const jaw = meshToJaw(intersection.object);

    if (!jaw.selected) {
      jaw.mesh.material.emissive.b = 1;
      jaw.setTarget();
      controller.attach(jaw.target);
      jaw.selected = true;
      jaw.body.type = CANNON.Body.DYNAMIC;
      controller.userData.selected = jaw;
      addMovementToUndoStack(jaw.body);
      console.log(undoStack);
      //console.log(jaw.body);
    }
  }
}

// when controller releases select button

function onSelectEnd(event) {
  const controller = event.target;

  if (controller.userData.selected !== undefined) {
    const jaw = controller.userData.selected;

    jaw.mesh.material.emissive.b = 0;
    scene.attach(jaw.target);
    jaw.target.visible = false;
    jaw.selected = false;
    jaw.body.type = CANNON.Body.STATIC;
    controller.userData.selected = undefined;
  }
}

// define pressed button booleans
var pressedRight = false;
var pressedLeft = false;

// zoom in gradually with right squeeze button

function onSqueezeStartRight() {
  //undoMovement();
  pressedRight = true;
  setTimeout(function () {
    if (pressedRight) {
      upperjaw.mesh.scale.multiplyScalar(1.002);
      lowerjaw.mesh.scale.multiplyScalar(1.002);
      onSqueezeStartRight();
    }
  }, 10);
}

// zoom out gradually with left squeeze button

function onSqueezeStartLeft() {
  //redoMovement();
  pressedLeft = true;
  setTimeout(function () {
    if (pressedLeft) {
      upperjaw.mesh.scale.multiplyScalar(0.998);
      lowerjaw.mesh.scale.multiplyScalar(0.998);
      onSqueezeStartLeft();
    }
  }, 10);
}

// stop gradual zoom-in

function onSqueezeEndRight() {
  pressedRight = false;
}

// stop gradual zoom-out

function onSqueezeEndLeft(event) {
  pressedLeft = false;
}

// find objects the controller is pointing at and return as an Array sorted by distance

function getIntersections(controller) {
  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  return raycaster.intersectObjects([lowerjaw.mesh, upperjaw.mesh], true);
}

// highlight the object the controller points at

function intersectObjects(controller) {
  // Do not highlight when already selected

  if (controller.userData.selected !== undefined) return;

  const line = controller.getObjectByName("line");
  const intersections = getIntersections(controller);

  if (intersections.length > 0) {
    const intersection = intersections[ 0 ];

    const object = intersection.object;

    // anders intersect het soms met de pijl om een of andere reden
    if (object.parent.type == 'ArrowHelper') {
        return;
    }

    object.material.emissive.r = 1;
    intersected.push( object );
  }
}
// clean intersected array

function cleanIntersected() {
  while (intersected.length) {
    const object = intersected.pop();
    object.material.emissive.r = 0;
  }
}

// define the undo and redo stacks
let undoStack = [];
let redoStack = [];

// function to add a movement to the undo stack

function addMovementToUndoStack(body) {
  // save the current position and rotation of the body
  const position = new CANNON.Vec3().copy(body.position);
  const quaternion = new CANNON.Quaternion().copy(body.quaternion);
  const movement = { body: body, position: position, quaternion: quaternion };

  // add the movement to the undo stack
  undoStack.push(movement);

  // clear the redo stack
  redoStack = [];
}

// function to undo the last movement

function undoMovement() {
  if (undoStack.length > 0) {
    // remove the last movement from the undo stack
    const movement = undoStack.pop();

    // save the current position and rotation of the body
    const position = new CANNON.Vec3().copy(movement.body.position);
    const quaternion = new CANNON.Quaternion().copy(movement.body.quaternion);
    const redoMovement = {
      body: movement.body,
      position: position,
      quaternion: quaternion,
    };

    // add the movement to the redo stack
    redoStack.push(redoMovement);

    // set the position and rotation of the body to the previous values
    movement.body.position.copy(movement.position);
    movement.body.quaternion.copy(movement.quaternion);
  }
}

// function to redo the last undone movement

function redoMovement() {
  if (redoStack.length > 0) {
    // remove the last redo movement from the redo stack
    const redoMovement = redoStack.pop();

    // save the current position and rotation of the body
    const position = new CANNON.Vec3().copy(redoMovement.body.position);
    const quaternion = new CANNON.Quaternion().copy(
      redoMovement.body.quaternion
    );
    const movement = {
      body: redoMovement.body,
      position: position,
      quaternion: quaternion,
    };

    // add the redo movement to the undo stack
    undoStack.push(movement);

    // set the position and rotation of the body to the next values
    redoMovement.body.position.copy(redoMovement.position);
    redoMovement.body.quaternion.copy(redoMovement.quaternion);
  }
}

// when thumbstick pressed resets position to original center position

function positionReset() {
  const session = renderer.xr.getSession();
  if (session == null || session.inputSources == null) {
    return;
  } else {
    for (const source of session.inputSources) {
      if (source.gamepad.buttons[4].pressed) {
        // undoStack
      }
    }
  }
}

var curr_jaw;
function meshToJaw(mesh) {
    if (mesh === lowerjaw.mesh) {
        curr_jaw = lowerjaw;
        return lowerjaw;
    } else if (mesh === upperjaw.mesh) {
        curr_jaw = upperjaw;
        return upperjaw;
    } else {
        console.warn("Selected mesh is not a jaw, returning null");
        return null;
    }
}


function undoWhenPressed() {
  let iii = 0;
  if (session) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        var handedness = source.handedness; //left or right controllers
        if (handedness == 'left') {continue} // we willen enkel de 'X' knop van de rechtercontroller
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(iii++);
      const old = prevGamePads.get(source);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0)
      };
      //console.log(source.handedness);
      if (data.buttons[4] == 1 && prevButtonState_A == 0 && !optionChanged_A) {
        optionChanged_A = true; // set flag to true to indicate that the option has changed
        undoMovement();
      } else if (data.buttons[4] == 0 && prevButtonState_A == 0 && optionChanged_A) {
        optionChanged_A = false; // reset flag when squeeze button is released
      }
      prevButtonState_A = data.buttons[4]; // save button state for next frame
    }
  }
}


// undoMovement();

function redoWhenPressed() {
    let iiii = 0;
  if (session) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        var handedness = source.handedness; //left or right controllers
        if (handedness == 'left') {continue} // we willen enkel de 'X' knop van de rechtercontroller
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(iiii++);
      const old = prevGamePads.get(source);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0)
      };
      //console.log(source.handedness);
      if (data.buttons[5] == 1 && prevButtonState_B == 0 && !optionChanged_B) {
        optionChanged_B = true; // set flag to true to indicate that the option has changed
        redoMovement();
      } else if (data.buttons[5] == 0 && prevButtonState_B == 0 && optionChanged_B) {
        optionChanged_B = false; // reset flag when squeeze button is released
      }
      prevButtonState_B = data.buttons[5]; // save button state for next frame
    }
  }
}

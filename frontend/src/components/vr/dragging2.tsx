import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useState, useEffect } from 'react';
import { SendMenuOptionRequest, ScanSave, SaveScanDataRequest } from '@/gen/proto/threedoclusion/v1/service_pb';
import Menu from './menu';
import { HTMLMesh } from 'three/examples/jsm/interactive/HTMLMesh.js';
import { Legenda } from './legenda';

import * as CANNON from 'cannon-es';
import {
  getFirstMesh,
  getFirstBufferGeometry,
  threeMeshToConvexThreeMesh,
  threeMeshToConvexCannonMesh,
  threeMeshToCannonMesh,
  mergedGeometry,
  cannonMeshToCannonConvexPolyhedron,
  vec3ToVector3,
  vector3ToVec3,
  cannonQuaternionToThreeQuaternion,
  threeQuaternionToCannonQuaternion,
  applyQuaternion,
  sqnorm,
  quatDot,
  minusQuat,
  dictToVec3,
  invVec3,
} from './util.js';
import { findSepAxisNoEdges } from './findSepAxis.js';

// overload cannon.js function findSeparatingAxis with an equivalent that doesn't check for edge collisions
CANNON.ConvexPolyhedron.prototype.findSeparatingAxis = findSepAxisNoEdges;

// axis locking parameters
var movement_mode: any;
var session: any;
const prevGamePads = new Map();

let container: HTMLDivElement;
let camera: THREE.PerspectiveCamera, scene: any, renderer: THREE.WebGLRenderer;
let controller1: any, controller2: any;
let controllerGrip1: any, controllerGrip2: any;
let controls: any;
let raycaster: any;
let clock = new THREE.Clock();

let menu_open = false; // SET TO FALSE
let menuDiv: HTMLElement, menuMesh: HTMLMesh;
let legendDiv: HTMLElement, legendMesh: HTMLMesh;

const intersected = []; // global list that holds the first objects the controllers are pointing at
const tempMatrix = new THREE.Matrix4();

let world: any;
let frameNum = 0;

// lowerjaw and upperjaw are instances of class Jaw
let lowerjaw: any, upperjaw: any;
let floor_body: any;

const teethMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const slipperyMaterial = new CANNON.Material('slippery'); // disabling friction leads to slightly better performance
const sphereMaterial = teethMaterial;
const targetMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });

const objLoader = new OBJLoader();

// parameters
const TIMESTEP = 1 / 30;
const BODYMASS_DYNAMIC = 1;   // when selected
const BODYMASS_STATIC = 1e8;  // when not selected, we make the body practically static by giving it a very large mass
const IMPULSE_REACTIVITY = 5;
const IMPULSE_REACTIVITY_COLLISION = 0.01;
const ANGULAR_REACTIVITY = 1;
const ANGULAR_REACTIVITY_COLLISION = 0.1;
const LINEAR_DAMPING = 0.9; // cannon.js default: 0.01
const ANGULAR_DAMPING = 0.9; // idem

// parameters that put the center-of-mass in the middle of the objects; determined based on the center locations of both jaws
const LJ_OFFSET = new THREE.Vector3(-2.24, 45.35, 42.25);
const UJ_OFFSET = new THREE.Vector3(-3.72, 46.93, 28.3);

// set to true for debugging / development
const DEBUGGING_MODE = false;


class Jaw {
  name: any; // 'lowerjaw or upperjaw'
  offset: any; // THREE.Vector3
  mesh: any; // THREE.Mesh
  body: any; // CANNON.Body
  sphere: any; // THREE.Mesh
  target: any; // THREE.Mesh
  loaded = false;
  body_loaded = false;
  mesh_loaded = false;
  selected = false;
  colliding = false;
  INERTIA_STATIC: any;
  INERTIA_DYNAMIC: any;

  /**
   *
   * @param {*} bodypath path to the body obj file used for collision detection
   * @param {*} meshpath path to the mesh obj file (visual), in debugging mode, use the body model instead
   */
  constructor(name: any, bodypath: any, meshpath: any, save: () => void, callback: () => void) {
    // common part for upper and lower jaw

    if (name != 'lowerjaw' && name != 'upperjaw') {
      throw Error("jaw name should be 'lowerjaw' or 'upperjaw', instead of " + name);
    }
    this.name = name;

    let sphere_geo = new THREE.SphereGeometry(0.05, 10, 5);
    this.target = new THREE.Mesh(sphere_geo, targetMaterial); // (invisible) THREE.Object3D, dat aanduidt waar de jaw zou moeten zijn obv de controller selection
    console.log(this);
    console.log(this.target);
    scene.add(this.target);
    this.target.visible = false;

    // add sphere for center of mass
    this.sphere = new THREE.Mesh(sphere_geo, sphereMaterial);
    scene.add(this.sphere);
    this.sphere.visible = DEBUGGING_MODE; // true for debugging purposes

    // add body
    this.body = new CANNON.Body({
      mass: BODYMASS_STATIC,
      material: slipperyMaterial,
      linearDamping: LINEAR_DAMPING,
      angularDamping: ANGULAR_DAMPING,
      type: CANNON.Body.DYNAMIC,
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

    if (DEBUGGING_MODE) {
      this.loadMeshAndBody(bodypath, save, callback);
    } else {
      this.loadMesh(meshpath, save, callback);
      this.loadBody(bodypath, save, callback);
    }
  }

  loadMeshAndBody(path, save: () => void, callback: () => void) {
    const jaw = this;

    objLoader.load(
      path,

      // called when resource is loaded
      function (object) {
        for (const child of object.children){
          if ((child as any).geometry !== undefined && (child as any).geometry.isBufferGeometry) {
            const mesh = new THREE.Mesh((child as any).geometry, teethMaterial.clone());
            mesh.geometry.translate(jaw.offset.x, jaw.offset.y, jaw.offset.z);
            mesh.geometry.scale(0.01, 0.01, 0.01);
            jaw.body.addShape(threeMeshToConvexCannonMesh(mesh));
          }
        } 
        jaw.mesh = new THREE.Mesh(mergedGeometry(object), teethMaterial.clone());

        scene.add(jaw.mesh);

        jaw.INERTIA_STATIC = jaw.body.inertia;
        jaw.INERTIA_DYNAMIC = jaw.INERTIA_STATIC.scale(BODYMASS_DYNAMIC / BODYMASS_STATIC);
        console.log(jaw.INERTIA_DYNAMIC, jaw.INERTIA_STATIC);

        console.log('loading mesh succeeded');
        jaw.loaded = true;
        afterLoad(save, callback);
      },

      // called when loading in progress
      function (xhr) {},

      // called when loading has errors
      function (error) {
        console.log('An error happened while loading mesh and body: ' + error);
      }
    );
  }

  loadMesh(path: any, save: () => void, callback: () => void) {
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

        console.log('loading mesh succeeded');
        jaw.mesh_loaded = true;
        if (jaw.mesh_loaded && jaw.body_loaded) {
          // actually this is a race condition, let's ignore that for now
          jaw.loaded = true;
          afterLoad(save, callback);
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

  loadBody(path: any, save: () => void, callback: () => void) {
    const jaw = this;

    objLoader.load(
      path,

      // called when resource is loaded
      function (object) {
        for (const child of object.children){
          if ((child as any).geometry !== undefined && (child as any).geometry.isBufferGeometry) {
            const mesh = new THREE.Mesh((child as any).geometry, teethMaterial.clone());
            mesh.geometry.translate(jaw.offset.x, jaw.offset.y, jaw.offset.z);
            mesh.geometry.scale(0.01, 0.01, 0.01);
            jaw.body.addShape(threeMeshToConvexCannonMesh(mesh));
          }
        }

        // calculate inertia
        jaw.INERTIA_STATIC = jaw.body.inertia;
        jaw.INERTIA_DYNAMIC = jaw.INERTIA_STATIC.scale(BODYMASS_DYNAMIC / BODYMASS_STATIC);
        console.log(jaw.INERTIA_DYNAMIC, jaw.INERTIA_STATIC);

        console.log('loading mesh succeeded');
        jaw.body_loaded = true;
        if (jaw.mesh_loaded && jaw.body_loaded) {
          // actually a race condition
          jaw.loaded = true;
          afterLoad(save, callback);
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
    // don't do anything if body is static, or if not selected
    if (this.body.type == CANNON.Body.STATIC) {
      return;
    }
    if (!this.selected) {
      return;
    }

    // selected and colliding => apply force
    if (this.colliding) {
      this.body.applyForce(this.impulseToTarget());
    }
    // selected and not colliding => apply impulse
    else {
      this.body.applyImpulse(this.impulseToTarget());
    }

    // torque
    if (movement_mode == 3) {
      this.body.applyTorque(this.torqueToTarget());
    }
  }

  /* return target world position as a Vec3
  */
  targetWorldPos() {
    return vector3ToVec3(this.target.getWorldPosition(new THREE.Vector3()));
  }

  impulseToTarget() {
    const targetWorldPosition = this.targetWorldPos(); // Vec3

    let dp: any;
    switch (movement_mode) {
      case 0: {
        // Restricted to x axis
        dp = new CANNON.Vec3(targetWorldPosition.x - this.body.position.x, 0, 0);
        break;
      }
      case 1: {
        // Restricted to y axis
        dp = new CANNON.Vec3(0, targetWorldPosition.y - this.body.position.y, 0);
        break;
      }
      case 2: {
        // Restricted to z axis
        dp = new CANNON.Vec3(0, 0, targetWorldPosition.z - this.body.position.z);
        break;
      }
      case 3: {
        // Free movement (default)
        dp = targetWorldPosition.vsub(this.body.position); // Vec3
        break;
      }
    }

    const impulse = dp.scale(IMPULSE_REACTIVITY); // Vec3
    return impulse;
  }

  dthetaToTarget() {
    let targetWorldQuaternion = this.target.getWorldQuaternion(new THREE.Quaternion());
    targetWorldQuaternion = threeQuaternionToCannonQuaternion(targetWorldQuaternion); // Cannon.Quaternion

    // https://forum.unity.com/threads/shortest-rotation-between-two-quaternions.812346/
    if (quatDot(targetWorldQuaternion, this.body.quaternion) < 0) {
      return targetWorldQuaternion.mult(minusQuat(this.body.quaternion.inverse()));
    } else {
      return targetWorldQuaternion.mult(this.body.quaternion.inverse());
    }
  }

  torqueToTarget() {
    const identityQuat = new CANNON.Quaternion(0, 0, 0, 1);

    if (this.colliding) {
      return identityQuat.slerp(this.dthetaToTarget(), ANGULAR_REACTIVITY_COLLISION);
    } else {
      return identityQuat.slerp(this.dthetaToTarget(), ANGULAR_REACTIVITY);
    }
  }
}

function initCannon() {
  world = new CANNON.World();
  world.gravity.set(0, 0, 0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.broadphase.useBoundingBoxes = true;
  world.solver.iterations = 10; //10
  console.log(world);

  floor_body = new CANNON.Body({ mass: 0 });
  let floor_shape = new CANNON.Plane();
  floor_body.addShape(floor_shape);
  floor_body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // rotate floor with normal along positive y axis
  world.addBody(floor_body);

  world.addEventListener('beginContact', function (e) {
    console.log('contact detected!');
    lowerjaw.colliding = true;
    upperjaw.colliding = true;
  });
  world.addEventListener('endContact', function (e) {
    console.log('contact ended');
    lowerjaw.colliding = false;
    upperjaw.colliding = false;
  })
}

function initThree(setOpenMenu: any, setCurrentScan: any) {
  // create container
  container = document.createElement('div');
  document.body.appendChild(container);

  // create scene and camera
  scene = new THREE.Scene();
  //scene.background = new THREE.Color(0x808080);
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
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
  /*const floorGeometry = new THREE.PlaneGeometry(4, 4);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 1.0,
    metalness: 0.0,
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);*/

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

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  menuDiv = document.querySelector('.menu-div');
  menuMesh = new HTMLMesh(menuDiv);
  menuMesh.position.set(0, 1.5, -1);
  menuMesh.scale.setScalar(1.8);
  scene.add(menuMesh);

  legendDiv = document.querySelector('.legend');
  legendMesh = new HTMLMesh(legendDiv);
  legendMesh.position.set(0, 1.4, -1);
  legendMesh.scale.setScalar(1.8);
  scene.add(legendMesh);

  document.body.appendChild(ARButton.createButton(renderer));

  // controllers

  controller1 = renderer.xr.getController(0);
  controller1.addEventListener('selectstart', onSelectStart);
  controller1.addEventListener('selectend', onSelectEnd);
  controller1.addEventListener('squeezestart', onSqueezeStartRight);
  controller1.addEventListener('squeezeend', onSqueezeEndRight);
  scene.add(controller1);

  controller2 = renderer.xr.getController(1);
  controller2.addEventListener('selectstart', onSelectStart);
  controller2.addEventListener('selectend', onSelectEnd);
  controller2.addEventListener('squeezestart', onSqueezeStartLeft);
  controller2.addEventListener('squeezeend', onSqueezeEndLeft);
  scene.add(controller2);

  // add controller models

  const controllerModelFactory = new XRControllerModelFactory();

  controllerGrip1 = renderer.xr.getControllerGrip(0);
  controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
  scene.add(controllerGrip1);

  controllerGrip2 = renderer.xr.getControllerGrip(1);
  controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
  scene.add(controllerGrip2);

  // lines pointing from controllers

  const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);

  const line = new THREE.Line(geometry);
  line.name = 'line';
  line.scale.z = 5;

  controller1.add(line.clone());
  controller2.add(line.clone());

  raycaster = new THREE.Raycaster();

  // allow additional button inputs (for axis locking)
  session = renderer.xr.getSession();
}

function loadObjects(save: () => void, callback: () => void) {
  lowerjaw = new Jaw('lowerjaw', '/lower-hacd.obj', '/lower_ios_6.obj', save, callback);
  upperjaw = new Jaw('upperjaw', '/upper-hacd.obj', '/upper_ios_6.obj', save, callback);

  curr_jaw = upperjaw;
}

// define VR Headset position
const VRHeadsetPosition = new THREE.Vector3();
const VRHeadsetQuaternion = new THREE.Quaternion();

function afterLoad(save: () => void, callback: () => void) {
  VRHeadsetPosition.setFromMatrixPosition(camera.matrixWorld);
  if (lowerjaw.loaded && upperjaw.loaded) {
    VRHeadsetPosition.setFromMatrixPosition(camera.matrixWorld);
    VRHeadsetQuaternion.setFromRotationMatrix(camera.matrixWorld);
    VRHeadsetQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

    lowerjaw.body.position.set(VRHeadsetPosition.x, VRHeadsetPosition.y + 0.3, VRHeadsetPosition.z - 5);
    lowerjaw.body.quaternion.set(
      VRHeadsetQuaternion.x,
      VRHeadsetQuaternion.y,
      VRHeadsetQuaternion.z,
      VRHeadsetQuaternion.w
    );

    upperjaw.body.position.set(VRHeadsetPosition.x, VRHeadsetPosition.y + 0.45, VRHeadsetPosition.z - 5);
    upperjaw.body.quaternion.set(
      VRHeadsetQuaternion.x,
      VRHeadsetQuaternion.y,
      VRHeadsetQuaternion.z,
      VRHeadsetQuaternion.w
    );

    lowerjaw.mesh.name = 'lowerjaw.mesh';
    lowerjaw.sphere.name = 'lowerjaw.sphere';
    lowerjaw.target.name = 'lowerjaw.target';
    upperjaw.mesh.name = 'upperjaw.mesh';
    upperjaw.sphere.name = 'lowerjaw.sphere';
    upperjaw.target.name = 'lowerjaw.target';

    console.log('starting animation');
    renderer.setAnimationLoop(function foo() {
      animate(save, callback);
    });
  }
}

function animate(save: () => void, callback: () => void) {
  autoSave(60, save); // 60 second interval, move out to render and out of menu; AND onlt save when session.xr active

  frameNum += 1;
  updatePhysics();
  if (lowerjaw.colliding) {
    vibrateTrigger();
  }
  render(callback);
}

let currentOption = 3; // initialize to free movement
let optionChanged = false; // flag to indicate that the option has changed
let prevButtonState = 0; // initialize previous button state to not pressed
var optionChanged_A = false;
var prevButtonState_A = 0;
var optionChanged_B = false;
var prevButtonState_B = 0;

// using X/A buttons on the controllers
function beforeRender(callback: () => void) {
  //console.log(curr_jaw);
  if (curr_jaw.selected) {
    switch (movement_mode) {
      case 0: {
        // Restricted to x axis
        showAxes(0, curr_jaw);
        break;
      }
      case 1: {
        // Restricted to y axis
        showAxes(1, curr_jaw);
        break;
      }
      case 2: {
        // Restricted to z axis
        showAxes(2, curr_jaw);
        break;
      }
      case 3: {
        // Free movement (default)
        showAxes(3, curr_jaw);
        break;
      }
    }
  } else {
    curr_jaw.mesh.remove(ArrowHelper);
  }
  session = renderer.xr.getSession();
  let ii = 0;
  if (session) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        var handedness = source.handedness; //left or right controllers
        if (handedness == 'right') {
          continue;
        } // we willen enkel de 'X' knop van de linkercontroller
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(ii++);
      const old = prevGamePads.get(source);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0),
      };
      //console.log(source.handedness);
      if (data.buttons[4] == 1 && prevButtonState == 0 && !optionChanged) {
        currentOption = (currentOption + 1) % 4; // cycle through 0, 1, 2, 3
        optionChanged = true; // set flag to true to indicate that the option has changed
      } else if (data.buttons[4] == 0 && prevButtonState == 0 && optionChanged) {
        optionChanged = false; // reset flag when squeeze button is released
      }
      prevButtonState = data.buttons[4]; // save button state for next frame
      if (data.buttons[5] == 1) {
        // Y pressed
        callback();
      }
      movement_mode = currentOption;
    }
  }
}

var Axis: any;
var ArrowHelper: any;
function showAxes(axis_num: any, curr_jaw: any) {
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

function checkMenuButtons() {
  session = renderer.xr.getSession();
  let ii = 0;
  if (session) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        var handedness = source.handedness; //left or right controllers
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(ii++);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0),
      };
      if (data.buttons[4] == 1) {
        // X/A pressed
        buttonPressMenu(controller);
      }
    }
  }
}

function vibrateTrigger() {
  // Vibrate TRIGGER button
  const session = renderer.xr.getSession();
  for (const source of session!.inputSources) {
    if (source.gamepad && source.gamepad.hapticActuators) {
      (source.gamepad.hapticActuators[0] as any).pulse(0.8, 100);
    }
  }
}

function render(callback: () => void) {
  cleanIntersected();

  if (!menu_open) {
    // So no unnecessary computations
    beforeRender(callback);
    undoWhenPressed();
    redoWhenPressed();
    intersectObjects(controller1);
    intersectObjects(controller2);
  } else {
    checkMenuButtons();
    // Update menu's position and rotation based on camera
    menuMesh.position.copy(camera.position);
    var cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.multiplyScalar(1);
    cameraDirection.y = 0; // Don't move in height
    menuMesh.position.add(cameraDirection);
    menuMesh.lookAt(new THREE.Vector3(camera.position.x, menuMesh.position.y, camera.position.z));
  }

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

function buttonPressMenu(controller) {
  const intersects = getIntersectionMesh(controller, menuMesh);
  if (intersects.length > 0) {
    // Local intersection point relative to the menuMesh
    const localIntersectionPoint = menuMesh.worldToLocal(intersects[0].point.clone());
    const meshWidth = (menuMesh.geometry as any).parameters.width;
    const meshHeight = (menuMesh.geometry as any).parameters.height;
    // Normalize based on the menuMesh dimensions
    const normalizedX = (localIntersectionPoint.x + meshWidth / 2) / meshWidth;
    const normalizedY = (localIntersectionPoint.y + meshHeight / 2) / meshHeight;
    // Convert to corresponding 2D point on menuDiv
    const menuDivWidth = menuDiv.offsetWidth;
    const menuDivHeight = menuDiv.offsetHeight;

    const menuDivPosition = {
      x: normalizedX * menuDivWidth,
      y: (1 - normalizedY) * menuDivHeight,
    };

    const intersectionPoint = new THREE.Vector2(menuDivPosition.x, menuDivPosition.y);

    const deepestIntersectedElement = findDeepestIntersectedElement(menuDiv, intersectionPoint);

    const clickEvent = new MouseEvent('click', {
      clientX: menuDivPosition.x,
      clientY: menuDivPosition.y,
      bubbles: true,
      cancelable: true,
    });
    deepestIntersectedElement.dispatchEvent(clickEvent);
  }
}

// when controller pushes select button, select the object it is pointing to
function onSelectStart(event) {
  const controller = event.target;

  if (!menu_open) {
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
        jaw.body.mass = BODYMASS_DYNAMIC;
        jaw.body.invMass = 1/BODYMASS_DYNAMIC;
        jaw.body.inertia = jaw.INERTIA_DYNAMIC;
        jaw.body.invInertia = invVec3(jaw.INERTIA_DYNAMIC);
        controller.userData.selected = jaw;
        addMovementToUndoStack(jaw.body);
      }
    } else {
      const intersectionsLegend = getIntersectionMesh(controller, legendMesh);
      if (intersectionsLegend.length > 0) {
        //const intersection = intersections[0];
        controller.userData.selected = legendMesh;
        controller.attach(legendMesh);
      }
    }
  } else {
    buttonPressMenu(controller);
  }
}

// when controller releases select button

function onSelectEnd(event: any) {
  const controller = event.target;

  if (controller.userData.selected == legendMesh){
    scene.attach(legendMesh)
    controller.userData.selected = undefined;
  }
  else if (controller.userData.selected !== undefined) {
    const jaw = controller.userData.selected;

    jaw.mesh.material.emissive.b = 0;
    scene.attach(jaw.target);
    jaw.target.visible = false;
    jaw.selected = false;
    jaw.body.mass = BODYMASS_STATIC;
    jaw.body.invMass = 1/BODYMASS_STATIC;
    jaw.body.inertia = jaw.INERTIA_STATIC;
    jaw.body.inertia = invVec3(jaw.INERTIA_STATIC);
    controller.userData.selected = undefined;
  }

}

// define pressed button booleans
var pressedRight = false;
var pressedLeft = false;

// zoom in gradually with right squeeze button

function onSqueezeStartRight() {
  if (!menu_open) {
    pressedRight = true;
    setTimeout(function () {
      if (pressedRight) {
        upperjaw.mesh.scale.multiplyScalar(1.002);
        lowerjaw.mesh.scale.multiplyScalar(1.002);
        onSqueezeStartRight();
      }
    }, 10);
  }
}

// zoom out gradually with left squeeze button

function onSqueezeStartLeft() {
  //redoMovement();
  if (!menu_open) {
    pressedLeft = true;
    setTimeout(function () {
      if (pressedLeft) {
        upperjaw.mesh.scale.multiplyScalar(0.998);
        lowerjaw.mesh.scale.multiplyScalar(0.998);
        onSqueezeStartLeft();
      }
    }, 10);
  }
}

// stop gradual zoom-in

function onSqueezeEndRight() {
  if (!menu_open) {
    pressedRight = false;
  }
}

// stop gradual zoom-out

function onSqueezeEndLeft(event: any) {
  if (!menu_open) {
    pressedLeft = false;
  }
}

// find objects the controller is pointing at and return as an Array sorted by distance

function getIntersections(controller: any) {
  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  return raycaster.intersectObjects([lowerjaw.mesh, upperjaw.mesh], true);
}

function getIntersectionMesh(controller: any, mesh: any) {
  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  return raycaster.intersectObject(mesh, true);
}

function findDeepestIntersectedElement(element, intersectionPoint) {
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const rect = child.getBoundingClientRect();
    if (
      intersectionPoint.x >= rect.left &&
      intersectionPoint.x <= rect.right &&
      intersectionPoint.y >= rect.top &&
      intersectionPoint.y <= rect.bottom
    ) {
      return findDeepestIntersectedElement(child, intersectionPoint);
    }
  }
  return element;
}

// highlight the object the controller points at

function intersectObjects(controller: any) {
  // Do not highlight when already selected

  if (controller.userData.selected !== undefined) return;

  const line = controller.getObjectByName('line');
  const intersections = getIntersections(controller);

  if (intersections.length > 0) {
    const intersection = intersections[0];

    const object = intersection.object;

    // anders intersect het soms met de pijl om een of andere reden
    if (object.parent.type == 'ArrowHelper') {
      return;
    }

    object.material.emissive.r = 1;
    intersected.push(object);
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

function addMovementToUndoStack(body: any) {
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
    const quaternion = new CANNON.Quaternion().copy(redoMovement.body.quaternion);
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

function positionReset() {
  VRHeadsetPosition.setFromMatrixPosition(camera.matrixWorld);
  VRHeadsetQuaternion.setFromRotationMatrix(camera.matrixWorld);

  // create a quaternion for 90 degree rotation around x-axis
  var xQuaternion = new THREE.Quaternion();
  xQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);

  let finalQuaternion = new THREE.Quaternion();
  finalQuaternion.multiplyQuaternions(VRHeadsetQuaternion, xQuaternion);

  // Calculate offset vector to position object in front of user
  let offsetVectorLower = new THREE.Vector3(0, 0.3, -2).applyQuaternion(VRHeadsetQuaternion);
  let offsetVectorUpper = new THREE.Vector3(0, 0.4, -2).applyQuaternion(VRHeadsetQuaternion);

  VRHeadsetPosition.add(offsetVectorLower);

  // Set position and orientation
  lowerjaw.body.position.set(VRHeadsetPosition.x, VRHeadsetPosition.y, VRHeadsetPosition.z);
  lowerjaw.body.quaternion.set(finalQuaternion.x, finalQuaternion.y, finalQuaternion.z, finalQuaternion.w);

  VRHeadsetPosition.sub(offsetVectorLower);
  VRHeadsetPosition.add(offsetVectorUpper);

  upperjaw.body.position.set(VRHeadsetPosition.x, VRHeadsetPosition.y, VRHeadsetPosition.z);
  upperjaw.body.quaternion.set(finalQuaternion.x, finalQuaternion.y, finalQuaternion.z, finalQuaternion.w);
  upperjaw.mesh.scale.set(1, 1, 1);
  lowerjaw.mesh.scale.set(1, 1, 1);
}

var curr_jaw: any;
function meshToJaw(mesh: any) {
  if (mesh === lowerjaw.mesh) {
    curr_jaw = lowerjaw;
    return lowerjaw;
  } else if (mesh === upperjaw.mesh) {
    curr_jaw = upperjaw;

    return upperjaw;
  } else {
    console.warn('Selected mesh is not a jaw, returning null');
    return null;
  }
}

function undoWhenPressed() {
  let iii = 0;
  if (session) {
    for (const source of session.inputSources) {
      if (source && source.handedness) {
        var handedness = source.handedness; //left or right controllers
        if (handedness == 'left') {
          continue;
        } // we willen enkel de 'A' knop van de rechtercontroller
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(iii++);
      const old = prevGamePads.get(source);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0),
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
        if (handedness == 'left') {
          continue;
        } // we willen enkel de 'A' knop van de rechtercontroller
      }
      if (!source.gamepad) continue;
      const controller = renderer.xr.getController(iiii++);
      const old = prevGamePads.get(source);
      const data = {
        handedness: handedness,
        buttons: source.gamepad.buttons.map((b) => b.value),
        axes: source.gamepad.axes.slice(0),
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

function updateScanData(scanID: number, setCurrentScan: any) {
  // Use when menu is triggered for last position
  let newScan = new ScanSave({ scanId: scanID, timestampSave: '2006-01-02T15:04:05' });
  newScan.lowerX = lowerjaw.body.position.x;
  newScan.lowerY = lowerjaw.body.position.y;
  newScan.lowerZ = lowerjaw.body.position.z;

  newScan.lowerRX = lowerjaw.body.quaternion.x;
  newScan.lowerRY = lowerjaw.body.quaternion.y;
  newScan.lowerRZ = lowerjaw.body.quaternion.z;
  newScan.lowerRW = lowerjaw.body.quaternion.w;

  newScan.upperX = upperjaw.body.position.x;
  newScan.upperY = upperjaw.body.position.y;
  newScan.upperZ = upperjaw.body.position.z;

  newScan.upperRX = upperjaw.body.quaternion.x;
  newScan.upperRY = upperjaw.body.quaternion.y;
  newScan.upperRZ = upperjaw.body.quaternion.z;
  newScan.upperRW = upperjaw.body.quaternion.w;

  setCurrentScan(newScan);
  return newScan;
}

function loadPosition(positionData: any) {
  lowerjaw.body.position.set(positionData.lowerX, positionData.lowerY, positionData.lowerZ);
  upperjaw.body.position.set(positionData.upperX, positionData.upperY, positionData.upperZ);
  lowerjaw.body.quaternion.set(positionData.lowerRX, positionData.lowerRY, positionData.lowerRZ, positionData.lowerRW);
  upperjaw.body.quaternion.set(positionData.upperRX, positionData.upperRY, positionData.upperRZ, positionData.upperRW);

  //putInFrontOfCamera();
}

function putInFrontOfCamera() {
  const distanceFromBodyToCamera = 10;
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  const positionInFrontOfCamera = camera.position.clone().add(direction.multiplyScalar(distanceFromBodyToCamera));

  const relativePosition = relativePosition2to1(lowerjaw, upperjaw);
  const relativeQuaternion = relativeQuaternion2to1(lowerjaw, upperjaw);

  lowerjaw.position.copy(positionInFrontOfCamera);
  // Rotate the relative position using the rotation of lowerjaw
  //const rotatedRelativePosition = lowerjaw.quaternion.vmult(relativePosition);

  // Set the position of upperjaw
  upperjaw.position.copy(lowerjaw.position);
  upperjaw.position.vadd(relativePosition, upperjaw.position); // or rotatedRelative?
  // Set the rotation of upperjaw
  upperjaw.quaternion.copy(lowerjaw.quaternion);
  upperjaw.quaternion.mult(relativeQuaternion, lowerjaw.quaternion);
}

function relativePosition2to1(body1: any, body2: any) {
  const body1Position = body1.position;
  const body2Position = body2.position;

  const relativePosition = body2Position.clone();
  relativePosition.vsub(body1Position, relativePosition);
  return relativePosition;
}

function relativeQuaternion2to1(body1: any, body2: any) {
  const body1Quaternion = body1.quaternion;
  const body2Quaternion = body2.quaternion;

  const body1QuaternionInverse = body1Quaternion.clone().inverse();
  const relativeQuaternion = new CANNON.Quaternion();
  body2Quaternion.mult(body1QuaternionInverse, relativeQuaternion);
  return relativeQuaternion;
}

function eulerSetRotationBody(body: any, eulerX: number, eulerY: number, eulerZ: number) {
  const quatX = new CANNON.Quaternion();
  const quatY = new CANNON.Quaternion();
  const quatZ = new CANNON.Quaternion();
  quatX.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), eulerX);
  quatY.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), eulerY);
  quatZ.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), eulerZ);
  const combinedQuaternion = quatX.mult(quatY).mult(quatZ);
  combinedQuaternion.normalize();
  body.quaternion.copy(combinedQuaternion);
}

function autoSave(interval: number, save: () => void) {
  const elapsedTime = clock.getElapsedTime();

  if (elapsedTime >= interval) {
    console.log(interval, 'seconds have passed');
    // Additional checks, like only if an edit's been made
    if (!menu_open){
      save();
    }
    // reset the clock
    clock.start();
  }
}

export default function DraggingView({ scanId, client, onQuit }: { scanId: number; client: any; onQuit: () => void }) {
  const initialScan = new ScanSave({
    lowerX: 0,
    lowerY: 2,
    lowerZ: 0.12,
    lowerRX: 1.5 * Math.PI,
    lowerRY: 0,
    lowerRZ: 0,
    lowerRW: 0,
    upperX: 0,
    upperY: 2,
    upperZ: 0.12,
    upperRX: 1.5 * Math.PI,
    upperRY: 0,
    upperRZ: 0,
    upperRW: 0,
    scanId: scanId,
    timestampSave: '2006-01-02T15:04:05',
  });
  const [current_scan, setCurrentScan] = useState<ScanSave>(initialScan);
  const [openMenu, setOpenMenu] = useState(false); // SET TO FALSE

  const toggleMenu = () => {
    if (openMenu) {
      //scene.add(lowerjaw.mesh);
      //scene.add(upperjaw.mesh);
      scene.remove(menuMesh);
    } else {
      //scene.remove(lowerjaw.mesh);
      //scene.remove(upperjaw.mesh);
      scene.add(menuMesh);
    }
    updateScanData(scanId, setCurrentScan);

    menu_open = !openMenu;
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    // https://github.com/facebook/react/issues/24502
    initCannon();
    initThree(setOpenMenu, setCurrentScan);
    loadObjects(save, toggleMenu);

    return () => {
      // Clean up when unmounted
      if (session) {
        // Only if session's been started
        session.end();
        if (renderer) {
          renderer.dispose();
          renderer.setAnimationLoop(null); // Cancels animation
          //document.body.removeChild(containerRef);
          //document.body.removeChild(containerRef.current);
        }
        if (scene) {
          while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
          }
        }
        while (document.body.firstChild) {
          // Remove all from body
          document.body.removeChild(document.body.firstChild);
        }
      }
    };
  }, []);

  const save = () => {
    const newScan = updateScanData(scanId, setCurrentScan); // Voor als niet snel genoeg
    const req = new SaveScanDataRequest({ scan: newScan });
    client.saveScanData(req); // Data not used
  };

  const onLoadItemClicked = (inputData: ScanSave) => {
    console.log(inputData);
    const { scanId, timestampSave, ...positionData } = inputData;
    console.log(positionData);
    loadPosition(positionData);
  };

  const onReset = () => {
    positionReset();
    toggleMenu(); // Probably want to go out of the menu at that point
  };
  const props = {
    isOpen: openMenu,
    setIsOpen: setOpenMenu,
    current_scan,
    client,
    onLoadItemClicked,
    onQuit,
    onReset,
    onToggle: toggleMenu,
  };

  const zoomInButton = document.getElementById('zoom-in');
  const zoomOutButton = document.getElementById('zoom-out');

  const zoomInFunction = (e: any) => {
    const fov = getFov();
    camera.fov = clickZoom(fov, 'zoomIn');
    camera.updateProjectionMatrix();
  };

  const zoomOutFunction = (e: any) => {
    const fov = getFov();
    camera.fov = clickZoom(fov, 'zoomOut');
    camera.updateProjectionMatrix();
  };

  const clickZoom = (value: any, zoomType: any) => {
    if (value >= 20 && zoomType === 'zoomIn') {
      return value - 5;
    } else if (value <= 75 && zoomType === 'zoomOut') {
      return value + 5;
    } else {
      return value;
    }
  };

  const getFov = () => {
    return Math.floor((2 * Math.atan(camera.getFilmHeight() / 2 / camera.getFocalLength()) * 180) / Math.PI);
  };

  return (
    <div>
      <div className="menu-div">
        <Menu {...props} />
        <style jsx>{`
          .menu-div {
            position: absolute;
            width: 300px;
            height: 350px;
          }
        `}</style>
      </div>
      <div className="legend">
        <Legenda />
      </div>
    </div>
  );
}
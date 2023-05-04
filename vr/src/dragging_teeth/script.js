import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
//import * as dat from 'dat';
import { OBJExporter } from "three/addons/exporters/OBJExporter.js";

import * as CANNON from "cannon-es";
import {
  getFirstMesh,
  getFirstBufferGeometry,
  threeMeshToConvexThreeMesh,
  threeMeshToConvexCannonMesh,
  threeMeshToCannonMesh,
  checkTime,
  cannonMeshToCannonConvexPolyhedron,
  vec3ToVector3,
  vector3ToVec3,
  threeQuaternionToCannonQuaternion,
  applyQuaternion,
  sqnorm,
  quatDot,
  minusQuat,
} from "./util.js";

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

const objLoader = new OBJLoader();

// parameters
const TIMESTEP = 1 / 30;
const BODYMASS = 1; // when the body is not selected, the mass is 0 (= stationary)
const IMPULSE_REACTIVITY = 1;
const ANGULAR_REACTIVITY = 5;
const LINEAR_DAMPING = 0.9; // cannon.js default: 0.01
const ANGULAR_DAMPING = 0.9; // idem

// set to true for debugging / development
const DEBUGGING_MODE = false;

class Jaw {
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
  constructor(bodypath, meshpath) {
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
    this.body.position.set(0, 2, 0);
    let xaxis = new CANNON.Vec3(1, 0, 0);
    this.body.quaternion.setFromAxisAngle(xaxis, -Math.PI / 2);
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
      function (object) {
        // object is a 'Group', which is a subclass of 'Object3D'
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
        jaw.mesh.geometry.scale(0.01, 0.01, 0.01);
        jaw.mesh.position.x = 0;
        jaw.mesh.position.y = 0;
        jaw.mesh.position.z = 0;
        jaw.mesh.rotation.x = 1.5 * Math.PI;
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
        mesh.geometry.scale(0.01, 0.01, 0.01);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        mesh.rotation.x = 1.5 * Math.PI;

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
      this.body.applyTorque(this.torqueToTarget());
    }
  }

  impulseToTarget() {
    const targetWorldPosition = vector3ToVec3(
      this.target.getWorldPosition(new THREE.Vector3())
    ); // Vec3
    const dp = targetWorldPosition.vsub(this.body.position); // Vec3
    const impulse = dp.scale(IMPULSE_REACTIVITY); // Vec3
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

  // resize

  window.addEventListener("resize", onWindowResize);
}

function loadObjects() {
  lowerjaw = new Jaw(
    "../../assets/simplified/lower_180.obj",
    "../../assets/lower_ios_6.obj"
  );
  //upperjaw = new Jaw('../../assets/simplified/upper_218.obj');
  upperjaw = new Jaw(
    "../../assets/simplified/upper_209.obj",
    "../../assets/upper_ios_6.obj"
  );
}

// x=red, y=green, z=blue

const VRHeadsetPosition = new THREE.Vector3();
VRHeadsetPosition.setFromMatrixPosition(camera.matrixWorld);

// const headsetPosition = new THREE.Vector3();
// const headsetRotation = new THREE.Quaternion();
// const headsetScale = new THREE.Vector3();

// the following line extracts the position, rotation and scale in world space

// camera.matrixWorld.decompose(headsetPosition, headsetRotation, headsetScale);

// console.log(headsetPosition);
// console.log(headsetRotation);

function afterLoad() {
  if (lowerjaw.loaded && upperjaw.loaded) {
    lowerjaw.body.position.set(
      VRHeadsetPosition.x,
      VRHeadsetPosition.y + 0.3,
      VRHeadsetPosition.z - 5.5
    );
    upperjaw.body.position.set(
      VRHeadsetPosition.x,
      VRHeadsetPosition.y + 0.4,
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

function render() {
  cleanIntersected();
  positionReset();

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
      console.log(jaw.body);
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

// global variable to save old position
var oldBodyPosUpper = new THREE.Vector3();
var oldBodyPosLower = new THREE.Vector3();

var oldPosUpper = new THREE.Vector3();
var oldPosLower = new THREE.Vector3();

var newPosUpper = new THREE.Vector3();
var newPosLower = new THREE.Vector3();

// zoom in with right squeeze button

function onSqueezeStartRight() {
  upperjaw.body.position(oldBodyPosUpper);
  lowerjaw.body.position(oldBodyPosLower);

  upperjaw.mesh.getWorldPosition(oldPosUpper);
  lowerjaw.mesh.getWorldPosition(oldPosLower);
  console.log(oldPosLower);

  upperjaw.mesh.scale.multiplyScalar(1.1);
  lowerjaw.mesh.scale.multiplyScalar(1.1);

  upperjaw.mesh.getWorldPosition(newPosUpper);
  lowerjaw.mesh.getWorldPosition(newPosLower);

  upperjaw.body.position.set(
    oldBodyPosUpper.x + oldPosUpper.x - newPosUpper.x,
    oldBodyPosUpper.y + oldPosUpper.y - newPosUpper.y,
    oldBodyPosUpper.z + oldPosUpper.z - newPosUpper.z
  );
  lowerjaw.body.position.set(
    oldBodyPosLower.x + oldPosLower.x - newPosLower.x,
    oldBodyPosLower.y + oldPosLower.y - newPosLower.y,
    oldBodyPosLower.z + oldPosLower.z - newPosLower.z
  );
}

// zoom out with left squeeze button

function onSqueezeStartLeft() {
  upperjaw.mesh.getWorldPosition(oldPosUpper);
  lowerjaw.mesh.getWorldPosition(oldPosLower);

  upperjaw.mesh.scale.multiplyScalar(0.9);
  lowerjaw.mesh.scale.multiplyScalar(0.9);

  upperjaw.mesh.position.set(oldPosUpper.x, oldPosUpper.y, oldPosUpper.z);
  lowerjaw.mesh.position.set(oldPosLower.x, oldPosLower.y, oldPosLower.z);
}

function onSqueezeEndRight() {}

function onSqueezeEndLeft(event) {}

// resets position to center

function positionReset() {
  const session = renderer.xr.getSession();
  if (session == null || session.inputSources == null) {
    return;
  } else {
    for (const source of session.inputSources) {
      if (source.gamepad.buttons[4].pressed) {
        upperjaw.mesh.position.set(0, 2, 0.12);
        lowerjaw.mesh.position.set(0, 2, 0.12);
        upperjaw.mesh.rotation.x = 1.5 * Math.PI;
        lowerjaw.mesh.position.set(0, 2, 0.12);
        lowerjaw.mesh.rotation.x = 1.5 * Math.PI;
      }
    }
  }
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
    const intersection = intersections[0];

    const object = intersection.object;
    object.material.emissive.r = 1;
    intersected.push(object);

    line.scale.z = intersection.distance; // make line not pass through the object
  } else {
    line.scale.z = 5;
  }
}

function cleanIntersected() {
  while (intersected.length) {
    const object = intersected.pop();
    object.material.emissive.r = 0;
  }
}

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

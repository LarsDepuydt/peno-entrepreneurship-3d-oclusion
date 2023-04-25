import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/addons/webxr/XRControllerModelFactory.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

let container;
let camera, scene, renderer;
let controller1, controller2;
let controllerGrip1, controllerGrip2;

let raycaster;

const intersected = []; // global list that holds the first objects the controllers are pointing at
const tempMatrix = new THREE.Matrix4();

let controls, group;

var upperjaw;
var lowerjaw;

init();
animate();

function init() {
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
  controls.enableZoom == true;
  controls.enablePan == true;
  controls.update();

  // axis
  var axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

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

  // add all objects to an object group

  group = new THREE.Object3D();
  scene.add(group);

  // load lower jaw
  const loader = new OBJLoader();

  loader.load(
    "../../assets/lower_ios_6.obj",
    // called when resource is loaded y=green, x=red, z=blue
    function (object) {
      lowerjaw = object;
      lowerjaw.position.x = 0;
      lowerjaw.position.y = 2;
      lowerjaw.position.z = 0.12;
      lowerjaw.rotation.x = 1.5 * Math.PI;
      //lowerjaw.rotation.y = Math.PI
      lowerjaw.scale.setScalar(0.01);
      group.add(lowerjaw);

      console.log("Object3D? " + lowerjaw.isObject3D);
      console.log("Mesh?");
    },

    // called when loading in progress
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened while loading");
    }
  );

  // load upper jaw

  loader.load(
    "../../assets/upper_ios_6.obj",
    // called when resource is loaded y=green, x=red, z=blue
    function (object) {
      upperjaw = object;
      upperjaw.position.x = 0;
      upperjaw.position.y = 2;
      upperjaw.position.z = 0.12;
      upperjaw.rotation.x = 1.5 * Math.PI;
      //upperjaw.rotation.y = Math.PI
      upperjaw.scale.setScalar(0.01);
      group.add(upperjaw);

      console.log("Object3D? " + upperjaw.isObject3D);
      console.log("Mesh?");
    },

    // called when loading in progress
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened while loading");
    }
  );

  // add renderer and enable VR

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  document.body.appendChild(VRButton.createButton(renderer));

  // controllers

  controller1 = renderer.xr.getController(0);
  controller1.addEventListener("selectstart", onSelectStart);
  controller1.addEventListener("selectend", onSelectEnd);
  controller1.addEventListener("squeezestart", onSqueezeStart1);
  controller1.addEventListener("squeezeend", onSqueezeEnd1);

  scene.add(controller1);

  controller2 = renderer.xr.getController(1);
  controller2.addEventListener("selectstart", onSelectStart);
  controller2.addEventListener("selectend", onSelectEnd);
  controller2.addEventListener("squeezestart", onSqueezeStart2);
  controller2.addEventListener("squeezeend", onSqueezeEnd2);
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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function positionReset() {
  const session = renderer.xr.getSession();
  if (session == null || session.inputSources == null) {
    return;
  } else {
    for (const source of session.inputSources) {
      if (source.gamepad.buttons[4].pressed) {
        group.position.x = 0;
        group.position.y = 2;
        group.position.z = 0.12;
        group.rotation.x = 1.5 * Math.PI;
        //group.scale.setScalar(0.01);
      }
    }
  }
}

// when controller pushes select button, select the object it is pointing to

function onSelectStart(event) {
  const controller = event.target;

  const intersections = getIntersections(controller);

  if (intersections.length > 0) {
    const intersection = intersections[0];

    const object = intersection.object;
    object.material.emissive.b = 1;
    controller.attach(object);

    controller.userData.selected = object;
  }
}

// when controller releases select button

function onSelectEnd(event) {
  const controller = event.target;

  if (controller.userData.selected !== undefined) {
    const object = controller.userData.selected;
    object.material.emissive.b = 0;
    group.attach(object);

    controller.userData.selected = undefined;
  }
}

// var panning, zooming;
// var isClicked1 = false;
// var isClicked2 = false;

// var startX1;
// var startZ1;
// var startX2;
// var startZ2;
// var endX1;
// var endZ1;
// var endX2;
// var endZ2;
// var startDistanceBetweenFingers;
// var endDistanceBetweenFingers;
// var pinchRatio;
// var objWidth = 200;
// var objHeight = 300;

// var currentContinuousZoom = 1.0;
// var currentOffsetX = -100;
// var currentOffsetZ = -100;
// var currentWidth = objWidth;
// var currentHeight = objHeight;

// var newContinuousZoom;
// var newHeight;
// var newWidth;
// var newOffsetX;
// var newOffsetZ;

// var centerPointStartX;
// var centerPointStartZ;
// var centerPointEndX;
// var centerPointEndZ;
// var translateFromZoomingX;
// var translateFromZoomingZ;
// var translateFromTranslatingX;
// var translateFromTranslatingZ;
// var translateTotalX;
// var translateTotalZ;

// var percentageOfImageAtPinchPointX;
// var percentageOfImageAtPinchPointZ;

// function dubbleSqueezeStart(){
//     // panning with controller1
//     if ( isClicked1 && !isClicked2 ) {

//     }
//      // panning with controller2
//     if ( !isClicked1 && isClicked2 ) {

//     }
//     // zooming with both controllers
//     if (isClicked1 === true && isClicked2 === true) {
//         // calculations using start coordinates
//         centerPointStartX = ((startX1 + startX2) / 2.0);
// 		centerPointStartZ = ((startZ1 + startZ2) / 2.0);
// 		percentageOfImageAtPinchPointX = (centerPointStartX - currentOffsetX)/currentWidth;
// 		percentageOfImageAtPinchPointZ = (centerPointStartZ - currentOffsetZ)/currentHeight;
// 		startDistanceBetweenFingers = Math.sqrt( Math.pow((startX2-startX1),2) + Math.pow((startZ2-startZ1),2) );

//         // end coordinates
//         endX1 = controller1.position.x;
//         endZ1 = controller1.position.z;
//         endX2 = controller2.position.x;
//         endZ2 = controller2.position.z;

//         // Calculate current distance between points to get new-to-old pinch ratio and calc width and height
// 		endDistanceBetweenFingers = Math.sqrt( Math.pow((endX2-endX1),2) + Math.pow((endZ2-endZ1),2) );
// 		pinchRatio = endDistanceBetweenFingers/startDistanceBetweenFingers;
// 		newContinuousZoom = pinchRatio * currentContinuousZoom;
// 		newWidth = objWidth * newContinuousZoom;
// 		newHeight  = objHeight * newContinuousZoom;

// 		// Get the point between the two touches, relative to upper-left corner of image
// 		centerPointEndX = ((endX1 + endX2) / 2.0);
// 		centerPointEndZ = ((endZ1 + endZ2) / 2.0);

// 		// This is the translation due to pinch-zooming
// 		translateFromZoomingX = (currentWidth - newWidth) * percentageOfImageAtPinchPointX;
// 		translateFromZoomingZ = (currentHeight - newHeight) * percentageOfImageAtPinchPointZ;

// 		// And this is the translation due to translation of the centerpoint between the two fingers
// 		translateFromTranslatingX = centerPointEndX - centerPointStartX;
// 		translateFromTranslatingZ = centerPointEndZ - centerPointStartZ;

// 		// Total translation is from two components: (1) changing height and width from zooming and (2) from the two fingers translating in unity
// 		translateTotalX = translateFromZoomingX + translateFromTranslatingX;
// 		translateTotalZ = translateFromZoomingZ + translateFromTranslatingZ;

// 		// the new offset is the old/current one plus the total translation component
// 		newOffsetX = currentOffsetX + translateTotalX;
// 		newOffsetZ = currentOffsetZ + translateTotalZ;

//         // set new attributes

//         // set new values to current values
//         currentOffsetX = newOffsetX;
// 		currentOffsetZ = newOffsetZ;
// 		currentWidth = newWidth;
// 		currentHeight = newHeight;
// 		currentContinuousZoom = newContinuousZoom;
//     }

//     else{return}
//  }

var oldPosUpper = new THREE.Vector3();
var oldPosLower = new THREE.Vector3();
var oldPosGroup = new THREE.Vector3();

function onSqueezeStart1() {
  // upperjaw.getWorldPosition(oldPosUpper);
  // lowerjaw.getWorldPosition(oldPosLower);
  // console.log(oldPosUpper, oldPosLower);
  upperjaw.getWorldPosition(oldPosGroup);
  console.log(oldPosGroup);

  group.scale.multiplyScalar(0.75);

  upperjaw.position.set(oldPosGroup.x, oldPosGroup.y, oldPosGroup.z);

  // scene.attach(upperjaw);
  // scene.attach(lowerjaw);
  // upperjaw.position.set(oldPosUpper.x, oldPosUpper.y, oldPosUpper.z);
  // lowerjaw.position.set(oldPosLower.x, oldPosLower.y, oldPosLower.z);
  // group.attach(upperjaw);
  // group.attach(lowerjaw);

  // isClicked1 = true;
  // startX1 = controller1.position.x
  // startZ1 = controller1.position.z
}

function onSqueezeStart2() {
  // upperjaw.getWorldPosition(oldPosUpper);
  // lowerjaw.getWorldPosition(oldPosLower);
  // console.log(oldPosUpper, oldPosLower);
  upperjaw.getWorldPosition(oldPosGroup);
  console.log(oldPosGroup);

  group.scale.multiplyScalar(1.25);

  upperjaw.position.set(oldPosGroup.x, oldPosGroup.y, oldPosGroup.z);

  // scene.attach(upperjaw);
  // scene.attach(lowerjaw);
  // upperjaw.position.set(oldPosUpper.x, oldPosUpper.y, oldPosUpper.z);
  // lowerjaw.position.set(oldPosLower.x, oldPosLower.y, oldPosLower.z);
  // group.attach(upperjaw);
  // group.attach(lowerjaw);

  // isClicked2 = true;
  // startX2 = controller2.position.x
  // startZ2 = controller2.position.z
}
function onSqueezeEnd1() {
  // isClicked1 = false;
}
function onSqueezeEnd2(event) {
  // isClicked2 = false;
}

// find objects the controller is pointing at
function getIntersections(controller) {
  tempMatrix.identity().extractRotation(controller.matrixWorld);

  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  return raycaster.intersectObjects(group.children, true);
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

    line.scale.z = intersection.distance;
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
function animate() {
  renderer.setAnimationLoop(render);
}
function render() {
  cleanIntersected();
  //dubbleSqueezeStart();
  positionReset();

  intersectObjects(controller1);
  intersectObjects(controller2);

  renderer.render(scene, camera);
}

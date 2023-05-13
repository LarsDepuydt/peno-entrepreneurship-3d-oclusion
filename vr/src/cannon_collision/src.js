import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as CANNON from 'cannon-es';
import { default as CannonUtils } from 'cannon-utils';
//import { sendPositionScan, getPositionScan } from '../../../frontend/src/gen/proto/threedoclusion/v1/service-ScanService_connectquery.ts'

import { QuickHull } from './QuickHull.js';
import { findSepAxis, findSepAxisOverload, ogSepAxis } from './findSepAxis.js'


// overload cannon.js function findSeparatingAxis by an equivalent that uses web workers
CANNON.ConvexPolyhedron.prototype.findSeparatingAxis = findSepAxisOverload;


let container;
let camera, scene, renderer;
let controller1, controller2;
let controllerGrip1, controllerGrip2;

let controls;

let raycaster;

let world, timeStep=1/5;
let frameNum = 0;


let floor_shape, floor_body;

// lj_mesh is een THREE.Mesh
// lj_shape is een CANNON.Trimesh
// lj_body is een CANNON.Body
let lj_mesh, lj_shape, lj_body;
let uj_mesh, uj_shape, uj_body;
let lj_sphere, uj_sphere;

let lj_loaded = false, uj_loaded = false;

const teeth_material = new THREE.MeshBasicMaterial({color: 0x0000ff});

let target = new THREE.Vector3();
const clock = new THREE.Clock();
let lj_target = new THREE.Vector3();
let uj_target = new THREE.Vector3();

initCannon();
initThree();
loadObjects();  // animation is started after both objects are loaded


// for both cannon.js and three.js: x=red, y=green, z=blue

function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,-0.001,0);
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

    // add spheres
    const lj_sphere_geo = new THREE.SphereGeometry(0.02,10,5);
    const uj_sphere_geo = new THREE.SphereGeometry(0.02,10,5);
    const sphereMaterial = new THREE.MeshStandardMaterial( {
        color: 0x0000ff,
        roughness: 1.0,
        metalness: 0.5
    } );
    lj_sphere = new THREE.Mesh( lj_sphere_geo, sphereMaterial);
    uj_sphere = new THREE.Mesh( uj_sphere_geo, sphereMaterial);
    scene.add(lj_sphere);
    scene.add(uj_sphere);


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
    
    // controllers

    controller1 = renderer.xr.getController( 0 );
    scene.add( controller1 );

    controller2 = renderer.xr.getController( 1 );
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

    raycaster = new THREE.Raycaster();


    // resize

    window.addEventListener( 'resize', onWindowResize );

}


function loadObjects() {
    // load lower jaw
    const loader = new OBJLoader();
    loader.load(
        // '../../assets/random_objects/cube.obj',
        //'../../assets/lower_ios_6.obj',
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
            scene.add(lj_mesh);
            
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
        // '../../assets/random_objects/gourd.obj',
        //'../../assets/upper_ios_6.obj',
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
            scene.add(uj_mesh);
            
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



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}



function printTree(object, depth=0) {

    console.log("  ".repeat(depth) + depth + ":" + object);
    for (const o of object.children) {
        printTree(o, depth+1);
    }
}

/**
 * Traverse the object hierarchy and return the first mesh found
 * @param {*} object 
 * @returns 
 */
function getFirstMesh(object) {
    if (object.isMesh) {
        return object;
    } else {
        let mesh;
        for (const o of object.children) {
            mesh = getFirstMesh(o);
            if (mesh !== null) {
                return mesh;
            }
        }
        return null;
    }
}


/**
 * Traverse the object hierarchy and return the first buffergeometry found
 * @param {*} object 
 * @returns 
 */
function getFirstBufferGeometry(object) {
    if (object.geometry !== undefined && object.geometry.isBufferGeometry) {
        return object.geometry;
    } else {
        let geo;
        for (const o of object.children) {
            geo = getFirstBufferGeometry(o);
            if (geo != null) {
                return geo;
            }
        }
        return null;
    }
}


function threeMeshToCannonMesh(mesh) {
    let vertices = mesh.geometry.attributes.position.array;

    const indices = [];
    for (let i = 0; i < vertices.length / 3; i += 3) {
        indices.push([i, i + 1, i + 2]);
    }
    return new CANNON.Trimesh(vertices, indices);
}

function threeMeshToConvexCannonMesh(mesh) {
    let points = ToVertices(mesh.geometry);
    const faces = QuickHull.createHull(points);
    return new CANNON.ConvexPolyhedron({vertices:points, faces});
}

// this could be handy but not yet used:
// https://gist.github.com/duhaime/6a74b9603dc7700183d43a2485b02f0f
function convexCannonMeshToThreeMesh(shape) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const vertices = new Float32Array(3*shape.faces.length);

    // load vertices: every vertex must occur once per face
    for (let f=0; f < shape.faces.length; f++) {
        var face = shape.faces[f];
        vertices[3*f+0] = face[0];
        vertices[3*f+1] = face[1];
        vertices[3*f+2] = face[2];
    }
    geometry.setAttribute( 'position', new THREE.BufferAttribute(vertices, 3));

    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function ToVertices(geometry) {
    const positions = geometry.attributes.position;
    const vertices = [];
    for (let index = 0; index < positions.count; index++) {
        vertices.push(
            new CANNON.Vec3(
                positions.getX(index),
                positions.getY(index),
                positions.getZ(index)
            )
        );
    }
    return vertices;
}



// main loops

function updatePhysics() {

    // Step the physics world
    world.step(timeStep);

    // Copy coordinates from Cannon.js to Three.js
    lj_mesh.position.copy(lj_body.position);
    lj_mesh.quaternion.copy(lj_body.quaternion);
    lj_sphere.position.copy(lj_body.position);
    uj_mesh.position.copy(uj_body.position);
    uj_mesh.quaternion.copy(uj_body.quaternion);
    uj_sphere.position.copy(uj_body.position);
}

function animate() {
    checkTime();

    // console.log("frame", frameNum);
    frameNum += 1;
    updatePhysics();
    render();
}

function render() {
    renderer.render( scene, camera );
}

function startAnimation() {
    if (lj_loaded && uj_loaded) {
        console.log("starting animation");
        renderer.setAnimationLoop( animate );
    }
}

function sendPosition(){
    const coordinate_info = lj_mesh.position;
    const rotation_info = lj_mesh.rotation;

    const {x, y, z} = coordinate_info;
    const {r_x, r_y, r_z} = rotation_info;
    /*
    // Split into coordinates
    const x = coordinate_info.x;
    const y = coordinate_info.y;
    const z = coordinate_info.z;
    const r_x = rotation_info.x;
    const r_y = rotation_info.y;
    const r_z = rotation_info.z;
    */
    const scanID = 111; // Hardcoded
    // Call service based on scan ID
    
    const {data} = useQuery(sendPositionScan.useQuery({ scanID, x, y, z, r_x, r_y, r_z }));
    
    if (!data.saved){ // Check if saved is OK else try again
        // Maybe wait a bit?
        sendPosition() // Repeat
    }
}

function getPosition(){
    target = lj_mesh.position;
    // Call service based on scan ID
    const scanID = 111; // Hardcoded
    const {data} = useQuery(getPositionScan.useQuery({ scanID }));
    
    const {x, y, z, r_x, r_y, r_z} = data;
    return x, y, z, r_x, r_y, r_z
}

function checkTime() {
    const elapsedTime = clock.getElapsedTime();
    
    if (elapsedTime >= 15) {
      // interrupt after 15 seconds
      console.log("15 seconds have elapsed");

      throw new Error("15 seconds have elapsed");
      
      // reset the clock
      clock.start();
    }
}
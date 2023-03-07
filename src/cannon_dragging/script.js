import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as CANNON from 'cannon-es';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import { default as CannonUtils } from 'cannon-utils';

let container;
let camera, scene, renderer;
let controller1, controller2;
let controllerGrip1, controllerGrip2;

const intersected = [];     // global list that holds the first objects the controllers are pointing at
const tempMatrix = new THREE.Matrix4();

let controls, group;

let raycaster;

let world, timeStep=1/60;

// lj_shape is een CANNON.Trimesh
let lj_group, lj_mesh, lj_shape, lj_body;
let uj_group, uj_mesh, uj_shape, uj_body;

let lj_loaded = false, uj_loaded = false;


initCannon();
initThree();


function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,0,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    lj_body = new CANNON.Body({mass: 1});
    uj_body = new CANNON.Body({mass: 1});
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


    // load lower jaw
    const loader = new OBJLoader();
    loader.load(
        '../../assets/lowerjaw_holger.obj',
        // called when resource is loaded y=green, x=red, z=blue
        function (object) {         // lj_group is a 'Group', which is a subclass of 'Object3D'
            lj_group = object;
            lj_group.position.x = 0
            lj_group.position.y = 2
            lj_group.position.z = 0.12
            lj_group.rotation.x = 1.5 * Math.PI
            //lj_group.rotation.y = Math.PI
            lj_group.scale.setScalar(0.01);
            group.add(lj_group);
            
            lj_mesh = getFirstMesh(lj_group);
            //console.log(lj_mesh);
            lj_shape = threeMeshToCannonMesh(lj_mesh);
            console.log("loading lj_group succeeded");
            lj_body.addShape(lj_shape);
            lj_loaded = true;
            startAnimation();
        },
        
        // called when loading in progress
        function (xhr) {
            //console.log( "lj_group " + (xhr.loaded / xhr.total * 100 ) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading lj_group: ' + error);
        }
    );
 
    // load upper jaw
    loader.load(
        '../../assets/upperjaw_holger.obj',
        // called when resource is loaded y=green, x=red, z=blue
        function (object) {
            uj_group = object;
            uj_group.position.x = 0
            uj_group.position.y = 2
            uj_group.position.z = 0.12
            uj_group.rotation.x = 1.5 * Math.PI
            //uj_group.rotation.y = Math.PI
            uj_group.scale.setScalar(0.01);
            group.add(uj_group);
            
            uj_mesh = getFirstMesh(uj_group);
            //console.log(uj_mesh);
            uj_shape = threeMeshToCannonMesh(uj_mesh);
            console.log("loading uj_group succeeded")
            uj_body.addShape(uj_shape);
            uj_loaded = true;
            startAnimation();
        },
        
        // called when loading in progress
        function (xhr) {
            //console.log( "uj_group " + (xhr.loaded / xhr.total * 100 ) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading uj_group: ' + error);
        }
    );
 

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

    // BVH stuff

    // raycaster.firstHitOnly = true;
    // THREE.Mesh.prototype.raycast = acceleratedRaycast;


    // resize

    window.addEventListener( 'resize', onWindowResize );

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


// find objects the controller is pointing at

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

        line.scale.z = intersection.distance;

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


function printTree(object, depth=0) {

    console.log("  ".repeat(depth) + depth + ":" + object);
    for (const o of object.children) {
        printTree(o, depth+1);
    }
}


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


function threeMeshToCannonMesh(mesh) {
    let vertices = mesh.geometry.attributes.position.array;

    const indices = [];     // TODO: check if this is correct
    for (let i = 0; i < vertices.length / 3; i += 3) {
        indices.push([i, i + 1, i + 2]);
    }
    return new CANNON.Trimesh(vertices, indices);
}



// main loops

function updatePhysics() {

    // Step the physics world
    world.step(timeStep);

    console.log("Cannon: ", lj_body.position);
    console.log("Three: ", lj_mesh.position);

    // Copy coordinates from Cannon.js to Three.js
    lj_mesh.position.copy(lj_body.position);
    lj_mesh.quaternion.copy(lj_body.quaternion);
    uj_mesh.position.copy(uj_body.position);
    uj_mesh.quaternion.copy(uj_body.quaternion);
}


function animate() {

    updatePhysics();
    render();

}

function render() {

    cleanIntersected();

    intersectObjects( controller1 );
    intersectObjects( controller2 );

    renderer.render( scene, camera );
}


function startAnimation() {
    if (lj_loaded && uj_loaded) {
        console.log("starting animation");
        renderer.setAnimationLoop( animate );
    }
}
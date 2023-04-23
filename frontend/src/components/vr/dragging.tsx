import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useState, useEffect } from 'react';
import { SendMenuOptionRequest, Scan } from "@/gen/proto/threedoclusion/v1/service_pb";
import Menu from './menu';


let container: HTMLDivElement;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let controller1: THREE.XRTargetRaySpace, controller2: THREE.XRTargetRaySpace;
let controllerGrip1, controllerGrip2;

let raycaster: THREE.Raycaster;

const intersected: any = [];     // global list that holds the first objects the controllers are pointing at
const tempMatrix = new THREE.Matrix4();

let controls, group: THREE.Group;
let second_call = false;

const path_upper_jaw = '/upper_ios_6.obj'; // URLs for fetch, temporarily in public folder so Nextjs can access
const path_lower_jaw = '/lower_ios_6.obj'; // TO DO: get with cloud

const SCALE_MODEL = 0.01;

function init(initialScan: Scan) {
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
    var lowerjaw: THREE.Group;
    loader.load(
        path_lower_jaw,
        // called when resource is loaded y=green, x=red, z=blue
        function (object) {
            lowerjaw = object;
            /*lowerjaw.position.x = 0
            lowerjaw.position.y = 2
            lowerjaw.position.z = 0.12
            lowerjaw.rotation.x = 1.5 * Math.PI*/
            lowerjaw.position.set(initialScan.lowerX, initialScan.lowerY, initialScan.lowerZ);
            lowerjaw.rotation.set(initialScan.lowerRX, initialScan.lowerRY, initialScan.lowerRZ);
            //lowerjaw.rotation.y = Math.PI
            lowerjaw.scale.setScalar(SCALE_MODEL);
            lowerjaw.name = "lowerjaw";
            group.add(lowerjaw);

            console.log("Object3D? " + lowerjaw.isObject3D);
            console.log("Mesh?")
        },
        
        // called when loading in progress
        function (xhr) {
            console.log( (xhr.loaded / xhr.total * 100 ) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading');
        }
    );

    // load upper jaw
    //const loader2 = new OBJLoader();
    var upperjaw: THREE.Group;
    loader.load(
        path_upper_jaw,
        // called when resource is loaded y=green, x=red, z=blue
        function (object) {
            upperjaw = object;
            /*upperjaw.position.x = 0
            upperjaw.position.y = 2
            upperjaw.position.z = 0.12
            upperjaw.rotation.x = 1.5 * Math.PI*/
            upperjaw.position.set(initialScan.upperX, initialScan.upperY, initialScan.upperZ);
            upperjaw.rotation.set(initialScan.upperRX, initialScan.upperRY, initialScan.upperRZ);
            //upperjaw.rotation.y = Math.PI
            upperjaw.scale.setScalar(SCALE_MODEL);
            upperjaw.name = "upperjaw";


            group.add(upperjaw);
            console.log("Object3D? " + upperjaw.isObject3D);
            console.log("Mesh?")
        },
        
        // called when loading in progress
        function (xhr) {
            console.log( (xhr.loaded / xhr.total * 100 ) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading');
        }
    );
} // Insert get_position function to retrieve pos from server

function initThree(setOpenMenu: any, setCurrentScan: any){


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

    controller1.addEventListener( 'squeezestart', function foo() { // End and restart WEBXR session when triggering menu?
        const session = renderer.xr.getSession();
        session?.end().then(setOpenMenu(true));
        updateScanData(setCurrentScan);
    }); // Added to test menu
    
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
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function vibrateTrigger() { // Vibrate TRIGGER button
    const session = renderer.xr.getSession();
    for (const source of session!.inputSources) {
        if (source.gamepad) (source.gamepad.hapticActuators[0] as any).pulse(0.8, 100); // Customise intensity and duration based on distance models? Need collision info
    } // Distance of nearest points < a -> 0 no vibration, else inversely scale with distance -> intensity: 1-a*x and if less than zero no vibration

}

function loadPosition(positionData: any) {
    for (let i = 0; i < group.children.length; i++) {
        if (group.children[i].name == "lowerjaw"){
            group.children[i].position.set(positionData.lowerX, positionData.lowerY, positionData.lowerZ)
            group.children[i].rotation.set(positionData.lowerRX, positionData.lowerRY, positionData.lowerRZ)
        }
        else if (group.children[i].name == "upperjaw"){
            group.children[i].position.set(positionData.upperX, positionData.upperY, positionData.upperZ)
            group.children[i].rotation.set(positionData.upperRX, positionData.upperRY, positionData.upperRZ)
        }
    }
}

// when controller pushes select button, select the object it is pointing to
function onSelectStart( event: any ) {

    const controller = event.target;

    const intersections = getIntersections( controller );

    if ( intersections.length > 0 ) {

        const intersection = intersections[ 0 ];

        const object: any = intersection.object;
        object.material.emissive.b = 1;

        //controller.attach(object);

        controller.userData.selected = object;
    }

}

function beforeRender( controller: any ){
    changeControlledCoordinates(controller, 1);
}

function changeControlledCoordinates( controller: any, coordinate: number ){ // 0, 1, 2: x, y, z
    if (controller.userData.selected === undefined) return;

    switch (coordinate) {
        case 0: {
            controller.userData.selected.position.setX(controller.position.x / SCALE_MODEL);
            break;
        }
        case 1: {
            controller.userData.selected.position.setY(controller.position.y / SCALE_MODEL);
            break;
        }
        case 2: {
            controller.userData.selected.position.setZ(controller.position.z / SCALE_MODEL);
            break;
        }
        
    }
}

// when controller releases select button
function onSelectEnd( event: any ) {

    const controller = event.target;

    if ( controller.userData.selected !== undefined ) {

        const object = controller.userData.selected;
        object.material.emissive.b = 0;
        group.attach( object );

        controller.userData.selected = undefined;

    }


}

// find objects the controller is pointing at
function getIntersections( controller: any ) {

    tempMatrix.identity().extractRotation( controller.matrixWorld );

    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

    return raycaster.intersectObjects( group.children, true );

}

// highlight the object the controller points at
function intersectObjects( controller: any ) {

    // Do not highlight when already selected

    if ( controller.userData.selected !== undefined ) return;

    const line = controller.getObjectByName( 'line' );
    const intersections = getIntersections( controller );

    if ( intersections.length > 0 ) {

        const intersection = intersections[ 0 ];

        const object: any = intersection.object;
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

function animate() {

    renderer.setAnimationLoop( render );
}

function render() {

    cleanIntersected();

    intersectObjects( controller1 );
    intersectObjects( controller2 );

    beforeRender(controller1);
    beforeRender(controller2);

    renderer.render( scene, camera );
}

function updateScanData(setCurrentScan: any) {
    let newScan = new Scan({id: 111, timestamp: "2006-01-02T15:04:05"});
    for (let i = 0; i < group.children.length; i++) {
        if (group.children[i].name == "lowerjaw"){
            newScan.lowerX = group.children[i].position.x;
            newScan.lowerY = group.children[i].position.y;
            newScan.lowerZ = group.children[i].position.z;
            newScan.lowerRX = group.children[i].rotation.x;
            newScan.lowerRY = group.children[i].rotation.y;
            newScan.lowerRZ = group.children[i].rotation.z;
        }
        else if (group.children[i].name == "upperjaw"){
            newScan.upperX = group.children[i].position.x;
            newScan.upperY = group.children[i].position.y;
            newScan.upperZ = group.children[i].position.z;
            newScan.upperRX = group.children[i].rotation.x;
            newScan.upperRY = group.children[i].rotation.y;
            newScan.upperRZ = group.children[i].rotation.z;
        }
    }
    setCurrentScan(newScan);
}

export default function DraggingView({ stream, client, onQuit }: {stream: any, client: any, onQuit: () => void}){
    const initialScan = new Scan({
        lowerX: 0,
        lowerY: 2,
        lowerZ: 0.12,
        lowerRX: 1.5 * Math.PI,
        lowerRY: 0,
        lowerRZ: 0,
        upperX: 0,
        upperY: 2,
        upperZ: 0.12,
        upperRX: 1.5 * Math.PI,
        upperRY: 0,
        upperRZ: 0,
        id: 111,
        timestamp: "2006-01-02T15:04:05"
    });
    const [current_scan, setCurrentScan] = useState<Scan>(initialScan);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => { // https://github.com/facebook/react/issues/24502
        if (second_call){
            init(initialScan);
            initThree(setOpenMenu, setCurrentScan);
            animate(); // Sets 
            console.log('Init executed!');
        }
        else {
            second_call = true;
        }
    }, []);

    // ASK FOR SCAN DATA OR STH INITIALLY

    const onLoadItemClicked = (inputData: Scan) => {
        console.log(inputData)
        const {id, timestamp, ...positionData } = inputData
        loadPosition(positionData);
    }
    const props = {isOpen: openMenu, setIsOpen: setOpenMenu, current_scan, stream, client, onLoadItemClicked, onQuit };

    // resize

    window.addEventListener( 'resize', onWindowResize );
    const zoomInButton = document.getElementById("zoom-in");
    const zoomOutButton = document.getElementById("zoom-out");

    const zoomInFunction = (e: any) => {
    const fov = getFov();
    camera.fov = clickZoom(fov, "zoomIn");
    camera.updateProjectionMatrix();
    };

    //zoomInButton.addEventListener("click", zoomInFunction);

    const zoomOutFunction = (e: any) => {
    const fov = getFov();
    camera.fov = clickZoom(fov, "zoomOut");
    camera.updateProjectionMatrix();
    };

    //zoomOutButton.addEventListener("click", zoomOutFunction);

    const clickZoom = (value: any, zoomType: any) => {
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

    return (
        <div>
          <Menu {...props}/>
        </div>
      );
}
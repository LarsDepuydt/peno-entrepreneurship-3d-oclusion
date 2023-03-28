import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useState, useEffect } from 'react';

let container: HTMLDivElement;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let controls, group: THREE.Group;
let second_call = false;

const path_upper_jaw = '/upper_ios_6.obj'; // URLs for fetch, temporarily in public folder so Nextjs can access
const path_lower_jaw = '/lower_ios_6.obj';

const SCALE_MODEL = 0.01;

// Animate
const initialPosition = new THREE.Vector3(0, 2, 0.12); const initialRotation = new THREE.Euler(1.5 * Math.PI, 0, 0, "XYZ");
const initialPositionLower = initialPosition; const initialPositionUpper = initialPosition;
const initialRotationLower = initialRotation; const initialRotationUpper = initialRotation;

const finalPositionLower = new THREE.Vector3(0, 2, 0.12);; const finalPositionUpper = new THREE.Vector3(1, 3, 1.12);
const finalRotationLower = new THREE.Euler(2 * Math.PI, 0, 0, "XYZ"); const finalRotationUpper = new THREE.Euler(2 * Math.PI, 0.5 * Math.PI, 0, "XYZ"); 

const clock = new THREE.Clock();
let upperMove = new THREE.Object3D();
let inLastPosition = false;
let inInitialPosition = true;
let captureRunning = false;
let animationSaved = false;

// Create a MediaRecorder instance
const chunks: any = [];
let stream: any;
let recorder: any;


function init() {
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
            lowerjaw.position.copy(initialPositionLower);
            lowerjaw.rotation.copy(initialRotationLower);
            //lowerjaw.rotation.y = Math.PI
            lowerjaw.scale.setScalar(SCALE_MODEL);

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
            upperjaw.position.copy(initialPositionUpper);
            upperjaw.rotation.copy(initialRotationUpper);
            //upperjaw.rotation.y = Math.PI
            upperjaw.scale.setScalar(SCALE_MODEL);
            upperjaw.name = "upperjaw";


            //group.add(upperjaw);
            console.log("Object3D? " + upperjaw.isObject3D);
            console.log("Mesh?")
            upperMove = upperjaw; // Added for animation global
            group.add(upperMove);
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
}

function initThree(){

    // add renderer and enable VR
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild( renderer.domElement );

    document.body.appendChild( VRButton.createButton( renderer ) );

    // Mediarecorder
    stream = renderer.domElement.captureStream();
    recorder = new MediaRecorder(stream, {mimeType: 'video/webm; codecs=vp9'});
    // Register an event listener for the dataavailable event
    recorder.addEventListener('dataavailable', (event: any) => {
        chunks.push(event.data);
    });
}



function checkAnimation(duration: number, rest_time: number) {
    let elapsedTime = clock.getElapsedTime();
    
    if (inLastPosition){ // Rest at the end 
        if (elapsedTime >= rest_time){
            inLastPosition = false;
            inInitialPosition = true;
            clock.start();
        }
    }
    if (inInitialPosition){ // Rest at the start point
        if (elapsedTime >= rest_time){
            inInitialPosition = false;
            clock.start();
        }
    }

    if (elapsedTime >= duration) {
        inLastPosition = true;

        if (!animationSaved){
            recorder.stop(); // Stop running
            const blob = new Blob(chunks, {type: 'video/webm'});
            const url = URL.createObjectURL(blob);
            const video = document.createElement('video');
            video.src = url;
            //document.body.appendChild(video);
            console.log(url);

            animationSaved = true;
            captureRunning = false;
        }
        clock.start(); // Reset clock
    }
    if (clock.running && !inLastPosition && !inInitialPosition){
        if (!captureRunning && !animationSaved) { recorder.start(); captureRunning = true;}
        
        moveWithFactor(duration, elapsedTime, upperMove);
    }
    // Problem A: last step doesn't get executed -> solution: elapsedTime = duration -> problem: can't stop?
    // Solution: stop when clock has stopped running -> problem: last step doesn't get executed
}

// Accept 4 models: initialLower, initialUpper, lastLower, lastUpper
function moveWithFactor(duration: number, time_passed: number, jawToMove: any){ // Maybe after user has exited VR session -> new scene to render the animation in the webpage along with an alert to save or sth
    // Call when session has ended and user has saved manually
    // Not animating the actual movements the user has performed but linearly interpolating between the two states

    // previousSave -> upper and lower
    // Two options for previousSave; initial state -> get from server; or the one at the beginning of the session -> maybe just retrieve locally

    // currentSave -> upper and lower

    // Set lower jaw as reference, or any jaw that has zero/minimal rotation change -> more user friendly?
    // OR Reference based on tag? Underbite might want lower jaw as reference / Overbite...
    // Can also let them both move and put the reference frame in between them?
    // Let camera focus on point in between?
    
    // Let's say lower is the reference; set currentsave pos of lower to initial one and then only upper needs to move relatively, with 
    const diff_pos_lower = finalPositionLower.clone().sub(initialPositionLower);
    const diff_pos_upper = finalPositionUpper.clone().sub(initialPositionUpper);

    const diff_pos_between = diff_pos_upper.clone().sub(diff_pos_lower);
    
    const initialQuaternionLower = new THREE.Quaternion().setFromEuler(initialRotationLower);
    const finalQuaternionLower = new THREE.Quaternion().setFromEuler(finalRotationLower);
    const initialQuaternionUpper = new THREE.Quaternion().setFromEuler(initialRotationUpper);
    const finalQuaternionUpper = new THREE.Quaternion().setFromEuler(finalRotationUpper);

    // Get the rotation difference between initialRotationLower and finalRotationLower
    const deltaQuaternionLower = finalQuaternionLower.clone().multiply(initialQuaternionLower.clone().invert()); // Invert or not??
    const deltaQuaternionUpper = finalQuaternionUpper.clone().multiply(initialQuaternionUpper.clone().invert());

    const targetQuaternion = initialQuaternionUpper.clone().multiply(deltaQuaternionLower).multiply(deltaQuaternionUpper);

    const factor = time_passed / duration // Let checktime handle so it's <= 1


    jawToMove.position.copy(initialPositionLower.clone().add( diff_pos_between.clone().multiplyScalar(factor) ));
    jawToMove.quaternion.copy(jawToMove.quaternion.slerpQuaternions ( initialQuaternionUpper, targetQuaternion, factor ));    
}

function animate() {
    renderer.setAnimationLoop( render );
}

function render() {
    checkAnimation(5, 2); // 5 seconds duration
    //console.log("X, Y, Z of Upper:", upperMove.position.x, upperMove.position.y, upperMove.position.z );
    if (captureRunning) recorder.requestData();
    renderer.render( scene, camera );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

export default function BeforeAfter(){
    useEffect(() => { // https://github.com/facebook/react/issues/24502
        if (second_call){
            init();
            initThree();
            animate(); // Sets 
            console.log('Init executed!');
        }
        else {
            second_call = true;
        }
    }, []);

    // resize

    window.addEventListener( 'resize', onWindowResize );
    
    return null;
}
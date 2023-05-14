import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useRef, useEffect, useState } from 'react';

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

let controls, group: THREE.Group;

const path_upper_jaw = '/upper_ios_6.obj'; // URLs for fetch, temporarily in public folder so Nextjs can access
const path_lower_jaw = '/lower_ios_6.obj';

const SCALE_MODEL = 0.01;

// Animate
const initialPosition = new THREE.Vector3(0, 2, 0.12); const initialRotation = new THREE.Euler(1.5 * Math.PI, 0, 0, "XYZ");
const initialPositionLower = initialPosition; const initialPositionUpper = initialPosition;
const initialRotationLower = initialRotation; const initialRotationUpper = initialRotation;

const finalPositionLower = new THREE.Vector3(0, 2, 0.12); const finalPositionUpper = new THREE.Vector3(1, 3, 1.12);
const finalRotationLower = new THREE.Euler(2 * Math.PI, 0, 0, "XYZ"); const finalRotationUpper = new THREE.Euler(2 * Math.PI, 0.5 * Math.PI, 0, "XYZ"); 
// Get from request

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
    const container = document.createElement( 'div' );
    document.querySelector('#canvas').appendChild( container );

    // create scene and camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x808080 );
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 1.6, 5 );
    // Set camera based on initial and final position?

    // add controls
    controls = new OrbitControls( camera, container );
    controls.target.set( 0, 1.6, 0 );
    controls.update();
    // Can be useful for 'controlling' the camera w the mouse if not embedded in a div? See earlier commits

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

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onLoad = function () { // Messy, clean up and adjustable reference jaw; for animating as well
        // Callback function to be executed when all resources have finished loading
        
        // Create bounding boxes for upper and lower halves
        
        // Calculate the combined bounding box that contains both objects
        const combinedBox = new THREE.Box3();

        //upperjaw.position.copy(finalPositionUpper.clone().add(finalPositionLower).clone().sub(initialPositionLower));
        const diff_pos_lower = finalPositionLower.clone().sub(initialPositionLower);
        const diff_pos_upper = finalPositionUpper.clone().sub(initialPositionUpper);
        const diff_pos_between = diff_pos_upper.clone().sub(diff_pos_lower);
        
        // Lower is reference
        upperjaw.position.copy(initialPositionLower.clone().add( diff_pos_between ));

        combinedBox.expandByObject(upperjaw);
        combinedBox.expandByObject(lowerjaw);
        

        upperjaw.position.copy(initialPositionUpper);
        lowerjaw.position.copy(initialPositionLower);
        combinedBox.expandByObject(upperjaw);
        combinedBox.expandByObject(lowerjaw);

        // Get the center of the bounding box
        fitCameraToObject(camera, combinedBox);
    };
    
    function fitCameraToObject(camera: THREE.PerspectiveCamera, boundingBox: THREE.Box3) {
        const referencePosition = initialPositionLower;
        const center = boundingBox.getCenter(new THREE.Vector3());
        const size = boundingBox.getSize(new THREE.Vector3());
        //const distance = Math.max(size.x, size.y, size.z) / Math.tan(camera.fov * Math.PI / 360);
        const padding = 1.2; // 20% padding
        const distance = Math.max(size.x, size.y, size.z) / Math.tan(camera.fov * Math.PI / 360) * padding;

        // Set the camera position and target
        const adjusted_center = new THREE.Vector3(referencePosition.x, center.y, center.z); // Front view
        camera.position.set(referencePosition.x, center.y, distance);
        //const adjusted_center = new THREE.Vector3(center.x, center.y, referencePosition.z); // For side view
        //camera.position.set(distance, center.y, center.z);

        camera.lookAt(adjusted_center); // Normally just center
        
    }
    

    // load lower jaw
    const loader = new OBJLoader(loadingManager);
    //var lowerjaw: THREE.Group;
    let lowerjaw : THREE.Group;
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
    //var upperjaw: THREE.Group;
    let upperjaw : THREE.Group;
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

function initThree(canvas: any){

    // add renderer and enable VR
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    //renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setSize( canvas.clientWidth, canvas.clientHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    canvas.appendChild( renderer.domElement );

    //document.body.appendChild( VRButton.createButton( renderer ) );

    // Mediarecorder
    stream = renderer.domElement.captureStream();
    recorder = new MediaRecorder(stream, {mimeType: 'video/webm; codecs=vp9'});
    // Register an event listener for the dataavailable event
    recorder.addEventListener('dataavailable', (event: any) => {
        chunks.push(event.data);
    });
}

function checkAnimation(duration: number, rest_time: number, setVideoChunks: any, onVideoChunksChange: any) {
    let elapsedTime = clock.getElapsedTime();
    
    if (inLastPosition){ // Rest at the end 
        if (elapsedTime >= rest_time){
            inLastPosition = false;
            inInitialPosition = true;
        }
    }
    
    if (inInitialPosition){ // Rest at the start point
        if (elapsedTime >= rest_time){
            inInitialPosition = false;
            clock.start();
            elapsedTime = 0; // Set elapsedTime to 0 when animation resets
        }
    }

    if (clock.running && !inLastPosition && !inInitialPosition){
        if (!captureRunning && !animationSaved) { 
            recorder.start(); 
            captureRunning = true;
        }
    
        if (elapsedTime >= duration) {
            inLastPosition = true;
    
            if (!animationSaved){
                recorder.stop(); // Stop running
                setVideoChunks(chunks);
                onVideoChunksChange(chunks); // call the onVideoChunksChange function with the chunks
                animationSaved = true;
                captureRunning = false;
            }
    
            elapsedTime = duration; // Set elapsedTime to duration when animation ends
            clock.start(); // Restart clock after animation ends so it loops
        }
        moveWithFactor(duration, elapsedTime, upperMove);
    }
}

// Accept 4 models: initialLower, initialUpper, lastLower, lastUpper
function moveWithFactor(duration: number, time_passed: number, jawToMove: any){
    // Not animating the actual movements the user has performed but linearly interpolating between the two states
    
    // Let's set lowerjaw as the reference; set currentsave pos of lower to initial one and then only upper needs to move relatively, with 
    const diff_pos_lower = finalPositionLower.clone().sub(initialPositionLower);
    const diff_pos_upper = finalPositionUpper.clone().sub(initialPositionUpper);

    const diff_pos_between = diff_pos_upper.clone().sub(diff_pos_lower);
    
    const initialQuaternionLower = new THREE.Quaternion().setFromEuler(initialRotationLower);
    const finalQuaternionLower = new THREE.Quaternion().setFromEuler(finalRotationLower);
    const initialQuaternionUpper = new THREE.Quaternion().setFromEuler(initialRotationUpper);
    const finalQuaternionUpper = new THREE.Quaternion().setFromEuler(finalRotationUpper);

    // Rotation difference between initialRotationLower and finalRotationLower
    const deltaQuaternionLower = finalQuaternionLower.clone().multiply(initialQuaternionLower.clone().invert());
    const deltaQuaternionUpper = finalQuaternionUpper.clone().multiply(initialQuaternionUpper.clone().invert());

    const targetQuaternion = initialQuaternionUpper.clone().multiply(deltaQuaternionLower).multiply(deltaQuaternionUpper);

    const factor = time_passed / duration // Let checkAnimation handle constraint factor <= 1

    jawToMove.position.copy(initialPositionLower.clone().add( diff_pos_between.clone().multiplyScalar(factor) ));
    jawToMove.quaternion.copy(jawToMove.quaternion.slerpQuaternions ( initialQuaternionUpper, targetQuaternion, factor ));    
}

function animate(setVideoChunks: any, onVideoChunksChange: any) {
    console.log("Animate!")
    renderer.setAnimationLoop( function(){
        render(setVideoChunks, onVideoChunksChange);
    });
}

function render(setVideoChunks: any, onVideoChunksChange: any) {
    checkAnimation(5, 2, setVideoChunks, onVideoChunksChange); // 5 seconds duration, 2 seconds rest
    if (captureRunning) recorder.requestData();
    renderer.render( scene, camera );
}

export default function BeforeAfter({ onVideoChunksChange }: {onVideoChunksChange: any}){
    const canvasRef = useRef(null);
    const [videoChunks, setVideoChunks] = useState([]);

    // Ask position data from database

    useEffect(() => { // https://github.com/facebook/react/issues/24502
        init();
        initThree(canvasRef.current);
        animate(setVideoChunks, onVideoChunksChange);

        return () => { // Clean up when unmounted
            if (renderer) {
                renderer.dispose();
                renderer.setAnimationLoop(null); // Cancels animation
            }
            if (scene){
                while (scene.children.length > 0) {
                    scene.remove(scene.children[0]);
                }
            }
        };
    }, [onVideoChunksChange]);

    
    return <div ref={canvasRef} id="canvas">
        <style jsx>{`
        #canvas {
            width: 100%;
            height: 100%;
        }
        `}</style>
    </div>;
    //return null;
}
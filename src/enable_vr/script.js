
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { VRButton } from 'three/addons/webxr/VRButton.js';

// define scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// define and add renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// add VR controls
document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;


// load object
const loader = new OBJLoader();
var lowerjaw;
loader.load(
    './assets/lowerjaw.obj',
    // called when resource is loaded
    function (object) {
        lowerjaw = object;
        lowerjaw.rotation.x += 0.2
        scene.add(lowerjaw);
        
        // render loop only started after everything is loaded
        renderer.setAnimationLoop( function() {
            lowerjaw.rotation.y += 0.006;
            renderer.render(scene, camera);
        });
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

// add light sources
const ambientLight = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
scene.add(ambientLight);
scene.add(directionalLight);

camera.position.z = 3;

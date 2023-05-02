
import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

console.log('script.js loaded'); // debugging purposes

// define scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// define and add renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// load object
const loader = new OBJLoader();
var lowerjaw;
loader.load(
    '../../assets/lowerjaw_holger.obj',
    // called when resource is loaded
    function (object) {
        lowerjaw = object;
        scene.add(lowerjaw);
        animate();
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

camera.position.z = 100;

// render loop
function animate() {
    requestAnimationFrame( animate );   // tells the browser that we want to run animate again when the screen is refreshed
    lowerjaw.rotation.y += 0.01;
    renderer.render( scene, camera );
}



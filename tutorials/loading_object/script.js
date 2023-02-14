
import * as THREE from 'three';
import { OBJLoader } from '/node_modules/three/addons/loaders/OBJLoader.js'

// define scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// define and add renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// load object
const loader = new OBJLoader();
loader.load(
    '../../../assets/lowerjaw.obj',
    // called when resource is loaded
    function (object) {
        scene.add(object);
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

// // add cube
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


camera.position.z = 5;

// render loop
function animate() {
    requestAnimationFrame( animate );   // tells the browser that we want to run animate again when the screen is refreshed
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}
animate();
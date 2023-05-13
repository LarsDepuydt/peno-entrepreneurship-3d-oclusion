/*
This worker will implement the function testSepAxis in a separate thread in order to improve performance

Main->worker format:
[collID, posA: Vec3, quatA: Quaternion, posB: Vec3, quatB: Quaternion, axis: Vec3]

Worker->main format:
- [collID, depth, axis: Vec3] (wanneer overlap)
of
- [collID, false] (wanneer geen overlap)
*/


/*
IMPORTANT NOTES (learnt by pure suffering)
- Firefox does not support module web workers (so no import statements allowed)
- Chrome does not support import maps in web workers
- thanks to webpack import maps are possible!
*/
import * as CANNON from 'cannon-es'
import { QuickHull } from './QuickHull.js';
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";




const LOWER_PATH = '../../../assets/simplified/lower_180.obj';
const UPPER_PATH = '../../../assets/simplified/upper_209.obj';


// loadedA, loadedB are promises that can be resolved with functions resolveLoadedA, resolveLoadedB
let shapeA, shapeB;
let resolveLoadedA, resolveLoadedB;
const loadedA = new Promise((resolve, reject) => {
    resolveLoadedA = resolve;
});
const loadedB = new Promise((resolve, reject) => {
    resolveLoadedB = resolve;
});


console.log("starting worker");
loadObjects();



self.addEventListener("message", handleMessage);


async function handleMessage(event) {
    await loadedA;
    await loadedB;

    const collID = event.data[0];
    const posA = dictToVec(event.data[1]);
    const quatA = dictToQuat(event.data[2]);
    const posB = dictToVec(event.data[3]);
    const quatB = dictToQuat(event.data[4]);
    const axis = dictToVec(event.data[5]);

    // project each shape onto axis
    const maxminA = [];     // array of length 2 that will contain (maxA, minA)
    const maxminB = [];
    CANNON.ConvexPolyhedron.project(shapeA, axis, posA, quatA, maxminA);
    CANNON.ConvexPolyhedron.project(shapeB, axis, posB, quatB, maxminB);
    const maxA = maxminA[0];
    const minA = maxminA[1];
    const maxB = maxminB[0];
    const minB = maxminB[1];

    if (maxA < minB || maxB < minA) {
        // Separated
        postMessage([collID, false]);
    } else {
        // Overlap
        const d0 = maxA - minB
        const d1 = maxB - minA
        const depth = d0 < d1 ? d0 : d1
        postMessage([collID, depth, axis]);
    }  
}



function loadObjects() {
    const loader = new OBJLoader();

    // load lowerjaw shape
    loader.load(
        LOWER_PATH,
        
        // called when resource is loaded
        function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
            let lj_buffergeo = getFirstBufferGeometry(object);
            lj_buffergeo.scale(0.01, 0.01, 0.01);
            
            shapeA = threeGeometryToConvexCannonMesh(lj_buffergeo);
            resolveLoadedA();
            console.log("worker: loading lowerjaw shape succeeded");
        },
        
        // called when loading in progress
        function (xhr) {/*pass*/},

        // called when loading has errors
        function (error) {
            console.log('An error happened while loading lowerjaw shape: ' + error);
        }
    );

    // load upperjaw shape
    loader.load(
        UPPER_PATH,
        
        // called when resource is loaded
        function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
            let uj_buffergeo = getFirstBufferGeometry(object);
            uj_buffergeo.scale(0.01, 0.01, 0.01);
            
            shapeB = threeGeometryToConvexCannonMesh(uj_buffergeo);
            resolveLoadedB();
            console.log("worker: loading upperjaw shape succeeded");
        },
        
        // called when loading in progress
        function (xhr) {/*pass*/},

        // called when loading has errors
        function (error) {
            console.log('An error happened while loading upperjaw shape: ' + error);
        }
    );
}


function toCannonVertices(geometry) {
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

function threeGeometryToConvexCannonMesh(geometry) {
    let points = toCannonVertices(geometry);
    const faces = QuickHull.createHull(points);
    return new CANNON.ConvexPolyhedron({vertices:points, faces:faces});
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

function dictToVec(dict) {
    return new CANNON.Vec3(dict['x'], dict['y'], dict['z']);
}

function dictToQuat(dict) {
    return new CANNON.Quaternion(dict['x'], dict['y'], dict['z'], dict['w']);
}
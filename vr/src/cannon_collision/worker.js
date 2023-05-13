/*
This worker will implement the function testSepAxis in a separate thread in order to improve performance

Main->worker format:
[collID, posA: Vec3, quatA: Quaternion, posB: Vec3, quatB: Quaternion, vector: Vec3]

Worker->main format:
- [collID, number, vector: Vec3] (wanneer overlap)
of
- [collID, false] (wanneer geen overlap)
*/


/*
IMPORTANT NOTES (learnt by pure suffering)
- Firefox does not support module web workers (so no import statements allowed)
- Chrome does not support import maps in web workers
*/
import * as CANNON from 'cannon-es'
import { OBJLoader } from "../../node_modules/three/examples/jsm/loaders/OBJLoader.js";




const LOWER_PATH = '../../assets/simplified/lower_180.obj';
const UPPER_PATH = '../../assets/simplified/upper_209.obj';


let lj_shape, uj_shape;




console.log("starting worker");
self.addEventListener("message", handleMessage);



function handleMessage(event) {
    const collID = event.data[0];
    const posA = event.data[1];
    const quatA = event.data[2];
    const posB = event.data[3];
    const quatB = event.data[4];
    const vector = event.data[5];

    console.log("test test");
    postMessage([collID, false]);
}



function loadObjects(loaderClass) {
    const loader = new loaderClass();

    // load lowerjaw shape
    loader.load(
        LOWER_PATH,
        
        // called when resource is loaded
        function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
            let lj_buffergeo = getFirstBufferGeometry(object);
            lj_buffergeo.scale(0.01, 0.01, 0.01);
            
            lj_shape = threeGeometryToConvexCannonMesh(lj_buffergeo);
            console.log("worker: loading lj_shape succeeded");
        },
        
        // called when loading in progress
        function (xhr) {/*pass*/},

        // called when loading has errors
        function (error) {
            console.log('An error happened while loading lj_shape: ' + error);
        }
    );

    // load upperjaw shape
    loader.load(
        UPPER_PATH,
        
        // called when resource is loaded
        function (object) {         // object is a 'Group', which is a subclass of 'Object3D'
            let lj_buffergeo = getFirstBufferGeometry(object);
            lj_buffergeo.scale(0.01, 0.01, 0.01);
            
            lj_shape = threeGeometryToConvexCannonMesh(lj_buffergeo);
            console.log("worker: loading lj_shape succeeded");
        },
        
        // called when loading in progress
        function (xhr) {/*pass*/},

        // called when loading has errors
        function (error) {
            console.log('An error happened while loading lj_shape: ' + error);
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
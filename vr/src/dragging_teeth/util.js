import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { QuickHull } from './QuickHull.js';
//import { sendPositionScan, getPositionScan } from '../../../frontend/src/gen/proto/threedoclusion/v1/service-ScanService_connectquery'


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
    let points = toVertices(mesh.geometry);
    const faces = QuickHull.createHull(points);
    return new CANNON.ConvexPolyhedron({vertices:points, faces});
}


function toVertices(geometry) {
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


const clock = new THREE.Clock();
function checkTime(lj_mesh) {
    const elapsedTime = clock.getElapsedTime();
    
    if (elapsedTime >= 5) {
      sendPosition(lj_mesh); // Send position after 5 seconds)
      console.log("5 seconds have passed");
      
      // reset the clock
      clock.start();
    }
}

function sendPosition(lj_mesh){
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

function getPosition(lj_mesh){
    target = lj_mesh.position;
    // Call service based on scan ID
    const scanID = 111; // Hardcoded
    const {data} = useQuery(getPositionScan.useQuery({ scanID }));
    
    const {x, y, z, r_x, r_y, r_z} = data;
    return x, y, z, r_x, r_y, r_z
}


export { getFirstMesh, getFirstBufferGeometry, threeMeshToConvexCannonMesh, threeMeshToCannonMesh, checkTime };
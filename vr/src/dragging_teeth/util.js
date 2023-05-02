import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { QuickHull } from './QuickHull.js';
import { ConvexHull } from 'three/addons/math/ConvexHull.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js'
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


// function threeMeshToConvexThreeMesh(mesh) {
//     let convexhull = new ConvexHull().setFromObject(mesh);
//     convexhull.cleanup();
//     console.log(convexhull);
//     return convexhull;
// }


function threeMeshToConvexThreeMesh(mesh) {
    const points = toThreeVertices(mesh);
    const geometry = new ConvexGeometry(points);
    const teeth_material = new THREE.MeshStandardMaterial({color: 0x0000ff});
    return new THREE.Mesh( geometry, teeth_material );
}


function threeMeshToCannonMesh(mesh) {
    let vertices = mesh.geometry.attributes.position.array;

    const indices = [];
    for (let i = 0; i < vertices.length/3; i += 3) {   // vertices.length = 3*vertices.count
        indices.push(i);
        indices.push(i+1);
        indices.push(i+2);
    }
    return new CANNON.Trimesh(vertices, indices);
}


function threeMeshToConvexCannonMesh(mesh) {
    let points = toCannonVertices(mesh.geometry);
    const faces = QuickHull.createHull(points);
    return new CANNON.ConvexPolyhedron({vertices:points, faces:faces});
}


function cannonMeshToCannonConvexPolyhedron(mesh) {
    // transform vertices
    const vertices = [];
    for (let index = 0; index < mesh.vertices.length; index+=3) {   // vertices.length = 3*vertices.count
        vertices.push(
            new CANNON.Vec3(
                mesh.vertices[index],
                mesh.vertices[index+1],
                mesh.vertices[index+2]
            )
        );
    }

    // copy faces
    const faces = [];
    for (let index=0; index < mesh.indices.length; index+=3) {
        faces.push([
            mesh.indices[index],
            mesh.indices[index+1],
            mesh.indices[index+2]
        ]);
    }

    const normals = computeFaceNormals(vertices, faces);
    orderFaceVerticesAroundFaceNormals(vertices, faces, normals);

    const convexpolyhedron = new CANNON.ConvexPolyhedron({vertices:vertices, faces:faces, normals:normals});
    // convexpolyhedron.computeNormals();
    return convexpolyhedron;
}


function toThreeVertices(mesh) {
    const positions = mesh.geometry.attributes.position;
    const vertices = [];
    for (let index=0; index < positions.count; index++) {
        const point = new THREE.Vector3();
        point.fromBufferAttribute( positions, index );     // no .applyMatrix4( mesh.matrixWorld ) because this is executed before any global transform takes place 
        vertices.push(point);
    }
    return vertices;
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


const tmp_vec_1 = new CANNON.Vec3();
const tmp_vec_2 = new CANNON.Vec3();
/**
 * 
 * @param {*} vertices Vec3[]
 * @param {*} faces number[][]
 * @returns 
 */
// https://github.com/tomo0613/offroadJS_v2/blob/355b6aabf0446deefffba6d60e24a257836916ea/src/mapModules/baseMapElementComponents.ts#L148
function computeFaceNormals(vertices, faces) {
    let centroid = calculateCentroid(vertices);

    return faces.map((faceVertexIndices) => {
        const A = vertices[faceVertexIndices[0]];
        const A_to_B = tmp_vec_1.copy(vertices[faceVertexIndices[1]]);
        const A_to_C = tmp_vec_2.copy(vertices[faceVertexIndices[2]]);
        A_to_B.vsub(A, A_to_B);
        A_to_C.vsub(A, A_to_C);

        const faceNormal = new CANNON.Vec3().copy(A_to_B);
        faceNormal.cross(A_to_C, faceNormal).normalize();

        const centroid_to_A = tmp_vec_1.copy(A);
        A.vsub(centroid, centroid_to_A);

        if (faceNormal.dot(centroid_to_A) < 0) {
            faceNormal.negate();
        }

        return faceNormal;
    });
}


/**
 * 
 * @param {*} vertices Vec3[]
 */
// https://github.com/tomo0613/offroadJS_v2/blob/355b6aabf0446deefffba6d60e24a257836916ea/src/mapModules/baseMapElementComponents.ts#L172
function calculateCentroid(vertices) {
    const { length: vertexCount } = vertices;

    let centroid = new CANNON.Vec3();
    centroid.set(0, 0, 0);

    for (let i = 0; i < vertexCount; i++) {
        centroid.vadd(vertices[i], centroid);
    }

    centroid.scale(1 / vertexCount, centroid);
    return centroid;
}


const tmp_vec_0 = new THREE.Vector3();
const tmp_quat = new THREE.Quaternion();
const zAxis = new THREE.Vector3(0, 0, 1);
const vertexProjectionAngles = [];  //number[]
/**
 * 
 * @param {*} vertices Vec3[]
 * @param {*} faces number[][]
 * @param {*} normals Vec3[]
 */
// https://github.com/tomo0613/offroadJS_v2/blob/355b6aabf0446deefffba6d60e24a257836916ea/src/mapModules/baseMapElementComponents.ts#L185
function orderFaceVerticesAroundFaceNormals(vertices, faces, normals) {
    faces.forEach((faceVertexIndices, faceIndex) => {
        /* https://stackoverflow.com/questions/6264664/transform-3d-points-to-2d */
        const faceNormal = normals[faceIndex];
        const rotationAxis = tmp_vec_0.crossVectors(faceNormal, zAxis);
        const faceAngle = Math.acos(zAxis.dot(faceNormal));
        const rotation = tmp_quat.setFromAxisAngle(rotationAxis, faceAngle);

        vertexProjectionAngles.length = 0;
        for (let i = 0; i < faceVertexIndices.length; i++) {
            const vertexIndex = faceVertexIndices[i];
            const projection = tmp_vec_0.copy(vertices[vertexIndex]).applyQuaternion(rotation);

            vertexProjectionAngles[vertexIndex] = Math.atan2(projection.y, projection.x);
        }

        faceVertexIndices.sort(compareVertexProjectionAngles);
    });
}


function compareVertexProjectionAngles(vertexIndex_a, vertexIndex_b) {
    const angle_a = vertexProjectionAngles[vertexIndex_a];
    const angle_b = vertexProjectionAngles[vertexIndex_b];

    if (angle_a < angle_b) {
        return -1;
    }
    if (angle_a > angle_b) {
        return 1;
    }
    return 0;
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

function vector3ToVec3(vector) {
    return new CANNON.Vec3(vector.x, vector.y, vector.z);
}

function vec3ToVector3(vec) {
    return new THREE.Vector3(vec.x, vec.y, vec.z);
}

function threeQuaternionToCannonQuaternion(quat) {
    return new CANNON.Quaternion(quat.x, quat.y, quat.z, quat.w);
}

/** Apply a CANNON.Quaternion to a CANNON.Vec3, return the resulting vector
 * 
 * @param {*} vec 
 * @param {*} quat 
 */
function applyQuaternion(vec, q) {
    
    const x = vec.x, y = vec.y, z = vec.z;
    const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

    // calculate quat * vector

    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = - qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    const rx = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    const ry = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    const rz = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    return new CANNON.Vec3(rx,ry,rz);
}

/** Compute the squared norm of a Quaternion (either THREE.Quaternion or CANNON.Quaternion)
 * 
 * @param {*} quat 
 */
function sqnorm(quat) {
    return quat.x*quat.x + quat.y*quat.y + quat.z*quat.z + quat.w*quat.w;
}

/** Compute the dot product between two quaternions
 * 
 * @param {*} q1 
 * @param {*} q2 
 */
function quatDot(q1, q2) {
    return q1.w*q2.w + q1.x*q2.x + q1.y*q2.y + q1.z*q2.z;
}

/** Return a CANNON.Quaternion that has all components inverted
 * 
 * @param {*} q 
 * @returns 
 */
function minusQuat(q) {
    return new CANNON.Quaternion(-q.x, -q.y, -q.z, -q.w);
}


export { getFirstMesh, getFirstBufferGeometry, threeMeshToConvexThreeMesh, threeMeshToConvexCannonMesh, cannonMeshToCannonConvexPolyhedron, threeMeshToCannonMesh, checkTime, vector3ToVec3, vec3ToVector3, threeQuaternionToCannonQuaternion, applyQuaternion, sqnorm, quatDot, minusQuat };

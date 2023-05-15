import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
// FROM: https://gist.github.com/Anthelmed/976bb456db0bb3bd42ecda5dfa482a66

import {threeMeshToCannonMesh} from './util.js';

export const generateThreeVertices = (rawVerts) => {
    let verts = [];

    for(let v = 0; v < rawVerts.length; v+=3){
        verts.push(new THREE.Vector3(rawVerts[v],
            rawVerts[v+1],
            rawVerts[v+2]));
    }

    return verts;
};

export const generateThreeFaces = (rawFaces) => {
    let faces = [];

    for(let f = 0; f < rawFaces.length; f+=3){
        faces.push(new THREE.Face3(rawFaces[f],
            rawFaces[f+1],
            rawFaces[f+2]));
    }

    return faces;
};


export const generateCannonVertices = (rawVerts) => {
    let verts = [];

    for(let v = 0; v < rawVerts.length; v++){
        verts.push(new CANNON.Vec3(rawVerts[v].x,
            rawVerts[v].y,
            rawVerts[v].z));
    }

    return verts;
};

export const generateCannonFaces = (rawFaces) => {
    let faces = [];

    for(let f = 0; f < rawFaces.length; f++){
        faces.push([rawFaces[f].a,
            rawFaces[f].b,
            rawFaces[f].c]);
    }

    return faces;
};

export const generateBody = (groups, properties) => {
    const body = new CANNON.Body({
        mass: properties.mass
    });

    for (let g = 0; g < groups.length; g++) {
        const group = groups[g];

        const verts = generateThreeVertices(group.vertices);
        const faces = generateThreeFaces(group.faces);
        const geometry = new THREE.Geometry();
        const material = new THREE.MeshBasicMaterial();

        geometry.vertices = verts;
        geometry.faces = faces;

        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.copy(properties.scale);

        mesh.updateMatrix();
        mesh.geometry.applyMatrix(mesh.matrix);
        mesh.geometry.computeFaceNormals();
        mesh.geometry.computeVertexNormals();
        mesh.matrix.identity();

        console.log(mesh.geometry.vertices);
        const updatedVerts = generateCannonVertices(mesh.geometry.vertices);
        const updatedFaces = generateCannonFaces(mesh.geometry.faces);

        const polyhedron = new CANNON.ConvexPolyhedron(updatedVerts,updatedFaces);

        body.addShape(polyhedron);
    }

    return body;
};

export const generateNewBody = (childMesh, body) => {
    /*const verts = generateThreeVertices(childMesh.vertices);
    const faces = generateThreeFaces(childMesh.faces);
    const geometry = new THREE.Geometry();
    const material = new THREE.MeshBasicMaterial();

    geometry.vertices = verts;
    geometry.faces = faces;

    const mesh = new THREE.Mesh(geometry, material);*/
    threeMeshToCannonMesh()
    const mesh = childMesh;

    mesh.updateMatrix();
    mesh.geometry.applyMatrix4(mesh.matrix);
    mesh.geometry = BufferGeometryUtils.mergeVertices(mesh.geometry);
    //mesh.geometry.computeFaceNormals();
    mesh.geometry.computeVertexNormals();
    mesh.matrix.identity();

    console.log(mesh.geometry);
    const updatedVerts = generateCannonVertices(mesh.geometry.attributes.position.array);
    const updatedFaces = generateCannonFaces(updatedVerts);
    
    //console.log('updatedfaces:', updatedVerts);

    const polyhedron = new CANNON.ConvexPolyhedron(updatedVerts,updatedFaces);
    //console.log(polyhedron);
    body.addShape(polyhedron);

    return body;
};

export function mergeMeshes(group) {
    const geometries = [];

    group.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
            const geometry = child.geometry.clone();
            geometry.applyMatrix4(child.matrix);

        // Ensure the geometry has a "position" attribute
        if (!geometry.getAttribute('position')) {
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([]), 3));
        }

            geometries.push(geometry);
        }
    });

    const combinedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
    const combinedMesh = new THREE.Mesh(combinedGeometry, new THREE.MeshStandardMaterial());
    return combinedMesh;
}
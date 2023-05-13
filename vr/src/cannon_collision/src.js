import * as CANNON from 'cannon-es'

import { findSepAxis } from "./findSepAxis.js";


const size = 1
const mass = 1

// Sphere
const hullA = new CANNON.Box(new CANNON.Vec3(size, size, size)).convexPolyhedronRepresentation;
const posA = new CANNON.Vec3(-5,0,0);
const quatA = new CANNON.Quaternion(0,0,0,1);
const bodyA = new CANNON.Body({
    mass: mass,
    position: posA,
    shape: hullA,
})

// Box
const hullB = new CANNON.Box(new CANNON.Vec3(size, size, size)).convexPolyhedronRepresentation;
const posB = new CANNON.Vec3(0,0,0);
const quatB = new CANNON.Quaternion(0,0,0,1);
const bodyB = new CANNON.Body({
    mass: mass,
    position: posB,
    shape: hullB,
})


console.log("start test");
findSepAxis(hullA, hullB, posA, quatA, posB, quatB);
console.log("end test");
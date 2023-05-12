import * as CANNON from 'cannon-es';

const NUM_WORKERS = 3;
const WORKERS = new Array();
let collect_id = 0;
let worker_id = 0;

// initialize WORKERS
// give each worker an extra attribute 'collectors' which is a dict {collID: Collector}
let worker;
for (let i=0; i<NUM_WORKERS; i++) {
    worker = new Worker('worker.js');
    worker.onmessage = workerOnMessage;
    worker.collectors = new Object();
    WORKERS[i] = worker;
}

class Collector {
    collID;             // unique identifier of the collector
    numExpected;        // the number of expected results
    numAcquired = 0;    // the number of acquired results
    dmin = Number.MAX_VALUE;
    vector;             // CANNON.Vec3
    finished = false;   // true if the result of findSepAxis is known

    constructor(coll_id, num_expected) {
        this.id = coll_id;
        this.vector = new CANNON.Vec3();
        this.numExpected = num_expected;

        WORKERS.forEach((worker) => {
            worker.collectors[this.collID] = this;
        });
    }

    sendTask(vector, posA, quatA, posB, quatB) {
        worker = WORKERS[worker_id];
        worker_id = (worker_id+1)%NUM_WORKERS;
        worker.postMessage([this.collID, posA, quatA, posB, quatB, vector]);
    }
}


// a web worker that implements the testSepAxis function asynchronously
// note that no locks must be used as the worker receiver objects are not multithreaded
function workerOnMessage(event) {
    console.log(event.data);
    const collID = event.data[0];
    const d = event.data[1];
    const collector = this.collectors[collID];

    if (d==false) {
        collector.dmin = false;
        collector.finished = true;
    } else if (d < collector.dmin) {
        collector.dmin = d;
        collector.vector = event.data[2];
    }

    collector.numAcquired += 1;
    if (collector.numAcquired == collector.numExpected) {
        collector.finished = true;
    }
}


// hullA = this in order to overload
function findSepAxisOverload(hullB, posA, quatA, posB, quatB, target, faceListA, faceListB) {
    return findSepAxis(this, hullB, posA, quatA, posB, quatB, target, faceListA, faceListB);
}

// alternative to cannon.js function findSeparatingAxis that uses web workers
// return false if a separation axis is found, true otherwise
// the separating axis is saved in target
function findSepAxis(hullA, hullB, posA, quatA, posB, quatB, target, faceListA, faceListB) {
    const faceANormalWS3 = new CANNON.Vec3();
    const Worldnormal1 = new CANNON.Vec3();
    const deltaC = new CANNON.Vec3();
    const worldEdge0 = new CANNON.Vec3();
    const worldEdge1 = new CANNON.Vec3();
    const Cross = new CANNON.Vec3();
    let curPlaneTests = 0;

    // calculate number of expected results
    let num_expected = hullA.uniqueEdges.length * hullB.uniqueEdges.length;
    if (!hullA.uniqueAxes) {
        num_expected += numFacesA;
    } else {
        num_expected += hullA.uniqueAxes.length;
    }
    if (!hullB.uniqueAxes) {
        num_expected += numFacesB;
    } else {
        num_expected += hullB.uniqueAxes.length;
    }
    const collID = collect_id;
    const collector = new Collector(collID, num_expected);
    collect_id += 1;

    if (!hullA.uniqueAxes) {
        const numFacesA = faceListA ? faceListA.length : hullA.faces.length;
        // Test face normals from hullA
        for (let i = 0; i < numFacesA; i++) {
            const fi = faceListA ? faceListA[i] : i;
            // Get world face normal
            faceANormalWS3.copy(hullA.faceNormals[fi]);
            quatA.vmult(faceANormalWS3, faceANormalWS3);
            collector.sendTask(faceANormalWS3, posA, quatA, posB, quatB);
        }
    }
    else {
        // Test unique axes
        for (let i = 0; i !== hullA.uniqueAxes.length; i++) {
            // Get world axis
            quatA.vmult(hullA.uniqueAxes[i], faceANormalWS3);
            collector.sendTask(faceANormalWS3, posA, quatA, posB, quatB);
        }
    }
    if (!hullB.uniqueAxes) {
        // Test face normals from hullB
        const numFacesB = faceListB ? faceListB.length : hullB.faces.length;
        for (let i = 0; i < numFacesB; i++) {
            const fi = faceListB ? faceListB[i] : i;
            Worldnormal1.copy(hullB.faceNormals[fi]);
            quatB.vmult(Worldnormal1, Worldnormal1);
            curPlaneTests++;
            collector.sendTask(Worldnormal1, posA, quatA, posB, quatB);
        }
    }
    else {
        // Test unique axes in B
        for (let i = 0; i !== hullB.uniqueAxes.length; i++) {
            quatB.vmult(hullB.uniqueAxes[i], Worldnormal1);
            curPlaneTests++;
            collector.sendTask(Worldnormal1, posA, quatA, posB, quatB);
        }
    }
    // Test edges
    for (let e0 = 0; e0 !== hullA.uniqueEdges.length; e0++) {
        // Get world edge
        quatA.vmult(hullA.uniqueEdges[e0], worldEdge0);
        for (let e1 = 0; e1 !== hullB.uniqueEdges.length; e1++) {
            // Get world edge 2
            quatB.vmult(hullB.uniqueEdges[e1], worldEdge1);
            worldEdge0.cross(worldEdge1, Cross);
            if (!Cross.almostZero()) {
                Cross.normalize();
                collector.sendTask(Cross, posA, quatA, posB, quatB);
            }
        }
    }

    while (!collector.finished) {
        console.log("waiting for collector to finish");
    }
    dmin = collector.dmin;
    target = collector.vector;

    posB.vsub(posA, deltaC);
    if (deltaC.dot(target) > 0.0) {
        target.negate(target);
    }
    return true;
}

export { findSepAxis, findSepAxisOverload };
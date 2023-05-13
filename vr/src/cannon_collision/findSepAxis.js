import * as CANNON from 'cannon-es';
import Worker from "worker-loader!./worker.js"

const NUM_WORKERS = 7;
const WORKERS = new Array();
let collect_id = 0;
let worker_id = 0;

console.log("starting collision detection with " + NUM_WORKERS + " workers");

// initialize WORKERS
// give each worker an extra attribute 'collectors' which is a dict {collID: Collector}
// also give an attribute 'id' for debugging purposes
let worker;
for (let i=0; i<NUM_WORKERS; i++) {
    worker = new Worker('worker.js', { type: "module" });
    worker.onmessage = workerOnMessage;
    worker.onerror = workerOnError;
    worker.id = i;
    worker.collectors = new Object();
    WORKERS[i] = worker;
}

class Collector {
    collID;             // unique identifier of the collector
    numExpected;        // the number of expected results
    numAcquired = 0;    // the number of acquired results
    dmin = Number.MAX_VALUE;
    axis;               // CANNON.Vec3
    finished = false;   // true if the result of findSepAxis is known

    // a Promise, that is resolved when the result is ready
    // it can be resolved using the function resolvePromise
    ready;
    resolveReady;

    constructor(coll_id, num_expected) {
        this.collID = coll_id;
        this.axis = new CANNON.Vec3();
        this.numExpected = num_expected;

        this.ready = new Promise((resolve, reject) => {
            this.resolveReady = resolve;
        });

        WORKERS.forEach((worker) => {
            worker.collectors[this.collID] = this;
        });
    }

    sendTask(axis, posA, quatA, posB, quatB) {
        // only send the task if the collector is not finished yet
        if (!this.finished) {
            worker = WORKERS[worker_id];
            worker_id = (worker_id+1)%NUM_WORKERS;
            worker.postMessage([this.collID, posA, quatA, posB, quatB, axis]);
        }
    }

    remove() {
        WORKERS.forEach((worker) => {
            delete worker.collectors[this.collID];
        })
    }
}


// a web worker that implements the testSepAxis function asynchronously
// note that no locks must be used as the worker receiver objects are not multithreaded
function workerOnMessage(event) {
    const collID = event.data[0];
    const d = event.data[1];
    const collector = this.collectors[collID];

    // collector can be undefined if the function call already finished
    if (collector === undefined) {
        return;
    }

    if (d==false) {
        collector.dmin = false;
        collector.finished = true;
        collector.resolveReady();
    } else if (d < collector.dmin) {
        collector.dmin = d;
        collector.axis = dictToVec(event.data[2]);
    }

    collector.numAcquired += 1;
    if (collector.numAcquired == collector.numExpected) {
        collector.finished = true;
        collector.resolveReady();
    }
}


function workerOnError(error) {
    console.log("error occurred in worker " + error.srcElement.id + ':'
    + '\n' + error.message
    + '\n' + error.filename
    + '\n' + error.lineno)
    + "the above lines may be 'undefined' in Chrome";

    // window.alert("error");
    throw error;
}


// hullA = this in order to overload
function findSepAxisOverload(hullB, posA, quatA, posB, quatB, target, faceListA, faceListB) {
    return findSepAxis(this, hullB, posA, quatA, posB, quatB, target, faceListA, faceListB);
}

// alternative to cannon.js function findSeparatingAxis that uses web workers
// return false if a separation axis is found, true otherwise
// the separating axis is saved in target
async function findSepAxis(hullA, hullB, posA, quatA, posB, quatB, target, faceListA, faceListB) {
    const faceANormalWS3 = new CANNON.Vec3();
    const Worldnormal1 = new CANNON.Vec3();
    const deltaC = new CANNON.Vec3();
    const worldEdge0 = new CANNON.Vec3();
    const worldEdge1 = new CANNON.Vec3();
    const Cross = new CANNON.Vec3();
    let curPlaneTests = 0;

    // calculate number of expected results
    let num_expected = hullA.uniqueEdges.length * hullB.uniqueEdges.length;

    // numFaces only defined if hullA.uniqueAxes === undefined
    let numFacesA = null;
    let numFacesB = null;
    if (!hullA.uniqueAxes) {
        numFacesA = faceListA ? faceListA.length : hullA.faces.length;
        num_expected += numFacesA;
    } else {
        num_expected += hullA.uniqueAxes.length;
    }
    if (!hullB.uniqueAxes) {
        numFacesB = faceListB ? faceListB.length : hullB.faces.length;
        num_expected += numFacesB;
    } else {
        num_expected += hullB.uniqueAxes.length;
    }
    const collID = collect_id;
    const collector = new Collector(collID, num_expected);
    collect_id += 1;

    // send the right tasks to the workers
    if (!hullA.uniqueAxes) {
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

    // wait for collector to finish
    console.log("waiting for collector");
    await collector.ready;
    console.log(
        "collector is ready with\n"
        + "dmin = " + collector.dmin + '\n'
        + "axis = " + collector.axis
    );

    if (collector.dmin === false) {
        // Separated
        collector.remove();
        return false;
    } else {
        // Overlap
        target = collector.axis;
        posB.vsub(posA, deltaC);
        if (deltaC.dot(target) > 0.0) {
            target.negate(target);
        }
        collector.remove();
        return true;
    }
}

// the original findSeparatingAxis function, but asynchronous
async function ogSepAxis(hullB, posA, quatA, posB, quatB, target, faceListA, faceListB) {
    const faceANormalWS3 = new CANNON.Vec3();
    const Worldnormal1 = new CANNON.Vec3();
    const deltaC = new CANNON.Vec3();
    const worldEdge0 = new CANNON.Vec3();
    const worldEdge1 = new CANNON.Vec3();
    const Cross = new CANNON.Vec3();
    let dmin = Number.MAX_VALUE;
    const hullA = this;
    let curPlaneTests = 0;
    if (!hullA.uniqueAxes) {
        const numFacesA = faceListA ? faceListA.length : hullA.faces.length;
        // Test face normals from hullA
        for (let i = 0; i < numFacesA; i++) {
            const fi = faceListA ? faceListA[i] : i;
            // Get world face normal
            faceANormalWS3.copy(hullA.faceNormals[fi]);
            quatA.vmult(faceANormalWS3, faceANormalWS3);
            const d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);
            if (d === false) {
                return false;
            }
            if (d < dmin) {
                dmin = d;
                target.copy(faceANormalWS3);
            }
        }
    }
    else {
        // Test unique axes
        for (let i = 0; i !== hullA.uniqueAxes.length; i++) {
            // Get world axis
            quatA.vmult(hullA.uniqueAxes[i], faceANormalWS3);
            const d = hullA.testSepAxis(faceANormalWS3, hullB, posA, quatA, posB, quatB);
            if (d === false) {
                return false;
            }
            if (d < dmin) {
                dmin = d;
                target.copy(faceANormalWS3);
            }
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
            const d = hullA.testSepAxis(Worldnormal1, hullB, posA, quatA, posB, quatB);
            if (d === false) {
                return false;
            }
            if (d < dmin) {
                dmin = d;
                target.copy(Worldnormal1);
            }
        }
    }
    else {
        // Test unique axes in B
        for (let i = 0; i !== hullB.uniqueAxes.length; i++) {
            quatB.vmult(hullB.uniqueAxes[i], Worldnormal1);
            curPlaneTests++;
            const d = hullA.testSepAxis(Worldnormal1, hullB, posA, quatA, posB, quatB);
            if (d === false) {
                return false;
            }
            if (d < dmin) {
                dmin = d;
                target.copy(Worldnormal1);
            }
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
                const dist = hullA.testSepAxis(Cross, hullB, posA, quatA, posB, quatB);
                if (dist === false) {
                    return false;
                }
                if (dist < dmin) {
                    dmin = dist;
                    target.copy(Cross);
                }
            }
        }
    }
    posB.vsub(posA, deltaC);
    if (deltaC.dot(target) > 0.0) {
        target.negate(target);
    }
    return true;
}

function dictToVec(dict) {
    return new CANNON.Vec3(dict['x'], dict['y'], dict['z']);
}


export { findSepAxis, findSepAxisOverload, ogSepAxis };
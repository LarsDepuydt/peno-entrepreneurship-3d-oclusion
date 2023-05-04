import * as CANNON from 'cannon-es';

// alternative to cannon.js function findSeparatingAxis that uses web workers
function findSepAxis(hullB, posA, quatA, posB, quatB, target, faceListA, faceListB) {
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

export { findSepAxis };
/*
This worker will implement the function testSepAxis in a separate thread in order to improve performance

Main->worker format:
[collID, posA: Vec3, quatA: Quaternion, posB: Vec3, quatB: Quaternion, vector: Vec3]

Worker->main format:
- [collID, number, vector: Vec3] (wanneer overlap)
of
- [collID, false] (wanneer geen overlap)
*/



self.addEventListener("message", handleMessage);



function handleMessage(event) {
    const collID = event.data[0];
    const posA = event.data[1];
    const quatA = event.data[2];
    const posB = event.data[3];
    const quatB = event.data[4];
    const vector = event.data[5];

    postMessage([collID, false]);
}
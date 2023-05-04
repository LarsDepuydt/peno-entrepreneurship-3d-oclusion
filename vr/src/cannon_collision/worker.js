/*
This worker will implement the function testSepAxis in a separate thread in order to improve performance

Main->worker format:
[posA: Vec3, quatA: Quaternion, posB: Vec3, quatB: Quaternion]

Worker->main format:
- number (wanneer overlap)
of
- false (wanneer geen overlap)
*/


self.addEventListener("message", handleMessage);



function handleMessage(event) {
    const posA = event.data[0];
    const quatA = event.data[1];
    const posB = event.data[2];
    const quatB = event.data[3];

    console.log(posA);
}
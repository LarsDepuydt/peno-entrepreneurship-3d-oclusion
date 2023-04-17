import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/addons/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as CANNON from 'cannon-es';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import { default as CannonUtils } from 'cannon-utils';

//added
//let meshtest;
//var constrained;
//

const SCALE_MODEL = 0.01;
const intersected = [];
let container;
let camera, scene, renderer;

// controller1 = rechts, 2 = links
let controller1, controller2;
let controllerGrip1, controllerGrip2;

let controls;

let raycaster;

let world, timeStep=1/10;

const tempMatrix = new THREE.Matrix4();

let meshes = [], bodies = [];
let floor_shape, floor_body;

let controllerbody1, controllerbody2;

// lj_group is een THREE.Group < THREE.Object3D
// lj_mesh is een THREE.Mesh
// lj_shape is een CANNON.Trimesh
// lj_body is een CANNON.Body
let lj_group, lj_mesh, lj_shape, lj_body;
let uj_group, uj_mesh, uj_shape, uj_body;
let lj_sphere, uj_sphere;

let lj_loaded = false, uj_loaded = false;


initCannon();
initThree();
loadObjects();  // animation is started after both objects are loaded


function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,0,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;

    lj_body = new CANNON.Body({mass: 1});
    uj_body = new CANNON.Body({mass: 1});
    lj_body.position.set(0,0,200);
    uj_body.position.set(0,0,200);
    lj_body.quaternion = new CANNON.Quaternion(0, 0, 0, 1);
    uj_body.quaternion = new CANNON.Quaternion(0, 0, 0, 1);

    //added
    world.quaternion = new CANNON.Quaternion(0, 0, 0, 1);
    //

    world.addBody(lj_body);
    world.addBody(uj_body);
    bodies.push(lj_body);
    bodies.push(uj_body);
    lj_body.addEventListener("collide", function(e) {
        console.log("lj collided with body ", e.body);
    })

    let collideConstraint;
    // collideConstraint = new CANNON.Constraint(lj_body, uj_body);
    // world.addConstraint(collideConstraint);

    floor_body = new CANNON.Body({ mass: 0 });
    floor_shape = new CANNON.Plane();
    floor_body.addShape(floor_shape);
    // floor_body.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
    //world.addBody(floor_body);

    //initialize controllers in cannon-es
    // Create a shape for the VR controller
    var shape = new CANNON.Sphere(0.1);

    // Create a rigid body for the VR controller
    controllerbody1 = new CANNON.Body({
        mass: 1,
        shape: shape,
    });

    controllerbody2 = new CANNON.Body({
        mass: 1,
        shape: shape,
    });

    // Add the rigid controller bodies to the physics world
    world.addBody(controllerbody1);
    world.addBody(controllerbody2);
}


function initThree() {
    // create container
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    // create scene and camera
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x808080 );
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set( 0, 1.6, 3 );

    // add controls
    controls = new OrbitControls( camera, container );
    controls.target.set( 0, 1.6, 0 );
    controls.update();

    // axis
    var axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    // add floor
    const floorGeometry = new THREE.PlaneGeometry( 4, 4 );
    const floorMaterial = new THREE.MeshStandardMaterial( {
        color: 0xeeeeee,
        roughness: 1.0,
        metalness: 0.0
    } );
    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.rotation.x = - Math.PI / 2;
    floor.receiveShadow = true;
    // let q = floor.quaternion;
    // floor_body.quaternion = new CANNON.Quaternion(q.x,q.y,q.z,q.w);
    // floor_body.position = floor.position;
    scene.add( floor );

    // add spheres
    const lj_sphere_geo = new THREE.SphereGeometry(0.1,10,5);
    const uj_sphere_geo = new THREE.SphereGeometry(0.1,10,5);
    const sphereMaterial = new THREE.MeshStandardMaterial( {
        color: 0x0000ff,
        roughness: 1.0,
        metalness: 0.5
    } );
    lj_sphere = new THREE.Mesh( lj_sphere_geo, sphereMaterial);
    uj_sphere = new THREE.Mesh( uj_sphere_geo, sphereMaterial);
    scene.add(lj_sphere);
    scene.add(uj_sphere);


    // light sources
    scene.add( new THREE.HemisphereLight( 0x808080, 0x606060 ) );

    const light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 6, 0 );
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = - 2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = - 2;
    light.shadow.mapSize.set( 4096, 4096 );
    scene.add( light );
 

    // add renderer and enable VR

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;
    container.appendChild( renderer.domElement );

    document.body.appendChild( VRButton.createButton( renderer ) );


    // controllers

    controller1 = renderer.xr.getController( 0 );

    //added
    //controller1.quaternion = new CANNON.Quaternion(0, 0, 0, 1);
    controller1.addEventListener( 'selectstart', onSelectStart );
    controller1.addEventListener( 'selectend', onSelectEnd );
    //
    scene.add( controller1 );

    controller2 = renderer.xr.getController( 1 );
    //added
    //controller2.quaternion = new CANNON.Quaternion(0, 0, 0, 1);
    controller2.addEventListener( 'selectstart', onSelectStart );
    controller2.addEventListener( 'selectend', onSelectEnd );
    //
    scene.add( controller2 );


    // add controller models

    const controllerModelFactory = new XRControllerModelFactory();

    controllerGrip1 = renderer.xr.getControllerGrip( 0 );
    controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
    scene.add( controllerGrip1 );

    controllerGrip2 = renderer.xr.getControllerGrip( 1 );
    controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
    scene.add( controllerGrip2 );


    // lines pointing from controllers

    const geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

    const line = new THREE.Line( geometry );
    line.name = 'line';
    line.scale.z = 5;

    controller1.add( line.clone() );
    controller2.add( line.clone() );

    raycaster = new THREE.Raycaster();

    //added for testing
    // Create a Three.js geometry for the mesh
    /*const testgeo = new THREE.SphereGeometry(1, 1, 1);

    // Create a Three.js material for the mesh
    const materialtest = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // Create a Three.js mesh and add it to the scene
    meshtest = new THREE.Mesh(testgeo, materialtest);
    meshtest.scale.multiplyScalar(0.5);
    scene.add(meshtest);*/
    

    // resize

    window.addEventListener( 'resize', onWindowResize );

}



function changeControlledCoordinates( controller, coordinate ){ // 0, 1, 2: x, y, z
    if (controller.userData.selected === undefined) return;
    switch (coordinate) {
        case 0: {
            controller.userData.selected.position.setX(controller.position.x / SCALE_MODEL)
            break;
        }
        case 1: {
            controller.userData.selected.position.setY(controller.position.y / SCALE_MODEL);
            break;
        }
        case 2: {
            controller.userData.selected.position.setZ(controller.position.z / SCALE_MODEL);
            break;
        }
        case 3: {
            controller.userData.selected.position.setX(controller.position.x / SCALE_MODEL);
            controller.userData.selected.position.setZ(controller.position.y / SCALE_MODEL);
            controller.userData.selected.position.setY(-controller.position.z / SCALE_MODEL);
            break;
        }

    }
}

function beforeRender( controller ){
    changeControlledCoordinates(controller, 3);
}

/*//added
// Update the position and orientation of the rigid body based on the VR controller
renderer.xr.addEventListener("frame", function (event) {
    controllerbody1.position.copy(controller1.position);
    controllerbody1.quaternion.copy(controller1.quaternion);

    controllerbody2.position.copy(controller2.position);
    controllerbody2.quaternion.copy(controller2.quaternion);
  });
  
  // Copy the position and orientation of the rigid body back to the VR controller in the three.js world
  renderer.xr.addEventListener("frame", function (event) {
    controller1.position.copy(controllerbody1.position);
    controller1.quaternion.copy(controllerbody1.quaternion);

    controller2.position.copy(controllerbody2.position);
    controller2.quaternion.copy(controllerbody2.quaternion);
  });  */


// when controller pushes select button, select the object it is pointing to

function onSelectStart( event ) {

    const controller = event.target;

    const intersections = getIntersections( controller );
    console.log(intersections);
    if ( intersections.length > 0 ) {
        var object_group;
        const intersection = intersections[ 0 ];

        var object = intersection.object;
        object.material.emissive.b = 1;
        
        if (uj_mesh.uuid == object.uuid) {object_group = uj_group};
        if (lj_mesh.uuid == object.uuid) {object_group = lj_group};

        //console.log(object);
        //object = uj_group;
        controller.attach( object_group );
        //console.log(object);
        //console.log(uj_body);

        controller.userData.selected = object;

    }

}



function onSelectStartnew( event ) {

    const controller = event.target;
    //const controller = controllerbody1;
    //const intersections = getIntersections( controllerbody1 );
    const intersections = getIntersections( controller );

    if ( intersections.length > 0 ) {

        const intersection = intersections[ 0 ];

        var object = intersection.object;
        var controllerbody;

        object.material.emissive.b = 1;
        //controller.attach( object );

        //console.log(object);
        if (object.uuid == lj_mesh.uuid) {
            object = lj_body;
        }
        if (object.uuid == uj_mesh.uuid) {
            object = uj_body;
        }

        if (controller.uuid == controller1.uuid) {
            controllerbody = controllerbody1;
        }
        if (controller.uuid == controller2.uuid) {
            controllerbody = controllerbody2;
        }

        //addConstraintToBody(controller, object);
        //console.log(object);
        //console.log(uj_mesh);
        //console.log(uj_body);
        //object = uj_body;
        //console.log(controllerbody.uuid == controllerbody1.uuid);
        //console.log(object.uuid == uj_body.uuid);
        addConstraintToBody(controllerbody, object); 

        controller.userData.selected = object;

    }

}


// when controller releases select button

function onSelectEnd( event ) {
    var object_group;
    const controller = event.target;

    if ( controller.userData.selected !== undefined ) {

        const object = controller.userData.selected;
        //console.log(object);
        object.material.emissive.b = 0;
        //group.attach( object );

        if (uj_mesh.uuid == object.uuid) {object_group = uj_group};
        if (lj_mesh.uuid == object.uuid) {object_group = lj_group};
        //controller.remove(object_group);
        scene.attach(object_group);
        //object.removeFromParent();
        //removeConstraintFromBody(controller)

        controller.userData.selected = undefined;

    }
}

// Based on the dragging_teeth version but now for cannon.js, could be completely wrong
/*function getIntersections(controller) {
    const ray = new CANNON.Ray();
    const origin = new CANNON.Vec3();
    const direction = new CANNON.Vec3();
  
    // Set the origin of the ray to the controller's position in the world
    origin.copy(controller.position);
    world.quaternion.vmult(origin, origin); // transform from local to world space

    // Set the direction of the ray to be pointing straight ahead from the controller
    direction.set(0, 0, -1);
    controller.quaternion.vmult(direction, direction); // transform from local to world space

    //ray.origin.copy(origin);
    //ray.direction.copy(direction);
    ray.from.copy(origin);
    ray.to.copy(origin).vadd(direction);

  
    // intersect with all bodies in the world
    const result = new CANNON.RaycastResult();
    
    world.raycastAll(ray, result);
    console.log(result)

    if (result.length > 0) {
        // return the first RaycastResult in the array
        return result.allHits[0];
    } else {
        return null;
    }
}*/

function getIntersections( controller ) {

    tempMatrix.identity().extractRotation( controller.matrixWorld );

    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

    //console.log([lj_group, uj_group]);
    return raycaster.intersectObjects( [lj_group, uj_group], true );

}

// highlight the object the controller points at

function intersectObjects( controller ) {

    // Do not highlight when already selected

    if ( controller.userData.selected !== undefined ) return;

    const line = controller.getObjectByName( 'line' );
    const intersections = getIntersections( controller );

    if ( intersections.length > 0 ) {

        const intersection = intersections[ 0 ];

        const object = intersection.object;
        object.material.emissive.r = 1;
        intersected.push( object );

        line.scale.z = intersection.distance;

    } else {

        line.scale.z = 5;

    }

}


/*function intersectObjectsnew( controller, intersected ) {

    // Do not highlight when already selected

    if ( controller.userData.selected !== undefined ) return;

    const line = controller.getObjectByName( 'line' );
    const from = line.getWorldPosition(new THREE.Vector3());
    const to = new THREE.Vector3();
    to.copy(from);
    to.add(line.getWorldDirection(new THREE.Vector3()).multiplyScalar(100));

    const result = new CANNON.RaycastResult();
    const options = {
        skipBackfaces: true,
        collisionFilterMask: ~0 // check all bodies
    };
    const hit = world.raycastClosest(from, to, options, result);

    if (hit) {

        const object = hit.body.entity;
        object.material.emissive.r = 1;
        intersected.push( object );

        line.scale.z = hit.distance;

    } else {

        line.scale.z = 5;

    }

}*/

function addConstraintToBody(body, target) {
    // Set the pivot points to the center of mass of each body
    const pivotA = new CANNON.Vec3().copy(body.position);
    const pivotB = new CANNON.Vec3().copy(target.position);

    const constraint = new CANNON.LockConstraint(body, target, {
      maxForce: 1000,
      collideConnected: false,
      wakeUpBodies: true,
      wakeUpA: true,
      wakeUpB: true,
      //pivotA: new CANNON.Vec3(),
      //pivotB: new CANNON.Vec3(),
      pivotA: pivotA,
      pivotB: pivotB,
    });
    world.addConstraint(constraint);
    console.log(world.constraints);
    //constrained = true;
    return constraint;
}
  
function removeConstraintFromBody(body) {
    const constraints = world.constraints.filter((constraint) =>
        constraint.bodyA === body || constraint.bodyB === body
    );
    for (const constraint of constraints) {
        world.removeConstraint(constraint);
    }
}

/*controller1.addEventListener("selectstart", (event) => {
    lj_sphere.visible = true;
    lj_sphere.position.copy(controller1.position);
    addConstraintToBody(lj_body, lj_sphere, lj_sphere.position);
});
  
controller1.addEventListener("selectend", (event) => {
    lj_sphere.visible = false;
    removeConstraintFromBody(lj_body);
});*/

function showAxes() {
    // Create the axes
    const xAxis = new THREE.Vector3(1, 0, 0);
    const yAxis = new THREE.Vector3(0, 1, 0);
    const zAxis = new THREE.Vector3(0, 0, 1);
    const axisLength = 100;
  
    const xArrowHelper = new THREE.ArrowHelper(xAxis, new THREE.Vector3(0, 0, 0), axisLength, 0xff0000);
    const yArrowHelper = new THREE.ArrowHelper(yAxis, new THREE.Vector3(0, 0, 0), axisLength, 0x00ff00);
    const zArrowHelper = new THREE.ArrowHelper(zAxis, new THREE.Vector3(0, 0, 0), axisLength, 0x0000ff);
  
    // Add the axes to the scene
    scene.add(xArrowHelper);
    scene.add(yArrowHelper);
    scene.add(zArrowHelper);
  }  


// Lock an object to a certain axis (x, y or z)
function lockAxis(object, axis) {
    // Get the body of the object from the bodies array
    const bodyIndex = meshes.indexOf(object);
    const body = bodies[bodyIndex];
  
    // Lock the position and velocity of the body on the specified axis
    switch (axis) {
      case 'x':
        body.velocity.y = 0;
        body.velocity.z = 0;
        break;
      case 'y':
        body.velocity.x = 0;
        body.velocity.z = 0;
        break;
      case 'z':
        body.velocity.x = 0;
        body.velocity.y = 0;
        break;
    }
  }
  


function loadObjects() {
    // load lower jaw
    const loader = new OBJLoader();
    loader.load(
        '../../assets/lower_ios_6.obj',
        // called when resource is loaded y=green, x=red, z=blue
        function (object) {         // lj_group is a 'Group', which is a subclass of 'Object3D'
            lj_group = object;
            lj_group.scale.set(0.01, 0.01, 0.01);
            // lj_group.scale.setScalar(0.01);
            lj_group.position.x = 0;
            lj_group.position.y = 0;
            lj_group.position.z = 0;
            lj_group.rotation.x = 1.5 * Math.PI;
            //lj_group.rotation.y = Math.PI
            console.log(lj_group);
            scene.add(lj_group);
            
            lj_mesh = getFirstMesh(lj_group);
            //console.log(lj_mesh);
            //lj_mesh.geometry.scale(0.01, 0.01, 0.01);
            lj_shape = threeMeshToCannonMesh(lj_mesh);
            console.log("loading lj_group succeeded");
            lj_body.addShape(lj_shape);
            lj_loaded = true;
            startAnimation();
        },
        
        // called when loading in progress
        function (xhr) {
            //console.log( "lj_group " + (xhr.loaded / xhr.total * 100 ) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading lj_group: ' + error);
        }
    );
 
    // load upper jaw
    loader.load(
        '../../assets/upper_ios_6.obj',
        // called when resource is loaded y=green, x=red, z=blue
        function (object) {
            uj_group = object;
            uj_group.position.x = 0;
            uj_group.position.y = 0;
            uj_group.position.z = 0;
            uj_group.rotation.x = 1.5 * Math.PI;
            //uj_group.rotation.y = Math.PI
            uj_group.scale.setScalar(0.01);
            scene.add(uj_group);
            
            uj_mesh = getFirstMesh(uj_group);
            //console.log(uj_mesh);
            uj_shape = threeMeshToCannonMesh(uj_mesh);
            console.log("loading uj_group succeeded");
            uj_body.addShape(uj_shape);
            uj_loaded = true;
            startAnimation();
        },
        
        // called when loading in progress
        function (xhr) {
            //console.log( "uj_group " + (xhr.loaded / xhr.total * 100 ) + '% loaded');
        },
        // called when loading has errors
        function (error) {
            console.log('An error happened while loading uj_group: ' + error);
        }
    );
}



function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}



function printTree(object, depth=0) {

    console.log("  ".repeat(depth) + depth + ":" + object);
    for (const o of object.children) {
        printTree(o, depth+1);
    }
}


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


function threeMeshToCannonMesh(mesh) {
    let vertices = mesh.geometry.attributes.position.array;

    const indices = [];     // TODO: check if this is correct
    for (let i = 0; i < vertices.length / 3; i += 3) {
        indices.push([i, i + 1, i + 2]);
    }
    return new CANNON.Trimesh(vertices, indices);
}



// main loops

function updatePhysics() {

    // Step the physics world
    world.step(timeStep);

    // console.log("Cannon: ", lj_body.position);
    // console.log("Three: ", lj_mesh.position);

    // Copy coordinates from Cannon.js to Three.js
    lj_mesh.position.copy(lj_body.position);
    lj_mesh.quaternion.copy(lj_body.quaternion);
    lj_sphere.position.copy(lj_body.position);
    uj_mesh.position.copy(uj_body.position);
    uj_mesh.quaternion.copy(uj_body.quaternion);
    uj_sphere.position.copy(uj_body.position);


    //added
    // copy coordinates from three.js to cannon for controller
    controllerbody1.position.copy(controller1.position);
    controllerbody2.position.copy(controller2.position);
    controllerbody1.quaternion.copy(controller1.quaternion);
    controllerbody2.quaternion.copy(controller2.quaternion);
    //meshtest.position.copy(controllerbody1.position);
    //
}

function cleanIntersected() {

    while ( intersected.length ) {

        const object = intersected.pop();
        object.material.emissive.r = 0;

    }

}

function animate() {

    updatePhysics();
    render();

}

function render() {
    cleanIntersected();

    intersectObjects( controller1 );
    intersectObjects( controller2 );

    // Voor axis locking, work in progress
    //beforeRender(controller1);
    //beforeRender(controller2);

    renderer.render( scene, camera );
}



function startAnimation() {
    if (lj_loaded && uj_loaded) {
        console.log("starting animation");
        renderer.setAnimationLoop( animate );
    }
}
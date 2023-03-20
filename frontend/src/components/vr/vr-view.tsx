import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as CANNON from 'cannon-es';
//import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
//import { default as CannonUtils } from 'cannon-utils';

import { sendPositionScan, getPositionScan } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery'
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BufferAttribute, InterleavedBufferAttribute } from 'three';


let container: HTMLDivElement;
let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let controller1, controller2;
let controllerGrip1, controllerGrip2;

let controls;

let raycaster;

let world: CANNON.World, timeStep=1/10;


let meshes = [], bodies = [];
let floor_shape, floor_body: CANNON.Body;

// lj_group is een THREE.Group < THREE.Object3D
// lj_mesh is een THREE.Mesh
// lj_shape is een CANNON.Trimesh
// lj_body is een CANNON.Body
let lj_group: THREE.Group, lj_mesh: THREE.Mesh, lj_shape: CANNON.Trimesh, lj_body: CANNON.Body;
let uj_group: THREE.Group , uj_mesh: THREE.Mesh, uj_shape: CANNON.Trimesh, uj_body: CANNON.Body;
let lj_sphere: THREE.Mesh, uj_sphere: THREE.Mesh;

let lj_loaded = false, uj_loaded = false;

let target = new THREE.Vector3();
const clock = new THREE.Clock();

let second_call = false;

export default function VRView(){
    const [send, setSend] = useState(false);
    //const path_upper_jaw = '../../../../vr/assets/upper_ios_6.obj'; // Local paths
    //const path_lower_jaw = '../../../../vr/assets/lower_ios_6.obj';
    
    const path_upper_jaw = '/upper_ios_6.obj'; // URLs for fetch, temporarily in public folder so Nextjs can access
    const path_lower_jaw = '/lower_ios_6.obj';
        
    useEffect(() => { // https://github.com/facebook/react/issues/24502
        if (second_call){
            initCannon();
            initThree();
            loadObjects();  // animation is started after both objects are loaded
            console.log('Init executed!');
        }
        else {
            second_call = true;
        }
      }, []);
    
    function initCannon() {
        console.log("Initialising CANNON")
        const solver = new CANNON.GSSolver(); // Can't use world.solver since Solver doesn't have property iterations
        solver.iterations = 10;

        world = new CANNON.World({
            gravity: new CANNON.Vec3(0, 0, 9),
            solver: solver,
            broadphase: new CANNON.NaiveBroadphase(),
        });

        lj_body = new CANNON.Body({mass: 1});
        uj_body = new CANNON.Body({mass: 1});
        lj_body.position.set(0,0,2);
        uj_body.position.set(0,0,1);
        lj_body.quaternion = new CANNON.Quaternion(0, 0, 0, 1);
        uj_body.quaternion = new CANNON.Quaternion(0, 0, 0, 1);
        world.addBody(lj_body);
        world.addBody(uj_body);
        bodies.push(lj_body);
        bodies.push(uj_body);
        lj_body.addEventListener("collide", function(e: any) {
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
        scene.add( controller1 );

        controller2 = renderer.xr.getController( 1 );
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

        raycaster = new THREE.Raycaster();


        // resize

        window.addEventListener( 'resize', onWindowResize );

    }


    function loadObjects() {
        // load lower jaw
        const loader = new OBJLoader();
        loader.load(
            path_lower_jaw,
            // called when resource is loaded y=green, x=red, z=blue
            function (object) {         // lj_group is a 'Group', which is a subclass of 'Object3D'
                lj_group = object;
                lj_group.scale.set(0.01, 0.01, 0.01);
                // lj_group.scale.setScalar(0.01);

                // server: getCoordinates()
                lj_group.position.x = 0;
                lj_group.position.y = 0;
                lj_group.position.z = 0;
                lj_group.rotation.x = 1.5 * Math.PI;
                //lj_group.rotation.y = Math.PI
                console.log(lj_group);
                scene.add(lj_group);
                
                lj_mesh = getFirstMesh(lj_group);
                //console.log(lj_mesh);
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
            path_upper_jaw,
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



    function printTree(object: any, depth=0) {

        console.log("  ".repeat(depth) + depth + ":" + object);
        for (const o of object.children) {
            printTree(o, depth+1);
        }
    }


    function getFirstMesh(object: any): THREE.Mesh {
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
            return null as any; // TEST
        }
    }


    function threeMeshToCannonMesh(mesh: THREE.Mesh) {
        
        let vertices: number[];
        const positionAttribute = mesh.geometry.getAttribute('position');
        if (positionAttribute instanceof BufferAttribute || positionAttribute instanceof InterleavedBufferAttribute){
            vertices = Array.from(positionAttribute.array);
        }
        else {
            vertices = Array.from([]); // GLBufferAttribute does not have array property
        }
        const indices = [];
        for (let i = 0; i < vertices.length / 3; i += 3) {
            indices.push(i, i + 1, i + 2);
        }
        return new CANNON.Trimesh(vertices, indices);

        /*const positionAttribute = mesh.geometry.attributes.position;
        const indices = [];     // TODO: check if this is correct
        for (let i = 0; i < vertices.length / 3; i += 3) {
            indices.push([i, i + 1, i + 2]);
        }
        return new CANNON.Trimesh(vertices, indices);*/
    }



    // main loops

    function updatePhysics() {

        // Step the physics world
        world.step(timeStep);

        // console.log("Cannon: ", lj_body.position);
        // console.log("Three: ", lj_mesh.position);

        // Copy coordinates from Cannon.js to Three.js
        // Following causes errors with Typescript
        /* lj_mesh.position.copy(lj_body.position);
        lj_mesh.quaternion.copy(lj_body.quaternion);
        lj_sphere.position.copy(lj_body.position);
        uj_mesh.position.copy(uj_body.position);
        uj_mesh.quaternion.copy(uj_body.quaternion);
        uj_sphere.position.copy(uj_body.position); */

        lj_mesh.position.set(lj_body.position.x, lj_body.position.y, lj_body.position.z);
        lj_mesh.quaternion.set(lj_body.quaternion.x, lj_body.quaternion.y, lj_body.quaternion.z, lj_body.quaternion.w);
        uj_mesh.position.set(uj_body.position.x, uj_body.position.y, uj_body.position.z);
        uj_mesh.quaternion.set(uj_body.quaternion.x, uj_body.quaternion.y, uj_body.quaternion.z, uj_body.quaternion.w);
        uj_sphere.position.set(uj_sphere.position.x, uj_sphere.position.y, uj_sphere.position.z);
    }

    function animate() {
        updatePhysics();
        render();
        checkTime();
    }

    function render() {
        renderer.render( scene, camera );
    }

    function startAnimation() {
        if (lj_loaded && uj_loaded) {
            console.log("starting animation");
            renderer.setAnimationLoop( animate );
        }
    }
    
    function SendPositionComponent() {
        const scanId = 111; // Hardcoded
        const [saved, setSaved] = useState(false);
      
        const coordinate_info = lj_mesh?.position;
        const rotation_info = lj_mesh?.rotation;
        const { x, y, z } = coordinate_info ?? {};
        const { x: r_x, y: r_y, z: r_z } = rotation_info ?? {};

        if (send){
            const { data, isLoading, isError } = useQuery(sendPositionScan.useQuery({ scanId, x, y, z, rX: r_x, rY: r_y, rZ: r_z }));
        }

        useEffect(() => {
            if (send) {
                //updateData(data);
                setSend(false);
            }
          }, [send]);
      
        async function updateData(data: any) {
          if (lj_mesh) {
            if (data) {
              setSaved(data.saved);
            }
          } else {
            console.log('Mesh undefined!');
          }
        }
        // Do something with data here
        return null;
      }


    function getPosition(){ // FIrst check if defined
        target = lj_mesh.position;
        // Call service based on scan ID
        const scanID = 111; // Hardcoded
        const {data} = useQuery(getPositionScan.useQuery({ scanId: scanID }));

        if (data == undefined){
            return []
        }

        const {x, y, z, rX, rY, rZ} = data;
        return [x, y, z, rX, rY, rZ]
    }
    
    function checkTime() {
        const elapsedTime = clock.getElapsedTime();
        
        if (elapsedTime >= 5) {
            setSend(true); // Send position every 5 seconds
            console.log(elapsedTime, "seconds have passed");
        
        // reset the clock
        clock.start();
        }
    }
    return (
        <div> <SendPositionComponent/> </div>
    )
}
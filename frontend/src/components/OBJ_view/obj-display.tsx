import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import convertGrayscale from './convertGrayscale'; 



const ObjDisplay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // define scene and camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

      // define and add renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 1);

      // load object
      const loader = new OBJLoader();
      let lowerjaw: THREE.Object3D;
      let upperjaw: THREE.Object3D;
      loader.load(
        'http://127.0.0.1:5500/vr/assets/lower_ios_6.obj',
        // called when resource is loaded
        function (object) {
          // traverse the object to change its material
          /*
          object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = new THREE.MeshBasicMaterial({
              //color: new THREE.Color(0.5, 0.5, 0.5),
              //color: convertGrayscale(child.material.color),
              wireframe: false,
            });
            }
          });
          */
          lowerjaw = object;
          lowerjaw.position.z = -20
          lowerjaw.position.y = 10
          lowerjaw.rotation.x = Math.PI/2
          lowerjaw.rotation.y = Math.PI
          lowerjaw.rotation.z = Math.PI
          
          scene.add(lowerjaw);
        },

        // called when loading in progress
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.log('An error happened while loading');
        }
      );

      loader.load(
        'http://127.0.0.1:5500/vr/assets/upper_ios_6.obj',
        // called when resource is loaded
        function (object) {
          // traverse the object to change its material
          upperjaw = object;
          upperjaw.position.z = -20
          upperjaw.position.y = 10
          upperjaw.rotation.x = Math.PI/2
          upperjaw.rotation.y = Math.PI
          upperjaw.rotation.z = Math.PI
          
          scene.add(upperjaw);
        },

        // called when loading in progress
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        // called when loading has errors
        function (error) {
          console.log('An error happened while loading');
        }
      );


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


      // render loop
      
      function animate() {

        requestAnimationFrame( animate );
        renderer.setClearColor(0xcccccc, 0.7);

        // Move camera position
        camera.position.z = 100;
        if (lowerjaw && upperjaw) {
        lowerjaw.rotation.z += 0.01;
        upperjaw.rotation.z += 0.01;
        }
        renderer.render( scene, camera );
    }

      animate();

      // clean up the scene when the component unmounts
      return () => {
        scene.remove(lowerjaw);
        renderer.dispose();
      };
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ObjDisplay;


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
      let lowerjaw: THREE.Group;
      loader.load(
        'http://127.0.0.1:5500/vr/assets/lower_ios_6.obj',
        // called when resource is loaded
        function (object) {
          // traverse the object to change its material
          
                    object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshBasicMaterial({
                //color: new THREE.Color(0.5, 0.5, 0.5),
                color: convertGrayscale(child.material.color),
                wireframe: false,
              });
            }
          });
          lowerjaw = object;
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

      // add light sources
      const ambientLight = new THREE.AmbientLight(0x404040);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      scene.add(ambientLight);
      scene.add(directionalLight);


      // render loop
      function animate() {

        requestAnimationFrame( animate );
        renderer.setClearColor(0xcccccc, 0.7);

        // Move camera position
        camera.position.z = 100;
        if (lowerjaw) {
        lowerjaw.rotation.y += 0.01;
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


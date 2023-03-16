import * as THREE from 'three';
import * as CANNON from 'cannon-es';

interface Size {
  x: number;
  y: number;
  z: number;
};

class utils {
  private static ComputeGeometries(mesh: THREE.Mesh): THREE.Mesh {
    mesh.geometry.computeBoundingBox();
    mesh.geometry.computeBoundingSphere();
    mesh.geometry.computeTangents();
    mesh.geometry.computeVertexNormals();

    return mesh;
  };

  public static CreateTriMesh(mesh: THREE.Mesh, size_: Size = { x: 1, y: 1, z: 1 }): CANNON.Trimesh {
    const mesh_ = this.ComputeGeometries(mesh);

    const position = mesh_.geometry.attributes.position;
    const normals: any = mesh_.geometry.index;
    var vertices: number[] = [], faces: number[] = [];

    for (var i = 0; i < position.array.length; i += 1)
      vertices.push(position.array[i] * (size_.x * 4 - .01));

    for (var i = 0; i < normals.array.length; i += 1)
      faces.push(normals.array[i]);

    return new CANNON.Trimesh(vertices, faces);
  };
};

export default utils;
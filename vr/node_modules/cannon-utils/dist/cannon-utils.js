import * as CANNON from 'cannon-es';

class utils {
  static ComputeGeometries(mesh) {
    mesh.geometry.computeBoundingBox();
    mesh.geometry.computeBoundingSphere();
    mesh.geometry.computeTangents();
    mesh.geometry.computeVertexNormals();
    return mesh;
  }

  static CreateTriMesh(mesh, size_) {
    if (size_ === void 0) {
      size_ = {
        x: 1,
        y: 1,
        z: 1
      };
    }

    const mesh_ = this.ComputeGeometries(mesh);
    const position = mesh_.geometry.attributes.position;
    const normals = mesh_.geometry.index;
    var vertices = [],
        faces = [];

    for (var i = 0; i < position.array.length; i += 1) vertices.push(position.array[i] * (size_.x * 4 - .01));

    for (var i = 0; i < normals.array.length; i += 1) faces.push(normals.array[i]);

    return new CANNON.Trimesh(vertices, faces);
  }

}

export { utils as default };

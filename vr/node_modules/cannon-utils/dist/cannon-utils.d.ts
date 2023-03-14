declare module "cannon-utils" {
    import * as THREE from 'three';
    import * as CANNON from 'cannon-es';
    interface Size {
        x: number;
        y: number;
        z: number;
    }
    class utils {
        private static ComputeGeometries;
        static CreateTriMesh(mesh: THREE.Mesh, size_?: Size): CANNON.Trimesh;
    }
    export default utils;
}

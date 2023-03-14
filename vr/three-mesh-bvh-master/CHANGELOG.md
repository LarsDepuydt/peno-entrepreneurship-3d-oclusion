# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [0.5.23] - 2023-02-03
### Fixed
- Case where raycasting would not work if uvs are not present.

## [0.5.22] - 2023-01-15
### Added
- Support to suppress logs in `ExtendedTriangle.intersectsTriangle`.

## [0.5.21] - 2023-01-03
### Changed
- Removed use of optional chaining.

## [0.5.20] - 2022-12-31
### Added
- Diff support to `StaticGeometryGenerator` so only changed meshes and skinned meshes are updated in order to improve performance on subsequent updates.

## [0.5.19] - 2022-11-28
### Fixed
- StaticGeometryGenerator: now correctly only traverses and includes visible meshes.

## [0.5.18] - 2022-11-15
### Added
- Support for distance queries on the GPU.

### Fixed
- Case in triangle intersect function that would incorrectly report an intersection.

## [0.5.17] - 2022-10-22
### Fixed
- Case in new three.js that caused the vertex texture to work incrrectly.
- Removed incomplete and incorrect Box3 inheritance from OrientedBox.
- Adde `min` and `max` to typescript definition for OrientedBox.

## [0.5.16] - 2022-08-05
### Added
- Support for normalized vertex attributes.

### Removed
- Removed deprecated `MeshBVH` function signatures for `raycast`, `raycastFirst`, `closestPointToPoint`, `closestPointToGeometry`, `refit`, `intersectsGeometry`, `shapecast`, `intersectsBox`, `intersectsSphere`.

## [0.5.15] - 2022-07-25
### Fixed
- single point intersection in `intersectsTriangle` function.
- issue in the `closestPointLineToLine` function.

## [0.5.14] - 2022-06-20
### Fixed
- ExtendedTriangle: Fix Another case where IntersectsTriangle failed

## [0.5.13] - 2022-06-19
### Fixed
- ExtendedTriangle: Fix Another case where IntersectsTriangle failed

## [0.5.12] - 2022-06-17
### Fixed
- MeshBVHVisualizer: not removing child roots on update.
- ExtendedTriangle: Fix intersection not being reported when triangles intersect at vertex.
- MeshBVH.bvhcast: Fix bvhcast using incorrect bounds to traverse.

## [0.5.11] - 2022-05-20
### Fixed
- "global" unnecessarily being used in the web worker.

### Added
- GenerateMeshBVHWorker.generate: reject when class has been disposed of or error is thrown in worker.
- GenerateMeshBVHWorker: ensure the root array buffers ate transfered when finishing construction.

## [0.5.10] - 2022-04-15
### Added
- `StaticGeometryGenerator` to enable skinned and morph target mesh support.

## [0.5.9] - 2022-04-11
### Fixed
- Incorrect return type for `computeBoundsTree`.

## [0.5.8] - 2022-03-27
### Fixed
- Improved type definitions.

### Changed
- GenerateMeshBVHWorker: Added "dispose" function. Deprecated "terminate" function.

## [0.5.7] - 2022-03-22
### Fixed
- WebWorker BVH generation not accounting for geometry groups.
- Export and document "OrientedBox" and "ExtendedTriangle" classes for more clarity and enable use of internal mathematical functions.

## [0.5.6] - 2022-03-15
### Fixed
- Case where `MeshBVH.closestPointToGeometry` would return an incorrect value.
- Automatically dispose of textures on update instead of just "needsUpdate".
- Case where `SeparatingAxisTriangle.intersectsTriangle` would return incorrect intersection lines. Performance of the function improved as a side effect.

## [0.5.5] - 2022-02-01
### Changed
- `onProgress` callback now always reports `1.0` when the BVH creation is complete instead of just passing intermmediate progress.

## [0.5.4] - 2022-01-20
### Fixed
- Removed use of `RGBFormat` and `RGBIntegerFormat` for compatibility with three.js r137.

## [0.5.3] - 2022-01-08
### Changed
- Improved SAH build time by ~20% by checking every triangle split once fewer than 8 triangles are present which also improves the split cost.
- GenerateMeshBVHWorker / MeshBVH: Add `onProgress` callback option to enable the ability to display BVH build percentage.

### Fixed
- MeshBVH.bvhcast incorrectly using the same geometry for both bvh.
- `shapecast` and `bvhcast` types to be more correct.

## [0.5.2] - 2021-11-02
### Fixed
- src/utils incorrectly being published as src/Utils in the previous release.

## [0.5.1] - 2021-11-02
### Added
- Typescript definition files.
- `VertexAttributeTexture`, `BVHStructUniform`, and associated helper shader functions for performing raytracing in a fragment shader.
- Warning when passing in an unknown split strategy option value.

### Changed
- `src/workers/GenerateMeshBVHWorker` to use a proper webworker syntax compatible with esm-capable bundlers.

## [0.5.0] - 2021-10-10
### Added
- `useSharedArrayBuffer` option to `MeshBVH` so `SharedArrayBuffers` are created rather than `ArrayBuffers` making it easier to share and reuse BVH memory across workers.
- SeparatingAxisTriangle.intersectsTriangle: added `target` field to retrieve the edge describing the intersection.
- "box" argument to shapecast "intersectsRange" function.
- `/* @__PURE__ */` indicator to reusable variables.

### Fixed
- `raycast` and `raycastFirst` not properly accounting for material sidedness with geometry groups.
- Case where the BVH root bounds would be incorrect if the geometry bounding box was incorrect / out of date.
- MeshBVH.closestPointTGeometry not returning a proper intersection point if triangles intersect.
- Shapecast function will now ensure a unique triangle / box is provided for each recursive call.
- Fix `GenerateMeshBVHWorker` not setting the geometry index correctly on return.

### Changed
- Changed function signature for `intersectsGeometry`, `shapecast`, `intersectsBox`, `intersectsSphere`, `closestPointToGeometry`, `closestPointToPoint`, `raycast`, and `raycastFirst`. Specifically at least the first "mesh" argument has been removed. Calling functions with the old signature will log a warning. See documentation for current signatures.
- `raycast` and `raycastFirst` now return hits in the local space of the geometry rather than world space when querying the BVH directly to conform with other cast functions. Results still match three.js' original results when using `Raycaster.intersectObject(s)` functions. See documentation for more details.
- `MeshBVHDebug` class has been removed and the function `getJSONStructure` and `validateBounds` are now exported individually.
- Small observed performance improvements possibly a result of simplified function arguments.
- The function signatures and options for `MeshBVH.serialize` and `MeshBVH.deserialize` have changed. See documentation for more new signature.
- Changed `refit` function to take just a single argument with traversed node indices. Calling the function with the old signature will log a warning. See documentation for current signature.

### Removed
- `distanceToGeometry` and `distanceToPoint` functions.

## [0.4.3] - 2021-08-20
### Fixed
- Fixed Surface Area Heuristic (SAH) split strategy to function correctly, improve build performance, and produce more optimal bounds and improved a memory footprint.

### Added
- Return "surfaceAreaCost" in returned `getBVHExtremes` object to compare BVH structure quality.
- Support for `displayEdges`, `meshMaterial`, and `edgeMaterial` to MeshBVHVisualizer to enable displaying bounds as solid meshes.

### Changed
- Deprecated the `getBVHExtremes` "total" return value in favor of `nodeCount`.

## [0.4.2] - 2021-08-04
### Fixed
- Case where `intersectsRangeFunc` could be passed the incorrect node id in shapecast.
- Bug in `distanceToGeometry` and `closestPointToGeometry` which would likely result in some closest points being missed. This fix greatly degrades performance in the case where the passed geometry does not have a BVH. It is recommended that the passed in geometry include a computed bounds tree.
- Cases where passed in geometry that did not include an index buffer could throw an error when calling functions like `closestPointToGeometry`.
- Case where raycastFirst would return the incorrect result.
- Greatly improved `MeshBVHVisualizer` render and update performance.
- Case where MeshBVHVisualizer would not correctly display a BVH for geometry with multiple groups.

### Added
- `distanceToGeometry` and `closestPointToGeometry` fast path when the passed in geometry has a bounds tree.
- Support for position BufferAttribute to be interleaved.

## [0.4.1] - 2021-06-21
### Changed
- package.json "main" field to use a .cjs file extension

## [0.4.0] - 2021-06-11
### Added
- `MeshBVH.refit` function to refit the bounds to modified vertices.
- `setBoundingBox` MeshBVH construction option.
- `MeshBVH.getBoundingBox` function.
- `intersectsRange` callback option to `MeshBVH.shapecast`.

### Changed
- Removed `src/worker/generateAsync.js` function. Use `GenerateMeshBVHWorker` instead.
- Use `type: module` in package.json to enable use of es6 modules in node.
- Add `sideEffects: false` to package.json.
- Remove ability to generate an unpacked BVH.
- Improved "closestPointToPoint" performance slightly.
- `MeshBVH.shapecast` to take an object of callback functions instead of a list of function arguments and the triangle intersection callback has been changed to take a single triangle index. See README for new API. Calls using the old function will log a warning.

### Fixed
- `MeshBVHVisualizer` not using the new geometry BVH if one was generated.
- `MeshBVHVisualizer` not using the new mesh if it was set.
- Case where passing in null `intersectsTriangleFunc` to `MeshBVH.shapecast` could throw an error.
- Case where the buffer being raycast against was not cleared correctly if a BVH had multiple roots.

## [0.3.7] - 2021-03-06
### Fixed
- Include built umd file including v0.3.6 changes.

## [0.3.6] - 2021-03-03
### Fixed
- Incorrect face index would be returned from intersection (related to three.js bug fixed in v0.126.1).

## [0.3.5] - 2021-02-28
### Fixed
- Case where `raycastFirst` failed to return a valid result.

## [0.3.4] - 2021-02-25
### Changed
- Raycast result to return a custom intersection object aligned with three.js v0.126.0.

## [0.3.3] - 2021-01-24
### Added
- `depth` argument to `intersectsBoundsFunc` and `intersectsTriangleFunc` of `shapecast`.
- "webvr" and "webxr" tags.
- `closestPointToSegment` function to the triangle object used during shapecast which can be used for capsule intersection detection.

## [0.3.2] - 2020-12-23
### Fixed
- Case where float 32 rounding error could result in leaf bounds not completely containing the triangles by expanding the bounds by an estimation of the error.

### Changed
- `Shapecast` `intersectsBoundsFunc` to return one of the `NOT_INTERSECTED`, `INTERSECTED`, or `CONTAINED` constants. Returning `true` and `false` currently retains the old functionality.

## [0.3.1] - 2020-12-14
### Added
- Performance improvements when computing distance to geometry.
- `shapecast` to the docs.
- `MeshBVHVisualizer` to exports.

### Fixed
- Cloning the bvh visualizer causing an error.
- Bug with shapecast function where one node would not be checked when using the node score function.

### Changed
- Change the bvh visualizer so it automatically copies the local position and rotation of the target mesh.

## [0.3.0] - 2020-12-01
### Added
- `generateAsync` function in the `/src/worker` folder to help generate BVHs asynchronously with WebWorkers.

### Changed
- three.js version to use v0.123.0, change `Matrix4.getInverse` to `Matrix4.invert`.

## [0.2.0] - 2020-02-07
### Added
- MeshBVH.serialize and deserialize functions so the bvh can be computed and transferred from a webworker.
- `lazyGeneration` (defaults to true) option for faster tree initialization.
- Support for a buffer-packed tree if `lazyGeneration` is false or a tree has been deserialized for a more smaller memory footprint.

### Changed
- CENTER tree computation to improve raycast performance and create more balanced trees.

## [0.1.5] - 2020-01-03
### Fixed
- Uglify warning for inline defined functions.

## [0.1.4] - 2019-08-31
### Changed
- Changed three.js peer dependency version from ^ to >= to prevent warnings.

## [0.1.3] - 2019-05-24
### Added
- Use the BufferGeometry bounding box if it exists and set it if it does not.

### Changed
- Use the center of the triangles bounding box instead of the average of the vertices as the triangles center when binning the polygons.

## [0.1.2] - 2019-03-17
### Fixed
- Bug where `closestPointToGeometry` would throw an error when target vectors were provided because a function name was misspelled.

## [0.1.1] - 2019-03-16
### Added
- API for performing intersecting boxes, spheres, and geometry.
- API for checking the distance to geometry and points.

### Fixed
- Fixed issue where an index buffer of the incorrect type was created if there were more than 2^16 vertices.
- Fixed MeshBVHVisualizer not visualizing all the groups in the bvh.

## [0.1.0] - 2019-02-28
### Added
- Error conditions when using `InterleavedAttributeBuffers` for both index and position geometry attributes.
- The geometry index attribute is modified when building the `MeshBVH`. And index attribute is created on geometry if it does not exist.

### Fixed
- Fix the bounds tree not respecting groups

## [0.0.2] - 2019-01-05
### Added
- Add included files array to package.json.

// import * as THREE from 'three'
import { BoxGeometry, MeshBasicMaterial, Mesh, Group,
  PerspectiveCamera, Scene, WebGLRenderer, Clock } from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class MyScene {
constructor(meshes) {
this.meshes = meshes;
this.canvas = document.querySelector('canvas.webgl');
this.rotation = 0;
this.scene = new Scene()
this.sizes = { width: window.innerWidth, height: 600 };
this.cursor = { x: 0, y: 0 };
this.cubesGroup = this._addCubes(this.scene, meshes);
this.camera = this._addCamera(this.scene, this.sizes);
this.renderer = this._addRenderer(this.sizes);
this._render(this.scene, this.camera);

this.clock = new Clock();
this.controls = new OrbitControls(this.camera, this.canvas);
this.controls.enableDamping = true;
this.animate();
}

animate() {
this.controls.update()
this._render(this.scene, this.camera);
window.requestAnimationFrame(() => this.animate());
}

_addCubes = (scene, meshes) => {
let group = new Group();
scene.add(group);

meshes.forEach(({ color, pos}) => {
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color });
const cube = new Mesh(geometry, material);
cube.position.set(pos, 0, -3);
cube.rotation.set(this.rotation, this.rotation, this.rotation);
group.add(cube);
});
return group;  
}

_addCamera = (scene, sizes) => {
let aspectRatio = sizes.width / sizes.height;
let camera = new PerspectiveCamera(75 , aspectRatio, 0.1, 50);
camera.position.set(0, 0, 3);
camera.lookAt(this.cubesGroup.children[2].position);
scene.add(camera);
return camera;
}

_addRenderer = (sizes) => {
const renderer = new WebGLRenderer({ canvas: this.canvas })
renderer.setSize(sizes.width, sizes.height);
return renderer;
}

_render = (scene, camera) => {
this.renderer.render(scene, camera);
}
}

let createCubes = () => {
new MyScene([
{ color: 'purple', pos: -4 },
{ color: 'blue'  , pos: -2 },
{ color: 'red'   , pos:  0 },
{ color: 'green' , pos:  2 },
{ color: 'orange', pos:  4 },
]);
};

export { createCubes }
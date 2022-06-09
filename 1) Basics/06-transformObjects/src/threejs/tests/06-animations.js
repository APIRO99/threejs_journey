import * as THREE from 'three'
import { BoxGeometry, MeshBasicMaterial, Mesh, Group } from 'three'

class MyScene {
  constructor(meshes) {
    this.rotation = 0;
    this.scene = new THREE.Scene()
    this.sizes = { width: 800, height: 600 };
    this.cubesGroup = this._addCubes(this.scene, meshes);
    this.camera = this._addCamera(this.scene, this.sizes);
    this.renderer = this._addRenderer(this.sizes);
    this._render(this.scene, this.camera);
  }

  update() {
    this.cubesGroup.children.map(cube => {
      cube.rotation.set(this.rotation, this.rotation, this.rotation);
    });
    this.rotation += 0.01;
    this._render(this.scene, this.camera);
  }

  _addCubes = (scene, meshes) => {
    let group = new Group();
    scene.add(group);
  
    meshes.map(({ color, pos}) => {
      const geometry = new BoxGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({ color });
      const cube = new Mesh(geometry, material);
      cube.position.set(pos, 0, -3);
      cube.rotation.set(this.rotation, this.rotation, this.rotation);
      group.add(cube);
      return cube;
    });
    return group;  
  }
  
  _addCamera = (scene, sizes) => {
    let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);
    return camera;
  }

  _addRenderer = (sizes) => {
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('canvas.webgl')
    })
    renderer.setSize(sizes.width, sizes.height);
    return renderer;
  }
  
  _render = (scene, camera) => {
    this.renderer.render(scene, camera);
  }
}


let createCubes = () => {
  let threeScene = new MyScene([
    { color: 'blue'  , pos: -2 },
    { color: 'red'   , pos:  0 },
    { color: 'green' , pos:  2 },
    { color: 'purple', pos: -4 },
    { color: 'orange', pos:  4 },
  ]);
  let interval = setInterval(threeScene.update.bind(threeScene), 1);
  return () => clearInterval(interval);
};

export { createCubes }
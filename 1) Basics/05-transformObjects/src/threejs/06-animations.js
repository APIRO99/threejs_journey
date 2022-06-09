// import * as THREE from 'three'
import { BoxGeometry, MeshBasicMaterial, Mesh, Group,
         PerspectiveCamera, Scene, WebGLRenderer, Clock, Vector3  } from 'three'
import gsap from 'gsap';

class MyScene {
  constructor(meshes) {
    this.meshes = meshes;
    this.rotation = 0;
    this.scene = new Scene()
    this.sizes = { width: 800, height: 600 };
    this.cubesGroup = this._addCubes(this.scene, meshes);
    this.camera = this._addCamera(this.scene, this.sizes);
    this.renderer = this._addRenderer(this.sizes);
    this._render(this.scene, this.camera);

    this.clock = new Clock();
    this.animate();
    this.animateWithGsap();
  }

  animate() {
    // this.cubesGroup.children.forEach((cube, idx) => {
    //   cube.rotation.set(this.rotation, -this.rotation, this.rotation);
    //   cube.position.y = Math.sin(this.rotation);
    //   cube.position.x = this.meshes[idx].pos + Math.cos(this.rotation);
    // });
    // this.rotation = this.clock.getElapsedTime();
    this._render(this.scene, this.camera);
    window.requestAnimationFrame(() => this.animate());
  }

  async animateWithGsap() {

    this.              animatePos(this.cubesGroup.children[0], Math.floor(Math.random() * 8) - 4)
      .then(() => this.animatePos(this.cubesGroup.children[1], Math.floor(Math.random() * 8) - 4))
      .then(() => this.animatePos(this.cubesGroup.children[2], Math.floor(Math.random() * 8) - 4))
      .then(() => this.animatePos(this.cubesGroup.children[3], Math.floor(Math.random() * 8) - 4))
      .then(() => this.animatePos(this.cubesGroup.children[4], Math.floor(Math.random() * 8) - 4))
      .then(() => this.animateWithGsap());
  }

  async animatePos(obj, posY) {
    return new Promise((resolve, reject) => {
      gsap.to(obj.position, {
        duration: 0.3,
        // delay: 0.5,
        y: posY,
        onComplete: () => resolve()
      });
    });
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
    let camera = new PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);
    return camera;
  }

  _addRenderer = (sizes) => {
    const renderer = new WebGLRenderer({
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
  new MyScene([
    { color: 'purple', pos: -4 },
    { color: 'blue'  , pos: -2 },
    { color: 'red'   , pos:  0 },
    { color: 'green' , pos:  2 },
    { color: 'orange', pos:  4 },
  ]);
};

export { createCubes }
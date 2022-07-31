// import * as THREE from 'three'
import { BoxGeometry, MeshBasicMaterial, Mesh, Group,
         PerspectiveCamera, Scene, WebGLRenderer, Clock,
         OrthographicCamera } from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class MyScene {
  constructor(meshes) {
    this.meshes = meshes;
    this.canvas = document.querySelector('canvas.webgl');
    this.rotation = 0;
    this.scene = new Scene()
    this.sizes = { width: window.innerWidth-15, height: 600 };
    this.cursor = { x: 0, y: 0 };
    this.cubesGroup = this._addCubes(this.scene, meshes);
    this.camera = this._addCamera(this.scene, this.sizes);
    this.renderer = this._addRenderer(this.sizes);
    this._render(this.scene, this.camera);

    this.clock = new Clock();
    // this._mouseMoveEvent();
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.animate();
  }

  // animate() {
  //   // Cube
  //   // this.cubesGroup.children.forEach((cube, idx) => {
  //     // cube.rotation.set(0, this.rotation, 0);
  //   // });
  //   // this.rotation = this.clock.getElapsedTime();
    
  //   // Camera
  //   let x = Math.sin(this.cursor.x * Math.PI * 2) * 2;
  //   let z = Math.cos(this.cursor.x * Math.PI * 2) * 2;
  //   let y = this.cursor.y * 5;
  //   this.camera.position.set(x, y, z);
  //   this.camera.lookAt(this.cubesGroup.children[2].position);
    
  //   // Render
  //   this._render(this.scene, this.camera);
  //   window.requestAnimationFrame(() => this.animate());
  // }

  animate() {
    this.controls.update()
    this._render(this.scene, this.camera);
    window.requestAnimationFrame(() => this.animate());
  }



  // _mouseMoveEvent() {
  //   window.addEventListener('mousemove', (e) => {
  //     this.cursor.x = (Math.round( (e.clientX/this.sizes.width) * 10000) / 10000) - 0.5;
  //     this.cursor.y = ((Math.round( (e.clientY/this.sizes.height) * 10000) / 10000) - 0.5) * -1;
  //   })
  // };

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
    // let camera = new OrthographicCamera(-5* aspectRatio, 5* aspectRatio, 5, -5, 0.1, 50);
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
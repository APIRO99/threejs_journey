import { Isizes } from 'react-app-env';
import * as THREE from 'three'
// import gsap from 'gsap';

class Scene {
  canvas:HTMLCanvasElement;
  sizes:Isizes = { width: 800, height: 600 };
  elements:Array<THREE.Mesh> = [];
  clock:THREE.Clock = new THREE.Clock();
  
  scene!:THREE.Scene;
  camera!:THREE.Camera;
  renderer!:THREE.Renderer;
  
  constructor(canvas:HTMLCanvasElement){
    this.canvas = canvas;
    this
      ._createScene()
      ._createCamera()
      ._createRenderer()
      .createObjects();

    this._tick(this.clock.getDelta());
    // this.gsapAnimate();
  }

  // Core Scene ====================================
  _createScene():Scene {
    this.scene = new THREE.Scene();
    return this;
  }

  _createCamera():Scene {
    const fov = 75;
    const aspectRatio = this.sizes.width/ this.sizes.height;
    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio);
    this.scene.add(this.camera);
    this.camera.position.set(0, 0, 3);
    return this;
  }

  _createRenderer():Scene {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas})
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this._render()
    return this;
  }

  _render():void {
    this.renderer.render(this.scene, this.camera);
  }

  _tick(dt:number):void {
    this.animate(dt);
    this._render();
    window.requestAnimationFrame(this._tick.bind(this, this.clock.getDelta()));
  }

  // ===============================================

  createObjects():void {
    const cube1 = this.createCube('red');
    this.scene.add(cube1);
    this.elements.push(cube1);
    this._render()
  }

  createCube(color:string):THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color});
    return new THREE.Mesh(geometry, material);
  }

  animate(dt:number):void {
    this.elements[0].rotation.y += dt * Math.PI / 2;
    this.elements[0].position.y = Math.sin(this.clock.elapsedTime);
    this.elements[0].position.x = Math.cos(this.clock.elapsedTime);

    // @ts-ignore
    this.elements[0].material.color.setRGB(
      Math.sin(this.clock.elapsedTime),
      0,
      Math.sin(-this.clock.elapsedTime),
    );
    // console.log((this.elements[0].rotation.y).toFixed());
  }

  // gsapAnimate():void {
  //   gsap.to(this.elements[0].position, { duration: 1, delay: 1, x: 2 })
  //   gsap.to(this.elements[0].position, { duration: 1, delay: 2, x: 0 })
  // }

}

export default Scene
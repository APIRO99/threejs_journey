import { Isizes } from 'react-app-env';
import * as THREE from 'three'

class Scene {
  canvas:HTMLCanvasElement;
  sizes:Isizes = { width: 800, height: 600 };
  scene!:THREE.Scene;
  elements!:Array<THREE.Mesh|THREE.Group>;
  camera!:THREE.Camera;
  renderer!:THREE.Renderer;

  constructor(canvas:HTMLCanvasElement){
    this.canvas = canvas;
    this
      ._createScene()
      ._createCamera()
      ._createRenderer()
      .createObjects();
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
  // ===============================================

  createObjects():void {
    let group = new THREE.Group();
    this.scene.add(group);
    const cube1 = this.createCube('red');
    const cube2 = this.createCube('blue');
    const cube3 = this.createCube('yellow');
    group.add(cube1, cube2, cube3);
    cube1.position.set(0,0,0);
    cube2.position.set(2,0,0);
    cube3.position.set(-2,0,0);
    this.elements = [group];
    this._render()
  }

  createCube(color:string):THREE.Mesh {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color});
    return new THREE.Mesh(geometry, material);
  }

}

export default Scene
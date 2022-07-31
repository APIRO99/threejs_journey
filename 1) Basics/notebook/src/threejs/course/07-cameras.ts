import { Isizes } from 'react-app-env';
import * as THREE from 'three'

class Scene {
  canvas:HTMLCanvasElement;
  sizes:Isizes = { width: 800, height: 600 };
  elements:Array<THREE.Mesh> = [];
  clock:THREE.Clock = new THREE.Clock();
  
  scene!:THREE.Scene;
  camera!:THREE.PerspectiveCamera;
  renderer!:THREE.Renderer;

  constructor(canvas:HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = this._createScene();
    this.elements = this._createObjects();
    this.camera = this._createCamera();
    this.renderer = this._createRender();
    this.renderer.render(this.scene, this.camera);
  }

  // Core Scene =====================================
  _createScene() {
    return new THREE.Scene();
  }

  _createObjects() {
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({ color: 'red' })
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    return [mesh];
  }

  _createCamera() {
    const fov = 75;
    const aspectRatio = this.sizes.width/this.sizes.height;
    const camera = new THREE.PerspectiveCamera(fov, aspectRatio); 
    this.scene.add(camera);
    camera.position.set(0, 0, 4);
    return camera;
  }

  _createRender() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    })
    renderer.setSize(this.sizes.width, this.sizes.height);
    return renderer;
  }
  // ===============================================

}

export default Scene;
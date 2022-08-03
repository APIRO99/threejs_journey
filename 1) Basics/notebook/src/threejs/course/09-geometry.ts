import { Isizes } from 'react-app-env';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



class Scene {
  canvas:HTMLCanvasElement;
  sizes:Isizes = { width: 800, height: 600 };
  // sizes:Isizes = { width: window.innerWidth, height: window.innerHeight };
  elements:Array<THREE.Mesh> = [];
  clock:THREE.Clock = new THREE.Clock();
  
  scene!:THREE.Scene;
  camera!:THREE.PerspectiveCamera;
  renderer!:THREE.Renderer;
  contorls!:OrbitControls;

  constructor(canvas:HTMLCanvasElement){
    this.canvas = canvas;
    this.sizes.width = this.canvas.parentElement?.clientWidth || 800;
    this.sizes.height = this.canvas.parentElement?.clientHeight || 600;
    this
      ._createScene()
      ._createCamera()
      ._createRenderer()
      ._subscribeResize()
      ._subscribeFullScreen()
      .createObjects();

    this._tick(this.clock.getDelta());
  }

  // Core Scene ====================================
  _createScene():Scene {
    this.scene = new THREE.Scene();
    return this;
  }

  _createCamera():Scene {
    const fov = 120;
    const aspectRatio = this.sizes.width/ this.sizes.height;
    let near = 0.1;
    let far = 20;
    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    // this.camera = new THREE.OrthographicCamera(-5, 5, 5, -5, near, far);
    this.scene.add(this.camera);
    this.camera.position.set(0, 0, 2);
    this.contorls = new OrbitControls(this.camera, this.canvas);
    this.contorls.enableDamping = true;
    return this;
  }

  _createRenderer():Scene {
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas})
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // @ts-ignore
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._render();
    return this;
  }

  _render():void {
    this.renderer.render(this.scene, this.camera);
  }

  _tick(dt:number):void {
    this.animate(dt);
    this._render();
    this.contorls.update();
    window.requestAnimationFrame(this._tick.bind(this, this.clock.getDelta()));
  }

  _subscribeResize():Scene {
    window.addEventListener('resize', () => {
      // Update sizes
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      // @ts-ignore
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })
    return this;
  }

  _subscribeFullScreen():Scene {
    window.addEventListener('dblclick', () => {
      if(!document.fullscreenElement) this.canvas.requestFullscreen()
      else document.exitFullscreen()
    })
    return this;
  }
  // ===============================================

  createObjects():void {
    const cube1 = this.createCube('red');
    this.scene.add(cube1);
    this.elements.push(cube1);
    this._render()
  }

  // createCube(color:string):THREE.Mesh {
  //   let wireframe = true;
  //   const geometry = new THREE.BoxGeometry(1,1,1,1,1,1);
  //   const material = new THREE.MeshBasicMaterial({color, wireframe});
  //   return new THREE.Mesh(geometry, material);
  // }

  createCube(color:string):THREE.Mesh {
    let wireframe = true;
    const geometry = new THREE.BufferGeometry();

    let tc = 7;
    const triangles = Float32Array.from({length: tc*3*3}, () => Math.random());
    // const triangles = new Float32Array([
    //   0,0,0,
    //   0,1,0,
    //   1,0,0,
    //   1,0,0,
    //   0,1,0,
    //   2,1,1,
    //   1,0,0,
    //   2,1,1,
    //   0,0,0,
    // ]);
    console.log(triangles);

    const positionAttributes = new THREE.BufferAttribute(triangles, 3);
    geometry.setAttribute('position', positionAttributes); 


    // const geometry = new THREE.BoxGeometry(1,1,1,1,1,1);
    const material = new THREE.MeshBasicMaterial({color, wireframe});
    return new THREE.Mesh(geometry, material);
  }

  // createCube(color:string):THREE.Mesh {
  //   const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  //   const material = new THREE.MeshBasicMaterial({color});
  //   let mesh = new THREE.Mesh(geometry, material);
  //   mesh.scale.set(0.07, 0.07, 0.07);
  //   return mesh; 
  // }

  animate(dt:number):void {
    this.elements[0].rotation.y += dt * Math.PI / 4;
    this.camera.lookAt(this.elements[0].position);
  }
}

export default Scene
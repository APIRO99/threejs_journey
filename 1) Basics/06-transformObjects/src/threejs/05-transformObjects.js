import * as THREE from 'three'
import { BoxGeometry, MeshBasicMaterial, Mesh, Group } from 'three'

let renderCubes = (meshes) => {
  const scene = new THREE.Scene()
  const sizes = { width: 800, height: 600 };
  _addCubes(scene, meshes);
  const camera = _addCamera(scene, sizes);
  _render(sizes, scene, camera);
}

let _addCubes = (scene, meshes) => {
  let group = new Group();
  scene.add(group);

  meshes.map(({rotation, color, pos}) => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color });
    const cube = new Mesh(geometry, material);
    cube.position.set(pos, 0, -3);
    cube.rotation.set(rotation, rotation, rotation);
    group.add(cube);
    return cube;
  });
  return group;  
}

let _addCamera = (scene, sizes) => {
  let camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  scene.add(camera);
  return camera;
}

let _render = (sizes, scene, camera) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera);
}

let createCubes = () => {
  let rotation = 0;
  let interval = setInterval(() => {
    renderCubes([
      { rotation, color: 'blue' , pos: -2 },
      { rotation, color: 'red'  , pos:  0 },
      { rotation, color: 'green', pos:  2 },
    ])
    rotation += 0.01;
  }, 10);
  return () => clearInterval(interval);
};

export { renderCubes, createCubes }
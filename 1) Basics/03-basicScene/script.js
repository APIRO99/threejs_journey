// My first three js scripts
let canvas = document.querySelector('.webgl');

let scene = new THREE.Scene();

// Creates the geometry, the material, and the mesh of the cube
let geomrty = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 'red' });
let cube = new THREE.Mesh(geomrty, material);
scene.add(cube);
cube.position.z = -3;

// Camera
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);

let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);
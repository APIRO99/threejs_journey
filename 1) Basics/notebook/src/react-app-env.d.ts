/// <reference types="react-scripts" />

import * as THREE from 'three'

// declare module 'three';

type Isizes = {
  width: number,
  height: number
};

type IScene = {
  instance: {
    canvas:HTMLCanvasElement;
    sizes:Isizes = { width: 800, height: 600 };
    scene:THREE.Scene;
    elements:Array<THREE.Mesh|THREE.Group> = [];
    camera:THREE.Camera;
    renderer:THREE.Renderer;
    clock:THREE.Clock;
  },
};
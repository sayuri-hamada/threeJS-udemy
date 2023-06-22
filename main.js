import './style.css'

import * as THREE from 'three';

let scene, camera, renderer;

// シーンを追加
scene = new THREE.Scene();

// カメラを追加
camera = new THREE.PerspectiveCamera(
  50, //視野角
  window.innerWidth / window.innerHeight, //アスペクト比
  0.1, //開始距離
  1000 //終了距離
);

// レンダラーを追加
renderer = new THREE.WebGLRenderer();
// レンダラーのサイズを調整
renderer.setSize(window.innerWidth, window.innerHeight);
// DOM追加
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

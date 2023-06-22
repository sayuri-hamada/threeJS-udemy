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
renderer = new THREE.WebGLRenderer({alpha: true});
// レンダラーのサイズを調整
renderer.setSize(window.innerWidth, window.innerHeight);
// DOM追加
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

// ジオメトリを作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32) // 半径、ポリゴンの数（大きくするとより球体に近づく）
// マテリアルを作成
let ballMaterial = new THREE.MeshPhysicalMaterial();

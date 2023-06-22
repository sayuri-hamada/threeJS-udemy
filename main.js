import './style.css'

import * as THREE from 'three';

let scene, camera;

// シーンを追加
scene = new THREE.Scene();

// カメラを追加
camera = new THREE.PerspectiveCamera(
  50, //視野角
  window.innerWidth / window.innerHeight, //アスペクト比
  0.1, //開始距離
  1000 //終了距離
);

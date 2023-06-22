import './style.css'

import * as THREE from 'three';

let scene, camera, renderer, pointLight;

// シーンを追加
scene = new THREE.Scene();

// カメラを追加
camera = new THREE.PerspectiveCamera(
  50, //視野角
  window.innerWidth / window.innerHeight, //アスペクト比
  0.1, //開始距離
  1000 //終了距離
);
camera.position.set(0, 0, 500);

// レンダラーを追加
renderer = new THREE.WebGLRenderer({alpha: true});
// レンダラーのサイズを調整
renderer.setSize(window.innerWidth, window.innerHeight);
// DOM追加
document.body.appendChild(renderer.domElement);

// ジオメトリを作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32) // 半径、ポリゴンの数（大きくするとより球体に近づく）

// マテリアルを作成
let ballMaterial = new THREE.MeshPhysicalMaterial();

// メッシュ化してみよう
let ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

scene.add(ballMesh);

// 平行光源を追加してみよう
let directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// ポイント光源を追加してみよう
pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(-200, -200, -200);
scene.add(pointLight);

// レンダリングしてみよう
renderer.render(scene, camera);

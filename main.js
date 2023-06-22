import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, pointLight, controls;

window.addEventListener('load', init());


function init() {
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
  // 解像度を調整
  renderer.setPixelRatio(window.devicePixelRatio);
  // DOM追加
  document.body.appendChild(renderer.domElement);

  // テクスチャーを追加してみよう
  let textures = new THREE.TextureLoader().load('/textures/earth.jpg');

  // ジオメトリを作成
  let ballGeometry = new THREE.SphereGeometry(100, 64, 32) // 半径、ポリゴンの数（大きくするとより球体に近づく）

  // マテリアルを作成
  let ballMaterial = new THREE.MeshPhysicalMaterial({map: textures});

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

  // ポイント光源がどこにあるのかを特定する
  let pointLightHelper = new THREE.PointLightHelper(pointLight, 30);
  scene.add(pointLightHelper);

  // マウス操作ができるようにする
  controls = new OrbitControls(camera, renderer.domElement);

  animate();
}



// let rot = 0;

function animate() {
  // ポイント光源を球の周りを巡回させよう
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500),
  );

  // カメラを回転させてみよう
  // rot += 0.5;
  // let radian = rot * (Math.PI / 180); //ラジアンに変換
  // camera.position.x = Math.sin(radian) * 500;
  // camera.position.z = Math.cos(radian) * 500;
  // camera.lookAt(ballMesh.position);

  // レンダリングしてみよう
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}





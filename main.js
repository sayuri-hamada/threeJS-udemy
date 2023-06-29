import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import GUI from 'lil-gui';


//UIデバッグ
const gui = new GUI();

//サイズ
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//シーン
const scene = new THREE.Scene();

//カメラ
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 2);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

/**
 * テクスチャ設定
 * /

/**
 * パーティクルを作ってみよう
 */
// ジオメトリ
const particleGeometry = new THREE.SphereGeometry(1, 16, 32);

// マテリアル
const pointMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true
})

// メッシュ化
const particles = new THREE.Points(particleGeometry, pointMaterial);

scene.add(particles);

//マウス操作
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

window.addEventListener("resize", onWindowResize);

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
}

animate();

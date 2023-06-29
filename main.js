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
 **/
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load('/textures/particles/9.png')

/**
 * パーティクルを作ってみよう
 */
// ジオメトリ
const particleGeometry = new THREE.BufferGeometry();
const count = 10000;

const positionArray = new Float32Array(count * 3);
const colotArray = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 10;
  colotArray[i] = Math.random();
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colotArray, 3));

// 球を作成してみる
const cube = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshNormalMaterial()
);

// マテリアル
const pointMaterial = new THREE.PointsMaterial({
  size: 0.15,
  sizeAttenuation: true,
  transparent: true,
  alphaMap: particlesTexture,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  vertexColors: true,
  blending: THREE.AdditiveBlending
})
// pointMaterial.map = particlesTexture;
// pointMaterial.color.set('green');

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

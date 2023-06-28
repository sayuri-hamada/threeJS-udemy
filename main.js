import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// let cusorX = 0;
// let cusorY = 0;
// window.addEventListener('mousemove', (event) => {
//   cusorX = event.clientX / sizes.width - 0.5;
//   cusorY = event.clientY / sizes.width - 0.5;
// })


//サイズ
const sizes = {
  width: 800,
  height: 600,
};

//シーン
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const materila = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: false,
});

//オブジェクト
const mesh = new THREE.Mesh(geometry, materila);
scene.add(mesh);

//カメラ
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

//レンダラー
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.body.appendChild(renderer.domElement);

// カメラ制御
new OrbitControls(camera, renderer.domElement);

//アニメーション
const animate = () => {
  // カメラの制御
  // camera.position.x = cusorX * 3;
  // camera.position.y = cusorY * 3;
  // camera.position.x = Math.sin(Math.PI * 2 + cusorX) * 3;
  // camera.position.z = Math.cos(Math.PI * 2 + cusorX) * 3;
  // camera.position.y = cusorY * 5;
  // camera.lookAt(mesh.position);
  //レンダリング
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();

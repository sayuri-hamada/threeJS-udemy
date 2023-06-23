import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let scene, camera, renderer, pointLight, controls, sphere, plane, octahedron;

window.addEventListener("load", init);

function init() {
  //シーン
  scene = new THREE.Scene();

  //カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  /**
   * マテリアルセクション
   */

  // ジオメトリー
  const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  const octahedronGeomtry = new THREE.OctahedronGeometry(0.5);

  // テクスチャ
  const texture = new THREE.TextureLoader().load('/textures/brick.jpg')

  // マテリアル
  // const material = new THREE.MeshBasicMaterial({
  //   // color: 0x0000ff
  //   map: texture
  // });

  // material.color = new THREE.Color('red');
  // material.wireframe = true;

  // material.opacity = 0.5;
  // material.transparent = true;

  // const material = new THREE.MeshNormalMaterial();
  // material.flatShading = true;

  const material = new THREE.MeshStandardMaterial();
  material.side = THREE.DoubleSide; //プレーンジオメトリの裏側を見ることが可能
  // material.color.set('#049ef4');
  material.roughness = 0.34; // マテリアルの荒さ = 小さくなればなるほど光沢が見えるようになる
  material.metalness = 0.64; //金属製を持たせる
  material.map = texture;

  // 明かりを追加してみよう
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(1, 2, 3);
  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  scene.add(pointLightHelper);

  // メッシュ化
  sphere = new THREE.Mesh(sphereGeometry, material);
  plane = new THREE.Mesh(planeGeometry, material);
  octahedron = new THREE.Mesh(octahedronGeomtry, material);

  sphere.position.x = -1.5;
  octahedron.position.x = 1.5;

  scene.add(sphere, plane, octahedron);


  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // オブジェクトを回転させる
  sphere.rotation.x = elapsedTime;
  plane.rotation.x = elapsedTime;
  octahedron.rotation.x = elapsedTime;

  sphere.rotation.y = elapsedTime;
  plane.rotation.y = elapsedTime;
  octahedron.rotation.y = elapsedTime;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

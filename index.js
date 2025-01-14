import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// Kích thước cửa sổ
const w = window.innerWidth;
const h = window.innerHeight;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Scene
const scene = new THREE.Scene();

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Geometry và Material
const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
const currentHour = new Date().getHours();
const texturePath = currentHour >= 6 && currentHour < 18 ? "/8k_earth_daymap.jpg" : "/8k_earth_nightmap.jpg";
const earthTexture = new THREE.TextureLoader().load(texturePath);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

// Mesh Trái Đất
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// Ánh sáng
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(hemiLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Hàm animate
function animate() {
  requestAnimationFrame(animate);

  // Quay Trái Đất
  earthMesh.rotation.y += 0.005;

  // Render
  renderer.render(scene, camera);
  controls.update();
}
animate();

// Xử lý thay đổi kích thước cửa sổ
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

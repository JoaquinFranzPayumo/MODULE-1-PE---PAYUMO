// Import from jsdelivr CDN
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera setup
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 8, 15);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(10, 15, 10);
scene.add(pointLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(30, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Walls
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), wallMaterial);
backWall.position.set(0, 5, -10);
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-15, 5, 0);
scene.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), wallMaterial);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.set(15, 5, 0);
scene.add(rightWall);

// Bed
const bedFrameGeometry = new THREE.BoxGeometry(6, 1, 3);
const bedFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const bedFrame = new THREE.Mesh(bedFrameGeometry, bedFrameMaterial);
bedFrame.position.set(-8, 0.5, -5);
scene.add(bedFrame);

const mattressGeometry = new THREE.BoxGeometry(5.8, 0.6, 2.8);
const mattressMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
mattress.position.set(-8, 1.2, -5);
scene.add(mattress);

const pillowGeometry = new THREE.BoxGeometry(1.5, 0.4, 0.8);
const pillowMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
pillow.position.set(-8, 1.6, -3.8);
scene.add(pillow);

// Desk
const deskGeometry = new THREE.BoxGeometry(4, 0.3, 2);
const deskMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
const desk = new THREE.Mesh(deskGeometry, deskMaterial);
desk.position.set(6, 2, -5);
scene.add(desk);

const legGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
for (let i = -1; i <= 1; i += 2) {
  for (let j = -1; j <= 1; j += 2) {
    const leg = new THREE.Mesh(legGeometry, deskMaterial);
    leg.position.set(6 + i * 1.8, 1, -5 + j * 0.9);
    scene.add(leg);
  }
}

// Monitor
const monitorGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
const monitorMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
monitor.position.set(6, 3, -4.9);
scene.add(monitor);

// Chair
const chairSeatGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
chairSeat.position.set(6, 1, -2);
scene.add(chairSeat);

const chairBackGeometry = new THREE.BoxGeometry(1.5, 2, 0.2);
const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
chairBack.position.set(6, 2, -2.7);
scene.add(chairBack);

// Windows
const windowGeometry = new THREE.PlaneGeometry(4, 3);
const windowMaterial = new THREE.MeshStandardMaterial({
  color: 0x87ceeb,
  transparent: true,
  opacity: 0.6
});

const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
window1.position.set(0, 6, -9.9);
scene.add(window1);

const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
window2.position.set(-10, 6, -9.9);
scene.add(window2);

// Extras: Lamp
const lampBaseGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2);
const lampBase = new THREE.Mesh(lampBaseGeometry, chairMaterial);
lampBase.position.set(8, 2, -5);
scene.add(lampBase);

const lampShadeGeometry = new THREE.ConeGeometry(1, 1, 16);
const lampShade = new THREE.Mesh(lampShadeGeometry, new THREE.MeshStandardMaterial({ color: 0xffff00 }));
lampShade.position.set(8, 3, -5);
scene.add(lampShade);

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// === Basic Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Lighting ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(5, 8, 5);
scene.add(pointLight);

// === Room (walls + floor + ceiling) ===
const roomMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 });
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });

const room = new THREE.Group();

// Floor
const floor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5, 20), floorMaterial);
floor.position.y = -0.25;
room.add(floor);

// Walls
const wallThickness = 0.5;
const wallHeight = 8;
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

const backWall = new THREE.Mesh(new THREE.BoxGeometry(20, wallHeight, wallThickness), wallMaterial);
backWall.position.set(0, wallHeight / 2, -10);
room.add(backWall);

const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, 20), wallMaterial);
leftWall.position.set(-10, wallHeight / 2, 0);
room.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, 20), wallMaterial);
rightWall.position.set(10, wallHeight / 2, 0);
room.add(rightWall);

const ceiling = new THREE.Mesh(new THREE.BoxGeometry(20, wallThickness, 20), wallMaterial);
ceiling.position.set(0, wallHeight, 0);
room.add(ceiling);

scene.add(room);

// === Bed ===
const bedGroup = new THREE.Group();

const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(6, 1, 3), new THREE.MeshLambertMaterial({ color: 0x8b5a2b }));
bedFrame.position.set(-5, 0.5, 0);
bedGroup.add(bedFrame);

const mattress = new THREE.Mesh(new THREE.BoxGeometry(6, 0.5, 3), new THREE.MeshLambertMaterial({ color: 0xffffff }));
mattress.position.set(-5, 1.25, 0);
bedGroup.add(mattress);

const pillow = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 1), new THREE.MeshLambertMaterial({ color: 0xeeeeee }));
pillow.position.set(-6.5, 1.5, 0);
bedGroup.add(pillow);

scene.add(bedGroup);

// === Study Area ===
const deskGroup = new THREE.Group();

const desk = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 2), new THREE.MeshLambertMaterial({ color: 0x654321 }));
desk.position.set(4, 2, 0);
deskGroup.add(desk);

const deskLeg1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2, 0.2), new THREE.MeshLambertMaterial({ color: 0x654321 }));
deskLeg1.position.set(2.2, 1, -0.9);
deskGroup.add(deskLeg1);

const deskLeg2 = deskLeg1.clone();
deskLeg2.position.set(5.8, 1, -0.9);
deskGroup.add(deskLeg2);

const deskLeg3 = deskLeg1.clone();
deskLeg3.position.set(2.2, 1, 0.9);
deskGroup.add(deskLeg3);

const deskLeg4 = deskLeg1.clone();
deskLeg4.position.set(5.8, 1, 0.9);
deskGroup.add(deskLeg4);

// Monitor
const monitor = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 0.1), new THREE.MeshLambertMaterial({ color: 0x000000 }));
monitor.position.set(4, 3, 0);
deskGroup.add(monitor);

// Chair
const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.2, 1.5), new THREE.MeshLambertMaterial({ color: 0x333333 }));
chairSeat.position.set(4, 1, -3);
deskGroup.add(chairSeat);

const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 0.2), new THREE.MeshLambertMaterial({ color: 0x333333 }));
chairBack.position.set(4, 2, -3.6);
deskGroup.add(chairBack);

scene.add(deskGroup);

// === Window ===
const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 0.2), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }));
windowFrame.position.set(0, 4, -9.9);
scene.add(windowFrame);

const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.5, 0.1), new THREE.MeshLambertMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.6 }));
windowGlass.position.set(0, 4, -10);
scene.add(windowGlass);

// === Extras: Lamp ===
const lampStand = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2), new THREE.MeshLambertMaterial({ color: 0x000000 }));
lampStand.position.set(-2, 2, 4);

const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1, 16), new THREE.MeshLambertMaterial({ color: 0xffffaa }));
lampShade.position.set(-2, 3, 4);

scene.add(lampStand, lampShade);

// === Animation Loop ===
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// === Responsiveness ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

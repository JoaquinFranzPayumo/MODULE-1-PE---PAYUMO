// === Scene Setup ===
// The "scene" is the virtual container for all objects, lights, and cameras.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5); // soft sky blue background

// === Camera Setup ===
// PerspectiveCamera mimics how a human eye sees: fov, aspect ratio, near, far clipping plane.
const camera = new THREE.PerspectiveCamera(
  75,                                 // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1,                                // near clipping
  1000                                // far clipping
);
camera.position.set(8, 6, 12); // move the camera back and slightly above

// === Renderer ===
// WebGLRenderer draws the scene to the screen using WebGL.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === Lights ===
// AmbientLight = general soft light, fills shadows
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// PointLight = like a light bulb. Bright in the middle, fades outward.
const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(5, 8, 5);
scene.add(pointLight);

// === Room: Floor, Walls, Ceiling ===
const roomGroup = new THREE.Group();

// Floor (green tint for requirement)
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x2e8b57 }); // green
const floor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5, 20), floorMaterial);
floor.position.y = -0.25;
roomGroup.add(floor);

// Walls (light blue tint for requirement)
const wallHeight = 8;
const wallThickness = 0.5;
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x87ceeb }); // light sky blue

// Back Wall
const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(20, wallHeight, wallThickness),
  wallMaterial
);
backWall.position.set(0, wallHeight / 2, -10);
roomGroup.add(backWall);

// Left Wall
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, 20),
  wallMaterial
);
leftWall.position.set(-10, wallHeight / 2, 0);
roomGroup.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(
  new THREE.BoxGeometry(wallThickness, wallHeight, 20),
  wallMaterial
);
rightWall.position.set(10, wallHeight / 2, 0);
roomGroup.add(rightWall);

// Ceiling
const ceiling = new THREE.Mesh(
  new THREE.BoxGeometry(20, wallThickness, 20),
  wallMaterial
);
ceiling.position.set(0, wallHeight, 0);
roomGroup.add(ceiling);

scene.add(roomGroup);

// === Bed ===
const bedGroup = new THREE.Group();

// Bed Frame
const bedFrame = new THREE.Mesh(
  new THREE.BoxGeometry(6, 1, 3),
  new THREE.MeshLambertMaterial({ color: 0x006400 }) // dark green
);
bedFrame.position.set(-5, 0.5, 0);
bedGroup.add(bedFrame);

// Mattress
const mattress = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.5, 3),
  new THREE.MeshLambertMaterial({ color: 0xffffff }) // white
);
mattress.position.set(-5, 1.25, 0);
bedGroup.add(mattress);

// Pillow
const pillow = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.4, 1),
  new THREE.MeshLambertMaterial({ color: 0x87ceeb }) // blue pillow
);
pillow.position.set(-6.5, 1.5, 0);
bedGroup.add(pillow);

scene.add(bedGroup);

// === Study Area: Desk + Chair + Monitor ===
const deskGroup = new THREE.Group();

// Desk Surface
const desk = new THREE.Mesh(
  new THREE.BoxGeometry(4, 0.4, 2),
  new THREE.MeshLambertMaterial({ color: 0x006699 }) // blue desk
);
desk.position.set(4, 2, 0);
deskGroup.add(desk);

// Desk Legs
const deskLegMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
function makeDeskLeg(x, z) {
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 2, 0.2),
    deskLegMaterial
  );
  leg.position.set(x, 1, z);
  return leg;
}
deskGroup.add(makeDeskLeg(2.2, -0.9));
deskGroup.add(makeDeskLeg(5.8, -0.9));
deskGroup.add(makeDeskLeg(2.2, 0.9));
deskGroup.add(makeDeskLeg(5.8, 0.9));

// Monitor
const monitor = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.2, 0.1),
  new THREE.MeshLambertMaterial({ color: 0x000000 })
);
monitor.position.set(4, 3, 0);
deskGroup.add(monitor);

// Chair
const chairSeat = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.2, 1.5),
  new THREE.MeshLambertMaterial({ color: 0x2e8b57 }) // green chair
);
chairSeat.position.set(4, 1, -3);
deskGroup.add(chairSeat);

const chairBack = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 0.2),
  new THREE.MeshLambertMaterial({ color: 0x2e8b57 })
);
chairBack.position.set(4, 2, -3.6);
deskGroup.add(chairBack);

scene.add(deskGroup);

// === Window ===
const windowFrame = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 0.2),
  new THREE.MeshLambertMaterial({ color: 0xaaaaaa })
);
windowFrame.position.set(0, 4, -9.9);
scene.add(windowFrame);

const windowGlass = new THREE.Mesh(
  new THREE.BoxGeometry(3.5, 2.5, 0.1),
  new THREE.MeshLambertMaterial({
    color: 0x87ceeb, // blue glass
    transparent: true,
    opacity: 0.6,
  })
);
windowGlass.position.set(0, 4, -10);
scene.add(windowGlass);

// === Extra: Lamp ===
const lampStand = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 2),
  new THREE.MeshLambertMaterial({ color: 0x000000 })
);
lampStand.position.set(-2, 2, 4);

const lampShade = new THREE.Mesh(
  new THREE.ConeGeometry(0.7, 1, 16),
  new THREE.MeshLambertMaterial({ color: 0xffffaa })
);
lampShade.position.set(-2, 3, 4);

scene.add(lampStand, lampShade);

// === Animation Loop ===
// requestAnimationFrame ensures the scene updates smoothly at monitor refresh rate.
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// === Responsive Resize ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



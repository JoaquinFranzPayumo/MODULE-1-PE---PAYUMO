// === Basic Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0c4de); // soft blue background

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(8, 6, 12);

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
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x87a7c4 }); // bluish floor
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xe6f0fa }); // pale blue walls

const floor = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5, 20), floorMaterial);
floor.position.y = -0.25;
scene.add(floor);

const wallHeight = 8;
const wallThickness = 0.5;

// Back wall
const backWall = new THREE.Mesh(new THREE.BoxGeometry(20, wallHeight, wallThickness), wallMaterial);
backWall.position.set(0, wallHeight / 2, -10);
scene.add(backWall);

// Left wall
const leftWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, 20), wallMaterial);
leftWall.position.set(-10, wallHeight / 2, 0);
scene.add(leftWall);

// Right wall
const rightWall = new THREE.Mesh(new THREE.BoxGeometry(wallThickness, wallHeight, 20), wallMaterial);
rightWall.position.set(10, wallHeight / 2, 0);
scene.add(rightWall);

// Ceiling
const ceiling = new THREE.Mesh(new THREE.BoxGeometry(20, wallThickness, 20), wallMaterial);
ceiling.position.set(0, wallHeight, 0);
scene.add(ceiling);

// === Bed & Side Table ===
const bedGroup = new THREE.Group();

const bedFrame = new THREE.Mesh(
  new THREE.BoxGeometry(6, 1, 3),
  new THREE.MeshLambertMaterial({ color: 0x3b3b98 }) // deep blue wood frame
);
bedFrame.position.set(-5, 0.5, 0);
bedGroup.add(bedFrame);

const mattress = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.6, 3),
  new THREE.MeshLambertMaterial({ color: 0xffffff })
);
mattress.position.set(-5, 1.3, 0);
bedGroup.add(mattress);

const blanket = new THREE.Mesh(
  new THREE.BoxGeometry(6, 0.2, 2),
  new THREE.MeshLambertMaterial({ color: 0x4682b4 }) // steel blue blanket
);
blanket.position.set(-5, 1.5, 0.5);
bedGroup.add(blanket);

const pillow = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.4, 1),
  new THREE.MeshLambertMaterial({ color: 0xeeeeff })
);
pillow.position.set(-6.5, 1.6, 0);
bedGroup.add(pillow);

scene.add(bedGroup);

// Bedside table
const sideTable = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1, 1.5),
  new THREE.MeshLambertMaterial({ color: 0x2f4f4f })
);
sideTable.position.set(-1.5, 0.5, 2);
scene.add(sideTable);

const tableLampBase = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.5),
  new THREE.MeshLambertMaterial({ color: 0x000000 })
);
tableLampBase.position.set(-1.5, 1.25, 2);
scene.add(tableLampBase);

const tableLampShade = new THREE.Mesh(
  new THREE.ConeGeometry(0.6, 1, 16),
  new THREE.MeshLambertMaterial({ color: 0x1e90ff }) // vivid blue shade
);
tableLampShade.position.set(-1.5, 1.9, 2);
scene.add(tableLampShade);

// === Study Area ===
const deskGroup = new THREE.Group();

const desk = new THREE.Mesh(
  new THREE.BoxGeometry(4, 0.4, 2),
  new THREE.MeshLambertMaterial({ color: 0x1a2b4c }) // navy desk
);
desk.position.set(4, 2, 0);
deskGroup.add(desk);

// Legs
function createDeskLeg(x, z) {
  const leg = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 2, 0.2),
    new THREE.MeshLambertMaterial({ color: 0x1a2b4c })
  );
  leg.position.set(x, 1, z);
  return leg;
}
deskGroup.add(createDeskLeg(2.2, -0.9));
deskGroup.add(createDeskLeg(5.8, -0.9));
deskGroup.add(createDeskLeg(2.2, 0.9));
deskGroup.add(createDeskLeg(5.8, 0.9));

// Monitor
const monitor = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.2, 0.1),
  new THREE.MeshLambertMaterial({ color: 0x000000 })
);
monitor.position.set(4, 3, 0);
deskGroup.add(monitor);

// Keyboard
const keyboard = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.1, 0.5),
  new THREE.MeshLambertMaterial({ color: 0xcccccc })
);
keyboard.position.set(4, 2.3, 0.6);
deskGroup.add(keyboard);

// Chair
const chairSeat = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.2, 1.5),
  new THREE.MeshLambertMaterial({ color: 0x1e3f66 })
);
chairSeat.position.set(4, 1, -3);
deskGroup.add(chairSeat);

const chairBack = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 0.2),
  new THREE.MeshLambertMaterial({ color: 0x1e3f66 })
);
chairBack.position.set(4, 2, -3.6);
deskGroup.add(chairBack);

scene.add(deskGroup);

// === Bookshelf ===
const shelf = new THREE.Mesh(
  new THREE.BoxGeometry(1, 5, 3),
  new THREE.MeshLambertMaterial({ color: 0x2f4f4f })
);
shelf.position.set(8, 2.5, -6);
scene.add(shelf);

for (let i = 0; i < 3; i++) {
  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.2, 2),
    new THREE.MeshLambertMaterial({ color: 0x4169e1 })
  );
  book.position.set(8, 1 + i * 1.5, -6);
  scene.add(book);
}

// === Window with multiple panes ===
const windowFrame = new THREE.Mesh(
  new THREE.BoxGeometry(5, 4, 0.2),
  new THREE.MeshLambertMaterial({ color: 0xaaaaaa })
);
windowFrame.position.set(0, 4, -9.9);
scene.add(windowFrame);

const windowGlass = new THREE.Mesh(
  new THREE.BoxGeometry(4.6, 3.6, 0.1),
  new THREE.MeshLambertMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.6 })
);
windowGlass.position.set(0, 4, -10);
scene.add(windowGlass);

// === Rug ===
const rug = new THREE.Mesh(
  new THREE.CylinderGeometry(3, 3, 0.1, 32),
  new THREE.MeshLambertMaterial({ color: 0x5dade2 })
);
rug.rotation.x = -Math.PI / 2;
rug.position.set(0, 0.05, 0);
scene.add(rug);

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

import * as THREE from "./three.js-master/build/three.module.js";
import * as JSM from "./three.js-master/examples/jsm/controls/OrbitControls.js";
import Stats from "./three.js-master/examples/jsm/libs/stats.module.js";
import { GUI } from "./three.js-master/examples/jsm/libs/dat.gui.module.js";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";

let renderer, camera, scene;

let ball,
  ballMoveSpeed = 0.5;

let box,
  boxMoveSpeed = 0.5;

let dodecahedron,
  dodecahedronSpeed = 0.5;

let loader = new THREE.TextureLoader();

// let btn = document.createElement("button")
// btn.innerHTML = "Click me"
// document.body.appendChild(btn)

// btn.onclick = () => {

// }
let container;
let init = () => {
  // container = document.getElementById("container");
  // container.appendChild(stats.dom);
  // INIT SCENE
  scene = new THREE.Scene();

  // INIT CAMERA
  let fov = 45;
  let width = window.innerWidth;
  let height = window.innerHeight;
  let aspect = width / height;

  camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
  camera.position.set(200, 100, 200);
  camera.lookAt(0, 0, 0);

  // INIT RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor("#0e0ad1");
  document.body.appendChild(renderer.domElement);

  const controls = new JSM.OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 100;
  // controls.maxDistance = 300;
  // controls.maxPolarAngle = Math.PI / 3;
  // controls.minPolarAngle = Math.PI / 7;
  // controls.maxAzimuthAngle = Math.PI / 2;
  // controls.minAzimuthAngle = Math.PI / 128;
  controls.maxPolarAngle = Math.PI / 3;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxAzimuthAngle = Math.PI / 4;
  controls.minAzimuthAngle = Math.PI / 4;

  document.body.appendChild(renderer.domElement);
};

let modelObject;

let loadRoom = () => {
  let loader = new GLTFLoader();
  loader.load("./assets/isometric_room/IscoMetric_Room (1).glb", (glb) => {
    // console.log(gltf);
    modelObject = glb.scene;

    //positions
    modelObject.position.set(0, -59, 0);

    // rotations
    modelObject.rotation.x = Math.PI / 2;
    modelObject.rotation.y = Math.PI;
    modelObject.rotation.z = Math.PI;

    // rescale
    modelObject.scale.set(40, 40, 40);

    // // Object Name
    modelObject.name = "room";
    scene.add(modelObject);
    roomFolder.add(modelObject.rotation, "x", 0, Math.PI, Math.PI / 12);
    roomFolder.add(modelObject.rotation, "y", 0, Math.PI, Math.PI / 12);
    roomFolder.add(modelObject.rotation, "z", 0, Math.PI, Math.PI / 12);
    roomFolder.add(modelObject.position, "y", -100, 100, 1);
  });
};

let loadRoom2 = () => {
  let loader = new GLTFLoader();
  loader.load("./Assets/low_poly_room/low poly room.glb", (glb) => {
    // console.log(gltf);
    modelObject = glb.scene;

    //positions
    modelObject.position.set(0, -59, 0);

    // rotations
    modelObject.rotation.x = Math.PI / 2;
    modelObject.rotation.y = Math.PI;
    modelObject.rotation.z = Math.PI;

    // rescale
    modelObject.scale.set(40, 40, 40);

    // // Object Name
    modelObject.name = "room";
    scene.add(modelObject);
    roomFolder.add(modelObject.rotation, "x", 0, Math.PI, Math.PI / 12);
    roomFolder.add(modelObject.rotation, "y", 0, Math.PI, Math.PI / 12);
    roomFolder.add(modelObject.rotation, "z", 0, Math.PI, Math.PI / 12);
    roomFolder.add(modelObject.position, "y", -100, 100, 1);
  });
};

let createLight = () => {
  // let pointLight = new THREE.PointLight(0xffffff, 1, 490, 0.5);
  // pointLight.position.set(0, 50, 0);
  // pointLight.castShadow = true;
  // scene.add(pointLight);
  // let plHelper = new THREE.PointLightHelper(pointLight, 5);
  // scene.add(plHelper);

  let ambLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambLight);

  let directLight = new THREE.DirectionalLight(0xffffff, 1);
  directLight.position.set(30, 70, 30);
  directLight.castShadow = true;
  directLight.shadow.camera.left = -100;
  directLight.shadow.camera.right = 100;
  directLight.shadow.camera.top = 100;
  directLight.shadow.camera.bottom = -100;
  directLight.shadow.mapSize.width = 5120;
  directLight.shadow.mapSize.height = 5120;
  let dlHelper = new THREE.DirectionalLightHelper(directLight, 40);

  scene.add(directLight);
  // scene.add(dlHelper);
};

let geoBall;
let matBall;

let createBall = () => {
  geoBall = new THREE.SphereGeometry(5, 32, 16);
  matBall = new THREE.MeshPhongMaterial({ color: "#6AC50C", transparent: true });

  ball = new THREE.Mesh(geoBall, matBall);
  ball.position.set(
    Math.random() * 120 - 70,
    Math.random() * 90 - 39,
    Math.random() * 138 - 48
  );
  ball.name = "ball";
  // ball.geometry.dynamic = true;
  // ball.geometry.verticesNeedUpdate = true;
  // ball.geometry.__dirtyVertices = true;

  scene.add(ball);
};
let createBall2 = (geo) => {
  let geoBall2 = geo;
  let matBall2 = new THREE.MeshPhongMaterial({
    color: "red",
    transparent: true,
  });

  let ball2 = new THREE.Mesh(geoBall2, matBall2);
  ball2.position.set(0, 5, 0);
  ball2.name = "ball";
  // ball.geometry.dynamic = true;
  // ball.geometry.verticesNeedUpdate = true;
  // ball.geometry.__dirtyVertices = true;

  scene.add(ball2);
};

let createBox = () => {
  let geoBox = new THREE.BoxGeometry(10, 10, 10);
  let mat = new THREE.MeshPhongMaterial({ color: "#FFC800", transparent: true });

  box = new THREE.Mesh(geoBox, mat);
  box.position.set(
    Math.random() * 120 - 70,
    Math.random() * 90 - 39,
    Math.random() * 138 - 48
  );
  box.rotation.set(
    Math.PI / (Math.random() * 32 + 1),
    Math.PI / (Math.random() * 32 + 1),
    Math.PI / (Math.random() * 32 + 1)
  );
  box.name = "box";

  scene.add(box);
};

let dodeGeo;
let createDodecahedron = () => {
  dodeGeo = new THREE.DodecahedronGeometry(5, 0);
  let mat = new THREE.MeshPhongMaterial({ color: "#E53D00", transparent: true });

  dodecahedron = new THREE.Mesh(dodeGeo, mat);
  dodecahedron.position.set(
    Math.random() * 120 - 70,
    Math.random() * 90 - 39,
    Math.random() * 138 - 48
  );
  dodecahedron.name = "dodecahedron";

  scene.add(dodecahedron);
};

let createFloor = (posX, posY, posZ, rotX, rotY, rotZ) => {
  let floorTexture = loader.load("./Assets/checkered pattern.jpg");
  let geo = new THREE.BoxGeometry(50, 50, 2);
  let mat = new THREE.MeshPhongMaterial({ map: floorTexture });

  let floor = new THREE.Mesh(geo, mat);
  floor.position.set(posX, posY, posZ);
  floor.rotation.set(rotX, rotY, rotZ);

  scene.add(floor);
};

let createWall = (posX, posY, posZ, rotX, rotY, rotZ) => {
  let wallTexture = loader.load("./Assets/wall pattern.jpg");
  let geo = new THREE.BoxGeometry(50, 50, 2);
  let mat = new THREE.MeshPhongMaterial({ map: wallTexture });

  let wall = new THREE.Mesh(geo, mat);
  wall.position.set(posX, posY, posZ);
  wall.rotation.set(rotX, rotY, rotZ);

  scene.add(wall);
};

let loadMeja = () => {
  let loader = new GLTFLoader();
  loader.load("./Assets/table.glb", (glb) => {
    // console.log(gltf);
    let modelObject = glb.scene;

    //positions
    modelObject.position.set(-5, 1, -15);

    // rotations
    // modelObject.rotation.x = Math.PI / 2;
    // modelObject.rotation.y = 0;
    // modelObject.rotation.z = Math.PI / 2;

    // rescale;
    modelObject.scale.set(30, 30, 30);

    // // Object Name
    modelObject.name = "table";
    scene.add(modelObject);

    // // animation call
  });
};

let left = true;
let up = true;
let z = true;

let moveObject = () => {
  if (left) {
    ball.position.x -= ballMoveSpeed;
    if (ball.position.x < -50) {
      left = false;
    }
  }
  if (!left) {
    ball.position.x += ballMoveSpeed;
    if (ball.position.x > 70) {
      left = true;
    }
  }

  if (up) {
    ball.position.y += ballMoveSpeed;
    if (ball.position.y > 51) {
      up = false;
    } else if (
      ball.position.y <= -28.5 &&
      ball.position.x <= 41 &&
      ball.position.x >= -51 &&
      ball.position.z >= -48.4 &&
      ball.position.z <= -19.7
    ) {
      up = false;
    }
  }
  if (!up) {
    ball.position.y -= ballMoveSpeed;
    if (ball.position.y <= -39) {
      up = true;
    } else if (
      ball.position.y <= -11.5 &&
      ball.position.x <= 41 &&
      ball.position.x >= -51 &&
      ball.position.z >= -48.4 &&
      ball.position.z <= -19.7
    ) {
      up = true;
    } else if (
      ball.position.y <= 1 &&
      ball.position.x >= -51 &&
      ball.position.x <= 27 &&
      ball.position.z >= 13.4 &&
      ball.position.z <= 39
    ) {
      up = true;
    }
  }

  if (z) {
    ball.position.z += ballMoveSpeed;
    if (ball.position.z > 90) {
      z = false;
    }
  }
  if (!z) {
    ball.position.z -= ballMoveSpeed;
    if (ball.position.z < -48) {
      z = true;
    }
  }
  // ball.position.y += 0.1;
  // ball.position.z -= 0.1;
};

let left2 = true;
let up2 = true;
let z2 = true;

let moveObject2 = () => {
  box.rotation.x += 0.05;
  // box.rotation.y += 0.05;
  box.rotation.z += 0.05;
  if (left2) {
    box.position.x -= boxMoveSpeed;
    if (box.position.x < -50) {
      left2 = false;
    }
  }
  if (!left2) {
    box.position.x += boxMoveSpeed;
    if (box.position.x > 70) {
      left2 = true;
    }
  }

  if (up2) {
    box.position.y += boxMoveSpeed;
    if (box.position.y > 51) {
      up2 = false;
    } else if (
      box.position.y <= -28.5 &&
      box.position.x <= 41 &&
      box.position.x >= -51 &&
      box.position.z >= -48.4 &&
      box.position.z <= -19.7
    ) {
      up2 = false;
    }
  }
  if (!up2) {
    box.position.y -= boxMoveSpeed;
    if (box.position.y <= -39) {
      up2 = true;
    } else if (
      box.position.y <= -11.5 &&
      box.position.x <= 41 &&
      box.position.x >= -51 &&
      box.position.z >= -48.4 &&
      box.position.z <= -19.7
    ) {
      up2 = true;
    } else if (
      box.position.y <= 1 &&
      box.position.x >= -51 &&
      box.position.x <= 27 &&
      box.position.z >= 13.4 &&
      box.position.z <= 39
    ) {
      up2 = true;
    }
  }

  if (z2) {
    box.position.z += boxMoveSpeed;
    if (box.position.z > 90) {
      z2 = false;
    }
  }
  if (!z2) {
    box.position.z -= boxMoveSpeed;
    if (box.position.z < -48) {
      z2 = true;
    }
  }
  // ball.position.y += 0.1;
  // ball.position.z -= 0.1;
};

let left3 = true;
let up3 = true;
let z3 = true;

let moveObject3 = () => {
  dodecahedron.rotation.x -= 0.05;
  box.rotation.y += 0.05;
  dodecahedron.rotation.z -= 0.05;
  if (left3) {
    dodecahedron.position.x -= dodecahedronSpeed;
    if (dodecahedron.position.x < -50) {
      left3 = false;
    }
  }
  if (!left3) {
    dodecahedron.position.x += dodecahedronSpeed;
    if (dodecahedron.position.x > 70) {
      left3 = true;
    }
  }

  if (up3) {
    dodecahedron.position.y += dodecahedronSpeed;
    if (dodecahedron.position.y > 51) {
      up3 = false;
    } else if (
      dodecahedron.position.y <= -28.5 &&
      dodecahedron.position.x <= 41 &&
      dodecahedron.position.x >= -51 &&
      dodecahedron.position.z >= -48.4 &&
      dodecahedron.position.z <= -19.7
    ) {
      up3 = false;
    }
  }
  if (!up3) {
    dodecahedron.position.y -= dodecahedronSpeed;
    if (dodecahedron.position.y <= -39) {
      up3 = true;
    } else if (
      dodecahedron.position.y <= -11.5 &&
      dodecahedron.position.x <= 41 &&
      dodecahedron.position.x >= -51 &&
      dodecahedron.position.z >= -48.4 &&
      dodecahedron.position.z <= -19.7
    ) {
      up3 = true;
    } else if (
      dodecahedron.position.y <= 1 &&
      dodecahedron.position.x >= -51 &&
      dodecahedron.position.x <= 27 &&
      dodecahedron.position.z >= 13.4 &&
      dodecahedron.position.z <= 39
    ) {
      up3 = true;
    }
  }

  if (z3) {
    dodecahedron.position.z += dodecahedronSpeed;
    if (dodecahedron.position.z > 90) {
      z3 = false;
    }
  }
  if (!z3) {
    dodecahedron.position.z -= dodecahedronSpeed;
    if (dodecahedron.position.z < -48) {
      z3 = true;
    }
  }
  // ball.position.y += 0.1;
  // ball.position.z -= 0.1;
};

let handleRaycaster = (event) => {
  let raycaster = new THREE.Raycaster();
  let mousePosition = new THREE.Vector2();

  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);

  let intersectedObjects = raycaster.intersectObjects(scene.children, true);

  if (
    intersectedObjects[0] != undefined &&
    (intersectedObjects[0].object.name == "box" ||
      intersectedObjects[0].object.name == "ball" ||
      intersectedObjects[0].object.name == "dodecahedron")
  ) {
    console.log(intersectedObjects[0].object.geometry);
    // shieldObj = intersectedObjects[0];
    // if (shield.material.opacity <= 0)
    if (intersectedObjects[0].object.name == "box") {
      createBox();
      createBox();
    } else if (intersectedObjects[0].object.name == "ball") {
      createBall();
      createBall();
    } else if (intersectedObjects[0].object.name == "dodecahedron") {
      createDodecahedron();
      createDodecahedron();
    }
    scene.remove(intersectedObjects[0].object);
  }
};

let btnCode;

let btnListener = (event) => {
  btnCode = event.keyCode;
  // console.log(btnCode);

  // Spacebar
  if (btnCode == 32) {
    for (var i = 0; i < scene.children.length; i++) {
      if (
        scene.children[i].name == "box" ||
        scene.children[i].name == "ball" ||
        scene.children[i].name == "dodecahedron"
      ) {
        scene.remove(scene.children[i]);
      }
    }
    scene.add(ball);
    scene.add(box);
    scene.add(dodecahedron);
  }
};

let render = () => {
  renderer.render(scene, camera);
  moveObject();
  moveObject2();
  moveObject3();
  requestAnimationFrame(render);
};

let addListener = () => {
  document.addEventListener("keydown", btnListener);
};

let gui;
let roomFolder;

window.onload = () => {
  init();
  // loadMeja();
  loadRoom();
  createBall();
  createBox();
  createDodecahedron();
  // console.log(ball);
  createLight();
  createFloor(-30, -45, -30, Math.PI / 2, 0, 0);
  createFloor(-30, -45, 20, Math.PI / 2, 0, 0);
  createFloor(20.1, -45, -30, Math.PI / 2, 0, 0);
  createFloor(70.1, -45, -30, Math.PI / 2, 0, 0);
  createFloor(70.1, -45, 20, Math.PI / 2, 0, 0);
  createFloor(20.1, -45, 20, Math.PI / 2, 0, 0);
  createFloor(20.1, -45, 70, Math.PI / 2, 0, 0);
  createFloor(-30, -45, 70, Math.PI / 2, 0, 0);

  createWall(-30, -20, -55, 0, 0, 0);
  createWall(20, -20, -55, 0, 0, 0);
  createWall(-30, 30, -55, 0, 0, 0);
  createWall(20, 30, -55, 0, 0, 0);
  createWall(70, 30, -55, 0, 0, 0);
  createWall(70, -20, -55, 0, 0, 0);

  createWall(-57, 30, -30, 0, Math.PI / 2, 0);
  createWall(-57, -20, -30, 0, Math.PI / 2, 0);
  createWall(-57, 30, 20, 0, Math.PI / 2, 0);
  createWall(-57, -20, 20, 0, Math.PI / 2, 0);
  createWall(-57, -20, 70, 0, Math.PI / 2, 0);
  createWall(-57, 30, 70, 0, Math.PI / 2, 0);

  // console.log(scene.children.length);

  window.addEventListener("click", handleRaycaster);
  addListener();
  // loadTable();

  // const stats = Stats();
  // document.body.appendChild(stats.dom);

  // let kendali = new Object();
  // kendali.x = 1;
  // kendali.y = 1;
  // kendali.z = 2;
  console.log(scene.children);
  gui = new GUI();
  roomFolder = gui.addFolder("Room");
  const ballFolder = gui.addFolder("Ball");
  ballFolder.add(ball.position, "x", -51.5, 90, 0.1);
  ballFolder.add(ball.position, "y", -39, 50, 0.1);
  ballFolder.add(ball.position, "z", -49, 89.7, 0.1);
  ballFolder.add(ball.material.color, "r", 0, 1, 0.1);
  ballFolder.add(ball.material.color, "g", 0, 1, 0.1);
  ballFolder.add(ball.material.color, "b", 0, 1, 0.1);
  ballFolder.add(ball.material, "opacity", 0, 1, 0.1);
  ballFolder
    .add(ball.geometry.parameters, "widthSegments", 1, 64, 1)
    .onChange(function () {
      // console.log(geoBall);
      ball.geometry = geoBall.clone();
      // createBall2(ball.geometry);
      let geoA = ball.geometry;
      // console.log(geoA);
      let matA = new THREE.MeshPhongMaterial({
        color: "white",
        transparent: true,
      });
      let A = new THREE.Mesh(geoA, matA);
      A.position.set(0, 5, 0);
      scene.add(A);
      console.log(A.geometry);
      // ball.geometry.dispose();
      scene.remove(ball);
    });
  ballFolder.add(ball.geometry.parameters, "heightSegments", 0, 64, 1);
  ballFolder.open();
  // speedFolder.add(ballMoveSpeed, ballMoveSpeed, 0, 1, 0.1);
  const boxFolder = gui.addFolder("Box");
  boxFolder.add(box.position, "x", -51.5, 90, 0.1);
  boxFolder.add(box.position, "y", -39, 50, 0.1);
  boxFolder.add(box.position, "z", -49, 89.7, 0.1);
  boxFolder.add(box.material.color, "r", 0, 1, 0.1);
  boxFolder.add(box.material.color, "g", 0, 1, 0.1);
  boxFolder.add(box.material.color, "b", 0, 1, 0.1);
  boxFolder.add(box.material, "opacity", 0, 1, 0.1);
  boxFolder.open();

  const dodecahedronFolder = gui.addFolder("Dodecahedron");
  dodecahedronFolder.add(dodecahedron.position, "x", -51.5, 90, 0.1);
  dodecahedronFolder.add(dodecahedron.position, "y", -39, 50, 0.1);
  dodecahedronFolder.add(dodecahedron.position, "z", -49, 89.7, 0.1);
  dodecahedronFolder.add(dodecahedron.material.color, "r", 0, 1, 0.1);
  dodecahedronFolder.add(dodecahedron.material.color, "g", 0, 1, 0.1);
  dodecahedronFolder.add(dodecahedron.material.color, "b", 0, 1, 0.1);
  dodecahedronFolder.add(dodecahedron.material, "opacity", 0, 1, 0.1);
  dodecahedronFolder.open();
  render();
};

window.onresize = () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

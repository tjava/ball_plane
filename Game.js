import * as THREE from "./libs/three128/three.module.js";
import { OrbitControls } from "./libs/three128/OrbitControls.js";
import { GUI } from "./dat.gui.module.js";

class Game {
  constructor() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    this.step = 0;
    this.speed = 0.01;

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(-10, 150, 150);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xaaaaaa);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
    this.scene.add(ambient);

    const light = new THREE.DirectionalLight();
    light.position.set(0.2, 1, 1);
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    //Replace Box with Circle, Cone, Cylinder, Dodecahedron, Icosahedron, Octahedron, Plane, Sphere, Tetrahedron, Torus or TorusKnot
    const planeGeometry = new THREE.BoxBufferGeometry(200, 200, 3);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.scene.add(this.plane);

    const ballGeometry = new THREE.SphereGeometry(8, 100, 100);
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      wireframe: false,
    });
    this.ball = new THREE.Mesh(ballGeometry, ballMaterial);
    this.scene.add(this.ball);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.gridHelper = new THREE.GridHelper(200);
    this.scene.add(this.gridHelper);

    this.input();

    this.renderer.setAnimationLoop(this.render.bind(this));

    window.addEventListener("resize", this.resize.bind(this));
  }

  input() {
    const gui = new GUI();
    let ball = this.ball;
    let plane = this.plane;
    ball.position.set(0, 9.5, 0);

    const options = {
      ballColor: ball.material.color.getHex(),
      planeColor: plane.material.color.getHex(),
      positionX: ball.position.x,
      positionZ: ball.position.z,
      wireframe: false,
    };

    gui
      .add(options, "positionX", -100, 100)
      .name("X-coodinate")
      .onChange(function (value) {
        ball.position.x = value;
        console.log(value);
      });

    gui
      .add(options, "positionZ", -100, 100)
      .name("Y-coodinate")
      .onChange(function (value) {
        ball.position.z = value;
        console.log(value);
      });

    gui
      .addColor(options, "ballColor")
      .name("Ball-Color")
      .onChange(function (value) {
        ball.material.color.set(value);
      });

    gui
      .addColor(options, "planeColor")
      .name("Plane-Color")
      .onChange(function (value) {
        plane.material.color.set(value);
      });

    // gui.add(ball.material, "wireframe").name("Wireframe");
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.plane.rotation.x = -0.5 * Math.PI;
    this.renderer.render(this.scene, this.camera);
  }
}

export { Game };

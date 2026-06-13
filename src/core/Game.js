import { InputManager } from './InputManager.js';
import { PhysicsEngine } from './PhysicsEngine.js';
import { CarFactory } from '../cars/CarFactory.js';
import { CarDefinitions } from '../cars/CarDefinitions.js';
import { TrackManager } from '../tracks/TrackManager.js';
import { ModeManager } from '../modes/ModeManager.js';
import { AIEngine } from '../ai/AIEngine.js';
import { AudioEngine } from '../audio/AudioEngine.js';
import { NitroSystem } from '../nitro/NitroSystem.js';
import { StuntSystem } from '../stunts/StuntSystem.js';
import { VisualEffects } from '../effects/VisualEffects.js';

const { Scene, PerspectiveCamera, WebGLRenderer, Color, Fog, AmbientLight, DirectionalLight, ACESFilmicToneMapping } = THREE;

export class Game {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.input = new InputManager();
    this.physics = new PhysicsEngine();
    this.carFactory = new CarFactory();
    this.carDefs = new CarDefinitions();
    this.trackManager = new TrackManager(this);
    this.modeManager = new ModeManager(this);
    this.ai = new AIEngine(this);
    this.audio = new AudioEngine();
    this.nitro = new NitroSystem(this);
    this.stunts = new StuntSystem(this);
    this.effects = new VisualEffects(this);
    this.ui = null;
    this.playerCar = null;
    this.aiCars = [];
    this.currentTrack = null;
    this.currentMode = null;
    this.isRunning = false;
    this.isPaused = false;
    this.clock = { delta: 0, elapsed: 0, lastTime: 0 };
    this.speed = 0;
    this.maxSpeed = 320;
    this.position = 1;
    this.lap = 1;
    this.totalLaps = 1;
    this.credits = 1000;
    this.selectedCarIndex = 0;
    this.cars = [];
    this.upgrades = {};
  }

  async init() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.scene = new Scene();
    this.scene.background = new Color(0x0a0a1a);
    this.scene.fog = new Fog(0x0a0a1a, 50, 150);

    this.camera = new PerspectiveCamera(70, w / h, 0.1, 300);
    this.camera.position.set(0, 8, -12);

    this.renderer = new WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = 1;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    document.body.prepend(this.renderer.domElement);

    const ambient = new AmbientLight(0x404060, 0.4);
    this.scene.add(ambient);

    const dirLight = new DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    this.audio.init();

    this.cars = this.carDefs.getAll().map((def, i) => {
      const car = this.carFactory.create(def, this.scene);
      car.definition = def;
      car.index = i;
      car.upgradeLevel = this.upgrades[i] || 0;
      return car;
    });

    this.playerCar = this.cars[0];
    this.playerCar.isPlayer = true;

    this.input.bind();

    this.ai.init(this.cars.slice(1, 7));

    this.animate();
  }

  setUI(ui) { this.ui = ui; }

  startRace(trackId, mode, config = {}) {
    this.isRunning = true;
    this.isPaused = false;
    this.speed = 0;
    this.position = 1;
    this.lap = 1;

    this.currentTrack = this.trackManager.build(trackId, this.scene);
    this.currentMode = mode;

    this.modeManager.start(mode, config);

    const startPos = this.currentTrack.startPositions || [
      { x: 0, y: 0, z: 0 },
      { x: -2, y: 0, z: 0 },
      { x: 2, y: 0, z: 0 },
      { x: -4, y: 0, z: 0 },
      { x: 4, y: 0, z: 0 },
      { x: -6, y: 0, z: 0 },
      { x: 6, y: 0, z: 0 },
    ];

    this.playerCar.mesh.position.set(startPos[0].x, startPos[0].y, startPos[0].z);
    this.playerCar.mesh.rotation.y = 0;

    for (let i = 0; i < this.aiCars.length && i < 6; i++) {
      const pos = startPos[i + 1] || startPos[0];
      this.aiCars[i].mesh.position.set(pos.x, pos.y, pos.z);
      this.aiCars[i].mesh.rotation.y = 0;
      this.aiCars[i].speed = 0;
      this.aiCars[i].reset();
    }

    this.nitro.reset();
    this.effects.clear();
    this.audio.startEngine();

    if (this.ui) this.ui.showHUD();
  }

  pause() { this.isPaused = true; }
  resume() { this.isPaused = false; }

  animate() {
    requestAnimationFrame(() => this.animate());

    const now = performance.now();
    this.clock.delta = Math.min((now - this.clock.lastTime) / 1000, 0.05);
    this.clock.lastTime = now;
    this.clock.elapsed += this.clock.delta;

    if (this.isRunning && !this.isPaused) {
      this.update();
    }

    this.renderer.render(this.scene, this.camera);
    if (this.effects) this.effects.update(this.clock.delta);
  }

  update() {
    const dt = this.clock.delta;
    const input = this.input.getState();

    this.nitro.update(dt, input.nitro);
    const nitroMultiplier = this.nitro.getSpeedMultiplier();

    const targetSpeed = this.maxSpeed + (this.playerCar.upgradeLevel || 0) * 10;
    const acceleration = input.nitro ? 60 : 30;
    const braking = input.brake ? 80 : 0;
    const drag = 0.98;

    if (input.forward || input.nitro) {
      this.speed += acceleration * nitroMultiplier * dt;
    } else if (input.brake) {
      this.speed -= braking * dt;
    } else {
      this.speed *= drag;
    }

    this.speed = Math.max(0, Math.min(targetSpeed * (input.nitro ? 1.3 : 1), this.speed));

    let steer = input.steer;
    if (input.left) steer = -1;
    if (input.right) steer = 1;

    const turnSpeed = this.speed > 10 ? (60 - this.speed * 0.08) * dt * steer : 0;
    this.playerCar.mesh.rotation.y += turnSpeed * dt * 2;

    const moveSpeed = this.speed * 0.15 * dt;
    this.playerCar.mesh.position.x += Math.sin(this.playerCar.mesh.rotation.y) * moveSpeed;
    this.playerCar.mesh.position.z += Math.cos(this.playerCar.mesh.rotation.y) * moveSpeed;

    this.camera.position.x = this.playerCar.mesh.position.x + Math.sin(this.playerCar.mesh.rotation.y) * 12;
    this.camera.position.z = this.playerCar.mesh.position.z + Math.cos(this.playerCar.mesh.rotation.y) * 12;
    this.camera.position.y = 6 + this.speed * 0.005;
    this.camera.lookAt(this.playerCar.mesh.position.x, 1, this.playerCar.mesh.position.z);

    if (this.speed > 200) {
      this.effects.addSpeedLines();
    }

    this.playerCar.mesh.position.y = 0.3;
    this.playerCar.mesh.rotation.x = Math.sin(this.clock.elapsed * this.speed * 0.01) * 0.02;

    for (const ai of this.aiCars) {
      this.ai.update(ai, dt, this);
    }

    this.nitro.updateTrail(this.playerCar, this.speed);
    this.effects.updateCarExhaust(this.playerCar, this.speed);

    this.audio.updateEngine(this.speed, targetSpeed, input.nitro);

    this.position = this.calculatePosition();
    this.modeManager.update(dt);

    if (this.ui) this.ui.updateHUD({
      speed: Math.round(this.speed),
      position: this.position,
      totalRacers: this.aiCars.length + 1,
      lap: this.lap,
      totalLaps: this.totalLaps,
      nitroLevel: this.nitro.currentLevel,
      nitroMeter: this.nitro.meter,
    });

    this.stunts.update(dt, this.playerCar, this.speed, input);
  }

  calculatePosition() {
    let pos = 1;
    for (const ai of this.aiCars) {
      if (ai.speed > this.speed) pos++;
    }
    return pos;
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  finishRace(result) {
    this.isRunning = false;
    this.audio.stopEngine();
    const creditsEarned = Math.max(0, (this.position === 1 ? 100 : this.position === 2 ? 50 : this.position === 3 ? 25 : 10));
    this.credits += creditsEarned;
    if (this.ui) this.ui.showRaceResult(result, creditsEarned);
  }
}

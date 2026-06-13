export class VisualEffects {
  constructor(game) {
    this.game = game;
    this.speedLines = [];
    this.particles = [];
    this.shakeIntensity = 0;
    this.exhaustParticles = [];
  }

  clear() {
    for (const p of [...this.speedLines, ...this.particles, ...this.exhaustParticles]) {
      this.game.scene.remove(p);
      if (p.geometry) p.geometry.dispose();
      if (p.material) p.material.dispose();
    }
    this.speedLines = [];
    this.particles = [];
    this.exhaustParticles = [];
    this.shakeIntensity = 0;
  }

  addSpeedLines() {
    if (Math.random() > 0.15) return;
    const geo = new THREE.PlaneGeometry(0.5, Math.random() * 10 + 5);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1 + Math.random() * 0.15,
      side: THREE.DoubleSide,
    });
    const line = new THREE.Mesh(geo, mat);
    const cam = this.game.camera;
    line.position.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20,
      cam.position.z - 20 - Math.random() * 30,
    );
    line.rotation.x = Math.PI / 2;
    line.userData.life = 0.5 + Math.random() * 0.5;
    this.game.scene.add(line);
    this.speedLines.push(line);

    if (this.speedLines.length > 40) {
      const old = this.speedLines.shift();
      this.game.scene.remove(old);
      old.geometry.dispose();
      old.material.dispose();
    }
  }

  addCollisionEffect(position) {
    for (let i = 0; i < 10; i++) {
      const geo = new THREE.SphereGeometry(0.05, 4, 4);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffaa44,
        transparent: true,
        opacity: 1,
      });
      const p = new THREE.Mesh(geo, mat);
      p.position.copy(position);
      p.userData.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: Math.random() * 3,
        z: (Math.random() - 0.5) * 5,
      };
      p.userData.life = 0.5 + Math.random() * 0.5;
      this.game.scene.add(p);
      this.particles.push(p);
    }
    this.shakeIntensity = 0.3;
  }

  updateCarExhaust(car, speed) {
    if (!car?.mesh || speed < 10) return;
    if (Math.random() > 0.5) return;

    const geo = new THREE.SphereGeometry(0.05, 4, 4);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.4,
    });
    const p = new THREE.Mesh(geo, mat);
    const pos = car.mesh.position;
    const rot = car.mesh.rotation.y;
    p.position.set(
      pos.x - Math.sin(rot) * 2.2,
      0.15,
      pos.z - Math.cos(rot) * 2.2,
    );
    p.userData.life = 0.3 + Math.random() * 0.3;
    p.userData.velocity = {
      x: (Math.random() - 0.5) * 0.3 - Math.sin(rot) * 0.2,
      y: -0.1,
      z: (Math.random() - 0.5) * 0.3 - Math.cos(rot) * 0.2,
    };
    this.game.scene.add(p);
    this.exhaustParticles.push(p);

    if (this.exhaustParticles.length > 30) {
      const old = this.exhaustParticles.shift();
      this.game.scene.remove(old);
      if (old.geometry) old.geometry.dispose();
      if (old.material) old.material.dispose();
    }
  }

  screenShake() {
    if (this.shakeIntensity > 0) {
      const cam = this.game.camera;
      cam.position.x += (Math.random() - 0.5) * this.shakeIntensity;
      cam.position.y += (Math.random() - 0.5) * this.shakeIntensity;
      this.shakeIntensity *= 0.9;
      if (this.shakeIntensity < 0.01) this.shakeIntensity = 0;
    }
  }

  update(dt) {
    for (const list of [this.speedLines, this.particles, this.exhaustParticles]) {
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        if (p.userData.life !== undefined) {
          p.userData.life -= dt;
          if (p.material) p.material.opacity = Math.max(0, p.userData.life * 2);
          if (p.userData.velocity) {
            p.position.x += p.userData.velocity.x * dt;
            p.position.y += p.userData.velocity.y * dt;
            p.position.z += p.userData.velocity.z * dt;
          }
          if (p.userData.life <= 0) {
            this.game.scene.remove(p);
            if (p.geometry) p.geometry.dispose();
            if (p.material) p.material.dispose();
            list.splice(i, 1);
          }
        }
      }
    }
    this.screenShake();
  }
}

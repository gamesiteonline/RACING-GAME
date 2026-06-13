export class NitroSystem {
  constructor(game) { this.game = game; this.meter = 0; this.maxMeter = 100; this.currentLevel = 0; this.isActive = false; this.trailParticles = []; }

  reset() { this.meter = this.maxMeter; this.currentLevel = 0; this.isActive = false; }

  update(dt, activate) {
    if (activate && this.meter > 0) {
      this.isActive = true;
      this.meter -= dt * 15;
      const ratio = this.meter / this.maxMeter;
      if (ratio > 0.66) this.currentLevel = 3;
      else if (ratio > 0.33) this.currentLevel = 2;
      else this.currentLevel = 1;
    } else {
      this.isActive = false;
      this.currentLevel = 0;
      if (this.meter < this.maxMeter) this.meter += dt * 5;
    }
    this.meter = Math.max(0, Math.min(this.maxMeter, this.meter));
  }

  getSpeedMultiplier() {
    if (!this.isActive) return 1;
    const multipliers = { 0: 1, 1: 1.15, 2: 1.3, 3: 1.5 };
    return multipliers[this.currentLevel] || 1;
  }

  getNitroColor() {
    const colors = { 0: 0x888888, 1: 0xff6600, 2: 0x4488ff, 3: 0x8800ff };
    return colors[this.currentLevel] || 0x888888;
  }

  updateTrail(car, speed) {
    if (!car || !car.mesh || speed < 50) return;

    if (this.isActive && Math.random() > 0.3) {
      const color = this.getNitroColor();
      const geo = new THREE.SphereGeometry(0.1, 4, 4);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 });
      const particle = new THREE.Mesh(geo, mat);
      const pos = car.mesh.position;
      const rot = car.mesh.rotation.y;

      particle.position.set(
        pos.x - Math.sin(rot) * 2 + (Math.random() - 0.5),
        0.1,
        pos.z - Math.cos(rot) * 2 + (Math.random() - 0.5),
      );

      particle.userData.life = 1;
      particle.userData.velocity = { x: (Math.random() - 0.5) * 0.5, y: -0.2, z: (Math.random() - 0.5) * 0.5 };

      this.game.scene.add(particle);
      this.trailParticles.push(particle);

      if (this.trailParticles.length > 50) {
        const old = this.trailParticles.shift();
        this.game.scene.remove(old);
        old.geometry.dispose();
        old.material.dispose();
      }
    }
  }
}

export class StuntSystem {
  constructor(game) {
    this.game = game;
    this.isInAir = false;
    this.airTime = 0;
    this.currentStunt = null;
    this.stuntProgress = 0;
    this.completedStunts = [];
  }

  update(dt, car, speed, input) {
    if (!car || !car.mesh) return;

    // Check if on ramp
    const track = this.game.currentTrack;
    let onRamp = false;
    if (track?.ramps) {
      for (const ramp of track.ramps) {
        const dx = car.mesh.position.x - ramp.position.x;
        const dz = car.mesh.position.z - ramp.position.z;
        if (Math.abs(dx) < 3 && Math.abs(dz) < 3) {
          onRamp = true;
          break;
        }
      }
    }

    if (onRamp && !this.isInAir && speed > 100) {
      this.isInAir = true;
      this.airTime = 0;
      car.mesh.position.y = 0.5;
    }

    if (this.isInAir) {
      this.airTime += dt;
      car.mesh.position.y = 0.5 + Math.sin(this.airTime * 3) * 1.5 + 1;

      if (input.stunt && !this.currentStunt) {
        const stunts = [
          { name: 'spiral', rotation: { y: 360 }, credits: 100 },
          { name: 'barrel_roll', rotation: { x: 360 }, credits: 150 },
          { name: 'backflip', rotation: { z: 360 }, credits: 200 },
        ];
        this.currentStunt = stunts[Math.floor(Math.random() * stunts.length)];
        this.stuntProgress = 0;
      }

      if (this.currentStunt) {
        this.stuntProgress += dt * 360;
        if (this.currentStunt.rotation.y) car.mesh.rotation.y += dt * 10;
        if (this.currentStunt.rotation.x) car.mesh.rotation.x += dt * 10;
        if (this.currentStunt.rotation.z) car.mesh.rotation.z += dt * 10;

        if (this.stuntProgress >= 360) {
          this.completedStunts.push(this.currentStunt.name);
          this.game.credits += this.currentStunt.credits;
          this.game.audio.playSuccess();
          this.currentStunt = null;
        }
      }

      if (this.airTime > 2 || car.mesh.position.y < 0.3) {
        this.isInAir = false;
        this.airTime = 0;
        car.mesh.position.y = 0.3;
        car.mesh.rotation.x = 0;
        car.mesh.rotation.z = 0;
      }
    }
  }

  getStuntBonus() {
    return this.completedStunts.length * 100;
  }
}

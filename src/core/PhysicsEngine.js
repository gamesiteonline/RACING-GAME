export class PhysicsEngine {
  constructor() {
    this.gravity = -9.8;
    this.friction = 0.98;
  }

  checkCollision(a, b) {
    if (!a || !b) return false;
    const dx = a.position.x - b.position.x;
    const dz = a.position.z - b.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    return dist < 2.5;
  }

  resolveCollision(a, b) {
    const dx = a.position.x - b.position.x;
    const dz = a.position.z - b.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz) || 1;
    const force = 2;
    a.position.x += (dx / dist) * force;
    a.position.z += (dz / dist) * force;
    b.position.x -= (dx / dist) * force;
    b.position.z -= (dz / dist) * force;
  }

  isOnTrack(position, track) {
    if (!track || !track.roadPoints) return true;
    const halfWidth = 6;
    for (const p of track.roadPoints) {
      const dx = position.x - p.x;
      const dz = position.z - p.z;
      if (Math.abs(dx) < halfWidth && Math.abs(dz) < halfWidth) return true;
    }
    return false;
  }

  getRampMultiplier(car, track) {
    if (!track || !track.ramps) return 0;
    for (const ramp of track.ramps) {
      const dx = car.position.x - ramp.position.x;
      const dz = car.position.z - ramp.position.z;
      if (Math.abs(dx) < 3 && Math.abs(dz) < 3) return 1;
    }
    return 0;
  }
}

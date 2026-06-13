export class AIEngine {
  constructor(game) { this.game = game; this.opponents = []; }

  init(aiCars) {
    this.opponents = aiCars;
  }

  update(aiCar, dt, game) {
    if (!aiCar) return;

    const difficulty = aiCar.aiDifficulty || 'medium';
    const speedFactors = { easy: 0.6, medium: 0.8, hard: 0.95 };
    const factor = speedFactors[difficulty] || 0.7;

    const targetSpeed = (aiCar.definition?.maxSpeed || 280) * factor;
    const aiNitro = Math.random() < 0.01 ? 1 : 0;

    if (aiNitro) {
      aiCar.speed += 50 * dt;
    }

    if (aiCar.speed < targetSpeed) {
      aiCar.speed += 20 * dt * (aiNitro ? 2 : 1);
    } else {
      aiCar.speed *= 0.99;
    }

    // Steer toward track center
    const dx = -aiCar.mesh.position.x;
    const steerAmount = Math.max(-1, Math.min(1, dx * 0.1));
    aiCar.mesh.rotation.y += steerAmount * dt * 1.5;

    // Move
    const moveSpeed = aiCar.speed * 0.15 * dt;
    aiCar.mesh.position.x += Math.sin(aiCar.mesh.rotation.y) * moveSpeed;
    aiCar.mesh.position.z += Math.cos(aiCar.mesh.rotation.y) * moveSpeed;
    aiCar.mesh.position.y = 0.3;

    // Avoid going too far off track
    if (Math.abs(aiCar.mesh.position.x) > 8) {
      aiCar.mesh.rotation.y += Math.sign(-aiCar.mesh.position.x) * dt * 2;
    }

    // Aggressive: block player
    if (difficulty === 'hard') {
      const player = game.playerCar;
      if (player) {
        const pdx = player.mesh.position.x - aiCar.mesh.position.x;
        const pdz = player.mesh.position.z - aiCar.mesh.position.z;
        const pDist = Math.sqrt(pdx * pdx + pdz * pdz);
        if (pDist < 4 && pdz > 0) {
          aiCar.mesh.rotation.y += Math.sign(pdx) * dt * 2;
        }
      }
    }
  }

  setDifficulty(aiCar, level) {
    const difficulties = ['easy', 'medium', 'hard'];
    aiCar.aiDifficulty = difficulties[Math.min(level, 2)];
  }
}

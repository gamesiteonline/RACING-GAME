export class ModeManager {
  constructor(game) { this.game = game; this.currentMode = null; this.timer = 0; }

  start(mode, config = {}) {
    this.currentMode = mode;
    this.timer = 0;
    this[`start${mode}`]?.(config);
  }

  update(dt) {
    this.timer += dt;
    this[`update${this.currentMode}`]?.(dt);
  }

  startCareer(config) {
    this.raceIndex = config.raceIndex || 0;
    this.goal = config.goal || 'finish_1st';
    this.game.totalLaps = 2;
  }

  updateCareer(dt) {
    if (this.game.position === 1) {
      this.game.finishRace({ mode: 'career', won: true, raceIndex: this.raceIndex });
    }
  }

  startTimeTrial() {
    this.game.totalLaps = 1;
    this.bestTime = Infinity;
    this.ghostTime = localStorage.getItem('streetNitro_ghost') ? parseFloat(localStorage.getItem('streetNitro_ghost')) : Infinity;
  }

  updateTimeTrial(dt) {
    if (this.timer > 60) {
      if (this.timer < this.bestTime) {
        this.bestTime = this.timer;
        localStorage.setItem('streetNitro_ghost', String(this.timer));
      }
      this.game.finishRace({ mode: 'time_trial', time: this.timer, bestTime: this.bestTime, ghost: this.timer < this.ghostTime });
    }
  }

  startKnockdown() {
    this.game.totalLaps = 0;
    this.knockdownCount = 0;
    this.knockdownTimer = 60;
    this.aiKnockdowns = 0;
  }

  updateKnockdown(dt) {
    this.knockdownTimer -= dt;
    if (this.knockdownTimer <= 0) {
      this.game.finishRace({ mode: 'knockdown', knockdowns: this.knockdownCount, won: this.knockdownCount > this.aiKnockdowns });
    }
  }

  startGateDrift() {
    this.game.totalLaps = 0;
    this.driftScore = 0;
    this.driftMultiplier = 1;
    this.gatesPassed = 0;
    this.gateTimer = 30;
  }

  updateGateDrift(dt) {
    this.gateTimer -= dt;
    if (this.game.speed > 50) {
      this.driftScore += this.game.speed * 0.01 * this.driftMultiplier;
    }
    if (this.gateTimer <= 0) {
      this.game.finishRace({ mode: 'gate_drift', score: Math.round(this.driftScore), won: this.driftScore >= 5000 });
    }
  }

  startMultiplayer() {
    this.game.totalLaps = 2;
  }
}

export class InputManager {
  constructor() {
    this.state = { steer: 0, forward: false, brake: false, left: false, right: false, nitro: false, stunt: false, pause: false };
    this.touchStartX = 0;
    this.tiltEnabled = false;
  }

  bind() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') this.state.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') this.state.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w') this.state.forward = true;
      if (e.key === 'ArrowDown' || e.key === 's') this.state.brake = true;
      if (e.key === ' ' || e.key === 'n') this.state.nitro = true;
      if (e.key === 'Escape') this.state.pause = true;
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') this.state.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') this.state.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w') this.state.forward = false;
      if (e.key === 'ArrowDown' || e.key === 's') this.state.brake = false;
      if (e.key === ' ' || e.key === 'n') this.state.nitro = false;
      if (e.key === 'Escape') this.state.pause = false;
    });

    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.state.forward = true;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!this.tiltEnabled) {
        const dx = e.touches[0].clientX - this.touchStartX;
        this.state.steer = Math.max(-1, Math.min(1, dx / 50));
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      this.state.steer = 0;
      this.state.forward = false;
    }, { passive: true });

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (this.tiltEnabled && e.gamma != null) {
          this.state.steer = Math.max(-1, Math.min(1, e.gamma / 30));
        }
      }, { passive: true });
    }
  }

  getState() {
    return { ...this.state };
  }

  enableTilt(v) { this.tiltEnabled = v; }
}

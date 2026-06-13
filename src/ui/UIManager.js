export class UIManager {
  constructor(game) {
    this.game = game;
    this.container = document.getElementById('ui-overlay');
    this.currentScreen = null;
    this.screens = {};
  }

  showLoading() {
    this.createScreen('loading', `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:#0a0a1a;color:#fff;">
        <h1 style="font-size:48px;font-weight:900;background:linear-gradient(135deg,#ff6a00,#ee0979);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">STREET NITRO</h1>
        <div style="width:60px;height:60px;border:4px solid rgba(255,255,255,0.1);border-top:4px solid #ee0979;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
        <p style="margin-top:16px;color:#888;font-size:14px;">Revving engines...</p>
      </div>
    `);
  }

  showMainMenu() {
    this.game.audio.resume();
    this.clearScreen();
    const menu = document.createElement('div');
    menu.id = 'main-menu';
    menu.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      background:linear-gradient(135deg,#0a0a1a 0%,#1a0a2e 50%,#0a0a1a 100%);
      z-index:100;
    `;

    const title = document.createElement('h1');
    title.textContent = 'STREET NITRO';
    title.style.cssText = `
      font-size:64px;font-weight:900;
      background:linear-gradient(135deg,#ff6a00,#ee0979);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      margin-bottom:8px;letter-spacing:4px;
    `;
    menu.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.textContent = 'High-Speed Arcade Racing';
    subtitle.style.cssText = 'color:#888;font-size:18px;margin-bottom:40px;letter-spacing:2px;';
    menu.appendChild(subtitle);

    const buttons = [
      { text: 'CAREER', mode: 'career', icon: '🏆' },
      { text: 'TIME TRIAL', mode: 'time_trial', icon: '⏱️' },
      { text: 'KNOCKDOWN', mode: 'knockdown', icon: '💥' },
      { text: 'GATE DRIFT', mode: 'gate_drift', icon: '🚧' },
      { text: 'MULTIPLAYER', mode: 'multiplayer', icon: '🌐' },
    ];

    buttons.forEach((b) => {
      const btn = this.createNeonBtn(b.text, 'orange');
      btn.style.margin = '6px';
      btn.style.width = '280px';
      btn.onclick = () => {
        this.game.audio.playUIClick();
        this.showCarSelect(b.mode);
      };
      menu.appendChild(btn);
    });

    const bottomRow = document.createElement('div');
    bottomRow.style.cssText = 'display:flex;gap:12px;margin-top:20px;';

    const garageBtn = this.createNeonBtn('GARAGE', 'blue');
    garageBtn.onclick = () => { this.game.audio.playUIClick(); this.showGarage(); };
    bottomRow.appendChild(garageBtn);

    const settingsBtn = this.createNeonBtn('SETTINGS', 'blue');
    settingsBtn.onclick = () => { this.game.audio.playUIClick(); this.showSettings(); };
    bottomRow.appendChild(settingsBtn);

    menu.appendChild(bottomRow);

    const credits = document.createElement('p');
    credits.textContent = `Credits: ${this.game.credits}`;
    credits.style.cssText = 'color:#ffaa44;font-size:16px;margin-top:20px;font-weight:700;';
    menu.appendChild(credits);

    this.container.appendChild(menu);
    this.currentScreen = 'main-menu';
  }

  showCarSelect(mode) {
    this.clearScreen();
    const container = document.createElement('div');
    container.id = 'car-select';
    container.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:#0a0a1a;z-index:100;overflow-y:auto;
      display:flex;flex-direction:column;align-items:center;padding:20px;
    `;

    const header = document.createElement('h2');
    header.textContent = 'SELECT YOUR CAR';
    header.style.cssText = 'color:#fff;font-size:28px;font-weight:900;margin:10px 0;letter-spacing:2px;';
    container.appendChild(header);

    const classes = ['Supercar', 'Hypercar', 'Muscle', 'Exotic', 'Tuner'];
    const classColors = { Supercar: '#ff4444', Hypercar: '#ff8800', Muscle: '#4444ff', Exotic: '#44ff44', Tuner: '#ff44ff' };

    classes.forEach((cls) => {
      const clsLabel = document.createElement('h3');
      clsLabel.textContent = cls;
      clsLabel.style.cssText = `color:${classColors[cls]};font-size:18px;font-weight:700;margin:16px 0 8px;width:90%;max-width:600px;text-align:left;border-bottom:1px solid ${classColors[cls]}33;padding-bottom:4px;`;
      container.appendChild(clsLabel);

      const row = document.createElement('div');
      row.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;max-width:700px;';

      this.game.cars.forEach((car, i) => {
        if (car.definition.class !== cls) return;
        const card = document.createElement('div');
        card.style.cssText = `
          width:120px;padding:10px;border-radius:12px;
          background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);
          cursor:pointer;text-align:center;transition:all 0.2s;
        `;
        card.onmouseenter = () => { card.style.borderColor = '#ff6a00'; card.style.transform = 'scale(1.05)'; };
        card.onmouseleave = () => { card.style.borderColor = 'rgba(255,255,255,0.1)'; card.style.transform = 'scale(1)'; };

        const colorBox = document.createElement('div');
        colorBox.style.cssText = `width:100%;height:50px;border-radius:8px;background:#${car.definition.color.toString(16).padStart(6,'0')};margin-bottom:8px;`;
        card.appendChild(colorBox);

        const name = document.createElement('p');
        name.textContent = car.definition.name;
        name.style.cssText = 'color:#fff;font-size:12px;font-weight:700;margin:0;';
        card.appendChild(name);

        const stats = document.createElement('p');
        stats.textContent = `${car.definition.maxSpeed} km/h`;
        stats.style.cssText = 'color:#888;font-size:11px;margin:4px 0 0;';
        card.appendChild(stats);

        if (car.upgradeLevel > 0) {
          const stars = document.createElement('p');
          stars.textContent = '★'.repeat(car.upgradeLevel) + '☆'.repeat(5 - car.upgradeLevel);
          stars.style.cssText = 'color:#ffaa00;font-size:12px;margin:2px 0 0;';
          card.appendChild(stars);
        }

        card.onclick = () => {
          this.game.audio.playUIClick();
          this.game.selectedCarIndex = i;
          this.game.playerCar = car;
          this.clearScreen();

          if (mode === 'career') {
            this.game.modeManager.currentRaceIndex = 0;
          }

          // Countdown before race
          this.showCountdown(mode);
        };

        row.appendChild(card);
      });

      container.appendChild(row);
    });

    const backBtn = this.createNeonBtn('← BACK', 'blue');
    backBtn.style.marginTop = '20px';
    backBtn.onclick = () => { this.game.audio.playUIClick(); this.clearScreen(); this.showMainMenu(); };
    container.appendChild(backBtn);

    this.container.appendChild(container);
    this.currentScreen = 'car-select';
  }

  showCountdown(mode) {
    this.clearScreen();
    const cd = document.createElement('div');
    cd.id = 'countdown';
    cd.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      display:flex;align-items:center;justify-content:center;
      background:rgba(0,0,0,0.7);z-index:200;
    `;

    const num = document.createElement('div');
    num.textContent = '3';
    num.style.cssText = 'font-size:120px;font-weight:900;color:#fff;text-shadow:0 0 40px rgba(255,106,0,0.8);';
    cd.appendChild(num);

    this.container.appendChild(cd);

    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        num.textContent = String(count);
        num.style.fontSize = '140px';
        setTimeout(() => { num.style.fontSize = '120px'; }, 100);
      } else if (count === 0) {
        num.textContent = 'GO!';
        num.style.color = '#ff6a00';
        num.style.fontSize = '100px';
      } else {
        clearInterval(interval);
        cd.remove();
        // Start race
        const trackIds = ['city', 'desert', 'snow'];
        const trackId = trackIds[Math.floor(Math.random() * trackIds.length)];
        this.game.startRace(trackId, mode);
      }
    }, 1000);
  }

  showHUD() {
    this.clearScreen();
    const hud = document.createElement('div');
    hud.id = 'hud';
    hud.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      pointer-events:none;z-index:50;
    `;

    // Position
    const pos = document.createElement('div');
    pos.id = 'hud-position';
    pos.style.cssText = 'position:absolute;top:60px;left:20px;font-size:48px;font-weight:900;color:#fff;text-shadow:0 0 20px rgba(0,0,0,0.8);';
    pos.textContent = '1st';
    hud.appendChild(pos);

    // Speedometer
    const speedContainer = document.createElement('div');
    speedContainer.id = 'hud-speed';
    speedContainer.style.cssText = 'position:absolute;top:60px;right:20px;text-align:right;';
    const speedVal = document.createElement('div');
    speedVal.id = 'speed-value';
    speedVal.textContent = '0';
    speedVal.style.cssText = 'font-size:64px;font-weight:900;color:#fff;text-shadow:0 0 20px rgba(0,0,0,0.8);line-height:1;';
    speedContainer.appendChild(speedVal);
    const speedUnit = document.createElement('div');
    speedUnit.textContent = 'km/h';
    speedUnit.style.cssText = 'font-size:16px;color:#888;';
    speedContainer.appendChild(speedUnit);
    hud.appendChild(speedContainer);

    // Nitro meter
    const nitroContainer = document.createElement('div');
    nitroContainer.id = 'hud-nitro';
    nitroContainer.style.cssText = 'position:absolute;bottom:100px;left:20px;display:flex;gap:6px;';
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement('div');
      bar.id = `nitro-bar-${i}`;
      bar.style.cssText = 'width:30px;height:80px;border-radius:6px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);transition:all 0.3s;';
      nitroContainer.appendChild(bar);
    }
    hud.appendChild(nitroContainer);

    // Lap counter
    const lap = document.createElement('div');
    lap.id = 'hud-lap';
    lap.style.cssText = 'position:absolute;bottom:100px;left:50%;transform:translateX(-50%);font-size:20px;font-weight:700;color:#fff;text-shadow:0 0 10px rgba(0,0,0,0.8);';
    lap.textContent = 'LAP 1/1';
    hud.appendChild(lap);

    // Touch controls (mobile)
    const controls = document.createElement('div');
    controls.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;height:120px;pointer-events:none;z-index:60;';

    const leftBtn = document.createElement('div');
    leftBtn.id = 'touch-left';
    leftBtn.style.cssText = 'position:absolute;left:20px;bottom:20px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:30px;pointer-events:auto;color:#fff;';
    leftBtn.textContent = '◀';
    controls.appendChild(leftBtn);

    const rightBtn = document.createElement('div');
    rightBtn.id = 'touch-right';
    rightBtn.style.cssText = 'position:absolute;left:110px;bottom:20px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:30px;pointer-events:auto;color:#fff;';
    rightBtn.textContent = '▶';
    controls.appendChild(rightBtn);

    const nitroBtn = document.createElement('div');
    nitroBtn.id = 'touch-nitro';
    nitroBtn.style.cssText = 'position:absolute;right:20px;bottom:20px;width:100px;height:100px;border-radius:50%;background:linear-gradient(135deg,#ff6a00,#ee0979);border:3px solid rgba(255,255,255,0.3);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;pointer-events:auto;color:#fff;text-transform:uppercase;box-shadow:0 0 30px rgba(238,9,121,0.5);';
    nitroBtn.textContent = 'NITRO';
    controls.appendChild(nitroBtn);

    hud.appendChild(controls);

    // Touch handlers
    this.setupTouchControls(leftBtn, rightBtn, nitroBtn);

    this.container.appendChild(hud);
    this.hudElements = { pos, speedVal, lap, nitroBars: [0, 1, 2].map((i) => document.getElementById(`nitro-bar-${i}`)) };
  }

  setupTouchControls(leftBtn, rightBtn, nitroBtn) {
    const game = this.game;

    leftBtn.addEventListener('touchstart', (e) => { e.preventDefault(); game.input.state.left = true; }, { passive: false });
    leftBtn.addEventListener('touchend', () => { game.input.state.left = false; }, { passive: true });
    leftBtn.addEventListener('mousedown', () => { game.input.state.left = true; });
    leftBtn.addEventListener('mouseup', () => { game.input.state.left = false; });

    rightBtn.addEventListener('touchstart', (e) => { e.preventDefault(); game.input.state.right = true; }, { passive: false });
    rightBtn.addEventListener('touchend', () => { game.input.state.right = false; }, { passive: true });
    rightBtn.addEventListener('mousedown', () => { game.input.state.right = true; });
    rightBtn.addEventListener('mouseup', () => { game.input.state.right = false; });

    nitroBtn.addEventListener('touchstart', (e) => { e.preventDefault(); game.input.state.nitro = true; game.audio.playNitroSound(1); }, { passive: false });
    nitroBtn.addEventListener('touchend', () => { game.input.state.nitro = false; }, { passive: true });
    nitroBtn.addEventListener('mousedown', () => { game.input.state.nitro = true; });
    nitroBtn.addEventListener('mouseup', () => { game.input.state.nitro = false; });
  }

  updateHUD(data) {
    if (!this.hudElements) return;
    const { speed, position, totalRacers, lap, totalLaps, nitroLevel, nitroMeter } = data;

    this.hudElements.speedVal.textContent = String(speed);

    const suffixes = ['th', 'st', 'nd', 'rd'];
    const suffix = position <= 3 ? suffixes[position] : 'th';
    this.hudElements.pos.textContent = `${position}${suffix}`;

    if (totalLaps > 0) {
      this.hudElements.lap.textContent = `LAP ${lap}/${totalLaps}`;
    }

    const nitroColors = ['#444', '#ff6600', '#4488ff', '#8800ff'];
    const activeColor = nitroColors[nitroLevel] || '#444';
    const nitroBars = this.hudElements.nitroBars;
    for (let i = 0; i < 3; i++) {
      const fill = Math.min(100, Math.max(0, (nitroMeter / 100) * 3 - i) * 100);
      nitroBars[i].style.background = i < Math.ceil((nitroMeter / 100) * 3)
        ? `linear-gradient(to top, ${activeColor}, ${activeColor}88)`
        : 'rgba(255,255,255,0.05)';
      nitroBars[i].style.boxShadow = i < Math.ceil((nitroMeter / 100) * 3)
        ? `0 0 10px ${activeColor}66`
        : 'none';
    }
  }

  showRaceResult(result, creditsEarned) {
    this.clearScreen();
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      background:rgba(0,0,0,0.85);z-index:200;
    `;

    const title = document.createElement('h2');
    title.textContent = result.won ? '🏆 RACE WINNER!' : 'RACE OVER';
    title.style.cssText = `font-size:48px;font-weight:900;color:${result.won ? '#ffd700' : '#ff4444'};margin-bottom:20px;text-shadow:${result.won ? '0 0 40px rgba(255,215,0,0.5)' : 'none'};`;
    overlay.appendChild(title);

    if (result.time) {
      const time = document.createElement('p');
      time.textContent = `Time: ${result.time.toFixed(2)}s`;
      time.style.cssText = 'color:#fff;font-size:24px;margin:8px;';
      overlay.appendChild(time);
    }

    if (result.knockdowns !== undefined) {
      const kd = document.createElement('p');
      kd.textContent = `Knockdowns: ${result.knockdowns}`;
      kd.style.cssText = 'color:#fff;font-size:24px;margin:8px;';
      overlay.appendChild(kd);
    }

    if (result.score) {
      const sc = document.createElement('p');
      sc.textContent = `Score: ${result.score}`;
      sc.style.cssText = 'color:#fff;font-size:24px;margin:8px;';
      overlay.appendChild(sc);
    }

    const creditsEl = document.createElement('p');
    creditsEl.textContent = `+${creditsEarned} credits earned!`;
    creditsEl.style.cssText = 'color:#ffaa44;font-size:20px;font-weight:700;margin:16px;';
    overlay.appendChild(creditsEl);

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;justify-content:center;';

    const retryBtn = this.createNeonBtn('RETRY', 'orange');
    retryBtn.onclick = () => {
      this.game.audio.playUIClick();
      overlay.remove();
      this.showCarSelect(this.game.currentMode);
    };
    btnRow.appendChild(retryBtn);

    const menuBtn = this.createNeonBtn('MAIN MENU', 'blue');
    menuBtn.onclick = () => {
      this.game.audio.playUIClick();
      overlay.remove();
      this.showMainMenu();
    };
    btnRow.appendChild(menuBtn);

    overlay.appendChild(btnRow);
    this.container.appendChild(overlay);
  }

  showGarage() {
    this.clearScreen();
    const container = document.createElement('div');
    container.id = 'garage';
    container.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:#0a0a1a;z-index:100;overflow-y:auto;
      display:flex;flex-direction:column;align-items:center;padding:20px;
    `;

    const header = document.createElement('h2');
    header.textContent = 'GARAGE';
    header.style.cssText = 'color:#fff;font-size:32px;font-weight:900;margin:10px 0;letter-spacing:2px;';
    container.appendChild(header);

    const creditsEl = document.createElement('p');
    creditsEl.id = 'garage-credits';
    creditsEl.textContent = `Credits: ${this.game.credits}`;
    creditsEl.style.cssText = 'color:#ffaa44;font-size:18px;font-weight:700;margin-bottom:16px;';
    container.appendChild(creditsEl);

    // Car grid
    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:800px;';

    this.game.cars.forEach((car, i) => {
      const card = document.createElement('div');
      card.style.cssText = `
        width:140px;padding:12px;border-radius:12px;
        background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);
        cursor:pointer;text-align:center;transition:all 0.2s;
      `;

      const colorBox = document.createElement('div');
      colorBox.style.cssText = `width:100%;height:60px;border-radius:8px;background:#${car.definition.color.toString(16).padStart(6,'0')};margin-bottom:8px;`;
      card.appendChild(colorBox);

      const name = document.createElement('p');
      name.textContent = car.definition.name;
      name.style.cssText = 'color:#fff;font-size:13px;font-weight:700;';
      card.appendChild(name);

      const cls = document.createElement('p');
      cls.textContent = car.definition.class;
      cls.style.cssText = 'color:#888;font-size:11px;';
      card.appendChild(cls);

      const stars = document.createElement('p');
      const level = car.upgradeLevel || 0;
      stars.textContent = (level > 0 ? '★'.repeat(level) + '☆'.repeat(5 - level) : '☆'.repeat(5));
      stars.style.cssText = 'color:#ffaa00;font-size:14px;margin:4px 0;';
      card.appendChild(stars);

      card.onclick = () => {
        this.game.audio.playUIClick();
        this.game.selectedCarIndex = i;
        this.game.playerCar = car;
        this.showCarDetail(car, i);
      };
      card.onmouseenter = () => { card.style.borderColor = '#ff6a00'; card.style.transform = 'scale(1.05)'; };
      card.onmouseleave = () => { card.style.borderColor = 'rgba(255,255,255,0.1)'; card.style.transform = 'scale(1)'; };

      grid.appendChild(card);
    });

    container.appendChild(grid);

    const backBtn = this.createNeonBtn('← BACK', 'blue');
    backBtn.style.marginTop = '20px';
    backBtn.onclick = () => { this.game.audio.playUIClick(); this.clearScreen(); this.showMainMenu(); };
    container.appendChild(backBtn);

    this.container.appendChild(container);
    this.currentScreen = 'garage';
  }

  showCarDetail(car, index) {
    this.clearScreen();
    const container = document.createElement('div');
    container.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:#0a0a1a;z-index:110;overflow-y:auto;
      display:flex;flex-direction:column;align-items:center;padding:30px;
    `;

    const def = car.definition;

    const name = document.createElement('h2');
    name.textContent = def.name;
    name.style.cssText = 'color:#fff;font-size:36px;font-weight:900;margin:10px 0;';
    container.appendChild(name);

    const cls = document.createElement('p');
    cls.textContent = def.class;
    cls.style.cssText = 'color:#888;font-size:18px;margin-bottom:20px;';
    container.appendChild(cls);

    const colorBox = document.createElement('div');
    colorBox.style.cssText = `width:200px;height:80px;border-radius:12px;background:#${def.color.toString(16).padStart(6,'0')};margin-bottom:20px;border:2px solid rgba(255,255,255,0.2);`;
    container.appendChild(colorBox);

    // Stats
    const statsContainer = document.createElement('div');
    statsContainer.style.cssText = 'width:100%;max-width:400px;margin-bottom:20px;';

    const stats = [
      { label: 'Speed', value: def.maxSpeed + (car.upgradeLevel || 0) * 10, max: 400, color: '#ff4444' },
      { label: 'Acceleration', value: Math.round(def.accel * 100) + (car.upgradeLevel || 0) * 5, max: 100, color: '#ff8800' },
      { label: 'Handling', value: Math.round(def.handling * 100) + (car.upgradeLevel || 0) * 5, max: 100, color: '#44ff44' },
    ];

    stats.forEach((s) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;margin:8px 0;';

      const label = document.createElement('span');
      label.textContent = s.label;
      label.style.cssText = 'color:#aaa;font-size:14px;width:100px;';
      row.appendChild(label);

      const barBg = document.createElement('div');
      barBg.style.cssText = 'flex:1;height:10px;background:rgba(255,255,255,0.1);border-radius:5px;overflow:hidden;';
      const bar = document.createElement('div');
      const fillPct = Math.min(100, (s.value / s.max) * 100);
      bar.style.cssText = `height:100%;width:${fillPct}%;background:${s.color};border-radius:5px;transition:width 0.5s;`;
      barBg.appendChild(bar);
      row.appendChild(barBg);

      const val = document.createElement('span');
      val.textContent = String(s.value);
      val.style.cssText = `color:${s.color};font-size:14px;font-weight:700;width:50px;text-align:right;`;
      row.appendChild(val);

      statsContainer.appendChild(row);
    });

    container.appendChild(statsContainer);

    // Upgrade section
    const upgradeSection = document.createElement('div');
    upgradeSection.style.cssText = 'width:100%;max-width:400px;margin-bottom:20px;';

    const upgradeLabel = document.createElement('h3');
    upgradeLabel.textContent = 'UPGRADES';
    upgradeLabel.style.cssText = 'color:#fff;font-size:20px;font-weight:700;margin-bottom:12px;';
    upgradeSection.appendChild(upgradeLabel);

    const starsRow = document.createElement('div');
    starsRow.style.cssText = 'display:flex;gap:8px;margin-bottom:12px;';

    for (let star = 1; star <= 5; star++) {
      const starBtn = document.createElement('div');
      const isOwned = (car.upgradeLevel || 0) >= star;
      const cost = star * 200;
      starBtn.style.cssText = `
        width:50px;height:50px;border-radius:10px;
        display:flex;align-items:center;justify-content:center;
        font-size:24px;cursor:pointer;transition:all 0.2s;
        background:${isOwned ? '#ffaa0044' : 'rgba(255,255,255,0.05)'};
        border:2px solid ${isOwned ? '#ffaa00' : 'rgba(255,255,255,0.1)'};
        color:${isOwned ? '#ffaa00' : '#555'};
      `;
      starBtn.textContent = '★';

      if (!isOwned && this.game.credits >= cost) {
        starBtn.onclick = () => {
          this.game.audio.playUIClick();
          this.game.credits -= cost;
          car.upgradeLevel = (car.upgradeLevel || 0) + 1;
          this.game.upgrades[index] = car.upgradeLevel;
          document.getElementById('garage-credits').textContent = `Credits: ${this.game.credits}`;
          this.showCarDetail(car, index);
        };
        starBtn.onmouseenter = () => { starBtn.style.borderColor = '#ffaa00'; starBtn.style.transform = 'scale(1.1)'; };
        starBtn.onmouseleave = () => { starBtn.style.transform = 'scale(1)'; };
      }

      starsRow.appendChild(starBtn);
    }

    upgradeSection.appendChild(starsRow);

    const costInfo = document.createElement('p');
    const nextLevel = (car.upgradeLevel || 0) + 1;
    if (nextLevel <= 5) {
      costInfo.textContent = `Next upgrade: ${nextLevel * 200} credits (Speed +10, Accel +5%, Handling +5%)`;
      costInfo.style.cssText = 'color:#888;font-size:13px;';
    } else {
      costInfo.textContent = 'MAX LEVEL';
      costInfo.style.cssText = 'color:#ffaa00;font-size:13px;font-weight:700;';
    }
    upgradeSection.appendChild(costInfo);

    container.appendChild(upgradeSection);

    // Color customization
    const colorSection = document.createElement('div');
    colorSection.style.cssText = 'width:100%;max-width:400px;margin-bottom:20px;';

    const colorLabel = document.createElement('h3');
    colorLabel.textContent = 'CUSTOMIZE COLOR';
    colorLabel.style.cssText = 'color:#fff;font-size:20px;font-weight:700;margin-bottom:12px;';
    colorSection.appendChild(colorLabel);

    const colorRow = document.createElement('div');
    colorRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;';

    const colorOptions = [0xff0000, 0x0044ff, 0x00aa00, 0x111111, 0xc0c0c0, 0xffffff, 0xff6600, 0x8800ff, 0xffdd00];
    colorOptions.forEach((c) => {
      const dot = document.createElement('div');
      dot.style.cssText = `width:36px;height:36px;border-radius:50%;background:#${c.toString(16).padStart(6,'0')};cursor:pointer;border:2px solid ${car.color === c ? '#ffaa00' : 'transparent'};transition:all 0.2s;`;
      dot.onclick = () => {
        this.game.audio.playUIClick();
        car.setColor(c);
        this.showCarDetail(car, index);
      };
      colorRow.appendChild(dot);
    });

    colorSection.appendChild(colorRow);
    container.appendChild(colorSection);

    const backBtn = this.createNeonBtn('← BACK', 'blue');
    backBtn.onclick = () => { this.game.audio.playUIClick(); this.showGarage(); };
    container.appendChild(backBtn);

    this.container.appendChild(container);
    this.currentScreen = 'car-detail';
  }

  showSettings() {
    this.clearScreen();
    const container = document.createElement('div');
    container.style.cssText = `
      position:fixed;top:0;left:0;width:100%;height:100%;
      background:#0a0a1a;z-index:100;
      display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;
    `;

    const header = document.createElement('h2');
    header.textContent = 'SETTINGS';
    header.style.cssText = 'color:#fff;font-size:32px;font-weight:900;margin-bottom:30px;';
    container.appendChild(header);

    const tiltLabel = document.createElement('p');
    tiltLabel.textContent = 'Controls: Keyboard / Touch';
    tiltLabel.style.cssText = 'color:#888;font-size:16px;margin-bottom:20px;';
    container.appendChild(tiltLabel);

    const backBtn = this.createNeonBtn('← BACK', 'blue');
    backBtn.onclick = () => { this.game.audio.playUIClick(); this.showMainMenu(); };
    container.appendChild(backBtn);

    this.container.appendChild(container);
    this.currentScreen = 'settings';
  }

  createNeonBtn(text, color = 'orange') {
    const btn = document.createElement('button');
    btn.className = 'btn neon-btn';
    btn.textContent = text;
    if (color === 'blue') {
      btn.className = 'btn neon-blue-btn';
    }
    btn.style.cssText = `
      cursor:pointer;border:none;font-family:'Segoe UI',sans-serif;
      font-weight:700;text-transform:uppercase;letter-spacing:1px;
      transition:transform 0.1s,box-shadow 0.2s;
      background:${color === 'orange'
        ? 'linear-gradient(135deg,#ff6a00,#ee0979)'
        : 'linear-gradient(135deg,#00b4db,#0083b0)'};
      color:#fff;border:2px solid rgba(255,255,255,0.3);
      box-shadow:${color === 'orange'
        ? '0 0 20px rgba(238,9,121,0.5)'
        : '0 0 20px rgba(0,180,219,0.5)'};
      border-radius:8px;padding:14px 32px;font-size:16px;
    `;
    return btn;
  }

  createScreen(id, html) {
    const div = document.createElement('div');
    div.id = id;
    div.innerHTML = html;
    this.container.appendChild(div);
    this.screens[id] = div;
    this.currentScreen = id;
    return div;
  }

  clearScreen() {
    this.container.innerHTML = '';
    this.hudElements = null;
    this.currentScreen = null;
  }
}

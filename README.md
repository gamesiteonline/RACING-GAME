<p align="center">
  <pre style="font-size:10px;line-height:1.1;color:#ff6a00;background:#0a0a1a;padding:16px;border-radius:8px;overflow-x:auto;font-family:monospace;">
   ▄████████  ▄▄▄▄███▄▄▄▄  ████████▄     ▄████████    ▄████████     ███     ▄████████  ▄█   ▄█          ▄████████ 
  ███    ███ ▄██▀▀▀███▀▀▀██▄ ███   ▀███   ███    ███   ███    ███ ▀█████████▄   ███    ███ ███  ███        ███    ███ 
  ███    ███ ███   ███   ███ ███    ███   ███    █▀    ███    █▀     ▀███▀▀██   ███    ███ ███▌ ███        ███    █▀  
  ███    ███ ███   ███   ███ ███    ███  ▄███▄▄▄       ███            ███   ▀  ▄███▄▄▄▄██▀ ███▌ ███       ▄███▄▄▄     
▀███████████ ███   ███   ███ ███    ███ ▀▀███▀▀▀     ▀███████████     ███     ▀▀███▀▀▀▀▀   ███▌ ███      ▀▀███▀▀▀     
  ███    ███ ███   ███   ███ ███    ███   ███               ███     ███       ███    ███ ███  ███        ███    ███ 
  ███    ███ ███   ███   ███ ███   ▄███   ███         ▄█    ███     ███       ███    ███ ███  ███▌    ▄   ███    ███ 
  ███    █▀   ▀█   ███   █▀  ████████▀    ██████████  ▄████████▀    ▄████▀     ███    █▀  █▀   █████▀▄▀  ██████████ 
                                                                                                                                                                            
  </pre>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-release-brightgreen?style=flat-square&color=00d4ff"/>
  <img src="https://img.shields.io/badge/version-1.0.0-ff6a00?style=flat-square"/>
  <img src="https://img.shields.io/badge/engine-Three.js-ee0979?style=flat-square"/>
  <img src="https://img.shields.io/badge/platform-mobile%20%7C%20desktop-ffd700?style=flat-square"/>
  <img src="https://img.shields.io/badge/license-MIT-44ff44?style=flat-square"/>
</p>

<p align="center"><strong>High-speed 3D arcade racing game for mobile & desktop.</strong><br>
25 cars · 3 global tracks · 5 game modes · Nitro · Air stunts · AI opponents<br>
Built with Three.js — 60 FPS on mobile devices.</p>

<br>

---

## ⚡ GAME OVERVIEW

```ascii
┌─────────────────────────────────────────────────────────────┐
│                    STREET NITRO                              │
│                                                             │
│  ┌─────────────────┐   ┌─────────────────┐                  │
│  │  5 CAR CLASSES  │   │  3 TRACKS       │                  │
│  │  Supercar  (5)  │   │  🌃 City Night  │                  │
│  │  Hypercar  (5)  │   │  🌅 Desert Hwy  │                  │
│  │  Muscle    (5)  │   │  ❄️ Snow Mtn    │                  │
│  │  Exotic    (5)  │   │                 │                  │
│  │  Tuner     (5)  │   │  5 GAME MODES   │                  │
│  │                 │   │  Career         │                  │
│  │  TOTAL: 25 CARS │   │  Time Trial     │                  │
│  └─────────────────┘   │  Knockdown      │                  │
│                        │  Gate Drift     │                  │
│  ┌─────────────────┐   │  Multiplayer    │                  │
│  │  NITRO 3-LEVEL  │   └─────────────────┘                  │
│  │  🟠 Lv1: 1.15x  │                                       │
│  │  🔵 Lv2: 1.30x  │   ┌─────────────────┐                  │
│  │  🟣 Lv3: 1.50x  │   │  AIR STUNTS     │                  │
│  └─────────────────┘   │  Spiral    💯cr  │                  │
│                        │  Barrel    💰cr  │                  │
│  ┌─────────────────┐   │  Backflip   🏆cr │                  │
│  │  AI DIFFICULTY  │   └─────────────────┘                  │
│  │  🟢 Easy         │                                       │
│  │  🟡 Medium       │   ┌─────────────────┐                  │
│  │  🔴 Hard         │   │  CUSTOMIZATION  │                  │
│  └─────────────────┘   │  9 Colors        │                  │
│                        │  5★ Upgrades     │                  │
│                        │  +10 km/h per ★  │                  │
│                        └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

## 🏎️ CAR CLASSES

```svg
<svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="200" rx="12" fill="#0a0a1a"/>
  
  <!-- Supercar -->
  <rect x="15" y="15" width="145" height="170" rx="8" fill="none" stroke="#ff4444" stroke-width="2"/>
  <text x="87" y="40" text-anchor="middle" fill="#ff4444" font-size="13" font-weight="bold" font-family="monospace">SUPERCAR</text>
  <rect x="25" y="50" width="125" height="25" rx="4" fill="#ff0000" opacity="0.6"/>
  <text x="87" y="67" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">LaFerrari  320</text>
  <rect x="25" y="80" width="125" height="25" rx="4" fill="#0044ff" opacity="0.6"/>
  <text x="87" y="97" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Veneno     325</text>
  <rect x="25" y="110" width="125" height="25" rx="4" fill="#222" opacity="0.6"/>
  <text x="87" y="127" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Vulcan     310</text>
  <rect x="25" y="140" width="125" height="25" rx="4" fill="#888" opacity="0.6"/>
  <text x="87" y="157" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">P1 · 918   315+</text>

  <!-- Hypercar -->
  <rect x="170" y="15" width="145" height="170" rx="8" fill="none" stroke="#ff8800" stroke-width="2"/>
  <text x="242" y="40" text-anchor="middle" fill="#ff8800" font-size="13" font-weight="bold" font-family="monospace">HYPERCAR</text>
  <rect x="180" y="50" width="125" height="25" rx="4" fill="#ff6600" opacity="0.6"/>
  <text x="242" y="67" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Agera RS   350</text>
  <rect x="180" y="80" width="125" height="25" rx="4" fill="#8800ff" opacity="0.6"/>
  <text x="242" y="97" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Huayra     345</text>
  <rect x="180" y="110" width="125" height="25" rx="4" fill="#00aa00" opacity="0.6"/>
  <text x="242" y="127" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Veyron     355</text>
  <rect x="180" y="140" width="125" height="25" rx="4" fill="#0044cc" opacity="0.6"/>
  <text x="242" y="157" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">M1 · Shelby 280+</text>

  <!-- Muscle -->
  <rect x="325" y="15" width="145" height="170" rx="8" fill="none" stroke="#4444ff" stroke-width="2"/>
  <text x="397" y="40" text-anchor="middle" fill="#4444ff" font-size="13" font-weight="bold" font-family="monospace">MUSCLE</text>
  <rect x="335" y="50" width="125" height="25" rx="4" fill="#111" opacity="0.6"/>
  <text x="397" y="67" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Challenger  285</text>
  <rect x="335" y="80" width="125" height="25" rx="4" fill="#888" opacity="0.6"/>
  <text x="397" y="97" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Camaro      280</text>
  <rect x="335" y="110" width="125" height="25" rx="4" fill="#cc0000" opacity="0.6"/>
  <text x="397" y="127" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Mustang GT  282</text>
  <rect x="335" y="140" width="125" height="25" rx="4" fill="#0044cc" opacity="0.6"/>
  <text x="397" y="157" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Bullet · Viper 290+</text>

  <!-- Exotic -->
  <rect x="480" y="15" width="145" height="170" rx="8" fill="none" stroke="#44ff44" stroke-width="2"/>
  <text x="552" y="40" text-anchor="middle" fill="#44ff44" font-size="13" font-weight="bold" font-family="monospace">EXOTIC</text>
  <rect x="490" y="50" width="125" height="25" rx="4" fill="#fff" opacity="0.6"/>
  <text x="552" y="67" text-anchor="middle" fill="#000" font-size="10" font-family="monospace">Evora       290</text>
  <rect x="490" y="80" width="125" height="25" rx="4" fill="#111" opacity="0.6"/>
  <text x="552" y="97" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">SLS · 458   300+</text>
  <rect x="490" y="110" width="125" height="25" rx="4" fill="#0044ff" opacity="0.6"/>
  <text x="552" y="127" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Huracan     310</text>
  <rect x="490" y="140" width="125" height="25" rx="4" fill="#888" opacity="0.6"/>
  <text x="552" y="157" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">R8          308</text>

  <!-- Tuner -->
  <rect x="635" y="15" width="150" height="170" rx="8" fill="none" stroke="#ff44ff" stroke-width="2"/>
  <text x="710" y="40" text-anchor="middle" fill="#ff44ff" font-size="13" font-weight="bold" font-family="monospace">TUNER</text>
  <rect x="645" y="50" width="130" height="25" rx="4" fill="#ff6600" opacity="0.6"/>
  <text x="710" y="67" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">GT-R         295</text>
  <rect x="645" y="80" width="130" height="25" rx="4" fill="#8800ff" opacity="0.6"/>
  <text x="710" y="97" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">RX-7         285</text>
  <rect x="645" y="110" width="130" height="25" rx="4" fill="#00aa00" opacity="0.6"/>
  <text x="710" y="127" text-anchor="middle" fill="#fff" font-size="10" font-family="monospace">Impreza      290</text>
  <rect x="645" y="140" width="130" height="25" rx="4" fill="#ffdd00" opacity="0.6"/>
  <text x="710" y="157" text-anchor="middle" fill="#000" font-size="10" font-family="monospace">Civic · Lancer 280+</text>
</svg>
```

## 🗺️ TRACKS

| Track | Location | Length | Features | Atmosphere |
|-------|----------|--------|----------|------------|
| 🌃 **City Night** | China | 2.5 km | 5 ramps, traffic cars, sharp turns, neon-lit buildings | Dark sky, glowing windows, street lights, motion blur |
| 🌅 **Desert Highway** | USA | 3.0 km | 4 ramps, long straights, oil barrels, wide turns | Orange sunset, cacti, distant mountains, road signs |
| ❄️ **Snow Mountain** | New Zealand | 2.8 km | 6 ramps, ice patches, narrow passes, downhill | Snow-covered, pine trees, cloudy sky, slippery sections |

## 🎮 GAME MODES

```ascii
┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   🏆 CAREER   │  │  ⏱️ TIME      │  │  💥 KNOCKDOWN │  │  🚧 GATE      │  │  🌐 MULTI-    │
│   MODE        │  │  TRIAL        │  │  MODE         │  │  DRIFT        │  │  PLAYER       │
├───────────────┤  ├───────────────┤  ├───────────────┤  ├───────────────┤  ├───────────────┤
│ 15 races      │  │ Vs ghost car  │  │ Eliminate all │  │ Drift through │  │ 6 online      │
│ 3 tracks      │  │ Beat best     │  │ 6 opponents   │  │ blue gates    │  │ racers        │
│ Goals per race│  │ time          │  │ 60s timer     │  │ 30s timer     │  │ Leaderboard   │
│ Earn credits  │  │ 3 tracks      │  │ Points per KD │  │ Score 5000+   │  │ Daily rewards │
└───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘
```

## ⚙️ CONTROLS

| Action | Mobile | Desktop |
|--------|--------|---------|
| Steer Left | ◀ Button / Tilt left | `←` or `A` |
| Steer Right | ▶ Button / Tilt right | `→` or `D` |
| Accelerate | Auto on touch | `↑` or `W` |
| Brake | — | `↓` or `S` |
| **Nitro Boost** | 🟣 Bottom button (hold) | `Space` or `N` |
| Air Stunt | Tap screen mid-air | `↑` mid-air |
| Pause | Menu button | `Esc` |

## 🚀 NITRO SYSTEM

```svg
<svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="120" rx="12" fill="#0a0a1a"/>
  
  <!-- Level 1 -->
  <rect x="20" y="20" width="170" height="80" rx="8" fill="none" stroke="#ff6600" stroke-width="2"/>
  <text x="105" y="45" text-anchor="middle" fill="#ff6600" font-size="18" font-weight="bold" font-family="monospace">LEVEL 1 🟠</text>
  <text x="105" y="65" text-anchor="middle" fill="#ffaa44" font-size="14" font-family="monospace">1.15x Speed</text>
  <text x="105" y="82" text-anchor="middle" fill="#888" font-size="11" font-family="monospace">Short whoosh</text>

  <!-- Level 2 -->
  <rect x="210" y="20" width="170" height="80" rx="8" fill="none" stroke="#4488ff" stroke-width="2"/>
  <text x="295" y="45" text-anchor="middle" fill="#4488ff" font-size="18" font-weight="bold" font-family="monospace">LEVEL 2 🔵</text>
  <text x="295" y="65" text-anchor="middle" fill="#66aaff" font-size="14" font-family="monospace">1.30x Speed</text>
  <text x="295" y="82" text-anchor="middle" fill="#888" font-size="11" font-family="monospace">Medium turbo</text>

  <!-- Level 3 -->
  <rect x="400" y="20" width="180" height="80" rx="8" fill="none" stroke="#8800ff" stroke-width="2"/>
  <text x="490" y="45" text-anchor="middle" fill="#8800ff" font-size="18" font-weight="bold" font-family="monospace">LEVEL 3 🟣</text>
  <text x="490" y="65" text-anchor="middle" fill="#aa44ff" font-size="14" font-family="monospace">1.50x Speed</text>
  <text x="490" y="82" text-anchor="middle" fill="#888" font-size="11" font-family="monospace">Rocket blast</text>
</svg>
```

## 🛠️ UPGRADE SYSTEM

Each car has 5 upgrade stars. Each star improves:

| Stat | Per Star | At 5 Stars |
|------|----------|------------|
| 🏎️ **Max Speed** | +10 km/h | +50 km/h |
| ⚡ **Acceleration** | +5% | +25% |
| 🎯 **Handling** | +5% | +25% |

**Cost per star:** `level × 200` credits (Star 1 = 200cr, Star 5 = 1000cr)

## 🏗️ ARCHITECTURE

```ascii
┌──────────────────────────────────────────────────────────────────┐
│                        STREET NITRO                              │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    THREE.JS RENDERER                      │   │
│  │  (WebGL · 60 FPS · Mobile-optimized · ACES tone-mapping) │   │
│  └──────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐  │
│  │  CARS    │ │ TRACKS   │ │ MODES    │ │  AI      │ │PHYS  │  │
│  │  Factory │ │ Manager  │ │ Manager  │ │ Engine   │ │Engine│  │
│  │  25 defs │ │ 3 tracks │ │ 5 modes  │ │3 diff    │ │Arcade│  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘  │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐    │
│  │  NITRO   │ │  STUNTS  │ │  AUDIO   │ │  VISUAL EFFECTS  │    │
│  │  3-level │ │ 3 types  │ │Engine+SFX│ │Particles · Shake │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    UI MANAGER                             │   │
│  │  Menu · Garage · HUD · Car Select · Upgrades · Results   │   │
│  └──────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              INPUT MANAGER                               │   │
│  │  Touch (steer/nitro buttons) · Keyboard · Device Tilt    │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

## 🚀 QUICK START

```bash
# Clone the repo
git clone https://github.com/gamesiteonline/RACING-GAME.git
cd RACING-GAME

# Serve with any HTTP server
npx serve .
# or: python3 -m http.server 3000
# or: npx http-server -p 3000

# Open in browser
open http://localhost:3000
```

No build step needed — just open in any modern browser with WebGL support.

## 📁 PROJECT STRUCTURE

```
street-nitro/
├── index.html              ← Entry point (Three.js loaded from CDN)
├── src/
│   ├── main.js             ← Game bootstrap
│   ├── core/
│   │   ├── Game.js         ← Main game loop & state
│   │   ├── InputManager.js ← Touch/keyboard/tilt input
│   │   └── PhysicsEngine.js ← Collisions & arcade physics
│   ├── cars/
│   │   ├── CarDefinitions.js ← 25 car specs
│   │   └── CarFactory.js     ← Procedural 3D car builder
│   ├── tracks/
│   │   └── TrackManager.js    ← 3 track builders
│   ├── modes/
│   │   └── ModeManager.js     ← 5 game modes
│   ├── ai/
│   │   └── AIEngine.js        ← 3-difficulty AI opponents
│   ├── audio/
│   │   └── AudioEngine.js     ← Web Audio API procedural sounds
│   ├── nitro/
│   │   └── NitroSystem.js     ← 3-level boost with particles
│   ├── stunts/
│   │   └── StuntSystem.js     ← Air stunt detection
│   ├── effects/
│   │   └── VisualEffects.js   ← Speed lines, particles, shake
│   └── ui/
│       └── UIManager.js       ← Full UI system (700 lines)
└── README.md
```

## 🔧 TECH STACK

| Technology | Usage |
|------------|-------|
| [Three.js r128](https://threejs.org/) | WebGL 3D rendering engine |
| Web Audio API | Procedural engine sounds, nitro, collision FX |
| Canvas API | HUD rendering |
| ES Modules | Code organization (zero build tools) |
| CSS3 | UI styling (gradients, animations, glassmorphism) |

## 🎯 PERFORMANCE

- **Target:** 60 FPS on mid-range mobile devices
- **Optimizations:** Particle limits (50), simplified shadows, mobile pixel ratio capping
- **Memory:** Pooled particle system, on-the-fly geometry disposal
- **Network:** Single CDN dependency (Three.js ~500KB gzipped)

## 📜 LICENSE

MIT — Free to use, modify, and distribute.

---

<p align="center">
  <sub>Built with ❤️ and Three.js · 2,100+ lines of JavaScript · All car models procedurally generated</sub><br>
  <sub>No external 3D assets required · Zero build steps · Open index.html and play</sub>
</p>

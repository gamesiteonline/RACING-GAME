# Street Nitro 🏎️

**High-speed 3D arcade racing game** — 25 cars, 3 tracks, 5 game modes. Inspired by Asphalt nitro-style racing.

## Features

- **25 Cars** across 5 classes: Supercar, Hypercar, Muscle, Exotic, Tuner
- **3 Tracks**: City Night (China), Desert Highway (USA), Snow Mountain (New Zealand)
- **5 Game Modes**: Career, Time Trial, Knockdown, Gate Drift, Multiplayer
- **Nitro Boost**: 3 levels (Orange/Blue/Purple) with visual effects
- **Air Stunts**: Spiral, Barrel Roll, Backflip off ramps
- **AI Opponents**: 3 difficulty levels with aggressive racing behavior
- **Car Customization**: Color picker + 5-star upgrade system
- **Garage**: Browse 21 cars, upgrade, customize
- **60 FPS** on mobile devices

## Play

Open `index.html` in a browser, or serve with:

```bash
npx serve .
```

## Controls

| Action | Mobile | Desktop |
|--------|--------|---------|
| Steer | Tilt / Arrow buttons | Arrow Left/Right |
| Nitro | Bottom button | Space / N |
| Stunt (in air) | Tap screen | Arrow Up |
| Pause | Menu button | Escape |

## Tech

- **Three.js** — WebGL 3D rendering
- **Web Audio API** — Procedural engine sounds, nitro, collisions
- **Vanilla JS** — Zero dependencies (except Three.js CDN)

## Credits

Built with Three.js. All car models are procedurally generated.

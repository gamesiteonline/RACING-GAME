export class TrackManager {
  constructor(game) { this.game = game; }

  build(trackId, scene) {
    this.clearTrack(scene);

    switch (trackId) {
      case 'city': return this.buildCityNight(scene);
      case 'desert': return this.buildDesertHighway(scene);
      case 'snow': return this.buildSnowMountain(scene);
      default: return this.buildCityNight(scene);
    }
  }

  clearTrack(scene) {
    const toRemove = [];
    scene.traverse((child) => {
      if (child.userData.isTrack) toRemove.push(child);
    });
    for (const obj of toRemove) {
      scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    }
  }

  buildRoad(scene, color, length = 80, width = 8) {
    const roadMat = new THREE.MeshStandardMaterial({
      color, roughness: 0.9, metalness: 0.1,
    });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(length, width), roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0;
    road.userData.isTrack = true;
    scene.add(road);

    // Lane markings
    const lineMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.3 });
    for (let z = -length / 2 + 2; z < length / 2; z += 4) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.1), lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, 0.02, z);
      line.userData.isTrack = true;
      scene.add(line);
    }

    return { road, length, width };
  }

  buildCityNight(scene) {
    const track = this.buildRoad(scene, 0x333344, 80, 10);
    track.ramps = [];

    // Buildings on sides
    const buildingColors = [0x334466, 0x445577, 0x224455, 0x335588, 0x445566];
    for (let z = -35; z < 35; z += 6) {
      for (const side of [-1, 1]) {
        const h = 3 + Math.random() * 8;
        const bMat = new THREE.MeshStandardMaterial({
          color: buildingColors[Math.floor(Math.random() * buildingColors.length)],
          roughness: 0.6,
        });
        const building = new THREE.Mesh(new THREE.BoxGeometry(2.5, h, 2.5), bMat);
        building.position.set(side * (6 + Math.random() * 2), h / 2, z + (Math.random() - 0.5) * 2);
        building.userData.isTrack = true;
        scene.add(building);

        // Windows (glowing)
        const winMat = new THREE.MeshStandardMaterial({
          color: 0xffdd88,
          emissive: 0xffaa44,
          emissiveIntensity: 0.5 + Math.random() * 0.5,
        });
        for (let wy = 1; wy < h; wy += 1.5) {
          const win = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.6), winMat);
          win.position.set(side * (6.3), wy, z + (Math.random() - 0.5) * 2);
          win.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
          win.userData.isTrack = true;
          scene.add(win);
        }
      }
    }

    // Street lights
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
    const lightMat = new THREE.MeshStandardMaterial({ color: 0xffffaa, emissive: 0xffffaa, emissiveIntensity: 0.5 });
    for (let z = -35; z < 35; z += 8) {
      for (const side of [-1, 1]) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 2), poleMat);
        pole.position.set(side * 5, 1, z);
        pole.userData.isTrack = true;
        scene.add(pole);
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.15), lightMat);
        lamp.position.set(side * 5, 2, z);
        lamp.userData.isTrack = true;
        scene.add(lamp);
      }
    }

    // Ramps
    for (let z = -20; z < 30; z += 25) {
      const rampMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 });
      const ramp = new THREE.Mesh(new THREE.BoxGeometry(3, 0.4, 2), rampMat);
      ramp.position.set(0, 0.2, z);
      ramp.rotation.x = 0.15;
      ramp.userData.isTrack = true;
      scene.add(ramp);
      track.ramps.push({ position: ramp.position });
    }

    // Traffic cars (static)
    const carMat = new THREE.MeshStandardMaterial({ color: 0xcc4444 });
    for (let z = -30; z < 30; z += 20) {
      if (Math.random() > 0.5) {
        const tc = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 3), carMat);
        tc.position.set(Math.random() > 0.5 ? 3 : -3, 0.2, z);
        tc.userData.isTrack = true;
        scene.add(tc);
      }
    }

    // Ambient neon glow
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xee0979,
      emissive: 0xee0979,
      emissiveIntensity: 0.05,
      transparent: true,
      opacity: 0.1,
    });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(100, 80), glowMat);
    glow.position.set(0, 0.01, 0);
    glow.rotation.x = -Math.PI / 2;
    glow.userData.isTrack = true;
    scene.add(glow);

    scene.background = new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.Fog(0x0a0a1a, 30, 80);

    const ambient = new THREE.AmbientLight(0x223355, 0.3);
    ambient.userData.isTrack = true;
    scene.add(ambient);

    track.roadPoints = [{ x: 0, z: -35 }, { x: 0, z: 35 }];
    track.startPositions = this.getStartGrid(0, 0, 0);
    this.game.camera.position.set(0, 8, -12);

    return track;
  }

  buildDesertHighway(scene) {
    const track = this.buildRoad(scene, 0xccaa66, 100, 10);
    track.ramps = [];

    scene.background = new THREE.Color(0xff8844);
    scene.fog = new THREE.Fog(0xff8844, 40, 100);

    // Cacti
    const cactusMat = new THREE.MeshStandardMaterial({ color: 0x446633 });
    for (let z = -45; z < 45; z += 3 + Math.random() * 5) {
      for (const side of [-1, 1]) {
        if (Math.random() > 0.4) {
          const cactus = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 1 + Math.random()), cactusMat);
          cactus.position.set(side * (6 + Math.random() * 4), 0.5, z);
          cactus.userData.isTrack = true;
          scene.add(cactus);
        }
      }
    }

    // Road signs
    const signMat = new THREE.MeshStandardMaterial({ color: 0xccaa66 });
    const signPostMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
    for (let z = -40; z < 40; z += 15) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 2), signPostMat);
      post.position.set(5.5, 1, z);
      post.userData.isTrack = true;
      scene.add(post);
      const sign = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 0.05), signMat);
      sign.position.set(5.5, 2.3, z);
      sign.userData.isTrack = true;
      scene.add(sign);
    }

    // Oil barrels
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x884422 });
    for (let z = -30; z < 30; z += 12) {
      for (const side of [-1, 1]) {
        if (Math.random() > 0.6) {
          const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.5), barrelMat);
          barrel.position.set(side * 4.5, 0.25, z);
          barrel.userData.isTrack = true;
          scene.add(barrel);
        }
      }
    }

    // Ramps
    for (let z = -30; z < 40; z += 30) {
      const rampMat = new THREE.MeshStandardMaterial({ color: 0xaa8844, roughness: 0.9 });
      const ramp = new THREE.Mesh(new THREE.BoxGeometry(3, 0.4, 2), rampMat);
      ramp.position.set(0, 0.2, z);
      ramp.rotation.x = 0.15;
      ramp.userData.isTrack = true;
      scene.add(ramp);
      track.ramps.push({ position: ramp.position });
    }

    // Sun
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44, emissive: 0xffaa44, emissiveIntensity: 1,
    });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), sunMat);
    sun.position.set(30, 20, -50);
    sun.userData.isTrack = true;
    scene.add(sun);

    track.roadPoints = [{ x: 0, z: -45 }, { x: 0, z: 45 }];
    track.startPositions = this.getStartGrid(0, 0, -40);
    this.game.camera.position.set(0, 8, -52);
    return track;
  }

  buildSnowMountain(scene) {
    const track = this.buildRoad(scene, 0xddddee, 90, 8);
    track.ramps = [];

    scene.background = new THREE.Color(0xccddff);
    scene.fog = new THREE.Fog(0xccddff, 30, 80);

    // Snow ground
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xeeefff, roughness: 0.9 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), snowMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.userData.isTrack = true;
    scene.add(ground);

    // Pine trees
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x442211 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x225522 });
    for (let z = -40; z < 40; z += 4 + Math.random() * 4) {
      for (const side of [-1, 1]) {
        if (Math.random() > 0.3) {
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.5), trunkMat);
          trunk.position.set(side * (5 + Math.random() * 3), 0.75, z);
          trunk.userData.isTrack = true;
          scene.add(trunk);
          const leaf1 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.8, 6), leafMat);
          leaf1.position.set(side * (5 + Math.random() * 3), 1.5, z);
          leaf1.userData.isTrack = true;
          scene.add(leaf1);
          const leaf2 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 0.6, 6), leafMat);
          leaf2.position.set(side * (5 + Math.random() * 3), 2.2, z);
          leaf2.userData.isTrack = true;
          scene.add(leaf2);
        }
      }
    }

    // Mountains in background
    const mtnMat = new THREE.MeshStandardMaterial({ color: 0xaabbcc, roughness: 0.8 });
    for (let z = -60; z < 60; z += 20) {
      const mtn = new THREE.Mesh(new THREE.ConeGeometry(4 + Math.random() * 5, 6 + Math.random() * 8, 5), mtnMat);
      mtn.position.set((Math.random() - 0.5) * 30, 3, z);
      mtn.userData.isTrack = true;
      scene.add(mtn);
    }

    // Ice patches (slippery visual)
    const iceMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeff, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.3,
    });
    for (let z = -20; z < 30; z += 10) {
      const ice = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), iceMat);
      ice.rotation.x = -Math.PI / 2;
      ice.position.set((Math.random() - 0.5) * 3, 0.01, z);
      ice.userData.isTrack = true;
      scene.add(ice);
    }

    // Ramps
    for (let z = -30; z < 35; z += 18) {
      const rampMat = new THREE.MeshStandardMaterial({ color: 0xccccdd });
      const ramp = new THREE.Mesh(new THREE.BoxGeometry(3, 0.4, 2), rampMat);
      ramp.position.set(0, 0.2, z);
      ramp.rotation.x = 0.15;
      ramp.userData.isTrack = true;
      scene.add(ramp);
      track.ramps.push({ position: ramp.position });
    }

    track.roadPoints = [{ x: 0, z: -40 }, { x: 0, z: 40 }];
    track.startPositions = this.getStartGrid(0, 0, -35);
    this.game.camera.position.set(0, 8, -47);
    return track;
  }

  getStartGrid(cx, cy, cz) {
    return [
      { x: cx, y: cy, z: cz },
      { x: cx - 2, y: cy, z: cz },
      { x: cx + 2, y: cy, z: cz },
      { x: cx - 4, y: cy, z: cz },
      { x: cx + 4, y: cy, z: cz },
      { x: cx - 6, y: cy, z: cz },
      { x: cx + 6, y: cy, z: cz },
    ];
  }
}

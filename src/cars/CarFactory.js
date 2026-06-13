export class CarFactory {
  create(def, scene) {
    const group = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(1.8, 0.5, 4);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: def.color,
      metalness: 0.6,
      roughness: 0.3,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.4;
    body.castShadow = true;
    group.add(body);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.35, 2);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x222233,
      metalness: 0.2,
      roughness: 0.8,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.7, -0.3);
    group.add(cabin);

    // Windshield
    const glassGeo = new THREE.BoxGeometry(1.3, 0.15, 1.8);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x4488cc,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.4,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.set(0, 0.75, -0.3);
    group.add(glass);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 });
    const rimGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.16, 8);

    const wheelPositions = [
      { x: -1, z: 1.3 }, { x: 1, z: 1.3 },
      { x: -1, z: -1.3 }, { x: 1, z: -1.3 },
    ];

    this.wheels = [];
    for (const pos of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(pos.x, 0.15, pos.z);
      wheel.rotation.x = Math.PI / 2;
      wheel.castShadow = true;
      group.add(wheel);

      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.set(pos.x, 0.15, pos.z);
      rim.rotation.x = Math.PI / 2;
      group.add(rim);

      this.wheels.push(wheel);
    }

    // Headlights
    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xffffaa,
      emissive: 0xffffaa,
      emissiveIntensity: 0.3,
    });
    const lightGeo = new THREE.SphereGeometry(0.1, 6, 6);
    const l1 = new THREE.Mesh(lightGeo, lightMat);
    l1.position.set(-0.5, 0.3, 2);
    group.add(l1);
    const l2 = new THREE.Mesh(lightGeo, lightMat);
    l2.position.set(0.5, 0.3, 2);
    group.add(l2);

    // Tail lights
    const tailMat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.2,
    });
    const tailGeo = new THREE.BoxGeometry(0.2, 0.1, 0.1);
    const t1 = new THREE.Mesh(tailGeo, tailMat);
    t1.position.set(-0.6, 0.3, -2);
    group.add(t1);
    const t2 = new THREE.Mesh(tailGeo, tailMat);
    t2.position.set(0.6, 0.3, -2);
    group.add(t2);

    // Spoiler
    if (def.class === 'Hypercar' || def.class === 'Supercar') {
      const spoilerMat = new THREE.MeshStandardMaterial({ color: def.color, metalness: 0.5, roughness: 0.4 });
      const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.3), spoilerMat);
      spoiler.position.set(0, 0.7, -2);
      group.add(spoiler);
      const supportMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const supportGeo = new THREE.BoxGeometry(0.05, 0.25, 0.05);
      const s1 = new THREE.Mesh(supportGeo, supportMat);
      s1.position.set(-0.6, 0.5, -2);
      group.add(s1);
      const s2 = new THREE.Mesh(supportGeo, supportMat);
      s2.position.set(0.6, 0.5, -2);
      group.add(s2);
    }

    scene.add(group);

    return {
      mesh: group,
      body, cabin, wheels: this.wheels,
      definition: def,
      speed: 0,
      steerAngle: 0,
      isPlayer: false,
      upgradeLevel: 0,
      health: 100,
      color: def.color,
      reset() {
        this.speed = 0;
        this.health = 100;
      },
      setColor(color) {
        body.material.color.setHex(color);
        this.color = color;
      },
    };
  }
}

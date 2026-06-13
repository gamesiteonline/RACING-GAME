export class CarFactory {
  constructor() {
    this.models = {};
  }

  setModels(models) {
    this.models = models;
  }

  create(def, scene) {
    const group = new THREE.Group();

    const modelKey = this.getClassModelKey(def.class);
    const template = this.models[modelKey];

    if (template) {
      const carModel = template.clone(true);

      carModel.traverse((child) => {
        if (child.isMesh) {
          const name = child.name ? child.name.toLowerCase() : '';
          if (child.material) {
            child.material = child.material.clone();
          }
          if (!name.includes('glass') && !name.includes('window') && !name.includes('light') && !name.includes('lamp') && !name.includes('wheel') && !name.includes('tire') && !name.includes('bumper') && !name.includes('grille') && !name.includes('headlight') && !name.includes('taillight')) {
            child.material.color.setHex(def.color);
          }
          child.castShadow = true;
        }
      });

      carModel.scale.set(0.5, 0.5, 0.5);
      carModel.position.y = 0.15;
      group.add(carModel);
    } else {
      this.buildProcedural(group, def);
    }

    scene.add(group);

    return {
      mesh: group,
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
        group.traverse((child) => {
          if (child.isMesh && child.material && child.material.color) {
            child.material.color.setHex(color);
          }
        });
        this.color = color;
      },
    };
  }

  getClassModelKey(className) {
    const map = {
      Supercar: 'supercar',
      Hypercar: 'hypercar',
      Muscle: 'muscle',
      Exotic: 'exotic',
      Tuner: 'tuner',
    };
    return map[className] || 'regular';
  }

  buildProcedural(group, def) {
    const bodyMat = new THREE.MeshStandardMaterial({
      color: def.color, metalness: 0.6, roughness: 0.3,
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 4), bodyMat);
    body.position.y = 0.4;
    body.castShadow = true;
    group.add(body);

    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x222233, metalness: 0.2, roughness: 0.8,
    });
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.35, 2), cabinMat);
    cabin.position.set(0, 0.7, -0.3);
    group.add(cabin);

    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const positions = [{ x: -1, z: 1.3 }, { x: 1, z: 1.3 }, { x: -1, z: -1.3 }, { x: 1, z: -1.3 }];
    for (const p of positions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(p.x, 0.15, p.z);
      wheel.rotation.x = Math.PI / 2;
      wheel.castShadow = true;
      group.add(wheel);
    }
  }
}

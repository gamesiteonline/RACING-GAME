export class AssetLoader {
  constructor() {
    this.loader = new THREE.GLTFLoader();
    this.models = {};
    this.totalAssets = 0;
    this.loadedAssets = 0;
  }

  async loadAll(manifest, onProgress) {
    const entries = Object.entries(manifest);
    this.totalAssets = entries.length;
    this.loadedAssets = 0;

    const promises = entries.map(([key, url]) => {
      return new Promise((resolve, reject) => {
        this.loader.load(
          url,
          (gltf) => {
            this.models[key] = gltf.scene;
            this.loadedAssets++;
            if (onProgress) {
              onProgress(this.loadedAssets, this.totalAssets);
            }
            resolve();
          },
          undefined,
          (err) => {
            console.warn(`Failed to load ${key} from ${url}:`, err);
            this.loadedAssets++;
            resolve();
          }
        );
      });
    });

    await Promise.all(promises);
    return this.models;
  }

  getModel(key) {
    return this.models[key] || null;
  }
}

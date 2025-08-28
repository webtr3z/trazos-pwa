import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class BackgroundScene {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model: THREE.Group | null = null;
  private mixer: THREE.AnimationMixer | null = null;
  private clock: THREE.Clock;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.clock = new THREE.Clock();

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLighting();
    this.loadModel();
    this.animate();
    this.handleResize();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();

    // Set background to a subtle gradient
    const gradientTexture = this.createGradientTexture();
    this.scene.background = gradientTexture;

    // Add fog for depth
    this.scene.fog = new THREE.Fog(0x87ceeb, 10, 200);
  }

  private createGradientTexture(): THREE.Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;

    const context = canvas.getContext("2d")!;
    const gradient = context.createLinearGradient(0, 0, 0, 2);
    gradient.addColorStop(0, "#050606"); // Sky blue
    gradient.addColorStop(1, "#040404"); // Light blue

    context.fillStyle = gradient;
    context.fillRect(0, 0, 2, 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    return texture;
  }

  private initCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000,
    );
    this.camera.position.set(0, 5, 7);
    this.camera.lookAt(0, 0, 0);
  }

  private initRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
  }

  private initLighting(): void {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);

    // Main directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    this.scene.add(directionalLight);

    // Fill light from opposite direction
    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
    fillLight.position.set(-50, 30, -50);
    this.scene.add(fillLight);

    // Rim light for depth
    const rimLight = new THREE.DirectionalLight(0xffd700, 0.2);
    rimLight.position.set(0, 20, -100);
    this.scene.add(rimLight);

    // Hemisphere light for sky/ground color influence
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x90ee90, 0.3);
    this.scene.add(hemisphereLight);
  }

  private loadModel(): void {
    const loader = new GLTFLoader();

    loader.load(
      "/3d/market_stock.glb",
      (gltf) => {
        this.model = gltf.scene;

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Scale model to reasonable size
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDim;
        this.model.scale.setScalar(scale);

        // Center the model
        this.model.position.sub(center.multiplyScalar(scale));

        // Enable shadows for all meshes
        this.model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Improve material quality
            if (child.material) {
              child.material.envMapIntensity = 0.5;
              child.material.needsUpdate = true;
            }
          }
        });

        this.scene.add(this.model);

        // Setup animations if they exist
        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model);
          gltf.animations.forEach((clip) => {
            this.mixer!.clipAction(clip).play();
          });
        }
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100,
          "%",
        );
      },
      (error) => {
        console.error("Error loading model:", error);
      },
    );
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // Update animations
    if (this.mixer) {
      this.mixer.update(delta);
    }

    // Gentle rotation of the model
    if (this.model) {
      this.model.rotation.y += 0.0005;
    }

    // Subtle camera movement
    const time = this.clock.getElapsedTime();
    this.camera.position.x = Math.sin(time * 0.1) * 2;
    this.camera.position.y = 5 + Math.sin(time * 0.05) * 0.5;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  private handleResize(): void {
    const handleResize = () => {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight,
      );
    };

    window.addEventListener("resize", handleResize);

    // Store the handler for cleanup
    (this as any)._resizeHandler = handleResize;
  }

  public destroy(): void {
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }

    if (this.mixer) {
      this.mixer.stopAllAction();
    }

    // Clean up event listeners
    const resizeHandler = (this as any)._resizeHandler;
    if (resizeHandler) {
      window.removeEventListener("resize", resizeHandler);
    }
  }
}

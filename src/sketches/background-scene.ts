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
  private backgroundMaterial!: THREE.ShaderMaterial;
  private backgroundPlane!: THREE.Mesh;

  constructor(container: HTMLElement) {
    this.container = container;
    this.clock = new THREE.Clock();

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initDynamicBackground();
    this.initLighting();
    this.loadModel();
    this.animate();
    this.handleResize();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();

    // Remove static background - we'll use dynamic shader material
    this.scene.background = null;

    // Add fog for depth with dark theme
    this.scene.fog = new THREE.Fog(0x0a0a0a, 20, 200);
  }

  private initDynamicBackground(): void {
    // Create a large plane for the dynamic background
    const geometry = new THREE.PlaneGeometry(200, 200);
    
    // Create shader material for animated dark background
    this.backgroundMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(200, 200) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          
          // Create animated dark gradient
          float gradient = smoothstep(0.0, 1.0, uv.y);
          
          // Add subtle noise animation
          float noise = sin(uv.x * 10.0 + time * 0.5) * sin(uv.y * 8.0 + time * 0.3) * 0.1;
          
          // Add subtle color variations
          float red = 0.05 + noise * 0.02 + sin(time * 0.2) * 0.01;
          float green = 0.03 + noise * 0.015 + sin(time * 0.15) * 0.008;
          float blue = 0.08 + noise * 0.025 + sin(time * 0.25) * 0.012;
          
          // Create smooth dark theme with subtle variations
          vec3 darkColor = vec3(red, green, blue);
          vec3 finalColor = mix(darkColor, darkColor * 1.2, gradient);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide
    });

    this.backgroundPlane = new THREE.Mesh(geometry, this.backgroundMaterial);
    this.backgroundPlane.position.z = -50;
    this.scene.add(this.backgroundPlane);

    // Add animated background elements
    this.addAnimatedBackgroundElements();
  }

  private addAnimatedBackgroundElements(): void {
    // Add floating geometric shapes for visual interest
    const shapes = [
      { geometry: new THREE.SphereGeometry(2, 8, 6), color: 0x1a1a1a },
      { geometry: new THREE.BoxGeometry(3, 3, 3), color: 0x0f0f0f },
      { geometry: new THREE.TorusGeometry(2, 0.5, 8, 6), color: 0x151515 },
      { geometry: new THREE.OctahedronGeometry(2), color: 0x1f1f1f }
    ];

    shapes.forEach((shape, index) => {
      const material = new THREE.MeshBasicMaterial({ 
        color: shape.color, 
        transparent: true, 
        opacity: 0.2,
        depthTest: true,
        depthWrite: false,
        side: THREE.FrontSide
      });
      const mesh = new THREE.Mesh(shape.geometry, material);
      
      // Position shapes around the scene with proper z-ordering
      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        -40 - Math.random() * 30
      );
      
      // Store original position for animation
      (mesh as any).originalPosition = mesh.position.clone();
      (mesh as any).animationSpeed = 0.3 + Math.random() * 0.4;
      (mesh as any).rotationSpeed = 0.0005 + Math.random() * 0.001;
      
      // Ensure proper rendering order
      mesh.renderOrder = -1;
      
      this.scene.add(mesh);
    });
  }

  private createGradientTexture(): THREE.Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;

    const context = canvas.getContext("2d")!;
    const gradient = context.createLinearGradient(0, 0, 0, 2);
    gradient.addColorStop(0, "#0a0a0a"); // Dark background
    gradient.addColorStop(1, "#1a1a1a"); // Slightly lighter

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
    this.camera.position.set(0, 8, 12);
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
    this.renderer.toneMappingExposure = 1.4;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    // Ensure proper depth testing and clearing
    this.renderer.autoClear = true;
    this.renderer.autoClearDepth = true;
    this.renderer.autoClearStencil = true;
    this.renderer.autoClearColor = true;

    this.container.appendChild(this.renderer.domElement);
  }

  private initLighting(): void {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    // Main directional light (enhanced for rainbow effects)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
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
    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.4);
    fillLight.position.set(-50, 30, -50);
    this.scene.add(fillLight);

    // Rim light for depth with rainbow accent
    const rimLight = new THREE.DirectionalLight(0xffd700, 0.3);
    rimLight.position.set(0, 20, -100);
    this.scene.add(rimLight);

    // Hemisphere light for sky/ground color influence
    const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x90ee90, 0.4);
    this.scene.add(hemisphereLight);

    // Add colorful accent lights for rainbow effects
    const rainbowLights = [
      { color: 0xff0000, position: [30, 20, 30] },    // Red
      { color: 0xff8000, position: [20, 25, 40] },    // Orange
      { color: 0xffff00, position: [10, 30, 30] },    // Yellow
      { color: 0x00ff00, position: [-10, 25, 40] },   // Green
      { color: 0x0080ff, position: [-20, 20, 30] },   // Blue
      { color: 0x8000ff, position: [-30, 25, 40] },   // Purple
    ];

    rainbowLights.forEach((light, index) => {
      const pointLight = new THREE.PointLight(light.color, 0.2, 50);
      pointLight.position.set(light.position[0], light.position[1], light.position[2]);
      pointLight.castShadow = true;
      this.scene.add(pointLight);
    });
  }

  private loadModel(): void {
    const loader = new GLTFLoader();

    loader.load(
      "/3d/rainbow_morph_animation.glb",
      (gltf) => {
        this.model = gltf.scene;

        // Center and scale the model
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Scale model to reasonable size for rainbow morphing
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 6 / maxDim;
        this.model.scale.setScalar(scale);

        // Center the model
        this.model.position.sub(center.multiplyScalar(scale));

        // Enable shadows and enhance materials for rainbow effects
        this.model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Improve material quality for rainbow morphing
            if (child.material) {
              child.material.envMapIntensity = 0.8;
              child.material.needsUpdate = true;
              
              // Add subtle metallic properties for rainbow effects
              if (child.material.metalness !== undefined) {
                child.material.metalness = 0.3;
              }
              if (child.material.roughness !== undefined) {
                child.material.roughness = 0.4;
              }
            }
          }
        });

        this.scene.add(this.model);

        // Setup animations for rainbow morphing
        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model);
          gltf.animations.forEach((clip) => {
            const action = this.mixer!.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
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
        console.error("Error loading rainbow morph model:", error);
      },
    );
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Update background shader time uniform
    if (this.backgroundMaterial) {
      this.backgroundMaterial.uniforms.time.value = time;
    }

    // Animate background elements
    this.scene.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child !== this.backgroundPlane && (child as any).originalPosition) {
        // Animate floating shapes with smoother motion
        const originalPos = (child as any).originalPosition;
        const speed = (child as any).animationSpeed;
        const rotationSpeed = (child as any).rotationSpeed;
        
        // Smoother floating motion with reduced amplitude
        child.position.y = originalPos.y + Math.sin(time * speed) * 1.2;
        child.position.x = originalPos.x + Math.cos(time * speed * 0.7) * 1.0;
        
        // Smoother rotation with reduced speed
        child.rotation.x += rotationSpeed;
        child.rotation.y += rotationSpeed * 0.5;
        child.rotation.z += rotationSpeed * 0.3;
      }
    });

    // Update animations
    if (this.mixer) {
      this.mixer.update(delta);
    }

    // Enhanced rotation for rainbow morphing showcase
    if (this.model) {
      // Slower, more elegant rotation
      this.model.rotation.y += 0.0003;
      
      // Add subtle floating motion
      this.model.position.y = Math.sin(time * 0.2) * 0.5;
    }

    // Enhanced camera movement for rainbow effects
    this.camera.position.x = Math.sin(time * 0.08) * 3;
    this.camera.position.y = 8 + Math.sin(time * 0.04) * 0.8;
    this.camera.lookAt(0, 0, 0);

    // Ensure proper clearing before rendering
    this.renderer.clear();
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

import * as THREE from "three";

export class InteractiveLinesBackground {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private raycaster: THREE.Raycaster;
  private parentTransform: THREE.Object3D;
  private sphereInter: THREE.Mesh;
  private pointer: THREE.Vector2;
  private radius: number;
  private theta: number;
  private animationId: number | null = null;

  constructor(private canvasId: string) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, 1, 1, 10000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById(this.canvasId) as HTMLCanvasElement,
      alpha: true,
      antialias: true,
    });
    this.raycaster = new THREE.Raycaster();
    this.parentTransform = new THREE.Object3D();
    this.sphereInter = new THREE.Mesh();
    this.pointer = new THREE.Vector2();
    this.radius = 100;
    this.theta = 0;

    this.init();
  }

  private init(): void {
    this.setupRenderer();
    this.setupCamera();
    this.setupScene();
    this.createLines();
    this.setupEventListeners();
    this.animate();
  }

  private setupRenderer(): void {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    this.renderer.setSize(rect.width, rect.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
  }

  private setupCamera(): void {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    // Position camera to see all lines clearly
    this.camera.position.z = 3;
    this.camera.position.x = -5;
  }

  private setupScene(): void {
    // Dark background to match design
    this.scene.background = new THREE.Color(0x0a0a0a);

    // Add subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0xababab, 0.7);
    this.scene.add(ambientLight);
  }

  private createLines(): void {
    const colors = [0x9af890, 0x6b7280, 0x8b5cf6]; // primary, muted-foreground, purple-500
    const lineCount = 3; // More lines for surrounding effect

    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];

      // Create different line types: solid, dashed, and fragmented
      const lineType = i % 3; // 0: solid, 1: dashed, 2: fragmented
      const segments = 2;

      for (let j = 0; j <= segments; j++) {
        const t = j / segments;

        // Create more irregular, organic shapes
        const x = (Math.random() - 0.5) * 8;
        const y =
          Math.sin(t * Math.PI * 2) * 0.005 + (Math.random() - 0.5) * 0.2;
        const z = (Math.random() - 0.5) * 8;

        // Add some randomness to create more organic feel
        const noise = (Math.random() - 5) * 0.003;
        points.push(new THREE.Vector3(x + noise, y + noise, z + noise));
      }

      geometry.setFromPoints(points);

      const color = colors[i % colors.length];
      let material: THREE.LineBasicMaterial | THREE.LineDashedMaterial;

      // Randomly decide if this line should be dashed (including primary/greenish lines)
      const shouldBeDashed = Math.random() > 0.15;

      if (shouldBeDashed) {
        // Dashed line - can be any color including primary/greenish
        material = new THREE.LineDashedMaterial({
          color: color,
          transparent: true,
          opacity: 0.8, // Increased from 0.3
          linewidth: 2, // Increased from 1
          dashSize: 0.05,
          gapSize: 0.2,
        });
      } else {
        // Solid line
        material = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.9, // Increased from 0.4
          linewidth: 2, // Increased from 1
        });
      }

      const line = shouldBeDashed
        ? new THREE.Line(geometry, material as THREE.LineDashedMaterial)
        : new THREE.Line(geometry, material as THREE.LineBasicMaterial);

      // Compute line dashes if it's a dashed line
      if (shouldBeDashed) {
        (line as THREE.Line).computeLineDistances();
      }

      line.userData = {
        originalColor: color,
        hoverColor: 0xffffff,
        lineType: shouldBeDashed ? 1 : 0, // 1 for dashed, 0 for solid
      };

      // Position lines in a more surrounding pattern
      const angle = lineCount * Math.PI * 1;
      const radius = 3 + Math.random() * 2;
      line.position.x = Math.cos(angle) * radius;
      line.position.y = (Math.random() - 0.5) * 4;
      line.position.z = Math.sin(angle) * radius;

      // Random rotation for more organic feel
      line.rotation.x = Math.random() * Math.PI;
      line.rotation.y = Math.random() * Math.PI;
      line.rotation.z = Math.random() * Math.PI;

      this.parentTransform.add(line);
    }

    this.scene.add(this.parentTransform);
  }

  private setupEventListeners(): void {
    window.addEventListener("resize", this.onWindowResize.bind(this));

    const canvas = this.renderer.domElement;
    canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    canvas.addEventListener("mouseleave", this.onMouseLeave.bind(this));
  }

  private onWindowResize(): void {
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(rect.width, rect.height);
  }

  private onMouseMove(event: MouseEvent): void {
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.checkIntersection();
  }

  private checkIntersection(): void {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.parentTransform.children,
      true,
    );

    // Reset all lines
    this.parentTransform.children.forEach((line) => {
      if (line instanceof THREE.Line) {
        const material = line.material as
          | THREE.LineBasicMaterial
          | THREE.LineDashedMaterial;

        material.color.setHex(line.userData.originalColor);

        // Restore original opacity based on line type
        if (line.userData.lineType === 1) {
          material.opacity = 0.8; // Dashed - increased
        } else {
          material.opacity = 0.9; // Solid - increased
        }
      }
    });

    // Highlight intersected line
    if (intersects.length > 0) {
      const intersectedLine = intersects[0].object as THREE.Line;
      const material = intersectedLine.material as
        | THREE.LineBasicMaterial
        | THREE.LineDashedMaterial;
      material.color.setHex(intersectedLine.userData.hoverColor);
      material.opacity = 0.9; // Higher opacity on hover
    }
  }

  private onMouseLeave(): void {
    // Reset all lines to original colors and opacities
    this.parentTransform.children.forEach((line) => {
      if (line instanceof THREE.Line) {
        const material = line.material as
          | THREE.LineBasicMaterial
          | THREE.LineDashedMaterial;

        material.color.setHex(line.userData.originalColor);

        // Restore original opacity based on line type
        if (line.userData.lineType === 1) {
          material.opacity = 0.8; // Dashed - increased
        } else {
          material.opacity = 0.9; // Solid - increased
        }
      }
    });
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    // Gentle rotation of the entire scene - slower to keep lines in view
    this.scene.rotation.y += 0.00002;
    this.scene.rotation.x += 0.00001;

    // More dynamic floating motion for lines - keep them in camera view
    this.parentTransform.children.forEach((line, index) => {
      const time = Date.now() * 0.0003;
      const offset = index * 0.2;

      // Subtle floating motion that keeps lines visible
      line.position.y += Math.sin(time + offset) * 0.002;
      line.rotation.z += Math.sin(time * 0.2 + offset) * 0.0005;

      // Keep lines within bounds
      if (line.position.y > 4) line.position.y = -4;
      if (line.position.y < -4) line.position.y = -4;

      // Gentle rotation around their own axis
      line.rotation.x += 0.00000001;
      line.rotation.y += 0.00000001;
    });

    this.renderer.render(this.scene, this.camera);
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // Clean up event listeners
    window.removeEventListener("resize", this.onWindowResize);

    // Dispose of geometries and materials
    this.parentTransform.children.forEach((line) => {
      if (line instanceof THREE.Line) {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      }
    });

    this.renderer.dispose();
  }
}

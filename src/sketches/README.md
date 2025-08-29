# 🎨 Three.js Background Scene

This directory contains the Three.js implementation for creating an immersive 3D background scene on the landing page.

## 📁 Files

```
src/sketches/
├── background-scene.ts      # Main Three.js scene class
├── background-canvas.tsx    # React component wrapper
└── index.ts                 # Export file
```

## 🚀 Features

### **BackgroundScene Class**

- **3D Model Loading**: Loads GLB models with GLTFLoader
- **Advanced Lighting**: Multi-directional lighting with rainbow accent lights
- **Animation Support**: Full support for model animations and morphing
- **Model Rotation**: Gentle rotation of the 3D model
- **Camera Movement**: Subtle camera animation for dynamic viewing
- **Shadow Mapping**: High-quality shadows for depth and realism
- **Material Enhancement**: Optimized materials for rainbow effects
- **Dynamic Dark Background**: Animated shader-based background that refreshes
- **Floating Elements**: Subtle geometric shapes with smooth animations

### **BackgroundCanvas Component**

- **React Integration**: Seamless integration with React components
- **Responsive Design**: Adapts to container size changes
- **Loading State**: Visual feedback during 3D scene initialization
- **Performance**: Optimized rendering with proper cleanup

## 🎯 Usage

### **Basic Implementation**

```tsx
import { BackgroundCanvas } from "@/sketches";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* 3D Background Scene */}
      <BackgroundCanvas />
      
      {/* Your content */}
      <div className="relative z-10">
        {/* Page content */}
      </div>
    </div>
  );
}
```

## 🔧 Customization

The `BackgroundScene` class can be extended or modified to:

- Change lighting configurations
- Modify camera behavior
- Add additional 3D elements
- Customize background colors
- Adjust animation speeds
- Enhance material properties
- Modify shader effects
- Add more floating elements

## 🎨 Current 3D Model

### **Rainbow Morph Animation Model**

The current implementation features a **rainbow morphing animation model** (`rainbow_morph_animation.glb`) that showcases:

- **Dynamic Morphing**: Smooth shape-shifting animations
- **Rainbow Effects**: Colorful transformations and effects
- **Interactive Lighting**: Rainbow accent lights that complement the model
- **Smooth Animations**: Optimized animation playback with looping
- **Enhanced Materials**: Metallic and reflective properties for better visual appeal

## 🌑 Dynamic Dark Background

### **Shader-Based Animation**

The background uses a custom shader material that creates:

- **Animated Dark Theme**: Continuously refreshing dark background
- **Subtle Color Variations**: Dynamic red, green, and blue variations
- **Noise Animation**: Smooth noise patterns that move over time
- **Gradient Effects**: Smooth transitions between dark shades
- **Real-time Updates**: Background refreshes every frame

### **Floating Elements**

Subtle geometric shapes that add visual interest:

- **Sphere**: Smooth spherical geometry
- **Cube**: Angular box geometry
- **Torus**: Ring-shaped geometry
- **Octahedron**: Diamond-like geometry

Each element features:
- **Floating Motion**: Smooth up/down and side-to-side movement
- **Rotation**: Continuous rotation on multiple axes
- **Transparency**: Subtle opacity for depth
- **Random Positioning**: Distributed throughout the scene

## 🛠️ Dependencies

- **Three.js**: Core 3D graphics library
- **GLTFLoader**: For loading GLB/GLTF 3D models
- **TypeScript**: Type-safe implementation

## 📱 3D Model Requirements

### **Supported Formats**

- **GLB**: Binary GLTF format (recommended)
- **GLTF**: JSON-based 3D format
- **Animations**: Full support for skeletal and morphing animations
- **Materials**: PBR materials with normal maps and textures

### **File Placement**

Place your 3D models in the `public/3d/` directory:

```
public/3d/
├── rainbow_morph_animation.glb    # Main rainbow morphing model
└── other_models.glb               # Additional models
```

## 🎨 Customization Options

### **Modify Background Shader**

```typescript
// In background-scene.ts - initDynamicBackground()
this.backgroundMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2(200, 200) }
  },
  fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Customize these values for different effects
      float red = 0.05 + sin(time * 0.2) * 0.01;
      float green = 0.03 + sin(time * 0.15) * 0.008;
      float blue = 0.08 + sin(time * 0.25) * 0.012;
      
      vec3 darkColor = vec3(red, green, blue);
      gl_FragColor = vec4(darkColor, 1.0);
    }
  `
});
```

### **Adjust Floating Elements**

```typescript
// In addAnimatedBackgroundElements()
const shapes = [
  { geometry: new THREE.SphereGeometry(2, 8, 6), color: 0x1a1a1a },
  { geometry: new THREE.BoxGeometry(3, 3, 3), color: 0x0f0f0f },
  // Add more shapes or modify existing ones
];

// Customize animation speeds
shapes.forEach((shape, index) => {
  // ... existing code ...
  (mesh as any).animationSpeed = 0.5 + Math.random() * 0.5;  // Adjust range
  (mesh as any).rotationSpeed = 0.001 + Math.random() * 0.002;  // Adjust rotation
});
```

### **Modify Camera Movement**

```typescript
// Adjust camera animation speed and range
const time = this.clock.getElapsedTime();
this.camera.position.x = Math.sin(time * 0.08) * 3;  // Speed: 0.08, Range: 3
this.camera.position.y = 8 + Math.sin(time * 0.04) * 0.8;  // Speed: 0.04, Range: 0.8
```

## 🚀 Performance Optimization

### **Rendering Settings**

- **Pixel Ratio**: Limited to 2x for performance
- **Shadow Maps**: 2048x2048 resolution for quality
- **Tone Mapping**: ACES Filmic for realistic lighting
- **Antialiasing**: Enabled for smooth edges

### **Animation Optimization**

- **Request Animation Frame**: Efficient rendering loop
- **Delta Time**: Smooth animation regardless of frame rate
- **Material Updates**: Only when necessary
- **Shader Uniforms**: Efficient time-based updates

### **Background Performance**

- **Shader Material**: GPU-accelerated background rendering
- **Efficient Geometry**: Simple plane geometry for background
- **Optimized Animations**: Smooth floating element movement
- **Memory Management**: Proper cleanup of resources

## 🔮 Future Enhancements

- **Interactive Elements**: Clickable 3D objects
- **Multiple Models**: Support for multiple 3D assets
- **Particle Systems**: Dynamic particle effects
- **Post-processing**: Advanced visual effects
- **VR Support**: Virtual reality compatibility
- **Custom Shaders**: User-defined background effects
- **Audio Reactivity**: Background that responds to audio

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [GLTF Specification](https://github.com/KhronosGroup/glTF)
- [Three.js Examples](https://threejs.org/examples/)
- [GLTF Viewer](https://gltf-viewer.donmccurdy.com/)
- [WebGL Shaders](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html)

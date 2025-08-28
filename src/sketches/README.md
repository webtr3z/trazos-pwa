# 🎨 Three.js Background Scene

This directory contains the Three.js implementation for creating an immersive 3D background scene on the landing page.

## 📁 File Structure

```
src/sketches/
├── background-scene.ts      # Main Three.js scene class
├── background-canvas.tsx    # React component wrapper
├── index.ts                 # Exports
└── README.md               # This documentation
```

## 🚀 Features

### **BackgroundScene Class**

- **3D Model Loading**: Loads GLB models with GLTFLoader
- **Outdoor Lighting**: Realistic environmental lighting setup
- **Camera Animation**: Subtle camera movement for dynamism
- **Model Rotation**: Gentle rotation of the 3D model
- **Responsive Design**: Adapts to different screen sizes
- **Performance Optimized**: Efficient rendering with proper cleanup

### **Lighting Setup**

- **Ambient Light**: Overall scene illumination
- **Directional Light**: Main sunlight simulation
- **Fill Light**: Soft fill from opposite direction
- **Rim Light**: Backlight for depth and separation
- **Hemisphere Light**: Sky/ground color influence

### **BackgroundCanvas Component**

- **React Integration**: Seamless integration with React
- **Loading State**: Visual feedback during 3D scene initialization
- **Responsive**: Automatically adjusts to container size
- **Performance**: Optimized rendering with proper cleanup

## 🎯 Usage

### **Basic Implementation**

```tsx
import { BackgroundCanvas } from "@/sketches";

export default function HomePage() {
  return (
    <div className="relative">
      {/* 3D Background Scene */}
      <BackgroundCanvas />

      {/* Your content */}
      <div className="relative z-10">{/* Page content goes here */}</div>
    </div>
  );
}
```

### **Customization**

The `BackgroundScene` class can be extended or modified to:

- Change lighting parameters
- Adjust camera movement
- Modify model positioning
- Add additional 3D elements
- Customize background colors

## 🔧 Technical Details

### **Dependencies**

- **Three.js**: Core 3D graphics library
- **GLTFLoader**: For loading GLB/GLTF models
- **TypeScript**: Type-safe implementation

### **Performance Features**

- **Shadow Mapping**: High-quality shadows with PCF filtering
- **Tone Mapping**: ACES Filmic for realistic color reproduction
- **Antialiasing**: Smooth edges and reduced jagged lines
- **Responsive Rendering**: Adapts to device pixel ratio

### **Memory Management**

- **Proper Cleanup**: Disposes of WebGL contexts
- **Event Listener Cleanup**: Prevents memory leaks
- **Resource Management**: Efficient texture and material handling

## 📱 3D Model Requirements

### **Supported Formats**

- **GLB**: Binary GLTF (recommended)
- **GLTF**: JSON-based 3D format

### **Model Guidelines**

- **Polygon Count**: Keep under 50k polygons for web performance
- **Texture Size**: Use power-of-2 dimensions (512x512, 1024x1024, etc.)
- **Material Types**: PBR materials work best with the lighting setup
- **Animations**: Supported if present in the model

### **File Placement**

Place your 3D models in the `public/3d/` directory:

```
public/3d/
├── market_stock.glb        # Main market model
└── other_models.glb        # Additional models
```

## 🎨 Customization Examples

### **Change Background Colors**

```typescript
private createGradientTexture(): THREE.Texture {
  // Customize these colors
  gradient.addColorStop(0, '#your-sky-color');
  gradient.addColorStop(1, '#your-ground-color');
}
```

### **Adjust Camera Movement**

```typescript
private animate(): void {
  // Customize camera animation
  this.camera.position.x = Math.sin(time * 0.05) * 1; // Slower, smaller movement
  this.camera.position.y = 5 + Math.sin(time * 0.02) * 0.2; // Gentler vertical movement
}
```

### **Modify Lighting**

```typescript
private initLighting(): void {
  // Adjust light intensities
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Brighter ambient
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Stronger sun
}
```

## 🚨 Troubleshooting

### **Common Issues**

1. **Model Not Loading**
   - Check file path in `loadModel()` method
   - Verify GLB file is valid
   - Check browser console for errors

2. **Performance Issues**
   - Reduce model polygon count
   - Optimize textures
   - Check device capabilities

3. **Lighting Too Bright/Dark**
   - Adjust light intensities in `initLighting()`
   - Modify tone mapping exposure
   - Check background gradient colors

### **Debug Mode**

Add console logs to track scene initialization:

```typescript
console.log("Scene initialized:", this.scene);
console.log("Camera position:", this.camera.position);
console.log("Model loaded:", this.model);
```

## 🔮 Future Enhancements

- **Post-processing Effects**: Bloom, depth of field, motion blur
- **Interactive Elements**: Clickable 3D objects
- **Animation Controls**: Play/pause model animations
- **Multiple Models**: Support for multiple 3D assets
- **LOD System**: Level of detail for performance optimization

## 📚 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [GLTF Format Specification](https://github.com/KhronosGroup/glTF)
- [WebGL Best Practices](https://webglfundamentals.org/)
- [Performance Optimization Guide](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)

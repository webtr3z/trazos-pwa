"use client";

import { useEffect, useRef, useState } from "react";
import { BackgroundScene } from "./background-scene";

interface BackgroundCanvasProps {
  className?: string;
}

export function BackgroundCanvas({ className = "" }: BackgroundCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<BackgroundScene | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize the Three.js scene
    sceneRef.current = new BackgroundScene(containerRef.current);

    // Set loading to false after a short delay to allow scene to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{
        pointerEvents: "none",
        background: "linear-gradient(135deg, #87ceeb 0%, #e0f6ff 100%)",
      }}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50/80 to-blue-100/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary font-medium">Cargando escena 3D...</p>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { InteractiveLinesBackground } from '@/sketches/interactive-lines-background';

interface InteractiveLinesBackgroundProps {
  canvasId: string;
  className?: string;
}

export function InteractiveLinesBackgroundComponent({ 
  canvasId, 
  className = "" 
}: InteractiveLinesBackgroundProps) {
  const backgroundRef = useRef<InteractiveLinesBackground | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize the Three.js background
      backgroundRef.current = new InteractiveLinesBackground(canvasId);
    }

    return () => {
      // Cleanup on unmount
      if (backgroundRef.current) {
        backgroundRef.current.destroy();
      }
    };
  }, [canvasId]);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <canvas
        id={canvasId}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  );
}

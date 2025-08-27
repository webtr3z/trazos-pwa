"use client";

import { useTheme } from "@/contexts/theme-context";

export function ThemeTest() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 z-50 p-4 bg-card border border-border rounded-lg shadow-sm">
      <div className="space-y-2">
        <div>
          <strong>Current theme:</strong> {theme}
        </div>
        <div className="space-y-1">
          <div
            className="w-4 h-4 bg-background border rounded"
            title="background"
          ></div>
          <div
            className="w-4 h-4 bg-foreground border rounded"
            title="foreground"
          ></div>
          <div className="w-4 h-4 bg-muted border rounded" title="muted"></div>
          <div className="w-4 h-4 bg-card border rounded" title="card"></div>
          <div
            className="w-4 h-4 bg-primary border rounded"
            title="primary"
          ></div>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setTheme("light")}
            className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded"
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded"
          >
            Dark
          </button>
          <button
            onClick={() => setTheme("system")}
            className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded"
          >
            System
          </button>
        </div>
      </div>
    </div>
  );
}

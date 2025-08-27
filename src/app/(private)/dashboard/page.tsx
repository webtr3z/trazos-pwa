"use client";

import { useEffect } from "react";

export default function DashboardIndex() {
  useEffect(() => {
    // Redirect to dashboard home since this route is protected by RouteGuard
    window.location.href = "/dashboard/home";
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirigiendo al dashboard...</p>
      </div>
    </div>
  );
}

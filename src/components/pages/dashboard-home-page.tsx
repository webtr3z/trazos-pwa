"use client";

import { ProductsDashboard } from "@/components/data-display/products-dashboard";

export function DashboardHomePage() {
  return (
    <>
      {/* Main Content */}
      <div className="space-y-6 relative z-10 p-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido al panel de control RWA PDP
          </p>
        </div>
        <ProductsDashboard />
      </div>
    </>
  );
}

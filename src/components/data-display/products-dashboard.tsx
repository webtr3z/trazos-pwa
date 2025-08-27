"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  TrendingUp, 
  Wallet, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  DollarSign,
  Activity
} from "lucide-react";

interface ProductStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  totalSales: number;
  walletBalance: number;
}

interface RecentAction {
  id: string;
  type: 'added' | 'published' | 'deleted' | 'edited';
  productName: string;
  timestamp: Date;
  amount?: number;
}

const mockStats: ProductStats = {
  totalProducts: 12,
  publishedProducts: 8,
  draftProducts: 4,
  totalSales: 2.45,
  walletBalance: 5.23
};

const mockRecentActions: RecentAction[] = [
  {
    id: '1',
    type: 'added',
    productName: 'Nike Air Max 270',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    amount: 0.15
  },
  {
    id: '2',
    type: 'published',
    productName: 'iPhone 15 Pro',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    amount: 0.25
  },
  {
    id: '3',
    type: 'edited',
    productName: 'MacBook Air M2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: '4',
    type: 'deleted',
    productName: 'Samsung Galaxy S24',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  }
];

const getActionIcon = (type: RecentAction['type']) => {
  switch (type) {
    case 'added':
      return <Plus className="w-4 h-4 text-green-600" />;
    case 'published':
      return <Eye className="w-4 h-4 text-blue-600" />;
    case 'edited':
      return <Edit className="w-4 h-4 text-yellow-600" />;
    case 'deleted':
      return <Trash2 className="w-4 h-4 text-red-600" />;
  }
};

const getActionText = (type: RecentAction['type']) => {
  switch (type) {
    case 'added':
      return 'Agregado';
    case 'published':
      return 'Publicado';
    case 'edited':
      return 'Editado';
    case 'deleted':
      return 'Eliminado';
  }
};

const getActionColor = (type: RecentAction['type']) => {
  switch (type) {
    case 'added':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'published':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'edited':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'deleted':
      return 'bg-red-100 text-red-800 border-red-200';
  }
};

export function ProductsDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {mockStats.publishedProducts} publicados, {mockStats.draftProducts} borradores
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Publicados</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.publishedProducts}</div>
            <p className="text-xs text-muted-foreground">
              {((mockStats.publishedProducts / mockStats.totalProducts) * 100).toFixed(0)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalSales} ETH</div>
            <p className="text-xs text-muted-foreground">
              +12.5% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Wallet</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.walletBalance} ETH</div>
            <p className="text-xs text-muted-foreground">
              ≈ ${(mockStats.walletBalance * 3000).toFixed(0)} USD
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acciones Recientes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockRecentActions.length}</div>
            <p className="text-xs text-muted-foreground">
              Últimas 24 horas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Acciones Recientes
          </CardTitle>
          <CardDescription>
            Historial de las últimas actividades en tus productos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockRecentActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  {getActionIcon(action.type)}
                  <div>
                    <p className="font-medium">
                      {getActionText(action.type)} <span className="text-muted-foreground">{action.productName}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {action.timestamp.toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {action.amount && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {action.amount} ETH
                    </Badge>
                  )}
                  <Badge className={getActionColor(action.type)}>
                    {getActionText(action.type)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Gestiona tus productos rápidamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Agregar Producto
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Ver Todos
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analíticas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Send,
  Download,
  History,
  Copy,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Shield,
  Database,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  type: "send" | "receive" | "swap" | "mint";
  amount: string;
  token: string;
  timestamp: Date;
  status: "pending" | "confirmed" | "failed";
  hash: string;
  from: string;
  to: string;
}

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  value: number;
  change24h: number;
  icon?: string;
}

export default function MyWallet() {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - replace with real blockchain data
  const walletAddress = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6";
  const totalBalance = 2847.65;
  const balanceChange24h = 12.5;

  const tokenBalances: TokenBalance[] = [
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "2.847",
      value: 2847.65,
      change24h: 12.5,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: "1250.00",
      value: 1250.0,
      change24h: 0.0,
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      balance: "1500.00",
      value: 150.0,
      change24h: -2.3,
    },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: "1",
      type: "receive",
      amount: "0.5 ETH",
      token: "ETH",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "confirmed",
      hash: "0x1234...5678",
      from: "0xabcd...efgh",
      to: walletAddress,
    },
    {
      id: "2",
      type: "send",
      amount: "100 USDC",
      token: "USDC",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "confirmed",
      hash: "0x8765...4321",
      from: walletAddress,
      to: "0x9876...5432",
    },
    {
      id: "3",
      type: "mint",
      amount: "1 NFT",
      token: "NFT",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: "confirmed",
      hash: "0x1111...2222",
      from: "0x0000...0000",
      to: walletAddress,
    },
  ];

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  const refreshWallet = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "send":
        return <Send className="w-4 h-4 text-red-500" />;
      case "receive":
        return <Download className="w-4 h-4 text-green-500" />;
      case "swap":
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case "mint":
        return <Database className="w-4 h-4 text-purple-500" />;
      default:
        return <Wallet className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTransactionStatusText = (status: Transaction["status"]) => {
    switch (status) {
      case "confirmed":
        return "Confirmado";
      case "pending":
        return "Pendiente";
      case "failed":
        return "Fallido";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Mi Wallet
              </h1>
              <p className="text-xl text-muted-foreground">
                Gestiona tus activos digitales y monitorea tus transacciones
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={refreshWallet}
                disabled={isRefreshing}
                className="border-2"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                />
                {isRefreshing ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Wallet Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Wallet Address Card */}
            <Card className="border-2 border-border/50 shadow-sm">
              <CardHeader className="bg-muted/20 border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Dirección del Wallet
                </CardTitle>
                <CardDescription>
                  Tu dirección pública en Base Sepolia Testnet
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Red:
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Base Sepolia Testnet
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Dirección:
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted/30 px-3 py-2 rounded-lg border border-border/50 font-mono">
                        {walletAddress}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyAddress}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Blockchain Explorer Link */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-info text-info hover:bg-info hover:text-info-foreground transition-all duration-300 ease-in-out"
                    onClick={() =>
                      window.open(
                        `https://sepolia.basescan.org/address/${walletAddress}`,
                        "_blank",
                      )
                    }
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Ver en Base Sepolia Explorer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm">
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </Button>
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Recibir
                </Button>
                <Button variant="outline" className="w-full border-2">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Intercambiar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Balances and Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Balance Card */}
            <Card className="border-2 border-border/50 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-muted/30 to-muted/50 border-b border-border/50">
                <CardTitle className="flex items-center justify-between">
                  <span>Balance Total</span>
                  <div className="flex items-center gap-2">
                    {balanceChange24h >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                    <Badge
                      variant={balanceChange24h >= 0 ? "outline" : "outline"}
                      className={
                        balanceChange24h >= 0
                          ? "text-green-600 border-green-300"
                          : "text-red-600 border-red-300"
                      }
                    >
                      {balanceChange24h >= 0 ? "+" : ""}
                      {balanceChange24h.toFixed(2)}%
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription>
                  Valor total de tus activos digitales
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-foreground mb-4">
                  $
                  {totalBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>

                {/* Token Balances */}
                <div className="space-y-3">
                  {tokenBalances.map((token) => (
                    <div
                      key={token.symbol}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {token.symbol[0]}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{token.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {token.balance} {token.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          $
                          {token.value.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div
                          className={`text-sm ${token.change24h >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {token.change24h >= 0 ? "+" : ""}
                          {token.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border-2 border-border/50 shadow-sm">
              <CardHeader className="bg-muted/20 border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Transacciones Recientes
                </CardTitle>
                <CardDescription>
                  Historial de tus últimas operaciones en blockchain
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(tx.type)}
                        <div>
                          <div className="font-semibold">{tx.amount}</div>
                          <div className="text-sm text-muted-foreground">
                            {tx.timestamp.toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className={getTransactionStatusColor(tx.status)}>
                          {getTransactionStatusText(tx.status)}
                        </Badge>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(
                              `https://sepolia.basescan.org/tx/${tx.hash}`,
                              "_blank",
                            )
                          }
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-2">
                    <History className="w-4 h-4 mr-2" />
                    Ver Todas las Transacciones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

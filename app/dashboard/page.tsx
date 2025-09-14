"use client"

import { useState } from "react"
import {
  Send,
  Download,
  Users,
  History,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Star,
  Lightbulb,
  BarChart3,
  Gauge,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useWallet } from '../../context/walletContext'
import { useBalance } from 'wagmi'

const mockTokens = [
  { symbol: "ETH", name: "Ethereum", balance: "2.45", usdValue: "6,125.50", change: "+5.2%" },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00", usdValue: "1,250.00", change: "0.0%" },
  { symbol: "MATIC", name: "Polygon", balance: "850.25", usdValue: "425.13", change: "-2.1%" },
]

const mockTransactions = [
  {
    id: "1",
    type: "send",
    token: "ETH",
    amount: "0.5",
    recipient: "0x742d...4e2f",
    status: "confirmed",
    risk: "low",
    eta: "2 min",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "receive",
    token: "USDC",
    amount: "500.00",
    sender: "Alice (Trusted)",
    status: "confirmed",
    risk: "low",
    eta: "1 min",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "send",
    token: "MATIC",
    amount: "100.0",
    recipient: "0x8f3a...9b1c",
    status: "pending",
    risk: "moderate",
    eta: "5-8 min",
    timestamp: "3 hours ago",
  },
]

const safetyTips = [
  "Always verify unknown addresses before sending.",
  "Double-check transaction amounts before confirming.",
  "Use trusted contacts for frequent transactions.",
  "Monitor network congestion for optimal gas fees.",
  "Keep your address book updated and organized.",
]

export default function DashboardPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [currentTip, setCurrentTip] = useState(0)

  const totalUsdValue = mockTokens.reduce((sum, token) => sum + Number.parseFloat(token.usdValue.replace(",", "")), 0)
  const safetyScore = 85
  const riskEnvironment = "Normal"

  const { address, isConnected, chainId, userData } = useWallet();

  const { data: balance } = useBalance({
    address: address as `0x${string}`,
    // chainId: 1,
  })

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
            Low
          </Badge>
        )
      case "moderate":
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Moderate
          </Badge>
        )
      case "high":
        return (
          <Badge variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
            High
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Safety Score Card */}
            <Card className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Safety Score
                  </CardTitle>
                  <CardDescription>Based on your last 10 transactions</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-500">{safetyScore}</div>
                  <div className="text-xs text-muted-foreground">out of 100</div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={safetyScore} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Excellent! You're following best practices for safe transactions.
                </p>
              </CardContent>
            </Card>

            {/* Tips Widget */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Safety Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{safetyTips[currentTip]}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 bg-transparent"
                  onClick={() => setCurrentTip((prev) => (prev + 1) % safetyTips.length)}
                >
                  Next Tip
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Overview Card */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Portfolio Overview</CardTitle>
                <CardDescription>Total value across all tokens</CardDescription>
              </div>
              <Button variant="outline" size="icon" onClick={() => setBalanceVisible(!balanceVisible)}>
                {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    {/* {balanceVisible ? `$${totalUsdValue.toLocaleString()}` : "••••••"} */}
                    {balance?.formatted} AVAX 
                    {/* {balance?.value} */}
                  </span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-800 border-green-500/20">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5%
                  </Badge>
                </div>

                {/* Token List */}
                <div className="space-y-3">
                  {mockTokens.map((token) => (
                    <div key={token.symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs font-bold">{token.symbol}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{token.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {balanceVisible ? `${token.balance} ${token.symbol}` : "••••••"}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{balanceVisible ? `$${token.usdValue}` : "••••"}</div>
                        <div
                          className={`text-sm ${token.change.startsWith("+") ? "text-green-500" : token.change.startsWith("-") ? "text-red-500" : "text-muted-foreground"}`}
                        >
                          {balanceVisible ? token.change : "••••"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions Card */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest crypto activity with risk analysis</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(tx.status)}
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {tx.type === "send" ? (
                            <Send className="h-4 w-4 text-primary" />
                          ) : (
                            <Download className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {tx.type === "send" ? "Sent" : "Received"} {tx.amount} {tx.token}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tx.type === "send" ? `To: ${tx.recipient}` : `From: ${tx.sender}`} • {tx.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getRiskBadge(tx.risk)}
                      <div className="text-right">
                        <div className="text-sm font-medium capitalize">{tx.status}</div>
                        <div className="text-xs text-muted-foreground">ETA: {tx.eta}</div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-3" size="lg">
                <a href="/send" className="flex gap-2 w-full items-center">
                <Send className="h-5 w-5" />
                Send
                </a>
              </Button>
              {/* <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
                <Download className="h-5 w-5" />
                Receive
              </Button> */}
              <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
                <a href="/address-book" className="flex gap-2 w-full items-center">
                <Users className="h-5 w-5" />
                Add Contact
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" size="lg">
                <a href="/contractAnalysis" className="flex gap-2 w-full items-center">
                <BarChart3 className="h-5 w-5" />
                View Analysis
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* AI Safety Status */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                AI Safety Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{riskEnvironment}</div>
                <p className="text-sm text-muted-foreground">Current Risk Environment</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Analysis</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ETA Prediction</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Address Book</span>
                  <Badge variant="secondary">3 contacts</Badge>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground">
                  Based on current network conditions and flagged patterns.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* ETA Widget */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                ETA Widget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2-4 min</div>
                <p className="text-sm text-muted-foreground">Average confirmation time</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Historical</span>
                  <span>3.2 min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Predicted</span>
                  <span className="text-green-500">2.8 min</span>
                </div>
              </div>

              <div className="h-16 bg-muted/20 rounded-lg flex items-end justify-center gap-1 p-2">
                {[3, 5, 2, 4, 3, 2, 1].map((height, i) => (
                  <div key={i} className="bg-primary/60 rounded-sm flex-1" style={{ height: `${height * 8}px` }} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Center */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">High-risk transaction flagged</p>
                    <p className="text-xs text-muted-foreground">
                      Address 0x8f3a...9b1c has suspicious activity patterns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Contact added as Trusted</p>
                    <p className="text-xs text-muted-foreground">Alice has been marked as a trusted contact.</p>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Network congestion detected</p>
                    <p className="text-xs text-muted-foreground">Transactions may take longer than usual.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

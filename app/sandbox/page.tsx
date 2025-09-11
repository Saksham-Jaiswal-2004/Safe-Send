"use client"

import { useState } from "react"
import { Shield, ArrowLeft, Play, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RiskPill } from "@/components/safesend/risk-pill"
import { EtaWidget } from "@/components/safesend/eta-widget"

export default function SandboxPage() {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [token, setToken] = useState("ETH")
  const [results, setResults] = useState<any>(null)

  const analyzeTransaction = () => {
    // Mock analysis based on address patterns
    let riskScore = 20
    let riskLevel = "low"
    let eta = 75

    if (address.includes("dead") || address.includes("beef")) {
      riskScore = 85
      riskLevel = "high"
      eta = 180
    } else if (address.length < 42 || !address.startsWith("0x")) {
      riskScore = 50
      riskLevel = "moderate"
      eta = 120
    }

    setResults({
      riskScore,
      riskLevel,
      eta,
      confidence: 0.82,
      reasons: [
        riskLevel === "high" ? "Address flagged by community" : "Standard transaction pattern",
        `Address age: ${riskLevel === "high" ? "14 days" : "2 years"}`,
        `Transaction history: ${riskLevel === "high" ? "Suspicious" : "Normal"}`,
      ],
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">SafeSend Sandbox</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Settings className="h-3 w-3 mr-1" />
            Test Mode
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Sandbox Introduction */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Transaction Sandbox</CardTitle>
              <CardDescription className="text-lg">
                Test SafeSend AI analysis with any address - no real transactions, no wallet required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Sandbox Mode</p>
                    <p className="text-xs text-muted-foreground">
                      This is a simulation environment. No real transactions will be made and no funds will be moved.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Test Transaction</CardTitle>
                <CardDescription>Enter transaction details to analyze</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="test-address">Recipient Address</Label>
                  <Input
                    id="test-address"
                    placeholder="0x... or try 0xdeadbeef... for high risk"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Try addresses with "dead" or "beef" to simulate high-risk scenarios
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="test-amount">Amount</Label>
                  <div className="flex gap-2">
                    <Input
                      id="test-amount"
                      placeholder="1.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1"
                    />
                    <Select value={token} onValueChange={setToken}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="MATIC">MATIC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={analyzeTransaction} disabled={!address || !amount} className="w-full gap-2" size="lg">
                  <Play className="h-4 w-4" />
                  Analyze Transaction
                </Button>

                <div className="space-y-2">
                  <h4 className="font-medium">Quick Test Addresses:</h4>
                  <div className="space-y-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() => setAddress("0x742d35Cc6634C0532925a3b8D0C9964E2f4e2f")}
                    >
                      0x742d...2f4e (Low Risk)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() => setAddress("0x8f3a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a")}
                    >
                      0x8f3a...8f9a (Moderate Risk)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs bg-transparent"
                      onClick={() => setAddress("0xdeadbeef1234567890abcdef1234567890abcdef")}
                    >
                      0xdead...cdef (High Risk)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>AI-powered risk assessment and ETA prediction</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    <div className="grid gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Risk Assessment</h4>
                        <RiskPill
                          score={results.riskScore}
                          level={results.riskLevel}
                          confidence={results.confidence}
                          showDetails={true}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">ETA Prediction</h4>
                        <EtaWidget predictedSeconds={results.eta} confidence={results.confidence} showChart={true} />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <h4 className="font-medium mb-2">Analysis Details</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {results.reasons.map((reason: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground">
                      Enter a recipient address and amount to see how SafeSend AI would assess the transaction
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

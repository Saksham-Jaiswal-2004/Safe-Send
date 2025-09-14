"use client"

import { useState } from "react"
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  Users,
  Scan,
  Clipboard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  ChevronDown,
  ChevronUp,
  Zap,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { sendTransaction } from "@/utils/api";

const SEND_STEPS = [
  { id: "recipient", title: "Recipient", description: "Enter destination address" },
  { id: "amount", title: "Amount", description: "Choose token and amount" },
  { id: "analysis", title: "AI Analysis", description: "Risk assessment and ETA" },
  { id: "confirm", title: "Confirm", description: "Review and send" },
]

const mockTokens = [
  { symbol: "AVAX", name: "Avalanche", balance: "45.65", usdValue: "29.41" },
  { symbol: "ETH", name: "Ethereum", balance: "2.45", usdValue: "6,125.50" },
  { symbol: "USDC", name: "USD Coin", balance: "1,250.00", usdValue: "1,250.00" },
  { symbol: "MATIC", name: "Polygon", balance: "850.25", usdValue: "425.13" },
]

const mockContacts = [
  { name: "Alice", address: "0x742d35Cc6634C0532925a3b8D0C9964E2f4e2f", trusted: true },
  { name: "Bob", address: "0x8f3a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a", trusted: true },
  { name: "Exchange Wallet", address: "0x1234567890abcdef1234567890abcdef12345678", trusted: false },
]

export default function SendPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [recipient, setRecipient] = useState("")
  const [selectedToken, setSelectedToken] = useState("")
  const [amount, setAmount] = useState("")
  const [gasPrice, setGasPrice] = useState([45])
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showAnalysisDetails, setShowAnalysisDetails] = useState(false)
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null)
  const [etaPrediction, setEtaPrediction] = useState<any>(null)
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  const [address, setAddress] = useState("");
  const [amount2, setAmount2] = useState(0);
  const [status, setStatus] = useState("");

  const [form, setForm] = useState({
    gas_price: 0,
    gas_fee_cap: 0,
    gas_tip_cap: 0,
    gas: 0,
    value: 0,
    tx_type: 0,
    nonce: 0,
    data_size: 0,
  });

  const progress = ((currentStep + 1) / SEND_STEPS.length) * 100

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Clicked")
    try {
      setStatus("Sending...");
      const res = await sendTransaction(
        form.gas_price,
        form.gas_fee_cap,
        form.gas_tip_cap,
        form.gas,
        form.value,
        form.tx_type,
        form.nonce,
        form.data_size
      );
      setStatus(`✅ Success: ${JSON.stringify(res)}`);
      console.log("Response: ",res)
    } catch (err: any) {
      setStatus(`❌ Failed: ${err.message}`);
    }
  }

  const nextStep = () => {
    if (currentStep < SEND_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)

      // Mock AI analysis when moving to analysis step
      if (currentStep === 1) {
        setTimeout(() => {
          setRiskAnalysis({
            score: 78,
            level: "high",
            reasons: [
              "Address associated with previously flagged phishing contracts",
              "Token approval patterns suggest draining behavior",
              "Address age: 14 days",
            ],
            confidence: 0.82,
            evidence: {
              first_seen: "2025-08-27",
              num_transactions: 12,
              contracts_interacted: ["0xdef..."],
              community_flags: 3,
            },
          })

          setEtaPrediction({
            predicted_min_seconds: 30,
            predicted_median_seconds: 75,
            predicted_max_seconds: 300,
            confidence: 0.78,
            recommended_max_fee_gwei: 45,
          })
        }, 2000)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const selectContact = (contact: any) => {
    setRecipient(contact.address)
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "moderate":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "high":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const formatETA = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
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
              <span className="text-lg font-bold">Send Crypto</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-32" />
            <span className="text-sm text-muted-foreground">
              {currentStep + 1}/{SEND_STEPS.length}
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Send Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {currentStep + 1}
                  </span>
                  {SEND_STEPS[currentStep].title}
                </CardTitle>
                <CardDescription>{SEND_STEPS[currentStep].description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Step 1: Recipient */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="recipient"
                          placeholder="0x... or ENS name"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <Clipboard className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Scan className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Quick Contact Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Quick Select from Address Book</Label>
                        <Button variant="link" size="sm" className="h-auto p-0">
                          <Users className="h-4 w-4 mr-1" />
                          View All
                        </Button>
                      </div>
                      <div className="grid gap-2">
                        {mockContacts.slice(0, 3).map((contact) => (
                          <Button
                            key={contact.address}
                            variant="outline"
                            className="justify-between h-auto p-4 bg-transparent hover:bg-muted/50"
                            onClick={() => selectContact(contact)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2 h-2 rounded-full ${contact.trusted ? "bg-green-500" : "bg-yellow-500"}`}
                              />
                              <div className="text-left">
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-muted-foreground font-mono">
                                  {contact.address.slice(0, 10)}...{contact.address.slice(-8)}
                                </div>
                              </div>
                            </div>
                            {contact.trusted && (
                              <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Trusted
                              </Badge>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {recipient && (
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium mb-1">Unknown Address</h4>
                            <p className="text-sm text-muted-foreground">
                              This address is not in your address book. SafeSend AI will analyze this transfer before
                              confirmation.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Amount & Token */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Select Token</Label>
                      <Select value={selectedToken} onValueChange={setSelectedToken}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose token to send" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockTokens.map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold">
                                    {token.symbol}
                                  </div>
                                  <span>{token.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {token.balance} {token.symbol}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="flex gap-2">
                        <Input
                          id="amount"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="flex-1"
                        />
                        <Button variant="outline">Max</Button>
                      </div>
                      {selectedToken && amount && (
                        <p className="text-sm text-muted-foreground">
                          ≈ ${(Number.parseFloat(amount) * 2500).toLocaleString()} USD
                        </p>
                      )}
                    </div>

                    {/* Fee Preview */}
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Estimated Network Fee</span>
                        <span className="text-sm">~$12.50</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Gas Price: {gasPrice[0]} gwei</span>
                        <span>~2 minutes</span>
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full justify-between bg-transparent">
                          Advanced Options
                          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Gas Price (gwei)</Label>
                          <div className="px-3">
                            <Slider
                              value={gasPrice}
                              onValueChange={setGasPrice}
                              max={100}
                              min={10}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Slow (10)</span>
                              <span>Standard ({gasPrice[0]})</span>
                              <span>Fast (100)</span>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}

                {/* Step 3: AI Analysis */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    {!riskAnalysis ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                          <Zap className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Analyzing Transaction</h3>
                        <p className="text-muted-foreground mb-4">
                          Our AI is reviewing the recipient address, transaction amount, and network conditions...
                        </p>
                        <Progress value={65} className="w-64 mx-auto" />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Risk Score */}
                        <Card className={`border-2 ${getRiskColor(riskAnalysis.level)}`}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5" />
                                Risk Assessment
                              </CardTitle>
                              <Badge variant="secondary" className={getRiskColor(riskAnalysis.level)}>
                                {riskAnalysis.level.toUpperCase()} RISK
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="text-3xl font-bold">{riskAnalysis.score}/100</div>
                                <div className="flex-1">
                                  <Progress value={riskAnalysis.score} className="h-2" />
                                  <p className="text-sm text-muted-foreground mt-1">
                                    Confidence: {Math.round(riskAnalysis.confidence * 100)}%
                                  </p>
                                </div>
                              </div>

                              <div className="p-3 rounded-lg bg-background/50">
                                <p className="font-medium mb-2">Primary Concern:</p>
                                <p className="text-sm">{riskAnalysis.reasons[0]}</p>
                              </div>

                              <Collapsible open={showAnalysisDetails} onOpenChange={setShowAnalysisDetails}>
                                <CollapsibleTrigger asChild>
                                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                    <Info className="h-4 w-4" />
                                    Why this assessment?
                                    {showAnalysisDetails ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-4 space-y-3">
                                  <div className="text-sm">
                                    <h4 className="font-medium mb-2">Evidence:</h4>
                                    <ul className="space-y-1 text-muted-foreground">
                                      {riskAnalysis.reasons.map((reason: string, index: number) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0" />
                                          {reason}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="text-sm">
                                    <h4 className="font-medium mb-2">Address Details:</h4>
                                    <div className="grid grid-cols-2 gap-4 text-muted-foreground">
                                      <div>First seen: {riskAnalysis.evidence.first_seen}</div>
                                      <div>Transactions: {riskAnalysis.evidence.num_transactions}</div>
                                      <div>Community flags: {riskAnalysis.evidence.community_flags}</div>
                                      <div>
                                        Contract interactions: {riskAnalysis.evidence.contracts_interacted.length}
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          </CardContent>
                        </Card>

                        {/* ETA Prediction */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-primary" />
                              Transaction ETA
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-primary mb-1">
                                  {formatETA(etaPrediction.predicted_median_seconds)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Estimated arrival ({Math.round(etaPrediction.confidence * 100)}% confidence)
                                </p>
                              </div>

                              <div className="flex justify-between text-sm">
                                <span>Min: {formatETA(etaPrediction.predicted_min_seconds)}</span>
                                <span>Max: {formatETA(etaPrediction.predicted_max_seconds)}</span>
                              </div>

                              <div className="p-3 rounded-lg bg-muted/50">
                                <p className="text-sm">
                                  <strong>Recommended gas:</strong> {etaPrediction.recommended_max_fee_gwei} gwei for
                                  optimal speed
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Human Feedback */}
                        {!feedbackGiven && (
                          <Card className="border-primary/20">
                            <CardContent className="pt-6">
                              <div className="text-center space-y-4">
                                <h4 className="font-medium">Was this risk assessment helpful?</h4>
                                <div className="flex justify-center gap-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFeedbackGiven(true)}
                                    className="bg-transparent"
                                  >
                                    Yes, helpful
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setFeedbackGiven(true)}
                                    className="bg-transparent"
                                  >
                                    No, not helpful
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {feedbackGiven && (
                          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <CheckCircle className="h-5 w-5 text-primary mx-auto mb-2" />
                            <p className="text-sm">Thank you! Your feedback helps improve SafeSend AI.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Confirm */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">Review Transaction</h3>
                      <p className="text-muted-foreground">Please review all details before confirming</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                        <span className="text-muted-foreground">Sending</span>
                        <span className="font-medium">
                          {amount} {selectedToken}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                        <span className="text-muted-foreground">To</span>
                        <span className="font-mono text-sm">
                          {recipient.slice(0, 10)}...{recipient.slice(-8)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                        <span className="text-muted-foreground">Network Fee</span>
                        <span className="font-medium">~$12.50</span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                        <span className="text-muted-foreground">Risk Level</span>
                        <Badge variant="secondary" className={getRiskColor(riskAnalysis?.level || "low")}>
                          {riskAnalysis?.level?.toUpperCase() || "LOW"} RISK
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-muted/50">
                        <span className="text-muted-foreground">Estimated Arrival</span>
                        <span className="font-medium">
                          {etaPrediction ? formatETA(etaPrediction.predicted_median_seconds) : "2 min"}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium mb-1">High Risk Detected</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            This transaction has been flagged as high risk. Proceed only if you trust this address.
                          </p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Mark as Trusted
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Report Suspicious
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="confirm-input">Type "CONFIRM" to proceed</Label>
                      <Input id="confirm-input" placeholder="Type CONFIRM" className="text-center font-mono" />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t">
                  <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="bg-transparent">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={
                      (currentStep === 0 && !recipient) ||
                      (currentStep === 1 && (!selectedToken || !amount)) ||
                      (currentStep === 2 && !riskAnalysis)
                    }
                  >
                    {currentStep === 3 ? "Send Transaction" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button onClick={handleSubmit}>Send Final</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Transaction Summary */}
          <div className="space-y-6">
            <Card className="shadow-md sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Token</span>
                    <span>{selectedToken || "—"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span>{amount || "—"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Recipient</span>
                    <span className="font-mono text-xs">
                      {recipient ? `${recipient.slice(0, 6)}...${recipient.slice(-4)}` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span>~$12.50</span>
                  </div>
                  {riskAnalysis && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Risk Level</span>
                      <Badge variant="secondary" className={`text-xs ${getRiskColor(riskAnalysis.level)}`}>
                        {riskAnalysis.level.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                  {etaPrediction && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ETA</span>
                      <span>{formatETA(etaPrediction.predicted_median_seconds)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  View Transaction Guide
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  Understanding Risk Scores
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

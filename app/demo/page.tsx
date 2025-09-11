"use client"

import { useState } from "react"
import { Shield, ArrowLeft, Play, RotateCcw, Clock, Zap, Users, Eye, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RiskPill } from "@/components/safesend/risk-pill"
import { EtaWidget } from "@/components/safesend/eta-widget"
import { ContactCard } from "@/components/safesend/contact-card"
import { TransactionCard } from "@/components/safesend/transaction-card"

const demoScenarios = [
  {
    id: "safe-transfer",
    title: "Safe Transfer to Trusted Contact",
    description: "Sending ETH to a verified contact with low risk",
    recipient: "0x742d35Cc6634C0532925a3b8D0C9964E2f4e2f",
    contactName: "Alice Johnson",
    trusted: true,
    amount: "0.5 ETH",
    riskScore: 15,
    riskLevel: "low",
    eta: 75,
    confidence: 0.92,
  },
  {
    id: "moderate-risk",
    title: "Unknown Address Transfer",
    description: "Sending to an address not in your contacts",
    recipient: "0x8f3a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    contactName: null,
    trusted: false,
    amount: "1.2 ETH",
    riskScore: 45,
    riskLevel: "moderate",
    eta: 120,
    confidence: 0.78,
  },
  {
    id: "high-risk",
    title: "Suspicious Address Warning",
    description: "Transfer to address flagged by community",
    recipient: "0xdeadbeef1234567890abcdef1234567890abcdef",
    contactName: null,
    trusted: false,
    amount: "2.0 ETH",
    riskScore: 85,
    riskLevel: "high",
    eta: 180,
    confidence: 0.89,
  },
]

export default function DemoPage() {
  const [selectedScenario, setSelectedScenario] = useState(demoScenarios[0])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const runDemo = () => {
    setIsAnalyzing(true)
    setShowResults(false)
    setCurrentStep(0)

    // Simulate analysis steps
    const steps = ["Validating address...", "Checking risk factors...", "Predicting ETA...", "Analysis complete!"]

    steps.forEach((_, index) => {
      setTimeout(
        () => {
          setCurrentStep(index + 1)
          if (index === steps.length - 1) {
            setIsAnalyzing(false)
            setShowResults(true)
          }
        },
        (index + 1) * 800,
      )
    })
  }

  const resetDemo = () => {
    setIsAnalyzing(false)
    setShowResults(false)
    setCurrentStep(0)
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
              <span className="text-lg font-bold">SafeSend AI Demo</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Play className="h-3 w-3 mr-1" />
            Interactive Demo
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Demo Introduction */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Experience SafeSend AI</CardTitle>
              <CardDescription className="text-lg">
                Try our AI-powered transaction analysis without connecting a wallet or spending real money
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-muted/50">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Risk Analysis</h3>
                  <p className="text-sm text-muted-foreground">See how AI detects suspicious addresses</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-medium mb-1">ETA Prediction</h3>
                  <p className="text-sm text-muted-foreground">Experience accurate transaction timing</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Contact Management</h3>
                  <p className="text-sm text-muted-foreground">Explore trusted contact features</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Demo Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demo Scenarios</CardTitle>
                  <CardDescription>Choose a transaction scenario to analyze</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {demoScenarios.map((scenario) => (
                    <Button
                      key={scenario.id}
                      variant={selectedScenario.id === scenario.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-4 bg-transparent"
                      onClick={() => setSelectedScenario(scenario)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{scenario.title}</div>
                        <div className="text-sm text-muted-foreground">{scenario.description}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demo Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={runDemo} disabled={isAnalyzing} className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                  </Button>
                  <Button variant="outline" onClick={resetDemo} className="w-full gap-2 bg-transparent">
                    <RotateCcw className="h-4 w-4" />
                    Reset Demo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Demo Results */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Analysis Results
                  </CardTitle>
                  <CardDescription>Real-time transaction safety assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Analyzing Transaction</h3>
                      <p className="text-muted-foreground mb-4">
                        {currentStep === 0 && "Preparing analysis..."}
                        {currentStep === 1 && "Validating recipient address..."}
                        {currentStep === 2 && "Checking risk factors..."}
                        {currentStep === 3 && "Predicting transaction ETA..."}
                        {currentStep === 4 && "Analysis complete!"}
                      </p>
                      <Progress value={(currentStep / 4) * 100} className="w-64 mx-auto" />
                    </div>
                  ) : showResults ? (
                    <div className="space-y-6">
                      {/* Transaction Details */}
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <h4 className="font-medium mb-3">Transaction Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="ml-2 font-medium">{selectedScenario.amount}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Recipient:</span>
                            <span className="ml-2 font-mono text-xs">
                              {selectedScenario.recipient.slice(0, 10)}...{selectedScenario.recipient.slice(-8)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Contact:</span>
                            <span className="ml-2">{selectedScenario.contactName || "Unknown"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Trust Level:</span>
                            <span className="ml-2">
                              {selectedScenario.trusted ? (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                  Trusted
                                </Badge>
                              ) : (
                                <Badge
                                  variant="secondary"
                                  className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                >
                                  Unknown
                                </Badge>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Risk Assessment */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Risk Assessment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <RiskPill
                              score={selectedScenario.riskScore}
                              level={selectedScenario.riskLevel}
                              confidence={selectedScenario.confidence}
                              showDetails={true}
                            />
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">ETA Prediction</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <EtaWidget
                              predictedSeconds={selectedScenario.eta}
                              confidence={selectedScenario.confidence}
                              showChart={true}
                            />
                          </CardContent>
                        </Card>
                      </div>

                      {/* Human Feedback Simulation */}
                      <Card className="border-primary/20">
                        <CardContent className="pt-6">
                          <div className="text-center space-y-4">
                            <h4 className="font-medium">Was this risk assessment helpful?</h4>
                            <div className="flex justify-center gap-3">
                              <Button variant="outline" size="sm" className="bg-transparent">
                                Yes, helpful
                              </Button>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                No, not helpful
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              In the real app, your feedback helps improve AI accuracy
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Eye className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                      <p className="text-muted-foreground">
                        Select a scenario and click "Run Analysis" to see SafeSend AI in action
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Component Library Showcase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Component Library
              </CardTitle>
              <CardDescription>Reusable SafeSend AI components for developers</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="risk-pills" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="risk-pills">Risk Pills</TabsTrigger>
                  <TabsTrigger value="eta-widgets">ETA Widgets</TabsTrigger>
                  <TabsTrigger value="contact-cards">Contact Cards</TabsTrigger>
                  <TabsTrigger value="transaction-cards">Transaction Cards</TabsTrigger>
                </TabsList>

                <TabsContent value="risk-pills" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <h4 className="font-medium mb-3">Low Risk</h4>
                      <RiskPill score={15} level="low" confidence={0.92} />
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <h4 className="font-medium mb-3">Moderate Risk</h4>
                      <RiskPill score={45} level="moderate" confidence={0.78} />
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                      <h4 className="font-medium mb-3">High Risk</h4>
                      <RiskPill score={85} level="high" confidence={0.89} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="eta-widgets" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-3 text-center">Fast Transaction</h4>
                      <EtaWidget predictedSeconds={45} confidence={0.95} />
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-3 text-center">Standard Transaction</h4>
                      <EtaWidget predictedSeconds={120} confidence={0.82} />
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-medium mb-3 text-center">Slow Transaction</h4>
                      <EtaWidget predictedSeconds={300} confidence={0.67} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact-cards" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <ContactCard
                      name="Alice Johnson"
                      address="0x742d35Cc6634C0532925a3b8D0C9964E2f4e2f"
                      alias="alice.eth"
                      trusted={true}
                      lastUsed="2 days ago"
                      transactionCount={15}
                    />
                    <ContactCard
                      name="Unknown Address"
                      address="0x8f3a9b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a"
                      trusted={false}
                      lastUsed="Never"
                      transactionCount={0}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="transaction-cards" className="space-y-4">
                  <div className="space-y-4">
                    <TransactionCard
                      type="send"
                      token="ETH"
                      amount="0.5"
                      recipient="Alice Johnson"
                      status="confirmed"
                      riskLevel="low"
                      eta="2 min"
                      timestamp="2 hours ago"
                    />
                    <TransactionCard
                      type="receive"
                      token="USDC"
                      amount="500.00"
                      sender="Bob Smith"
                      status="pending"
                      riskLevel="moderate"
                      eta="5-8 min"
                      timestamp="1 hour ago"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

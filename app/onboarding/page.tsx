"use client"

import { useState } from "react"
import { Shield, Wallet, Users, CheckCircle, ArrowRight, ArrowLeft, Upload, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

const ONBOARDING_STEPS = [
  { id: "welcome", title: "Welcome", description: "Get started with SafeSend AI" },
  { id: "wallet", title: "Connect Wallet", description: "Link your existing wallet" },
  { id: "addressbook", title: "Address Book", description: "Set up trusted contacts" },
  { id: "tour", title: "Quick Tour", description: "Learn the key features" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [walletConnected, setWalletConnected] = useState(false)
  const [addressBookEnabled, setAddressBookEnabled] = useState(false)
  const [telemetryOptIn, setTelemetryOptIn] = useState(false)

  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const connectWallet = (provider: string) => {
    // Mock wallet connection
    setWalletConnected(true)
    console.log(`[v0] Connecting to ${provider}`)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">SafeSend AI</span>
          </div>
          <Progress value={progress} className="w-full max-w-md mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {ONBOARDING_STEPS.length}: {ONBOARDING_STEPS[currentStep].title}
          </p>
        </div>

        {/* Welcome Step */}
        {currentStep === 0 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Welcome to SafeSend AI</CardTitle>
              <CardDescription className="text-lg">
                Let's set up your crypto safety layer in just a few steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Connect your wallet</h3>
                    <p className="text-sm text-muted-foreground">Link MetaMask, WalletConnect, or hardware wallet</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Enable local address book</h3>
                    <p className="text-sm text-muted-foreground">Store trusted contacts encrypted on your device</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Learn the features</h3>
                    <p className="text-sm text-muted-foreground">Quick tour of AI analysis and ETA prediction</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <Checkbox
                  id="telemetry"
                  checked={telemetryOptIn}
                  onCheckedChange={(checked) => setTelemetryOptIn(checked as boolean)}
                />
                <label htmlFor="telemetry" className="text-sm leading-relaxed">
                  Help improve SafeSend AI by sharing anonymized feedback (optional)
                </label>
              </div>

              <Button onClick={nextStep} className="w-full" size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Wallet Connection Step */}
        {currentStep === 1 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Connect Your Wallet</CardTitle>
              <CardDescription className="text-lg">Choose your preferred wallet to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {walletConnected ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Wallet Connected!</h3>
                  <p className="text-muted-foreground mb-4">Successfully connected to MetaMask</p>
                  <Badge variant="secondary" className="mb-6">
                    0x1234...5678
                  </Badge>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Privacy Note:</strong> SafeSend AI never stores your private keys or wallet credentials.
                      We only read public transaction data to provide safety analysis.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center justify-between p-6 h-auto bg-transparent hover:bg-muted/50"
                    onClick={() => connectWallet("MetaMask")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Wallet className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">MetaMask</div>
                        <div className="text-sm text-muted-foreground">Most popular browser wallet</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center justify-between p-6 h-auto bg-transparent hover:bg-muted/50"
                    onClick={() => connectWallet("WalletConnect")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <QrCode className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">WalletConnect</div>
                        <div className="text-sm text-muted-foreground">Connect mobile wallets via QR</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    className="flex items-center justify-between p-6 h-auto bg-transparent hover:bg-muted/50"
                    onClick={() => connectWallet("Ledger")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Ledger</div>
                        <div className="text-sm text-muted-foreground">Hardware wallet (most secure)</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep} disabled={!walletConnected}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Address Book Setup Step */}
        {currentStep === 2 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Set Up Address Book</CardTitle>
              <CardDescription className="text-lg">Add trusted contacts for safer transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Users className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground mb-6">
                  Your address book is stored locally and encrypted on your device. It never leaves your computer.
                </p>
              </div>

              <div className="grid gap-4">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 p-6 h-auto bg-transparent hover:bg-muted/50"
                  onClick={() => setAddressBookEnabled(true)}
                >
                  <Users className="h-5 w-5" />
                  Add trusted contacts now
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 p-6 h-auto bg-transparent hover:bg-muted/50"
                >
                  <Upload className="h-5 w-5" />
                  Import from CSV
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 p-6 h-auto bg-transparent hover:bg-muted/50"
                >
                  <QrCode className="h-5 w-5" />
                  Scan QR code
                </Button>
              </div>

              {addressBookEnabled && (
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary mb-2" />
                  <p className="text-sm">Address book enabled! You can add contacts later from the main dashboard.</p>
                </div>
              )}

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Privacy Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Contacts stored locally with encryption</li>
                  <li>• Optional cloud backup with your passphrase</li>
                  <li>• Never shared with third parties</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={nextStep}>
                    Skip for now
                  </Button>
                  <Button onClick={nextStep}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Tour Step */}
        {currentStep === 3 && (
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Quick Tour</CardTitle>
              <CardDescription className="text-lg">Learn how SafeSend AI protects your transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">AI Risk Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Every transaction is analyzed for suspicious addresses, phishing contracts, and unusual patterns
                      before you send.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">ETA Prediction</h3>
                    <p className="text-sm text-muted-foreground">
                      Know exactly when your transaction will arrive with confidence intervals and recommended gas fees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Trusted Contacts</h3>
                    <p className="text-sm text-muted-foreground">
                      Mark addresses as trusted to skip warnings and speed up future transactions to known recipients.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <p className="text-sm text-muted-foreground">
                  You'll be taken to your dashboard where you can start sending crypto safely. Try the sandbox mode to
                  see how the AI analysis works without spending real money.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={() => (window.location.href = "/dashboard")} size="lg">
                  Enter SafeSend AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

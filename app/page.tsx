import { Shield, Clock, Users, Lock, Github, ArrowRight, CheckCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-balance">SafeSend AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
              Security
            </a>
            <Button variant="outline" size="sm">
              <a href="/demo">
              View Demo
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Transaction Safety
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Crypto that cares before it confirms</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            A privacy-first safety layer that flags risky transfers and predicts how long they'll take. Make sending
            crypto safe, explainable, and quick.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/onboarding">
                Try SafeSend
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              <a href="/demo">
              View Demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Built for safety and simplicity</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every feature designed to prevent costly mistakes while keeping your data private
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">ETA Estimator</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">
                  Know exactly when your transaction will arrive with AI-powered predictions
                </CardDescription>
                <Button variant="link" className="p-0 mt-2 h-auto">
                  See it in action →
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">AI Transaction Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">
                  Advanced risk detection flags suspicious addresses and potential scams
                </CardDescription>
                <Button variant="link" className="p-0 mt-2 h-auto">
                  See it in action →
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Local Address Book</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">
                  Encrypted contact storage that never leaves your device
                </CardDescription>
                <Button variant="link" className="p-0 mt-2 h-auto">
                  See it in action →
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Beginner UI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty">
                  Simple, guided flows that make crypto accessible to everyone
                </CardDescription>
                <Button variant="link" className="p-0 mt-2 h-auto">
                  See it in action →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Three steps to safer crypto</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our AI analyzes every transaction before you send
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-muted-foreground text-pretty">
                Link your existing wallet with one click. We support MetaMask, WalletConnect, and hardware wallets.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-muted-foreground text-pretty">
                Our AI reviews the recipient address, transaction amount, and network conditions in real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Send with Confidence</h3>
              <p className="text-muted-foreground text-pretty">
                Get clear risk assessment and ETA prediction before confirming your transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section id="security" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Privacy-first by design</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Open-source</h3>
                    <p className="text-muted-foreground text-sm">Full transparency with community-audited code</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Local-only storage</h3>
                    <p className="text-muted-foreground text-sm">
                      Your address book and preferences never leave your device
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">No private key access</h3>
                    <p className="text-muted-foreground text-sm">We never see or store your wallet credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Opt-in telemetry</h3>
                    <p className="text-muted-foreground text-sm">Help improve the community with anonymous feedback</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </div>
            <div className="lg:text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-primary/10 rounded-full mb-6">
                <Lock className="h-16 w-16 text-primary" />
              </div>
              <Badge variant="secondary" className="text-sm">
                WCAG AA Compliant
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to send crypto safely?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of users who trust SafeSend AI to protect their transactions
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <a href="/onboarding">
              Try SafeSend — Connect Wallet
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold">SafeSend AI</span>
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                Making crypto transactions safe, explainable, and quick for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-foreground transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    License
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SafeSend AI. Open-source and privacy-first.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  Settings,
  ArrowLeft,
  Shield,
  Lock,
  Download,
  Upload,
  Trash2,
  Bell,
  Moon,
  Sun,
  Monitor,
  Zap,
  AlertTriangle,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Privacy & Security
    localStorageOnly: true,
    cloudBackupEnabled: false,
    biometricUnlock: false,
    autoLockMinutes: 15,
    showBalances: true,

    // AI & Analysis
    aiAnalysisEnabled: true,
    shareAnonymousFeedback: false,
    showDetailedExplanations: true,
    riskThreshold: [75],

    // Network & Fees
    defaultNetwork: "ethereum",
    defaultGasPreference: "standard",
    eip1559Enabled: true,

    // Notifications
    transactionAlerts: true,
    riskWarnings: true,
    etaUpdates: false,
    emailNotifications: false,

    // Appearance
    theme: "dark",
    compactMode: false,

    // Developer
    showDebugInfo: false,
    apiKey: "",
  })

  const [backupPassphrase, setBackupPassphrase] = useState("")
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    console.log(`[v0] Setting updated: ${key} = ${value}`)
  }

  const handleExportData = () => {
    console.log("[v0] Exporting user data...")
    setIsExportDialogOpen(false)
  }

  const handleResetSettings = () => {
    console.log("[v0] Resetting all settings to defaults...")
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
              <Settings className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Settings</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="privacy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="ai">AI & Analysis</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Privacy & Security Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Data Storage & Privacy
                  </CardTitle>
                  <CardDescription>Control how your data is stored and shared</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Local-only storage</Label>
                      <p className="text-sm text-muted-foreground">Keep all data encrypted on your device only</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={settings.localStorageOnly}
                        onCheckedChange={(checked) => updateSetting("localStorageOnly", checked)}
                      />
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Recommended
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Cloud backup</Label>
                      <p className="text-sm text-muted-foreground">
                        Encrypted backup to cloud storage with your passphrase
                      </p>
                    </div>
                    <Switch
                      checked={settings.cloudBackupEnabled}
                      onCheckedChange={(checked) => updateSetting("cloudBackupEnabled", checked)}
                      disabled={settings.localStorageOnly}
                    />
                  </div>

                  {settings.cloudBackupEnabled && (
                    <div className="p-4 rounded-lg bg-muted/50 border space-y-3">
                      <Label htmlFor="backup-passphrase">Backup Passphrase</Label>
                      <Input
                        id="backup-passphrase"
                        type="password"
                        placeholder="Enter a strong passphrase for encryption"
                        value={backupPassphrase}
                        onChange={(e) => setBackupPassphrase(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        This passphrase encrypts your backup. Keep it safe - we cannot recover it if lost.
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Show balances</Label>
                      <p className="text-sm text-muted-foreground">Display token balances and portfolio values</p>
                    </div>
                    <Switch
                      checked={settings.showBalances}
                      onCheckedChange={(checked) => updateSetting("showBalances", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security & Authentication
                  </CardTitle>
                  <CardDescription>Protect your account with additional security measures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Biometric unlock</Label>
                      <p className="text-sm text-muted-foreground">
                        Use fingerprint or face recognition to unlock the app
                      </p>
                    </div>
                    <Switch
                      checked={settings.biometricUnlock}
                      onCheckedChange={(checked) => updateSetting("biometricUnlock", checked)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base">Auto-lock timer</Label>
                    <div className="px-3">
                      <Slider
                        value={[settings.autoLockMinutes]}
                        onValueChange={(value) => updateSetting("autoLockMinutes", value[0])}
                        max={60}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 min</span>
                        <span>{settings.autoLockMinutes} minutes</span>
                        <span>60 min</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically lock the app after this period of inactivity
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Export or delete your data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <Download className="h-4 w-4" />
                          Export Data
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Export Your Data</DialogTitle>
                          <DialogDescription>
                            Download an encrypted backup of your address book and settings.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-muted/50 border">
                            <h4 className="font-medium mb-2">What's included:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Address book contacts</li>
                              <li>• Privacy settings</li>
                              <li>• AI preferences</li>
                              <li>• Network configurations</li>
                            </ul>
                          </div>
                          <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium">Privacy Note</p>
                                <p className="text-xs text-muted-foreground">
                                  Your private keys are never included in exports. Only addresses and metadata are
                                  saved.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleExportData}>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Upload className="h-4 w-4" />
                      Import Data
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="gap-2 text-red-600 hover:text-red-600 bg-transparent">
                          <Trash2 className="h-4 w-4" />
                          Clear All Data
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Clear All Data</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete all your contacts, settings, and preferences. This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Delete Everything
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI & Analysis Tab */}
            <TabsContent value="ai" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Risk Analysis
                  </CardTitle>
                  <CardDescription>Configure how SafeSend AI analyzes your transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Enable AI analysis</Label>
                      <p className="text-sm text-muted-foreground">
                        Analyze transactions for risks and suspicious patterns
                      </p>
                    </div>
                    <Switch
                      checked={settings.aiAnalysisEnabled}
                      onCheckedChange={(checked) => updateSetting("aiAnalysisEnabled", checked)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base">Risk threshold</Label>
                    <div className="px-3">
                      <Slider
                        value={settings.riskThreshold}
                        onValueChange={(value) => updateSetting("riskThreshold", value)}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Low (0)</span>
                        <span>Score: {settings.riskThreshold[0]}</span>
                        <span>High (100)</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Show warnings for transactions above this risk score
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Detailed explanations</Label>
                      <p className="text-sm text-muted-foreground">Show expanded reasoning for AI decisions</p>
                    </div>
                    <Switch
                      checked={settings.showDetailedExplanations}
                      onCheckedChange={(checked) => updateSetting("showDetailedExplanations", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community & Feedback</CardTitle>
                  <CardDescription>Help improve SafeSend AI for everyone</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Share anonymous feedback</Label>
                      <p className="text-sm text-muted-foreground">Help improve AI accuracy with anonymized data</p>
                    </div>
                    <Switch
                      checked={settings.shareAnonymousFeedback}
                      onCheckedChange={(checked) => updateSetting("shareAnonymousFeedback", checked)}
                    />
                  </div>

                  {settings.shareAnonymousFeedback && (
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">What we collect:</p>
                          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                            <li>• Risk assessment accuracy feedback</li>
                            <li>• Transaction patterns (no addresses or amounts)</li>
                            <li>• Model performance metrics</li>
                          </ul>
                          <p className="text-xs text-muted-foreground mt-2">
                            All data is anonymized and cannot be traced back to you.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Network & Fees Tab */}
            <TabsContent value="network" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Network Settings</CardTitle>
                  <CardDescription>Configure your preferred blockchain networks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Default Network</Label>
                    <Select
                      value={settings.defaultNetwork}
                      onValueChange={(value) => updateSetting("defaultNetwork", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum One</SelectItem>
                        <SelectItem value="optimism">Optimism</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Gas Preference</Label>
                    <Select
                      value={settings.defaultGasPreference}
                      onValueChange={(value) => updateSetting("defaultGasPreference", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow (Lower fees)</SelectItem>
                        <SelectItem value="standard">Standard (Recommended)</SelectItem>
                        <SelectItem value="fast">Fast (Higher fees)</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">EIP-1559 support</Label>
                      <p className="text-sm text-muted-foreground">Use modern fee estimation for supported networks</p>
                    </div>
                    <Switch
                      checked={settings.eip1559Enabled}
                      onCheckedChange={(checked) => updateSetting("eip1559Enabled", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Choose what alerts you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Transaction alerts</Label>
                      <p className="text-sm text-muted-foreground">Notify when transactions are confirmed or fail</p>
                    </div>
                    <Switch
                      checked={settings.transactionAlerts}
                      onCheckedChange={(checked) => updateSetting("transactionAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Risk warnings</Label>
                      <p className="text-sm text-muted-foreground">Alert when high-risk transactions are detected</p>
                    </div>
                    <Switch
                      checked={settings.riskWarnings}
                      onCheckedChange={(checked) => updateSetting("riskWarnings", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">ETA updates</Label>
                      <p className="text-sm text-muted-foreground">Notify when transaction timing estimates change</p>
                    </div>
                    <Switch
                      checked={settings.etaUpdates}
                      onCheckedChange={(checked) => updateSetting("etaUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Email notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important alerts via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of SafeSend AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Compact mode</Label>
                      <p className="text-sm text-muted-foreground">Use smaller spacing and condensed layouts</p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => updateSetting("compactMode", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Developer Options</CardTitle>
                  <CardDescription>Advanced settings for developers and power users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base">Show debug information</Label>
                      <p className="text-sm text-muted-foreground">Display technical details and logs</p>
                    </div>
                    <Switch
                      checked={settings.showDebugInfo}
                      onCheckedChange={(checked) => updateSetting("showDebugInfo", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">Hugging Face API Key (Optional)</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="hf_..."
                      value={settings.apiKey}
                      onChange={(e) => updateSetting("apiKey", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Use your own API key for AI analysis. Leave empty to use default service.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reset Settings</CardTitle>
                  <CardDescription>Restore all settings to their default values</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-red-600 hover:text-red-600 bg-transparent">
                        Reset All Settings
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset All Settings</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will restore all settings to their default values. Your address book and transaction
                          history will not be affected.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetSettings}>Reset Settings</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

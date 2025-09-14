"use client"

import { useState } from "react"
import {
  Shield,
  Code,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Copy,
  FileText,
  Zap,
  TrendingUp,
  Info,
  Search,
  Upload,
  Loader2,
  ChevronRight,
  ExternalLink,
  BookOpen,
  BarChart3,
  GitCompare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { analyzeSmartContract } from "@/utils/api";

export interface AnalysisResult {
  ContractAnalysis: {
    Summary: string;
    "Reliability Score": number;
    Justification: string;
    Vulnerabilities: {
      Vulnerability: string;
      Description: string;
    }[];
    Improvements: {
      Improvement: string;
      Details: string;
    }[];
  };
  FunctionAnalysis: {
    Name: string;
    Description: string;
  }[];
}

export default function ContractAnalysisPage() {
  const [inputMethod, setInputMethod] = useState<"code" | "address">("code")
  const [contractCode, setContractCode] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [beginnerMode, setBeginnerMode] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [type, setType] = useState<"code" | "address">("code");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnal = async () => {
  setLoading(true);
  setError(null);
  setAnalysisResult(null);

  // Prevent sending empty input
  if (!contractCode || contractCode.trim() === "") {
    setError("Please enter contract code before analyzing.");
    setLoading(false);
    return;
  }

  try {
    setIsAnalyzing(true);

    // fetch and decode into our typed interface
    var data = await analyzeSmartContract(contractCode, "code");
    
    console.log(typeof(data));
    console.log("Full Analysis Result:", data);

    let lines = data.analysis.split('\n');
    lines = lines.slice(1, -1);
    const cleaned = lines.join('\n');
    data = JSON.parse(cleaned)

    // Example access
    console.log("Summary:", data.ContractAnalysis.Summary);
    console.log("Reliability Score:", data.ContractAnalysis["Reliability Score"]);
    console.log("Justification:", data.ContractAnalysis.Justification);
    console.log("Function:", data.FunctionAnalysis);

    // store in state
    setAnalysisResult(data);
    console.log("Res: ",data);

  } catch (err: any) {
    setError(err.message || "Failed to analyze contract");
    console.error("Error: ", err.message);
  } finally {
    setIsAnalyzing(false);
    setLoading(false);
  }
};

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "text-green-600 bg-green-50 border-green-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "High":
        return "text-red-600 bg-red-50 border-red-200"
      case "Critical":
        return "text-red-700 bg-red-100 border-red-300"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Low":
        return <CheckCircle className="h-6 w-6 text-green-500" />
      case "Medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "High":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "Critical":
        return <XCircle className="h-4 w-4 text-red-700" />
      default:
        return <Info className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Smart Contract Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Analyze smart contracts for security vulnerabilities, gas efficiency, and functionality
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <Label htmlFor="beginner-mode">Explain Like I'm 5</Label>
            <Switch id="beginner-mode" checked={beginnerMode} onCheckedChange={setBeginnerMode} />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <GitCompare className="h-4 w-4 mr-2" />
                Compare Contracts
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Compare Smart Contracts</DialogTitle>
                <DialogDescription>
                  Compare two contracts side by side to identify differences and improvements
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Contract A</Label>
                  <Textarea placeholder="Paste first contract code..." className="mt-2 h-64" />
                </div>
                <div>
                  <Label>Contract B</Label>
                  <Textarea placeholder="Paste second contract code..." className="mt-2 h-64" />
                </div>
              </div>
              <Button className="mt-4">Compare Contracts</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Input Section */}
      <Card className="px-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Contract Input
          </CardTitle>
          <CardDescription>Enter your smart contract code or deployed contract address for analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Method Toggle */}
          <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as "code" | "address")}>
            <TabsList>
              <TabsTrigger value="code">Solidity Code</TabsTrigger>
              <TabsTrigger value="address">Contract Address</TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="space-y-4">
              <div>
                <Label htmlFor="contract-code">Smart Contract Code</Label>
                <Textarea
                  id="contract-code"
                  placeholder="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // Paste your Solidity code here...
}"
                  value={contractCode}
                  onChange={(e) => setContractCode(e.target.value)}
                  className="mt-2 h-64 font-mono text-sm"
                />
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <div>
                <Label htmlFor="contract-address">Contract Address</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="contract-address"
                    placeholder="0x742d35Cc6634C0532925a3b8D404d4e2f4e2f"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  We'll automatically fetch the contract code and ABI from Etherscan
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleAnal}
            // disabled={isAnalyzing || (!contractCode && !contractAddress)}
            disabled={isAnalyzing || (!contractCode)}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Contract...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Analyze Contract
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-6">

          {/* Main Analysis */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="security">Security Analysis</TabsTrigger>
              {/* <TabsTrigger value="function">Functions Analysis</TabsTrigger> */}
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contract Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{analysisResult.ContractAnalysis.Summary}</p>
                  <p className="text-muted-foreground leading-relaxed mt-2">{analysisResult.ContractAnalysis.Justification}</p>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Risk Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Security Score</span>
                        <span className="text-sm font-medium">{analysisResult.ContractAnalysis["Reliability Score"]*2}/10</span>
                      </div>
                      <Progress value={analysisResult.ContractAnalysis["Reliability Score"]*20} className="h-2" />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Analysis
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Etherscan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Security Vulnerabilities
                  </CardTitle>
                  <CardDescription>Detected security issues and recommendations for improvement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult.ContractAnalysis.Vulnerabilities.map((vuln, index) => (
                    <div key={index} className="border rounded-lg p-4 flex gap-3 items-center">
                      <div className="items-center">
                          {getSeverityIcon("Medium")}
                      </div>
                      <div className="space-y-1">
                          <p className="text-lg font-medium">{vuln.Vulnerability}</p>
                          <p className="text-sm font-medium text-gray-400">{vuln.Description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="function" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Functions Analysis
                  </CardTitle>
                  <CardDescription>Detected security issues and recommendations for improvement in each Function.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult.FunctionAnalysis?.map((vuln, index) => (
                    <div key={index} className="border rounded-lg p-4 flex gap-3 items-center">
                      <div className="items-center">
                          {getSeverityIcon("Medium")}
                      </div>
                      <div className="space-y-1">
                          <p className="text-lg font-medium">{vuln.Name}</p>
                          <p className="text-sm font-medium text-gray-400">{vuln.Description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 items-center"><Info className="h-5 w-5" /> Suggested Improvements</CardTitle>
                  <CardDescription>Recommended actions to enhance the contract&apos;s security, reliability, and efficiency.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResult.ContractAnalysis.Improvements.map((func, index) => (
                      <div key={index} className="border rounded-lg p-4 flex gap-3 items-center">
                          <div className="items-center">
                            {getSeverityIcon("")}
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-medium">{func.Improvement}</p>
                            <p className="text-sm font-medium text-gray-400">{func.Details}</p>
                          </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Empty State */}
      {!analysisResult && !isAnalyzing && (
        <Card className="text-center py-12">
          <CardContent>
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Paste your smart contract code or enter a deployed contract address to get started with comprehensive
              security analysis.
            </p>
            <div>
            <input
              id="contract-upload"
              type="file"
              accept=".sol,.txt"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("Selected file:", file.name);
                }
              }}
            />
            <label htmlFor="contract-upload">
              <Button variant="outline" asChild>
                <span className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Contract File (.sol, .txt)
                </span>
              </Button>
            </label>
          </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
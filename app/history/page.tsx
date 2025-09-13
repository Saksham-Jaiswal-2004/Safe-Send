"use client"

import { useState } from "react"
import {
  Search,
  Download,
  Eye,
  Send,
  Trash2,
  MoreHorizontal,
  FileText,
  ImageIcon,
  File,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Shield,
  Share,
  Hash,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HistoryItem {
  id: string
  name: string
  fileType: "pdf" | "image" | "document"
  actionType: "Upload" | "Verification" | "Share"
  status: "Verified" | "Pending" | "Rejected"
  date: string
  time: string
  recipient?: string
  verifier?: string
  hash: string
  size: string
  metadata: {
    originalName: string
    uploadedBy: string
    verificationMethod: string
    trustScore: number
  }
  logs: Array<{
    action: string
    timestamp: string
    details: string
  }>
}

const mockHistoryData: HistoryItem[] = [
  {
    id: "1",
    name: "Contract_Agreement_2024.pdf",
    fileType: "pdf",
    actionType: "Upload",
    status: "Verified",
    date: "2024-01-15",
    time: "14:30",
    recipient: "0x742d35Cc6634C0532925a3b8D4e2f4e2f4e2f4e2f",
    hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef",
    size: "2.4 MB",
    metadata: {
      originalName: "Contract_Agreement_2024.pdf",
      uploadedBy: "0x123...456",
      verificationMethod: "AI Analysis + Blockchain",
      trustScore: 95,
    },
    logs: [
      { action: "Document uploaded", timestamp: "2024-01-15 14:30:00", details: "File successfully uploaded to IPFS" },
      {
        action: "AI verification started",
        timestamp: "2024-01-15 14:30:15",
        details: "Document authenticity check initiated",
      },
      {
        action: "Verification completed",
        timestamp: "2024-01-15 14:31:45",
        details: "Document verified with 95% confidence",
      },
    ],
  },
  {
    id: "2",
    name: "Identity_Verification.jpg",
    fileType: "image",
    actionType: "Verification",
    status: "Pending",
    date: "2024-01-14",
    time: "09:15",
    verifier: "TrustChain Validator",
    hash: "0xb2c3d4e5f6789012345678901234567890abcdef1",
    size: "1.8 MB",
    metadata: {
      originalName: "Identity_Verification.jpg",
      uploadedBy: "0x789...012",
      verificationMethod: "Manual Review",
      trustScore: 0,
    },
    logs: [
      { action: "Verification requested", timestamp: "2024-01-14 09:15:00", details: "Manual verification requested" },
      {
        action: "Assigned to validator",
        timestamp: "2024-01-14 09:16:00",
        details: "Document assigned to TrustChain Validator",
      },
    ],
  },
  {
    id: "3",
    name: "Financial_Report_Q4.xlsx",
    fileType: "document",
    actionType: "Share",
    status: "Rejected",
    date: "2024-01-13",
    time: "16:45",
    recipient: "finance@company.com",
    hash: "0xc3d4e5f6789012345678901234567890abcdef12",
    size: "856 KB",
    metadata: {
      originalName: "Financial_Report_Q4.xlsx",
      uploadedBy: "0x345...678",
      verificationMethod: "Automated Scan",
      trustScore: 25,
    },
    logs: [
      { action: "Share initiated", timestamp: "2024-01-13 16:45:00", details: "Document sharing requested" },
      {
        action: "Security scan failed",
        timestamp: "2024-01-13 16:45:30",
        details: "Document failed security validation",
      },
      {
        action: "Share rejected",
        timestamp: "2024-01-13 16:46:00",
        details: "Sharing blocked due to security concerns",
      },
    ],
  },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const filteredHistory = mockHistoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.verifier?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter
    const matchesAction = actionFilter === "all" || item.actionType.toLowerCase() === actionFilter

    return matchesSearch && matchesStatus && matchesAction
  })

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-blue-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "Rejected":
        return (
          <Badge className="bg-red-500/10 text-red-600 border-red-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "Upload":
        return <Upload className="h-4 w-4 text-blue-500" />
      case "Verification":
        return <Shield className="h-4 w-4 text-purple-500" />
      case "Share":
        return <Share className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const openDetails = (item: HistoryItem) => {
    setSelectedItem(item)
    setDetailsOpen(true)
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <FileText className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No History Yet</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        Your document uploads, verifications, and sharing activity will appear here once you start using SafeSend AI.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <a href="/send">Send Document</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/demo">Try Demo</a>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-muted-foreground">Track your uploads, verifications, and sharing activity</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, recipients, or verifiers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="verification">Verification</SelectItem>
                  <SelectItem value="share">Share</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openDetails(item)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getFileIcon(item.fileType)}
                      {getActionIcon(item.actionType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date} at {item.time}
                        </span>
                        {item.recipient && (
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {item.recipient.length > 20 ? `${item.recipient.slice(0, 20)}...` : item.recipient}
                          </span>
                        )}
                        {item.verifier && (
                          <span className="flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            {item.verifier}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        {item.status === "Rejected" && (
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Resend
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedItem && getFileIcon(selectedItem.fileType)}
              {selectedItem?.name}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                <TabsTrigger value="logs">Activity Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Action Type</label>
                    <div className="flex items-center gap-2 mt-1">
                      {getActionIcon(selectedItem.actionType)}
                      <span>{selectedItem.actionType}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedItem.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date & Time</label>
                    <p className="mt-1">
                      {selectedItem.date} at {selectedItem.time}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">File Size</label>
                    <p className="mt-1">{selectedItem.size}</p>
                  </div>
                  {selectedItem.recipient && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">Recipient</label>
                      <p className="mt-1 font-mono text-sm break-all">{selectedItem.recipient}</p>
                    </div>
                  )}
                  {selectedItem.verifier && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">Verifier</label>
                      <p className="mt-1">{selectedItem.verifier}</p>
                    </div>
                  )}
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Document Hash</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Hash className="h-4 w-4" />
                      <p className="font-mono text-sm break-all">{selectedItem.hash}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="metadata" className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Original Name</label>
                    <p className="mt-1">{selectedItem.metadata.originalName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Uploaded By</label>
                    <p className="mt-1 font-mono text-sm">{selectedItem.metadata.uploadedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Verification Method</label>
                    <p className="mt-1">{selectedItem.metadata.verificationMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Trust Score</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${selectedItem.metadata.trustScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{selectedItem.metadata.trustScore}%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="logs" className="space-y-4">
                <div className="space-y-3">
                  {selectedItem.logs.map((log, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                      <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{log.action}</span>
                          <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

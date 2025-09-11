import { Send, Download, CheckCircle, Clock, AlertTriangle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TransactionCardProps {
  type: "send" | "receive"
  token: string
  amount: string
  recipient?: string
  sender?: string
  status: "confirmed" | "pending" | "failed"
  riskLevel: "low" | "moderate" | "high"
  eta: string
  timestamp: string
}

export function TransactionCard({
  type,
  token,
  amount,
  recipient,
  sender,
  status,
  riskLevel,
  eta,
  timestamp,
}: TransactionCardProps) {
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

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            {type === "send" ? (
              <Send className="h-4 w-4 text-primary" />
            ) : (
              <Download className="h-4 w-4 text-primary" />
            )}
          </div>
        </div>
        <div>
          <div className="font-medium">
            {type === "send" ? "Sent" : "Received"} {amount} {token}
          </div>
          <div className="text-sm text-muted-foreground">
            {type === "send" ? `To: ${recipient}` : `From: ${sender}`} • {timestamp}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {getRiskBadge(riskLevel)}
        <div className="text-right">
          <div className="text-sm font-medium capitalize">{status}</div>
          <div className="text-xs text-muted-foreground">ETA: {eta}</div>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  )
}

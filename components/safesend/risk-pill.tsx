import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface RiskPillProps {
  score: number
  level: "low" | "moderate" | "high"
  confidence?: number
  showDetails?: boolean
}

export function RiskPill({ score, level, confidence = 0.8, showDetails = false }: RiskPillProps) {
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

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "moderate":
        return <Info className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className={`${getRiskColor(level)} flex items-center gap-1`}>
          {getRiskIcon(level)}
          {level.toUpperCase()} RISK
        </Badge>
        <div className="text-right">
          <div className="text-2xl font-bold">{score}/100</div>
          <div className="text-xs text-muted-foreground">Risk Score</div>
        </div>
      </div>

      {showDetails && (
        <>
          <Progress value={score} className="h-2" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Confidence: {Math.round(confidence * 100)}%</p>
          </div>
        </>
      )}
    </div>
  )
}

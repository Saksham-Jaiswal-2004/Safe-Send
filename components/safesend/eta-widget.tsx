import { Clock } from "lucide-react"

interface EtaWidgetProps {
  predictedSeconds: number
  confidence?: number
  showChart?: boolean
}

export function EtaWidget({ predictedSeconds, confidence = 0.8, showChart = false }: EtaWidgetProps) {
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-2xl font-bold text-primary">{formatTime(predictedSeconds)}</span>
        </div>
        <p className="text-sm text-muted-foreground">Estimated arrival ({Math.round(confidence * 100)}% confidence)</p>
      </div>

      {showChart && (
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Min: {formatTime(Math.floor(predictedSeconds * 0.7))}</span>
            <span>Max: {formatTime(Math.floor(predictedSeconds * 1.5))}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${confidence * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

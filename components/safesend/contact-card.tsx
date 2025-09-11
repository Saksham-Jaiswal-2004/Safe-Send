"use client"

import { Users, Copy, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ContactCardProps {
  name: string
  address: string
  alias?: string
  trusted: boolean
  lastUsed: string
  transactionCount: number
}

export function ContactCard({ name, address, alias, trusted, lastUsed, transactionCount }: ContactCardProps) {
  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    console.log("[v0] Address copied:", address)
  }

  return (
    <div className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-sm font-bold">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{name}</h3>
            {alias && <p className="text-sm text-primary font-medium">{alias}</p>}
          </div>
        </div>
        {trusted ? (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
            Trusted
          </Badge>
        ) : (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            Unknown
          </Badge>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-muted-foreground">
            {address.slice(0, 10)}...{address.slice(-8)}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyAddress}>
            <Copy className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Last used: {lastUsed}</span>
          <span>{transactionCount} transactions</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
          <Send className="h-4 w-4" />
          Send
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Users className="h-4 w-4" />
          Edit
        </Button>
      </div>
    </div>
  )
}

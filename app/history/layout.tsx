"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Shield,
  Send,
  Download,
  Users,
  History,
  Settings,
  Bell,
  ChevronDown,
  Menu,
  X,
  Home,
  HelpCircle,
  LogOut,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from '../../context/walletContext'
import { fetchNews } from "@/utils/api";

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedNetwork, setSelectedNetwork] = useState("Avalanche")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { address, isConnected, chainId, userData } = useWallet();

  const [news, setNews] = useState<any[]>([]);
  const [error, setError] = useState("");

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", active: false },
    { icon: Send, label: "Send", href: "/send", active: false },
    // { icon: Download, label: "Receive", href: "/receive", active: false },
    { icon: Users, label: "Address Book", href: "/address-book", active: false },
    { icon: Users, label: "Contract Analysis", href: "/contractAnalysis", active: false },
    { icon: History, label: "History", href: "/history", active: true },
    { icon: Settings, label: "Settings", href: "/settings", active: false },
  ]

  // useEffect(() => {
  //   async function loadNews() {
  //     try {
  //       const data = await fetchNews();
  //       setNews(data); 
  //       console.log("News: ",data)
  //     } catch (err: any) {
  //       setError(err.message);
  //       console.log("Error: ", err.message)
  //     }
  //   }
  //   loadNews();
  // }, []);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-screen bg-card border-r border-border/40 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <a href="/">
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold">SafeSend AI</span>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        </a>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              asChild
            >
              <a href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Trust Chain</span>
              </div>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">
                  Open Source
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Privacy First
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-30 bg-background/95">
          <div className="px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">SafeSend AI</h1>
                <p className="text-sm text-muted-foreground">Crypto transaction safety layer</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Network Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {selectedNetwork}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedNetwork("Ethereum")}>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Ethereum
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedNetwork("Polygon")}>
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Polygon
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedNetwork("Arbitrum")}>
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    Arbitrum
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              {/* <Button variant="outline" size="icon" className="relative bg-transparent">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button> */}

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    {isConnected ? 
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Connected</span>
                    </div>
                    : ""}
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">0x</AvatarFallback>
                    </Avatar>
                    <span className="font-mono text-sm">{address?.slice(0,10)}...</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-scroll mt-2">{children}</div>
      </div>
    </div>
  )
}
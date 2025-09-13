import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import Providers from './providers'
import { WalletProvider } from '../context/walletContext'
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SafeSend AI - Crypto that cares before it confirms",
  description: "A privacy-first safety layer that flags risky transfers and predicts how long they'll take.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${inter.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
              <Providers>
                <WalletProvider>
                  {children}
                </WalletProvider>
              </Providers>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

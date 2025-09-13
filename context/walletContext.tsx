'use client'

import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import { useAccount, useChainId } from 'wagmi'

interface WalletContextValue {
  address?: string
  chainId?: number
  isConnected: boolean
  userData?: any
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

  // Example of also loading user data from your backend:
  const [userData, setUserData] = useState<any>()

  useEffect(() => {
    if (isConnected && address) {
      // Fetch user data from backend
      fetch(`/api/user/${address}`)
        .then(res => res.json())
        .then(setUserData)
    } else {
      setUserData(undefined)
    }
  }, [isConnected, address])

  return (
    <WalletContext.Provider
      value={{ address, isConnected, chainId, userData }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) throw new Error('useWallet must be used inside WalletProvider')
  return context
}
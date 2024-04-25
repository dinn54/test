'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export interface IWeb3Wallet {
  address: string | null
  signer: ethers.providers.JsonRpcSigner | null
  provider: ethers.providers.JsonRpcProvider | null
  chain: number | null
}

const useWallet = () => {
  const initWeb3Wallet = {
    address: null,
    signer: null,
    provider: null,
    chain: null,
  }

  const [Web3Wallet, setWeb3Wallet] = useState<IWeb3Wallet>(initWeb3Wallet)

  const connectWallet = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(`Connect Wallet Activated`)
    const { ethereum } = window
    // Metmask Not Installed
    if (!ethereum) {
      console.log(`wallet is not installed`)
      return
    }
    try {
      const accounts: string[] = await provider.send('eth_requestAccounts', [])
      if (accounts.length > 0) {
        const signer = provider.getSigner()
        const { chainId } = await provider.getNetwork()

        localStorage.setItem('chain_id', chainId.toString())
        localStorage.setItem('wallet_con', 'true')

        setWeb3Wallet({
          address: accounts[0],
          signer: signer,
          provider: provider,
          chain: chainId,
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const disconnect = () => {
    localStorage.removeItem('wallet_con')
  }

  const handleAddressChange = (newAddress: string) => {
    setWeb3Wallet({
      ...Web3Wallet,
      address: newAddress,
    })
  }

  const handleNetworkChange = (newNetwork: number) => {
    setWeb3Wallet({
      ...Web3Wallet,
      chain: newNetwork,
    })
    localStorage.setItem('chain_id', newNetwork.toString())
  }

  // Check Account Changed
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return
    // Handle Account Changed
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      console.log(`Account Changed : ${accounts}`)
      handleAddressChange(accounts[0])
    })

    // Handle Network Chnaged
    window.ethereum.on('networkChanged', (network: number) => {
      console.log(`Network Changed : ${network}`)
      handleNetworkChange(network)
    })

    return () => {
      window.ethereum.removeAllListeners()
    }
  }, [Web3Wallet])

  return {
    connectWallet,
    disconnect,
    Web3Wallet,
  }
}

export default useWallet

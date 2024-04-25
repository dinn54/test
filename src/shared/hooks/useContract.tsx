'use client'
import { useState, useEffect } from 'react'
import { Contract, ethers } from 'ethers'

type ISupportNetwork = 'polygon' | 'binance'
type ISupportEnvironment = 'dev' | 'stg' | 'prod'

export interface IContractFactoryEnvironments {
  dev: Contract | null
  stg: Contract | null
  prod: Contract | null
}

export interface IPolygonTokens {
  cvtx: IContractFactoryEnvironments
  fdx: IContractFactoryEnvironments
}

// Interface is for services contracts
export interface IPolygonServices {
  clingswap: {
    vault: IContractFactoryEnvironments
    vault_router: IContractFactoryEnvironments
  }
  cvnft: {
    token_router: IContractFactoryEnvironments
  }
  fandomshop: {
    fandomshop: IContractFactoryEnvironments
  }
  helpers: {
    cling_event: IContractFactoryEnvironments
  }
}

interface IContractFactory {
  tokens: IPolygonTokens
  services: IPolygonServices
}

const useContract = () => {
  const [ContractFactory, setContractFactory] = useState<IContractFactory | null>(null)

  useEffect(() => {
    // Get Current Network,
    const environment = localStorage.getItem('environment')
    const network = localStorage.getItem('chain_id')
  }, [])

  return {
    ContractFactory,
  }
}

export default useContract

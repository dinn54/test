import { Contract, ethers } from 'ethers'

/**
 * Contract Information Types
 */
export interface IInfoEnvironments {
  dev: string | null
  stg: string | null
  prod: string
}

export interface IContractInformation {
  address: IInfoEnvironments
  abi: any
}

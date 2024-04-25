import { Contract, ethers } from 'ethers'

/**
 * Contract Information Types
 */
export interface IInfoEnvironments {
  dev: string | null
  stg: string | null
  prod: string | null
}

export interface IContractInformation {
  address: IInfoEnvironments
  abi: Object
}

'use client'
import { Factory, useState } from "react"
import EventTransfer from "./eventTransfer"
import { Contract, ethers } from "ethers";
import { CVTX_INFO, FDX_INFO } from "@/constants/contracts/polygon/tokens";
import { CVNFT_TOKENROUTER_INFO } from "@/constants/contracts/polygon/cvnft";
import { CLINGEVENT_INFO } from "@/constants/contracts/polygon/helper";
import { clingEventProviderContract, cvtxProviderContract, fandomProviderContract, tokenRouterProviderContract } from "./contractProvider";

interface ContractFactory{
    fandomTokenContract: Contract;
    cvtxTokenContract: Contract;
    tokenRouterContract: Contract;
    clingEventContract: Contract;
}
const helpher = () =>{

    const Factory :ContractFactory = {
        fandomTokenContract: fandomProviderContract,
        cvtxTokenContract: cvtxProviderContract,
        tokenRouterContract: tokenRouterProviderContract,
        clingEventContract: clingEventProviderContract
    }
    const [ContractFactory, setContractFactory] = useState<ContractFactory>(Factory);

    return (
        <EventTransfer ContractFactory={ContractFactory}/>
    )
}

export default helpher
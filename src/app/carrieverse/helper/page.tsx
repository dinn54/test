'use client'
import { Factory, useState } from "react"
import EventTransfer from "./eventTransfer"
import { Contract, ethers } from "ethers";
import { CVTX_INFO, FDX_INFO } from "@/constants/contracts/polygon/tokens";
import { CVNFT_TOKENROUTER_INFO } from "@/constants/contracts/polygon/cvnft";
import { CLINGEVENT_INFO } from "@/constants/contracts/polygon/helper";
import { createContract } from "./createContract";

interface ContractFactory{
    cvtxTokenContract: Contract;
    fandomTokenContract: Contract;
    tokenRouterContract: Contract;
    clingEventContract: Contract;
}
const helpher = () =>{
    const contracts = createContract();
    const Factory :ContractFactory = {
        cvtxTokenContract: contracts[0],
        fandomTokenContract: contracts[1],
        tokenRouterContract: contracts[2],
        clingEventContract: contracts[3]
    }
    const [ContractFactory, setContractFactory] = useState<ContractFactory>(Factory);

    return (
        <EventTransfer Factory={ContractFactory}/>
    )
}

export default helpher

import { CVNFT_TOKENROUTER_INFO } from "@/constants/contracts/polygon/cvnft";
import { CLINGEVENT_INFO } from "@/constants/contracts/polygon/helper";
import { CVTX_INFO, FDX_INFO } from "@/constants/contracts/polygon/tokens";
import { Contract, ethers } from "ethers";

export const createContract = () =>{
    const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
    const cvtxProviderContract = new Contract(
        CVTX_INFO.address.prod,
        CVTX_INFO.abi,
        signer
    );
    
    const fandomProviderContract  = new Contract(
        FDX_INFO.address.prod,
        FDX_INFO.abi,
        signer
    );
    
    const tokenRouterProviderContract  = new Contract(
        CVNFT_TOKENROUTER_INFO.address.prod,
        CVNFT_TOKENROUTER_INFO.abi,
        signer
    );
    
    const clingEventProviderContract  = new Contract(
        CLINGEVENT_INFO.address.prod,
        CLINGEVENT_INFO.abi,
        signer
    );

    return [cvtxProviderContract, fandomProviderContract, tokenRouterProviderContract, clingEventProviderContract]
}


import { CVNFT_TOKENROUTER_INFO } from "@/constants/contracts/polygon/cvnft";
import { CLINGEVENT_INFO } from "@/constants/contracts/polygon/helper";
import { CVTX_INFO, FDX_INFO } from "@/constants/contracts/polygon/tokens";
import { Contract, ethers } from "ethers";

export const createContract = () =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const cvtxProviderContract = new Contract(
        CVTX_INFO.address.stg!,
        CVTX_INFO.abi,
        signer
    );
    
    const fandomProviderContract  = new Contract(
        FDX_INFO.address.stg!,
        FDX_INFO.abi,
        signer
    );
    
    const tokenRouterProviderContract  = new Contract(
        CVNFT_TOKENROUTER_INFO.address.prod,
        CVNFT_TOKENROUTER_INFO.abi,
        signer
    );
    
    const clingEventProviderContract  = new Contract(
        CLINGEVENT_INFO.address.stg!,
        CLINGEVENT_INFO.abi,
        signer
    );

    return [cvtxProviderContract, fandomProviderContract, tokenRouterProviderContract, clingEventProviderContract]
}

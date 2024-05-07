import { txLogsApi } from "@/api/auth"
import { AccountState, ChainNetworkState } from "@/app/states/account"
import { useRecoilState } from "recoil"

const txLogRecorder = async(actionName: string, txHash: string) =>{
    const [account, setAccount] = useRecoilState(AccountState)
    const [network, setNetwork] = useRecoilState(ChainNetworkState);
    const eoa = account![0];

    try{
        const res = await txLogsApi(eoa, actionName,network, txHash)
    }catch(e:any){
        try{
            const res = await txLogsApi(eoa, actionName,network, txHash)
        }catch(e: any){
            try{
                const res = await txLogsApi(eoa, actionName,network, txHash)

            }catch(e: any){
                //slack or Email 호출
            }
        }
    }
}

export default txLogRecorder
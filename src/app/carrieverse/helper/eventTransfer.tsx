'use client'
import { Button } from "@/shared/shadcn/ui/button"
import { Input } from "@/shared/shadcn/ui/input"
import { Label } from "@/shared/shadcn/ui/label"
import { useEffect, useState } from "react";
import CSVReader from 'react-csv-reader'
import { Contract, Signer, ethers,  } from "ethers";
import useToastHook from "@/shared/hooks/useToastHook";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/shadcn/ui/table";
import { useRecoilState } from "recoil";
import { AccountState, ChainNetworkState, SignerState } from "@/app/states/account";
import ConnectMetamask from "@/features/metamask/connectMetamask";
import DisconnectMetamask from "@/features/metamask/disconnectMetamask";
import GetAccount from "@/features/metamask/getAccount";
import txLogRecorder from "@/app/hooks/components/txLogRecorder";
import { CLINGEVENT_INFO } from "@/constants/contracts/polygon/helper";

interface ContractFactory{
    cvtxTokenContract: Contract;
    fandomTokenContract: Contract;
    tokenRouterContract: Contract;
    clingEventContract: Contract;
}

interface ITransferListProps{
    to: string;
    amount: BigInt
}
interface ITransferListData{
    to: string;
    amount: BigInt
}



const handleCSVError = () =>{

}

// 0. 어떠한 토큰을 보낼지 모르기 때문에 토큰컨트랙트를 가져옴
// 1. csv 파일 파서
// 2. 전송할 토큰, 총량을 정해서 전송하기 위한 작업
// 2-1. allowance로 보낼 수 있는 잔액 확인
// 3-1. 부족하다면 Approve로 할당하고 토큰 전송
// 4-1. 전송하고 나면 최근 전송 내역에 출력

const EventTransfer = ({Factory}: {Factory: ContractFactory})=>{

    const [Account, setAccount] = useRecoilState(AccountState);
    const [Network, setNetwork] = useRecoilState(ChainNetworkState);
    

    const [totalSendAmount, setTotalSendAmount] = useState<number>(0);
    const [TransferList, setTransferList] = useState<ITransferListData[]>([]);
    const [AllowedBalance, setAllowedBalance] = useState<number>(0);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [duplicateEOA, setDuplicateEOA] = useState<string[]>([]);
    
    const {handleSuccess, handleFail} = useToastHook();


    useEffect(()=>{
        ConnectMetamask()
        
        checkCVTXallowance()

        console.log(Account, Network)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        signer.getAddress().then((address) => {
            setAccount(address)
        })

        const balance = provider.getSigner().getBalance().then((value)=>{
            return ethers.utils.formatUnits(value, "ether");
        })
        balance.then(console.log);
        console.log(Factory.clingEventContract)
    }, [Account])

    const checkCVTXallowance = async ()=>{
        try {
            console.log("check",Account, Factory.clingEventContract.address)
            console.log(`Account : ${Account}`);
            console.log(Factory.cvtxTokenContract);
            const res = await Factory.cvtxTokenContract.functions.allowance(Account, Factory.clingEventContract.address);
            console.log(Number(BigInt(res)));
            setAllowedBalance(Number(BigInt(res)));
            console.log(`Allowance response : `, BigInt(res.toString()));
        }catch(e:any){
            console.log(e);
        }
    }


    const approveCVTX = async () =>{
        if ( totalSendAmount === 0){
            handleFail("입력값 오류", "0이 넘는 입력값을 가져야 합니다")
            return;
        }
        const amountToWei = ethers.utils.parseEther(totalSendAmount.toString());
        console.log("amountTowei", amountToWei)

        try{
            const estimatedGas = await Factory.cvtxTokenContract.estimateGas.approve(Factory.clingEventContract.address, amountToWei);
            console.log("estimateGas", ethers.utils.formatUnits(estimatedGas,"ether"));
            const tx = await Factory.cvtxTokenContract.approve(Factory.clingEventContract.address, amountToWei, {
                gasLimit: estimatedGas
            });
            console.log("tx", tx)
            setAllowedBalance(totalSendAmount);
            // txLogRecorder("CVTX-Approve", tx.hash)
            handleSuccess("approve success", tx.hash)
            
        }catch(e: any){
            // Test를 위한 임시 allowance
            console.log("Fail Approve", AllowedBalance);
            handleFail("approve Fail", e);
        }
    }

    const sendERC20BatchTransfer = async () => {
        try {
            const ESTGas = await Factory.clingEventContract.estimateGas.doEventTransfer(TransferList);
            console.log("ESTGas", ethers.utils.formatUnits(ESTGas));
            // 불필요한 가스 소비를 막기 위해 Callstatic으로 정상적인 트랜잭션요청인지 확인
            await Factory.clingEventContract.callStatic.doEventTransfer(TransferList);
            console.log("error after callstatic");
            const tx = await Factory.clingEventContract.functions.doEventTransfer(TransferList, {
                gasLimit: ESTGas
            });
            console.log(tx);

            await tx.wait();
            console.log("TX success-------------------")
            // Tx를 날렸는데 IERC20의 Allowance를 소비하지 않음..
            const res = await Factory.cvtxTokenContract.functions.allowance(Account?.at(0), Factory.clingEventContract.address);
            console.log("Show my Allowance after Tx success", ethers.utils.formatUnits(BigInt(res)));

            handleSuccess('ERC20 대량 전송', tx.hash);
        } catch (e : any) {
            if (e.reason === "ClingEvent: NOT_TRANSFER_ADMIN") {
                handleFail('ERC20 대량 전송', e.reason);
            } else {
                handleFail('ERC20 대량 전송', e.message)
            }
            
        } finally {
            // 초기화
            setTransferList([]);
            setTotalSendAmount(0);
            setDuplicateEOA([]);
            setAllowedBalance(0);
            setSelectedFileName(null);
        }
    };

    const handleCSVFile = (data: ITransferListProps[], fileInfo: any, originalFile: any)=>{
        let result: ITransferListData[] = [];
        let totalSendAmount: number = 0;
        let duplicateTo : string[] = [];

        data.forEach((item)=>{
            totalSendAmount += parseInt(item.amount.toString())

            result.push({
                to: item.to,
                amount: item.amount
            })
            result.forEach((item, index)=>{
                const isDuplicate = result.slice(index + 1).some((original) => original.to === item.to);

                if (isDuplicate && !duplicateTo.includes(item.to)) {
                    duplicateTo.push(item.to);
                }
            })
        })
        

        console.log(result, duplicateEOA);
        setTotalSendAmount(totalSendAmount);
        setDuplicateEOA(duplicateTo)
        checkCVTXallowance()
        setSelectedFileName(fileInfo.name);
        setTransferList(result);
        
    }
    
    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header : any) => header.toLowerCase().replace(/\W/g, "_")
    };

    return (
        <div className="">
            <div className='m-10 p-5 border-green-900 border rounded'>
            <Label>Event Transfer</Label> 
            <div className='my-2 flex justify-between'>
                <div className='flex'>
                    <div className="m-5 flex flex-col content-center justify-between" >
                    <Label className="">선택된 파일 - </Label>
                    <Label className="">{selectedFileName}</Label><br/>
                    <CSVReader
                        cssClass="csv-reader-input"
                        label="CSV 파일을 올려주세요"
                        onFileLoaded={handleCSVFile}
                        onError={handleCSVError}
                        parserOptions={papaparseOptions}
                        inputId="ObiWan"
                        inputName="ObiWan"
                        inputStyle={{
                            backgroundColor: 'red',
                            position: 'absolute',
                            left: 0,
                            width: '100%',
                            cursor: "Account" ? 'pointer' : 'not-allowed',
                            opacity: 0,
                        }}
                    />
                    </div>
                    <div className='flex flex-col'>

                        <Label className='ml-4 mt-6'>전송 토큰 총 량: {totalSendAmount} </Label>
                        <Label className='ml-4 mt-3'>전송토큰: CVTX</Label>
                        <Label className='ml-4 mt-3'>전송 유저 수: {TransferList?.length- duplicateEOA.length}</Label>
                        <Label className='ml-4 mt-3'>중복 유저 수: {duplicateEOA.length}</Label>
                        <Label className='ml-4 mt-3'>첫번째 유저: {TransferList[0]?.to}</Label>
                        <Label className='ml-4 mt-3'>마지막 유저: {TransferList[TransferList.length-1]?.to}</Label>
                    </div>
                </div>
                <Button
                    className='flex m-5'
                    variant={'outline'}
                    disabled={false}
                    onClick={ AllowedBalance<totalSendAmount? ()=>approveCVTX():()=>sendERC20BatchTransfer()}
                >   
                {AllowedBalance<totalSendAmount? "Approve" : "전송하기"}
                </Button>
                </div>
            </div>


            <div className='m-10 p-5 border-green-900 border rounded'>
            <Label className=''>최근 전송 내역</Label>
            <div className='my-2'>
            <Table>
                <TableCaption> Total : </TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>TX-HASH</TableHead>
                    <TableHead className="text-right">USER-NAME</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    {TransferList.map((list, key)=>(
                        <TableCell key={key}>{list.to}</TableCell>
                    ))}
                </TableRow>
                </TableBody>
            </Table>
                </div>
            </div>
    
        </div>
    )
}

export default EventTransfer
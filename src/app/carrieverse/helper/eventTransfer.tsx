'use client'
import { Button } from "@/shared/shadcn/ui/button"
import { Input } from "@/shared/shadcn/ui/input"
import { Label } from "@/shared/shadcn/ui/label"
import { useEffect, useState } from "react";
import CSVReader from 'react-csv-reader'
import { Contract, ContractFactory, ethers } from "ethers";
import useToastHook from "@/shared/hooks/useToastHook";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/shadcn/ui/table";
import { useRecoilState } from "recoil";
import { AccountState, ChainNetworkState } from "@/app/states/account";


interface Props {
    ContractFactory: {
        fandomTokenContract: Contract;
        cvtxTokenContract: Contract;
        tokenRouterContract: Contract;
        clingEventContract: Contract;
    } | null;
}

interface ITransferListProps{
    to: string;
    amount: number
}
interface ITransferListData{
    to: string;
    amount: number
}


const handleCSVError = () =>{

}

// 0. 어떠한 토큰을 보낼지 모르기 때문에 토큰컨트랙트를 가져옴
// 1. csv 파일 파서
// 2. 전송할 토큰, 총량을 정해서 전송하기 위한 작업
// 2-1. allowance로 보낼 수 있는 잔액 확인
// 3-1. 부족하다면 Approve로 할당하고 토큰 전송
// 4-1. 전송하고 나면 최근 전송 내역에 출력


const Helpers = ({ContractFactory}: Props)=>{
    const [Account, setAccount] = useRecoilState(AccountState);
    const [Network, setNetwork] = useRecoilState(ChainNetworkState);
    

    const [totalSendAmount, setTotalSendAmount] = useState<number>(0);
    const [TransferList, setTransferList] = useState<ITransferListData[]>([]);
    const [AllowedBalance, setAllowedBalance] = useState("0.00");
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [duplicateEOA, setDuplicateEOA] = useState<string[]>([]);
    
    const {handleSuccess, handleFail} = useToastHook();

    useEffect(()=>{
        if (Account){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log(signer)
        }
    })


    const checkAllowanceCVTX = async() =>{
        try{
            const allowance = await ContractFactory?.cvtxTokenContract.allowance("",ContractFactory.clingEventContract.target)
            const result = ethers.utils.formatUnits(allowance.toString(), "ether");
            console.log(result);
        }catch (e:any){
            console.log(`Check Allowance Error`);
            console.log(e);
            handleFail("Allowance 에러", e)
        }
        
    }

    const approveCVTX = async () =>{
        if ( totalSendAmount === 0){
            handleFail("입력값 오류", "0이 넘는 입력값을 가져야 합니다")
            return;
        }
        const amountToWei = ethers.utils.parseEther(totalSendAmount.toString());

        try{
            const estimatedGas = await ContractFactory?.cvtxTokenContract.approve.estimateGas(ContractFactory.clingEventContract.target, amountToWei);
            const tx = await ContractFactory?.cvtxTokenContract.approve(ContractFactory.clingEventContract.target, amountToWei, {
                gasLimit: estimatedGas
            });
            handleSuccess("approve success", tx.hash)
            
        }catch(e: any){
            handleFail("approve Fail", e);
        }
    }

    const handleCSVFile = (data: ITransferListProps[], fileInfo: any, originalFile: any)=>{
        let result: ITransferListData[] = [];
        let totalSendAmount: number = 0;
        let duplicateTo : string[] = [];

        data.forEach((item)=>{
            totalSendAmount += item.amount;
            let bigintAmount = ethers.utils.parseEther(item.amount.toString());

            result.push({
                to: item.to,
                amount: Number(bigintAmount)
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

        checkAllowanceCVTX()
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
                    <div className="m-5" >
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
                        <Label className='ml-4 mt-3'>전송 유저 수: </Label>
                        <Label className='ml-4 mt-3'>첫번째 유저: </Label>
                        <Label className='ml-4 mt-3'>마지막 유저: </Label>
                    </div>
                </div>
                <Button
                    className='flex m-5'
                    variant={'outline'}
                    disabled={false}
                    > Approve | 전송하기
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
                    {TransferList.map((list)=>(
                        <TableCell>{list.to}</TableCell>
                    ))}
                </TableRow>
                </TableBody>
            </Table>
                </div>
            </div>
    
        </div>
    )
}

export default Helpers
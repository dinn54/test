'use client'
import { vaultDetailApi } from "@/api/auth";
import { Button } from "@/shared/shadcn/ui/button"
import { Label } from "@/shared/shadcn/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/shadcn/ui/select"
import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";

interface PoolInfo{
    poolId: number;
    address: string;
}
type poolDetail={
    pool_id: number;
    pool_address: string;
    pool_cvtx_amount: string;
    staked_token: string;
    reward_token: string;
    lp_token: string
    lock_duration: string;
    reward_second: string;
    start_timestamp: string;
    end_timestamp: string;
    max_pool_limit: string;
    max_account_limit: string;
}

type VaultFormProps = {
    pools: PoolInfo[];
    selectedPool: PoolInfo;
    handleSelectPool: (value: string) => void;
  }

const VaultForm: React.FC<VaultFormProps> =({pools, selectedPool, handleSelectPool})=> {
    const [currentPool, setCurrentPool] = useState<poolDetail>()
    const dataTypeChange = (data: string | undefined)=>{
        if (data===undefined) return null;
        const toBigInt = BigNumber.from(data);
        const value = formatUnits(toBigInt, 18);
        return value;
    }

    const callVaultDetail = async(env: string, poolid: number)=>{
        try{
            const res = await vaultDetailApi(env, poolid)
            setCurrentPool(res.payload)
        }catch(e){
            console.log(e);
        }
    }


    return (
      <div className='m-10 p-5 border-green-900 border rounded'>
      <Label>Cling-Defi Vault</Label> 
      <div className='my-2'>
      <div className='flex'>

        <Select onValueChange={(value)=>{
            handleSelectPool(value);
            callVaultDetail('prod', selectedPool.poolId)
            }}>
          <SelectTrigger className="selectTrigger">
            <SelectValue placeholder="Department(Select)"></SelectValue>
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
                {pools.map((pool, idx)=>(
                    <SelectItem key={idx} className="border-2 grow" value={`${pool.poolId} ${pool.address}`}>
                        {/* 풀 3개 등록(동적) */}
                        <div className='flex justify-between border-2'>
                            <div className='border-2 '>Pool ID : {pool.poolId} </div>
                            <div className='border-2 '>{pool.address}</div>
                        </div>
                    </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className='mx-5'
          variant={'outline'}
          disabled={false}
          >Pool에 리워드 입금
        </Button>
        </div>
        <div className='flex flex-col'>
          <Label className='ml-4 mt-6'>스테이킹 토큰: {currentPool?.staked_token}</Label>
          <Label className='ml-4 mt-3'>리워드 토큰: {currentPool?.reward_token}</Label>
          <Label className='ml-4 mt-3'>초당 토큰 당 토큰: {currentPool?.reward_second}</Label>
          <Label className='ml-4 mt-3'>풀 입금 제한량: {dataTypeChange(currentPool?.max_pool_limit)}</Label>
          <Label className='ml-4 mt-3'>지갑 입금 제한량: {dataTypeChange(currentPool?.max_account_limit)}</Label>
          <Label className='ml-4 my-3'>Pool 내 CVTX 잔량: {dataTypeChange(currentPool?.pool_cvtx_amount)}</Label>
        </div>
      </div>
      </div>
    )
}

export default VaultForm
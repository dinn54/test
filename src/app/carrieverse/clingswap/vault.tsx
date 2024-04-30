'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/shadcn/ui/select'
import { Label } from '@/shared/shadcn/ui/label'
import { SelectGroup } from '@radix-ui/react-select';
import { Button } from '@/shared/shadcn/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/shared/shadcn/ui/table';
import VaultForm from './vaultForm';
import ConnectedContract from './connectedContract';
import { allVaultsApi } from '@/api/auth';

type PoolInfo ={
  poolId: number;
  address: string;
}

const Vault = () => {
  const [pools, setPools] = useState<PoolInfo[]>([]);
  const [selectedPool, setSelectedPool] = useState<PoolInfo>({poolId: 0, address: ''});

  const handleSetSelectedPool = (value: string)=>{
    const poolArr = value.split(' ');
    setSelectedPool({poolId: parseInt(poolArr[0]), address: poolArr[1]});
  }
  const callAllVault = async()=>{
    try {
      const res = await allVaultsApi('prod');
      const poolListPid = res.payload.pool;
      let poolList: PoolInfo[] = [];
      for (let i=0;i<poolListPid.length;i++){
       poolList.push({
        poolId: poolListPid[i].pid,
        address: poolListPid[i].address,
       })
      }
      setPools(poolList)
    }catch(e){
      console.log("vault!", e)
    }
  }
  useEffect(()=>{
    callAllVault();
  },[])


  return (
    <div className="flex flex-col content-between">
      <VaultForm pools={pools} selectedPool={selectedPool} handleSelectPool={handleSetSelectedPool}/>
      <ConnectedContract selectedPool={selectedPool}/>
    </div>
  )
  
}

export default Vault

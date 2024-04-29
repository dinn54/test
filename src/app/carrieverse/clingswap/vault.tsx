'use client'
import React, { useState } from 'react'
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

type PoolInfo ={
  poolId: string;
  address: string;
}
export function Vault() {

  const [selectedPool, setSelectedPool] = useState("")
  const pool1: PoolInfo = {poolId: "1", address: "0x0000000000000000"};

  const VaultForm =()=> {


    return (
      <div className='m-10 p-5 border-green-900 border rounded'>
      <Label>Cling-Defi Vault</Label> 
      <div className='my-2'>
      <div className='flex'>

        <Select onValueChange={(value)=>{setSelectedPool(value)}}>
          <SelectTrigger className="selectTrigger">
            <SelectValue placeholder="Department(Select)"></SelectValue>
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectItem className="border-2 grow" value="Pool1 Info">
                {/* 풀 3개 등록(동적?) */}
                <div className='flex justify-between border-2'>
                  <div className='border-2 '>Pool ID : {pool1.poolId} </div>
                  <div className='border-2 '>{pool1.address}</div>
                </div>
              </SelectItem>
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
          <Label className='ml-4 mt-6'>스테이킹 토큰: </Label>
          <Label className='ml-4 mt-3'>리워드 토큰: </Label>
          <Label className='ml-4 mt-3'>초당 토큰 당 토큰: </Label>
          <Label className='ml-4 mt-3'>풀 입금 제한량: </Label>
          <Label className='ml-4 mt-3'>지갑 입금 제한량: </Label>
          <Label className='ml-4 mt-3'>스테이킹 토큰: </Label>
          <Label className='ml-4 my-3'>Pool 내 CVTX 잔량: </Label>
        </div>
      </div>
      </div>
    )
    
  }
  
  const ConnectedContract = () => {

    return (
      <div className='m-10 p-5 border-green-900 border rounded'>
      <Label className=''>관련 컨트랙트 정보</Label>
      <div className='my-2'>
      <Table>
        <TableCaption>// 관련 컨트랙트 정보 //</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Index</TableHead>
            <TableHead>컨트랙트 이름</TableHead>
            <TableHead>컨트랙트 주소</TableHead>
            <TableHead className="text-right">Abi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>VaultRouter</TableCell>
            <TableCell>0x</TableCell>
            <TableCell className="text-right">[...]</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        </div>
      </div>
    )
  }


    return (
      <div className="flex flex-col content-between">
        <VaultForm/>
        <ConnectedContract />
      </div>
    )
  
}

export default Vault

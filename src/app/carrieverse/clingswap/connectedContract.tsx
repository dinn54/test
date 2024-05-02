'use client'
import { Label } from "@/shared/shadcn/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/shadcn/ui/table"
import React from "react";

interface PoolInfo{
    poolId: number;
    address: string;
}

interface Props{
    selectedPool: PoolInfo;
}


const ConnectedContract: React.FC<Props> = ({selectedPool}) => {
    return (
      <div className='m-10 p-5 border-green-900 border rounded'>
      <Label className=''>관련 컨트랙트 정보</Label>
      <div className='my-2'>
      <Table>
        <TableCaption>Pool {selectedPool.poolId} : {selectedPool.address}</TableCaption>
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

  export default ConnectedContract
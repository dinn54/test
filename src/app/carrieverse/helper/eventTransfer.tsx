'use client'
import DragDropFeature, { InputDragDrop } from "@/app/hooks/dragAndDropHook";
import { Button } from "@/shared/shadcn/ui/button"
import { Input } from "@/shared/shadcn/ui/input"
import { Label } from "@/shared/shadcn/ui/label"
import { useState } from "react";
import {FileUploader} from 'react-drag-drop-files';

interface DragDropProps{
    onChangeFile : (file: File | null)=> void;
    description: string;
}

interface InputDragDropProps{
    onChangeFile: (file: File| null) =>void;
    description: string;
    validExtensions?: string[];
}

const EventTransfer = ()=>{
    const fileTypes = ["css"];
    const [file, setFile] = useState(null);
    const handleFileSelect = (file: File | any) => {
        setFile(file);
    }
    

    return (
        <div className="">
            <div className='m-10 p-5 border-green-900 border rounded'>
            <Label>Event Transfer</Label> 
            <div className='my-2 flex'>
                <div className='flex'>
                    {/* <InputDragDrop
                        onChangeFile={handleFileSelect}
                        description="파일을 올려 주세요"
                        validExtensions={['csv']}
                    ></InputDragDrop> */}
                    {/* <DragDropFeature 
                        onChangeFile={handleFileSelect}
                        description=""
                    ></DragDropFeature> */}
                    <Button
                        className='mx-5'
                        variant={'outline'}
                        disabled={false}
                        >Drag and Drop File here
                    </Button>
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <Label className='ml-4 mt-6'>전송 토큰 총 량: </Label>
                        <Label className='ml-4 mt-3'>전송토큰: </Label>
                        <Label className='ml-4 mt-3'>전송 유저 수: </Label>
                        <Label className='ml-4 mt-3'>첫번째 유저: </Label>
                        <Label className='ml-4 mt-3'>마지막 유저: </Label>
                    </div>
                    <Button
                        className='flex mx-5'
                        variant={'outline'}
                        disabled={false}
                        > Approve | 전송하기
                    </Button>
                </div>
                </div>
            </div>

            <div className='m-10 p-5 border-green-900 border rounded'>
            <Label>최근 전송 내역</Label> 
            <div className='my-2 flex'>
                <div className='flex'>
                    <Button
                        className='mx-5'
                        variant={'outline'}
                        disabled={false}
                        >DropDown File Here
                    </Button>
                </div>
                <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <Label className='ml-4 mt-6'>전송 토큰 총 량: </Label>
                        <Label className='ml-4 mt-3'>전송토큰: </Label>
                        <Label className='ml-4 mt-3'>전송 유저 수: </Label>
                        <Label className='ml-4 mt-3'>첫번째 유저: </Label>
                        <Label className='ml-4 mt-3'>마지막 유저: </Label>
                    </div>
                    <Button
                        className='flex mx-5'
                        variant={'outline'}
                        disabled={false}
                        > Approve | 전송하기
                    </Button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default EventTransfer
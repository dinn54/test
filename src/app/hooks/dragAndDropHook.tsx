import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { Description } from "@radix-ui/react-toast";
import { ChangeEvent, useState } from "react";
import useToastHook from "@/shared/hooks/useToastHook";


interface DragDropProps{
    onChangeFile : (file: File | null)=> void;
    description: string;
}

interface InputDragDropProps{
    onChangeFile: (file: File| null) =>void;
    description: string;
    validExtensions?: string[];
}


export const InputDragDrop = ({
    onChangeFile,
    description="파일 첨부",
    validExtensions = ["*"],
}: InputDragDropProps)=>{
    // toast 선언
    const {handleSuccess, handleFail} = useToastHook();
    
    const isValidExtension = (file: File)=>{
        const fileName = file.name;
        const filenameSplit = fileName.split(".");
        const fileExtension = filenameSplit[filenameSplit.length-1];
        return validExtensions.includes(fileExtension);
    };

    const handleFileChange = (file: File | null) =>{
        if (file && isValidExtension(file)){
            onChangeFile(file);
            handleSuccess("성공", "성공")
        }else{
            //toast
            handleFail("실패", "실패")
            onChangeFile(null);
        }
    }
}

 const DragDropFeature = ({
    onChangeFile, description="파일 첨부",
}: DragDropProps)=>{

    const [dragOver, setDragOver] = useState<boolean>(false);

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>)=>{
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) =>{
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);

        if (e.dataTransfer){
            const file = e.dataTransfer.files[0];
            onChangeFile(file);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files? e.target.files[0]: null;
        onChangeFile(file);
    
        //
        return (
           <div className="flex flex-col justify-center items-center w-full">
                <div className="w-3/4">
                    <Label className={`w-full flex-col gap-3 h-32 border-2 ${dragOver?
                        "border-blue-500 bg-blue-100 text-blue-500 font-semibold": "border-gray-300"
                    } rounded-md flex items-center justify-center cursor-pointer`}
                    htmlFor = "fileUpload"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    >
                        {description}
                        <div className="w-9 h-9 pointer-events-none">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                        </div>
                    </Label>
                    <Input
                        id="fileUpload"
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                    ></Input>
                </div>
           </div>
        )
    }
}

export default DragDropFeature
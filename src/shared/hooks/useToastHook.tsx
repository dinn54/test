import { useToast } from "@/shared/shadcn/ui/use-toast";

interface ToastHook{
    handleSuccess: (action: string, successMessage: string) => void;
    handleFail: (action: string, errorMessage: string) => void;
}

const useToastHook = ():ToastHook =>{
    const {toast}  = useToast();

    const handleSuccess = (action: string, successMessage: string) =>{
        toast({
            description: action+" "+successMessage
        })
    }

    const handleFail = (action: string, errorMessage: string) =>{
        toast({
            description: action+" "+errorMessage
        })
    }

    return {handleSuccess, handleFail};
}

export default useToastHook;
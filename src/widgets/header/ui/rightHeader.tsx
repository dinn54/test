import React from 'react';
import { PersonIcon } from '@radix-ui/react-icons';
import { authApi, signOutApi } from "@/api/auth"
import useToastHook from '@/shared/hooks/useToastHook';
import { useRouter } from 'next/navigation';

const RightHeader = () => {
  const {handleSuccess, handleFail} = useToastHook();
  const router = useRouter();
    const user = {
        name: "testName",
        avatarUrl : ""
    }
  const handleLogout = async()=>{
      try{
            //로그인 확인
            const isLoggedin = await authApi();
            if (isLoggedin) {
              const res = await signOutApi();
              handleSuccess(`"로그아웃 성공", `,"로그인 해 주세요");
            }
            router.push("/auth/sign-in");
        }catch(e:any){
          handleFail(`"로그아웃 실패", `,"로그인 상태에서만 로그아웃 할 수 있습니다");
      }
      
  }
  return (
    <div className="flex items-center space-x-4">
    <PersonIcon className="h-6 w-6 text-gray-500" />
    <div className="text-sm font-medium">{user.name}</div>
    <button className="text-sm text-gray-500 hover:text-gray-700"
      onClick={handleLogout}
    >Logout</button>
  </div>
  );
};

export default RightHeader;
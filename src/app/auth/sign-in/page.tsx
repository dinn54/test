'use client'

import React, { useState } from 'react'
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { Button } from "@/shared/shadcn/ui/button";
import { signInApi } from '@/api/auth';
import { getAccessTokenFromLocalStorage, setAccessTokenToLocalStorage, setrefreshTokenToLocalStorage } from '@/features/auth';
import { useRouter } from 'next/navigation';
import useToastHook from '@/shared/hooks/useToastHook';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';

const SignIn = ()=> {
  const [userID, setuserID] = useState("");
  const [userPW, setuserPW] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const {handleSuccess, handleFail} = useToastHook();

  const checkBeforeSignInCall = ()=>{
    if (userID.length < 2){
      handleFail(`"Invalid Data", `, "올바른 형식으로 ID를 입력 해 주세요.")
      return false;
    }else if(userPW.length < 2){
      handleFail(`"Invalid Data", `, "올바른 형식으로 PW를 입력 해 주세요.")
      return false;
    }
    return true
  }

  const loginHandler = async() => {
    // Handle Exceptions
    if(!checkBeforeSignInCall()) return;
    try {
        const res = await signInApi(userID, userPW);
        const user_id = res.payload.user_id;
        const ac_token = res.payload.ac_token;
        const rf_token = res.payload.rf_token;
        handleSuccess("login", "success")

        //token 관리 로직 코드 필요
        setAccessTokenToLocalStorage(ac_token);
        setrefreshTokenToLocalStorage(rf_token);
        router.push("/");
    } catch (error: any) {
      handleFail(`"Invalid Data", `,`"${error.message}"`);
    }


}
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <Label className="my-5"> 로그인 </Label>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label className='mt-2'>ID</Label>
          <Input
            type="text"
            id="id"
            placeholder="ID"
            value={userID}
            onChange={e=> setuserID(e.currentTarget.value)}
        />
        <div className="flex">
        <Label className='mt-2'>Password</Label>
        {passwordVisible? <EyeOpenIcon className="ml-2 mt-2" onClick={()=>setPasswordVisible(false)}/>
        :<EyeNoneIcon className="ml-2 mt-2" onClick={()=>setPasswordVisible(true)}/>}
        </div>
        <Input
          type={passwordVisible? 'text':'password'}
          id="password"
          placeholder="Password"
          value={userPW}
          onChange={e=> setuserPW(e.currentTarget.value)}
          onKeyUp={handleEnter}
        />
      </div>
      <Button
        className='w-full max-w-sm my-3 border-2'
        variant="outline"
        disabled={false}
        onClick={loginHandler}
      >
        Login
      </Button>
    </div>
  )
}

export default SignIn

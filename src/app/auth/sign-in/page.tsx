'use client'

import React, { useState } from 'react'
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { Button } from "@/shared/shadcn/ui/button";
import { signInApi } from '@/api/auth';
import { setAccessTokenToLocalStorage, setrefreshTokenToLocalStorage } from '@/features/auth';
import { useRouter } from 'next/navigation';

const SignIn = ()=> {
  const [UserId, setUserId] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const loginHandler = async () => {
    // Handle Exceptions
    if (UserId.length < 1) {

      return;
    }

    if (UserPassword.length < 1) {

      return;
    }

    try {
        const res = await signInApi(UserId, UserPassword);
        const user_id = res.payload.user_id;
        const ac_token = res.payload.ac_token;
        const rf_token = res.payload.rf_token;

        //ac_token, rf_token 관리 방법 필요
        setAccessTokenToLocalStorage(ac_token);
        setrefreshTokenToLocalStorage(rf_token);
        console.log(user_id);
        router.push("/");
    } catch (e: any) {

    }

}
  const handleEnter = (e : any) => {
    if (e.key === "Enter") {
      loginHandler();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <Label> 로그인 </Label>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label>ID</Label>
          <Input
            type="text"
            id="id"
            placeholder="ID"
            value={UserId}
            onChange={e=> setUserId(e.currentTarget.value)}
        />
        
        <Label>Password</Label>
        <Input
          type={passwordVisible? 'text':'password'}
          id="password"
          placeholder="Password"
          value={UserPassword}
          onChange={e=> setUserPassword(e.currentTarget.value)}
          onKeyUp={handleEnter}
        />
      </div>

      <Button
        className='w-full max-w-sm'
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

'use client'
import { HomePage } from '../pages/home'
import { authApi, refreshApi } from '@/api/auth'
import { useEffect, useState } from 'react'
import { SignUp } from '../pages/sign-up';
import { SignIn } from '../pages/sign-in';
import useToastHook from '@/shared/hooks/useToastHook';
import { useRouter } from 'next/navigation';

export default function Home() {
  const  {handleSuccess, handleFail}=useToastHook();
  const router = useRouter();

  //acToken -> 없으면 로그인 페이지, 있으면 Home, 있는데 만료됐으면 RefreshApi로 AC_token받아옴
  const checkToken = async()=>{
    try{
      const userInfo = await authApi();
      // User 계정 정보 업데이트
      console.log(userInfo.payload);
      handleSuccess("로그인", "성공");
    }catch(e: any){
      if (e ==="Invalid AC_Token"){
        try{
          const res = await refreshApi();
          console.log("ref success", res);
          handleSuccess(`"로그인 성공", `, `"AC refresh Success"`)
          //User 정보 업데이트
          try{
            const res = await authApi();
            console.log("user", res)
          }catch(e: any){
            console.log("Rf->auth error", e);
            return;
          }
          router.push('/');
          return;
        }catch(e: any){
          console.log("ref Error", e)
        }
      }
      handleFail(`"로그인이 필요합니다", `, `"${e}"`);
      router.push("/auth/sign-in")
    }
  }
  
  useEffect(()=>{
    //User가 바뀔때마다 체크
    
    checkToken();
    
  },[] /* ,[User] */ )

  // 토큰이 있다면 유저 정보를 받아오고 홈페이지 리턴, 없다면 로그인 폼으로 이동
  return <HomePage />
}

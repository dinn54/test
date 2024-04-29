'use client'
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { Button } from "@/shared/shadcn/ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/shadcn/ui/select";
import { duplicateIdApi, duplicateNameApi, signUpApi } from '@/api/auth';
import { useRouter } from "next/navigation";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import useToastHook from "@/shared/hooks/useToastHook";


const SignUp = ()=> {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setusername] = useState("");
  const [department, setDepartment] = useState("")
  const [pwEqual, setPwEqual] = useState(true);
  const router = useRouter();

  const {handleSuccess, handleFail} = useToastHook();


const handleVeirfyPassword = () => {
  if (userPW === confirmPW){
    setPwEqual(true);
  }else{
    setPwEqual(false);
  }
}
const handleEnter = (e : any) => {
  if (e.key === "Enter") {
    signUpHandler();
  }
};


const checkBeforeSignUpCall = async()=>{
  if (!pwEqual){
    handleFail(`"SignUp 실패", `, `"PassWord와 Verify Password가 서로 다릅니다"`);
    return false;
  }else if (userID.length < 2){
    handleFail(`"SignUp 실패", `, `"ID를 두 글자 이상 입력해 주세요"`);
    return false;
  }else if (userPW.length < 2){
    handleFail(`"SignUp 실패", `, `"Password를 두 글자 이상 입력해 주세요"`);
    return false;
  }else if (username.length < 2){
    handleFail(`"SignUp 실패", `, `"이름을 두 글자 이상 입력해 주세요"`);
    return false;
  }else if (department===""){
    handleFail(`"SignUp 실패", `, `"부서를 선택 해 주세요"`);
    return false;
  }else{
    const res1 = await duplicateIdApi(userID);
    const idNotDuplicated = res1.payload;
    if(!idNotDuplicated){
      handleFail(`"SignUp 실패", `, `"이미 가입된 ID입니다"`);
      return false;
    }
    const res2 = await duplicateNameApi(username);
    const nameNotDuplicated = res2.payload;
    if(!nameNotDuplicated){
      handleFail(`"SignUp 실패", `, `"이미 가입된 이름입니다"`);
      return false;
    }
    return true;
  }
}

const signUpHandler = async() =>{
  if (!(await checkBeforeSignUpCall())) return;
  try {
    const res = await signUpApi(userID, userPW, username, department);
    const uid = res.payload.user_id;
    handleSuccess("회원가입", "완료");
    //로그인페이지로 이동
    router.push("/auth/sign-in");
} catch (e: any) {
  handleFail(`"Invalid Data", `, e);
}
}
  return (
    
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <div className="grid w-full max-w-sm items-center gap-3">
        
      <Label className="form_title my-5 text-center"> 회원 등록 신청</Label>
      
      <Label>ID</Label>
          <Input
            type="text"
            id="id"
            placeholder="ID"
            value={userID}
            onChange={e=> setUserID(e.currentTarget.value)}
        />

        <div className="flex">
        <Label className="mt-2">Password</Label>
          {passwordVisible? <EyeOpenIcon className="ml-2 mt-2" onClick={()=>setPasswordVisible(false)}/>
        :<EyeNoneIcon className="ml-2 mt-2" onClick={()=>setPasswordVisible(true)}/>}
        </div>
        <Input
          type={passwordVisible? 'text':'password'}
          id="password"
          placeholder="Password"
          value={userPW}
          onChange={e=> setUserPW(e.currentTarget.value)}
        />

        <Label className="verifyPassword mt-2">Verify Password</Label>
        <Input
          type={passwordVisible? 'text':'password'}
          id="confirmPassword"
          placeholder="Verify Password"
          value={confirmPW}
          onChange={e=>{
            setConfirmPW(e.currentTarget.value);

          } }
          onBlur={handleVeirfyPassword}
        />
        {!pwEqual && <div className="text-red-500">불일치</div> }

        <Label className="mt-2">User Name</Label>
        <Input
          type={'text'}
          id="userName"
          placeholder="Name"
          value={username}
          onChange={e=> setusername(e.currentTarget.value)}
        />

        <Label className="mt-2">Select Department</Label>
        <Select onValueChange={(value)=>{setDepartment(value)}}>
          <SelectTrigger className="selectTrigger">
            <SelectValue placeholder="Department(Select)"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="web3 dev team">We3 Dev Team</SelectItem>
              <SelectItem value="operation management">Operation Management</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div onKeyUp={handleEnter}/>

      <Button
        className='w-full max-w-sm my-3 border-2'
        variant="outline"
        disabled={false}
        onClick={signUpHandler}
      >
        회원 가입 완료
      </Button>
      </div>

      
    </div>
  )
}

export default SignUp

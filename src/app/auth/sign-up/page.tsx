'use client'
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { Button } from "@/shared/shadcn/ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/shadcn/ui/select";
import { signUpApi } from '@/api/auth';
import { useRouter } from "next/navigation";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { CUSTOM_ERROR } from "@/api/error-types";
 


const SignUp = ()=> {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [uname, setUname] = useState("");
  const [department, setDepartment] = useState("")
  const [pwEqual, setPwEqual] = useState(false);
  const router = useRouter();



const handleVeirfyPassword = () => {

  // Password === verify Password ?
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

const handleDepartmentSelect = (selectedDepartment : any)=>{
  setDepartment(selectedDepartment);
  console.log(selectedDepartment);
}

const signUpHandler = async() =>{
  try {
    const res = await signUpApi(userID, userPW, uname, department);
    const uid = res.payload.user_id;
    console.log(uid)
    //uid를 받아오는 이유?
    console.log('uid : ', uid)

    //로그인페이지로 이동
    router.push("/auth/sign-in");
} catch (e: any) {
}
}
  return (
    
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <Label className="form_title"> 회원 등록 신청</Label>
      <div className="grid w-full max-w-sm items-center gap-3">
      <Label>ID</Label>
          <Input
            type="text"
            id="id"
            placeholder="ID"
            value={userID}
            onChange={e=> setUserID(e.currentTarget.value)}
        />

        <div style={{display: 'flex'}}>
          <Label>Password</Label>
          {passwordVisible? <EyeOpenIcon style={{marginLeft: '0.5rem'}} onClick={()=>setPasswordVisible(false)}/>
        :<EyeNoneIcon style={{marginLeft: '0.5rem'}} onClick={()=>setPasswordVisible(true)}/>}
          </div>
        <Input
          type={passwordVisible? 'text':'password'}
          id="password"
          placeholder="Password"
          value={userPW}
          onChange={e=> setUserPW(e.currentTarget.value)}
        ></Input>

        <Label className="verifyPassword">Verify Password</Label>
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
        {!pwEqual && <div style={{color: 'red'}}>불일치</div> }

        <Label>User Name</Label>
        <Input
          type={'text'}
          id="userName"
          placeholder="Name"
          value={uname}
          onChange={e=> setUname(e.currentTarget.value)}
        />
        <Label>Select Department</Label>
        <Select onValueChange={handleDepartmentSelect}>
          <SelectTrigger className="selectTrigger">
            <SelectValue placeholder="Department(Select)"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="web3_dev">We3 Dev Team</SelectItem>
              <SelectItem value="operation_management">Operation Management</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div onKeyUp={handleEnter}/>

      <Button
        className='w-full max-w-sm'
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

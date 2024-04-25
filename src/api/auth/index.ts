import api from '../index';
import {SignInResponse, SignUpResponse, userRoleResponse, VerifyTokenResponse} from './type';

const AUTH_ENDPOINT = "auth";

export const signInApi = async (id: string, pw: string)=>{
    const body={
        id, pw
    }
    return await api.post<SignInResponse>(`v1/${AUTH_ENDPOINT}/sign-in`, body);
}

export const signUpApi = async(login_id: string, login_pw: string, name: string, department: string)=>{
    const body = {
        login_id, login_pw, name, department
    }
    return await api.post<SignUpResponse>(`v1/${AUTH_ENDPOINT}/sign-up`, body);
}

export const verifyTokenApi = async (token: string)=>{
    const body = {
        token
    }

    return await api.post<VerifyTokenResponse>(`v1/${AUTH_ENDPOINT}/verify`, body);
}

export const signOutApi = async ()=>{

}

export const refreshApi = async ()=>{

}

export const userRoleApi = async(user_id: number, role: number) =>{
    const body = {
        user_id, role
    }
    return await api.post<userRoleResponse>(`v1/${AUTH_ENDPOINT}/verify`, body);
}
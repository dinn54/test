import api from '../index';
import {AuthResponse, duplicateIdResponse, duplicateNameResponse, SignInResponse, SignOutResponse, SignUpResponse, userRoleResponse} from './type';

const AUTH_ENDPOINT = "auth";

export const authApi = async ()=>{
    return await api.get<AuthResponse>(`v1/${AUTH_ENDPOINT}`);
}

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

export const signOutApi = async () =>{
    return await api.post<SignOutResponse>(`v1/${AUTH_ENDPOINT}/sign-out`);
}

export const duplicateIdApi = async(userId: string)=>{
    
    return await api.get<duplicateIdResponse>(`v1/${AUTH_ENDPOINT}/duplicate/id/${userId}`);
}
export const duplicateNameApi = async(userName: string)=>{

    return await api.get<duplicateNameResponse>(`v1/${AUTH_ENDPOINT}/duplicate/name/${userName}`);
}

export const refreshApi = async ()=>{

}

export const userRoleApi = async(user_id: number, role: number) =>{
    const body = {
        user_id, role
    }
    return await api.post<userRoleResponse>(`v1/${AUTH_ENDPOINT}/verify`, body);
}
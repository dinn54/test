import { verifyTokenApi } from "@/api/auth";

export const getAccessTokenFromLocalStorage = ()=>{
    if (typeof window === 'undefined'){
        return null
    }
    return localStorage.getItem('ac_token');
}

export const getrefreshTokenFromLocalStorage = ()=>{
    if (typeof window === 'undefined'){
        return null
    }
    return localStorage.getItem('rf_token');
}

export const setrefreshTokenToLocalStorage = (rfToken: string)=>{
    localStorage.setItem('rf_token', rfToken);
}
export const setAccessTokenToLocalStorage = (acToken: string)=>{
    localStorage.setItem('ac_token', acToken);
}

export const removeTokenFromLocalStorage = ()=>{
    localStorage.removeItem('ac_token');
    localStorage.removeItem('rf_token');
}

export const isLoggedIn = async () =>{
    const token = getAccessTokenFromLocalStorage();
    let result = false;
    if (token){
        try{
            const res = await verifyTokenApi(token);
            result = res.payload.is_verified;
        }catch(e){
            console.log('can not verify token')
            console.log(e)
        }
    }
    return result;

}
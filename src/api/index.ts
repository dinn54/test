import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { CUSTOM_ERROR } from "./error-types";
import { signInApi } from "./auth";
import { getAccessTokenFromLocalStorage } from "../features/auth";

export interface ServerResponse<T> {
    statusCode: number;
    payload: T;
}

export interface ServerError {
    error_code: string;
    timestamp: number;
    message: string;
    path: string;
}


let AC_TOKEN = getAccessTokenFromLocalStorage();

const _api = axios.create({
    //baseURL 참조 env 적용 안됨
    baseURL: `http://localhost:8080/api`,
    withCredentials: true,
    responseType: "json",
    timeout: 50000,
    headers : {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    }
})

const jwtPrefix = `Bearer`


/**
 * Request Handler 
 */
// Request : Handler (Header Auth token)
const requestHandler = (config: InternalAxiosRequestConfig) => {
    if (!AC_TOKEN) {
        AC_TOKEN = getAccessTokenFromLocalStorage();
    }
    
    config.headers.Authorization = `${jwtPrefix} ${AC_TOKEN}`;
    return config;
}


// Request : Error Handler
const requestErrHandler = (error: AxiosError) => {
    return Promise.reject(error);
}

_api.interceptors.request.use(requestHandler, requestErrHandler);

/**
 * Response Handler 
 */
// Response :  Handler
const responseHandler = (response: AxiosResponse) => {
    return response
}

// Response Error Handler
const responseErrHandler = async (error: any) => {
    const { error_code, message, timestamp, path } = error.response.data;
    // // TODO :
    // // Token Not Valid Error Code 가 있으면 토큰 갈아끼우기
    // // 현재 만료시간 무제한으로 해뒀는데 안될 경우....
    // if (
    //     error_code === CUSTOM_ERROR.INVALID_TOKEN.code ||
    //     CUSTOM_ERROR.INVALID_HEADER.code
    // ) {
    //     const newToken = await signInApi("carrieverse", "cvtx2024");
    //     // Token 갈아끼우기
    //     AC_TOKEN = newToken.payload.token;
    // }
    
    if (error_code === CUSTOM_ERROR.INVALID_ID.code || error_code === CUSTOM_ERROR.INVALID_PW.code){
        const message = 'Wrong ID or Password '
        // toast (message)
        console.log(message);
    }
    
  
    if ( error_code === CUSTOM_ERROR.INVALID_TOKEN.code || CUSTOM_ERROR.INVALID_HEADER.code){
        
        
    }

    throw error;
}

_api.interceptors.response.use(responseHandler, responseErrHandler);


const api = {
    get: async <T>(url: string, config?: AxiosRequestConfig) => {
        return _api.get<ServerResponse<T>>(url, config).then(res => {
            return res.data;
        });
    },
    post: async <T>(url: string, payload?: object, config?: AxiosRequestConfig) => {
        return _api.post<ServerResponse<T>>(url, payload, config).then(res => {
            return res.data;
        });
    }
}

export default api;
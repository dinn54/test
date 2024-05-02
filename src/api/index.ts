import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { CUSTOM_ERROR } from "./error-types";
import { signInApi } from "./auth";

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
    console.log("error", error);
    const { error_code, message, timestamp, path } = error.response.data;

    let handledMsg;
    switch(error_code){
        case CUSTOM_ERROR.INVALID_ID.code: 
            handledMsg = '올바르지 않은 ID입니다';
            break;
        case CUSTOM_ERROR.INVALID_PW.code:
            handledMsg = '올바르지 않은 Password입니다';
            break;
        case CUSTOM_ERROR.INVALID_PID.code:
            handledMsg = '올바르지 Vault Pool ID입니다';
            break;
        case CUSTOM_ERROR.DUP_USER_LOGINID.code:
            handledMsg = '이미 존재하는 ID입니다';
            break;
        case CUSTOM_ERROR.DUP_USER_NAME.code:
            handledMsg = '이미 존재하는 이름입니다';
            break;
        case CUSTOM_ERROR.AUTH_ERROR.code:
            handledMsg = '인증 할 수 없습니다';
            break;
        case CUSTOM_ERROR.INVALID_TOKEN.code:
            handledMsg = 'Invalid AC_Token';
            break;
        case CUSTOM_ERROR.INSUFFICIENT_ROLE.code:
            handledMsg = '접근 할 수 없는 계정입니다';
            break;
        case CUSTOM_ERROR.INVALID_ENVIRONMENT.code:
            handledMsg = 'env가 유효하지 않습니다("prod|stg|dev")';
            break;
        case CUSTOM_ERROR.INVALID_HEADER.code:
            handledMsg = '유효하지 않은 헤더입니다';
            break;
        case CUSTOM_ERROR.INVALID_ADDRESS.code:
            handledMsg = '유효하지 않은 주소입니다';
            break;
        case CUSTOM_ERROR.RPC_ERROR.code:
            handledMsg = 'RPC error입니다';
            break;
        case CUSTOM_ERROR.DB_ERROR.code:
            handledMsg = 'DB error입니다';
            break;
        case CUSTOM_ERROR.INTERNAL_ERROR.code:
            handledMsg = 'Internal Error입니다';
            break;
        case CUSTOM_ERROR.TIMEOUT_ERROR.code:
            handledMsg = 'Timeout Error입니다';
            break;
}
    return Promise.reject(handledMsg);
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
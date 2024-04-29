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
            handledMsg = '유효하지 않은 토큰입니다';
            break;
        case CUSTOM_ERROR.INSUFFICIENT_ROLE.code:
            handledMsg = '접근 할 수 없는 계정입니다';
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
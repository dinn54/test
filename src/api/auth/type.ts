export interface AuthResponse{
    id: number;
    loginId: string;
    department: string;
    role: number;
    rfToken: string;
    createdDt: string;
}

export interface SignInResponse {
    user_id: number;
    ac_token: string;
    rf_token: string;
}

export interface SignUpResponse {
    user_id : number;
}

export interface SignOutResponse{
    
}

export interface RefreshResponse {
    ac_token: string;
    rf_token: string;
}

export interface userRoleResponse {
    user_id: string;
}

export interface duplicateIdResponse{
    userId : string
}
export interface duplicateNameResponse{
    userName: string
}

export interface allVaultsResponse{
    pool: [
        {
            pid: number
            address: string
        } 
    ]
}

export interface vaultDetailResponse{
    pool_id: number;
    pool_address: string;
    pool_cvtx_amount: string;
    staked_token: string;
    reward_token: string;
    lp_token: string
    lock_duration: string;
    reward_second: string;
    start_timestamp: string;
    end_timestamp: string;
    max_pool_limit: string;
    max_account_limit: string;
}
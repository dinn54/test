export interface SignInResponse {
    user_id: number;
    ac_token: string;
    rf_token: string;
}

export interface VerifyTokenResponse {
    is_verified: boolean;
}

export interface SignUpResponse {
    user_id : number;
}

export interface RefreshResponse {
    ac_token: string;
    rf_token: string;
}

export interface userRoleResponse {
    user_id: string;
}

export interface duplicateResponse{
    
}
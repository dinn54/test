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
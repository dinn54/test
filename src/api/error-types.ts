export const CUSTOM_ERROR = {
    // 1 ~ 100 : Server Side Check Error
    "RPC_ERROR": {
        message: "rpc error",
        code : "E-001"
    },
    "DB_ERROR": {
        message: "database error",
        code : "E-002"
    },
    "INTERNAL_ERROR": {
        message: "internal server error",
        code : "E-003"
    },
    "TIMEOUT_ERROR": {
        message: "timeout error",
        code : "E-004"
    },

    // 100 ~ 199 : Parameters Error
    "INVALID_ADDRESS": {
        message: "address is not valid",
        code : "E-100"
    },
    "INVALID_UID": {
        message: "uid is not valid",
        code : "E-101"
    },
    "INVALID_ID": {
        message: "id is not valid",
        code : "E-103"
    },
    "INVALID_PW": {
        message: "password is not valid",
        code : "E-104"
    },
    "INVALID_HEADER": {
        message: "haeder is not acceptable",
        code : "E-105"
    },
    "INVALID_ENVIRONMENT": {
        message: "env is not valid (prod | stg | dev)",
        code : "E-106"
    },
    "INVALID_PID": {
        message: "vault - invalid pool id",
        code : "E-107"
    },
    "DUP_USER_LOGINID": {
        message: "duplicate user id",
        code : "E-108"
    },
    "DUP_USER_NAME": {
        message: "duplicate user name",
        code : "E-109"
    },
    "NO_ENOUGH_PARAMETER": {
        message: "at least one parameter needed",
        code : "E-110",
    },

    // 200 ~ 299 : Authentication Errors
    "AUTH_ERROR": {
        message: "unauthorized",
        code : "E-200"
    },
    "INVALID_TOKEN": {
        message: "not valid token",
        code : "E-201"
    },
    "INSUFFICIENT_ROLE": {
        message: "not enough role to access",
        code : "E-202"
    }
}
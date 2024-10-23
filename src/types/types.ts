export type TUserInfo = {
    email: string;
    password: string;
    rememberMe?: string;
}

export type TUser = {
    registeredId: string;
    exp: number;
    iat: number;
    role: string;
}

// error handling types
export interface TErrorData {
    errorSources: [
        {
            message: string;
            path: string;
        },
    ]
    message: string;
    success: boolean;
}

export interface TLoginError {
    status: number;
    data: TErrorData
}
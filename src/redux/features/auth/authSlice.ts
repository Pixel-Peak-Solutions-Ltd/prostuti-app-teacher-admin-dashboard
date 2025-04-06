// import { createSlice } from "@reduxjs/toolkit";

// type TAuthState = {
//     user: null | object;
//     token: null | string;
//     refreshToken?: null | string;
// }

// const initialState: TAuthState = {
//     user: null,
//     token: null,
// };
// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setUser: (state, action) => {
//             const { user, token } = action.payload;
//             state.user = user;
//             state.token = token;
//         },
//         logout: (state) => {
//             state.user = null;
//             state.token = null;
//         }
//     }
// });

// export const { setUser, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { USER_ROLE } from "../../../constants/roles";

// Define a proper user interface
export interface IUser {
    _id: string;
    name?: string;
    email?: string;
    role: typeof USER_ROLE[keyof typeof USER_ROLE];
    status?: string;
    profileImage?: {
        path: string;
    };
}

type TAuthState = {
    user: IUser | null;
    token: null | string;
    refreshToken?: null | string;
};

const initialState: TAuthState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

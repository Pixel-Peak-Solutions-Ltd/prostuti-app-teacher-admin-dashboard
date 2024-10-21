import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    role: ''
};
export const teacherSlice = createSlice({
    name: 'teacherCredential',
    initialState,
    reducers: {
        setTeacher: (state, action) => {
            state = { ...state, email: action.payload.email, role: action.payload.role };
        }
    }
});

export const { setTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
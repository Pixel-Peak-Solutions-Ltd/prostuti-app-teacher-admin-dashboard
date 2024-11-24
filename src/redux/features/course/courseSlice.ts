import { createSlice } from "@reduxjs/toolkit";
import { CourseState } from "../../../types/types";

const initialState: CourseState = {
    courseDetails: {
        name: "",
        category: "",
        details: "",
        isPending: true,
        isPublished: false,
        teacherId: "",
        coverImg: null,
    },
    id: {
        course_id: '',
        lesson_id: '',
    }
};

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        saveCourseIdToStore: (state, action) => {
            state.id = { ...state.id, ...action.payload };
        },
        saveLessonIdToStore: (state, action) => {
            state.id = { ...state.id, ...action.payload };
        }
    }
});

export const { saveCourseIdToStore, saveLessonIdToStore } = courseSlice.actions;
export default courseSlice.reducer;
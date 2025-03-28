import { createSlice } from "@reduxjs/toolkit";
import { CourseState } from "../../../types/types";

const initialState: CourseState = {
    testHistoryData: {
        history: {}
    },
    assignmentHistory: {
        history: {}
    },
    id: {
        course_id: '',
        lesson_id: '',
        test_id: '',
        assignment_id: '',
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
        },
        saveTestStore: (state, action) => {
            state.id = { ...state.id, ...action.payload };
        },
        saveTestHistory: (state, action) => {
            state.testHistoryData = { ...state.testHistoryData, ...action.payload };
        },
        saveAssignmentIdToStore: (state, action) => {
            state.id = { ...state.id, ...action.payload };
        },
        saveAssignmentHistory: (state, action) => {
            state.assignmentHistory = { ...state.assignmentHistory, ...action.payload };
        }
    }
});

export const { saveCourseIdToStore, saveLessonIdToStore, saveTestStore, saveTestHistory, saveAssignmentIdToStore, saveAssignmentHistory } = courseSlice.actions;
export default courseSlice.reducer;
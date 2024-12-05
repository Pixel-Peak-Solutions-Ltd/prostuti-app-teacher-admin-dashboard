import { createSlice } from "@reduxjs/toolkit";

export interface ICategory {
    subject: string;
    type: string;
    _id: string;
    division?: string;
    chapter?: string;
}

export interface ISingleQuestion {
    category: ICategory[];
    category_id: string;
    correctOption?: string;
    description: string;
    options?: string[];
    title: string;
    type: string;
    _id: string;
}

interface IQuestion {
    questions: ISingleQuestion[];
}

const initialState: IQuestion = {
    questions: []
};

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        saveQuestionToStore: (state, action) => {
            state.questions.push(action.payload);
        },
        removeQuestionFromStore: (state, action) => {
            state.questions = state.questions.filter((item) => item._id !== action.payload); //send only the _id of the question
        },
        resetStoredQuestions: (state) => {
            state.questions = [];
        }
    }
});

export const { saveQuestionToStore, removeQuestionFromStore, resetStoredQuestions } = questionSlice.actions;

export default questionSlice.reducer;
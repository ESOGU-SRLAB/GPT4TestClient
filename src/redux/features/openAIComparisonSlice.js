import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    LLMName: 'OpenAI',
    isUsed: true,
    modelSelection: 'gpt-3.5-turbo-1106',
    temperature: 1.7,
    maxLength: 2000,
    stopSequences: [],
    topP: 0.7,
    frequencyPenalty: 0,
    presencePenalty: 0,
};

export const openAIComparisonSlice = createSlice({
    name: 'openAIComparisonSlice',
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            return { ...state, ...action.payload };
        },
        equalizeOpenAISettings: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateSettings, equalizeOpenAISettings } =
    openAIComparisonSlice.actions;

export default openAIComparisonSlice.reducer;

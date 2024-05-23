import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    LLMName: 'Gemini',
    modelSelection: 'Gemini',
    isUsed: true,
    temperature: 0.8,
    maxOutputTokens: 1536,
    topP: 0.7,
    topK: 250,
    stopSequences: [],
};

export const geminiComparisonSlice = createSlice({
    name: 'geminiComparisonSlice',
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            return { ...state, ...action.payload };
        },
        equalizeGeminiSettings: (state, action) => {
            let { temperature, maxLength, topP } = action.payload;
            let equalizeObj = {
                temperature,
                topP,
                maxOutputTokens: maxLength,
            };
            return { ...state, ...equalizeObj };
        },
    },
});

export const { updateSettings, equalizeGeminiSettings } =
    geminiComparisonSlice.actions;
export default geminiComparisonSlice.reducer;

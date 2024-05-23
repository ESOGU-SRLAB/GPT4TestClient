import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    LLMName: 'Mistral',
    modelSelection: 'Mistral',
    isUsed: true,
    temperature: 0.8,
    topK: 250,
    topP: 0.7,
    lenPenalty: 0.6,
    minNewTokens: 512,
    maxNewTokens: 1536,
    presPenalty: 0.2,
};

export const mistralComparisonSlice = createSlice({
    name: 'mistralComparisonSlice',
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            return { ...state, ...action.payload };
        },
        equalizeMistralSettings: (state, action) => {
            let { temperature, maxLength, topP } = action.payload;
            let equalizeObj = {
                temperature,
                topP,
                maxNewTokens: maxLength,
            };
            return { ...state, ...equalizeObj };
        },
    },
});

export const { updateSettings, equalizeMistralSettings } =
    mistralComparisonSlice.actions;
export default mistralComparisonSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const saveComparisonResultToDB = createAsyncThunk(
    'toCompareList/saveComparisonResultToDB',
    async (_, { getState, isRejectedWithValue }) => {
        const { userData } = getState();
        const userIdentifier = userData.username || userData.userEmailAddress;
        const { focalCode, toCompareList, comparisonResults } =
            getState().toCompareList;
        const dateTimestamp = Date.now();
        const data = {
            userIdentifier,
            dateTimestamp,
            focalCode,
            toCompareList,
            comparisonResults,
        };

        try {
            const response = await axios.post(
                'http://localhost:5000/api/users/comparisonResults/saveComparisonResult',
                data
            );
            return response.data;
        } catch (error) {
            return isRejectedWithValue(error.response.data);
        }
    }
);

export const sendModelsToComparison = createAsyncThunk(
    'toCompareList/sendModelsToComparison',
    async (_, { getState, dispatch }) => {
        const modelsToCompare = getState().toCompareList.toCompareList;
        const { focalCode } = getState().toCompareList;
        if (focalCode.length === 0) {
            toast.warning('Do not forget to write your code!');
            return;
        }
        // Create an array to store individual request results
        const comparisonResults = [];

        for (let model of modelsToCompare) {
            try {
                const response = await axios.post(
                    `http://localhost:4000/performance/${model.LLMName.toLowerCase()}`,
                    {
                        modelSettings: model,
                        focalCode,
                    }
                );
                if (response.status === 200) {
                    comparisonResults.push(response.data); // Add response.data to the array
                }
            } catch (error) {
                // Handle errors for individual requests
                console.error(`Error comparing ${model.LLMName}:`, error);
                // You might want to dispatch an action to handle errors globally
            }
        }

        // Dispatch an action to update the Redux state with all results
        dispatch(setComparisonResults(comparisonResults));
        dispatch(saveComparisonResultToDB());
    }
);

const initialState = {
    focalCode:
        '# Write your code here or simply drag and drop .py file\ndef add_numbers(num1, num2):\n\treturn num1 + num2',
    toCompareList: [],
    comparisonResults: [],
};

export const toCompareListSlice = createSlice({
    name: 'toCompareList',
    initialState,
    reducers: {
        addModelToCompareList: (state, action) => {
            try {
                let { LLMName } = action.payload;
                let randomStr = uuidv4();
                state.toCompareList.push({
                    ...action.payload,
                    defaultId: randomStr,
                    id: `${randomStr.slice(0, 6)} (${LLMName})`,
                });
                toast.success(`${LLMName} model added to the comparison list!`);
            } catch (error) {
                console.error(error);
                toast.error('Error occurred during model addition!');
            }
        },
        updateComparisonEditorContent: (state, action) => {
            const editorContent = action.payload;
            state.focalCode = editorContent;
        },
        setComparisonResults: (state, action) => {
            state.comparisonResults = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendModelsToComparison.fulfilled, (state, action) => {
                return { ...state, ...action.payload };
            })
            .addCase(saveComparisonResultToDB.fulfilled, () => {
                toast.success('Comparison result saved successfully!');
            })
            .addCase(saveComparisonResultToDB.rejected, () => {
                toast.error('Failed to save comparison result!');
            });
    },
});

export const {
    addModelToCompareList,
    updateComparisonEditorContent,
    setComparisonResults,
} = toCompareListSlice.actions;
export default toCompareListSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { loadUserDataFromLocalStorage } from '../utils/localStorage';
import userDataReducer from './features/userDataSlice';
import modelSettingsReducer from './features/modelSettingsSlice';

const preloadedState = {
    userData: loadUserDataFromLocalStorage(),
};

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        modelSettings: modelSettingsReducer,
    },
    preloadedState,
});

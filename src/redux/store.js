import { configureStore } from '@reduxjs/toolkit';
import { loadUserDataFromLocalStorage } from '../utils/localStorage';
import userDataReducer from './features/userDataSlice';
import modelSettingsReducer from './features/modelSettingsSlice';
import editorSettingsReducer from './features/editorSettingsSlice';
import terminalSettingsReducer from './features/terminalSettingsSlice';
import editorContentsReducer from './features/editorContentsSlice';

const preloadedState = {
    userData: loadUserDataFromLocalStorage(),
};

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        modelSettings: modelSettingsReducer,
        editorSettings: editorSettingsReducer,
        terminalSettings: terminalSettingsReducer,
        editorContents: editorContentsReducer,
    },
    preloadedState,
});

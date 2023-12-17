import { configureStore } from '@reduxjs/toolkit';
import { loadUserDataFromLocalStorage } from '../utils/localStorage';
import counterReducer from './features/counterSlice';
import userDataReducer from './features/userDataSlice';

const preloadedState = {
    userData: loadUserDataFromLocalStorage(),
};

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        userData: userDataReducer,
    },
    preloadedState,
});

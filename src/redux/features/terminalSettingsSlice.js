import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchExecutionTerminalSettingsFromDB = createAsyncThunk(
    'terminalSettings/fetchExecutionTerminalSettingsFromDB',
    async (_, { getState }) => {
        const { userData } = getState();
        const userIdentifier = userData.username || userData.userEmailAddress;

        const response = await axios.get();
        return {
            executionTerminalSettings: response.data.executionTerminalSettings,
        };
    }
);

export const fetchSpecialCommandTerminalSettingsFromDB = createAsyncThunk(
    'terminalSettings/fetchSpecialCommandTerminalSettingsFromDB',
    async (_, { getState }) => {
        const { userData } = getState();
        const userIdentifier = userData.username || userData.userEmailAddress;

        const response = await axios.get();
        return {
            specialCommandTerminalSettings:
                response.data.specialCommandTerminalSettings,
        };
    }
);

export const saveExecutionTerminalSettingsToDB = createAsyncThunk(
    'terminalSettings/saveExecutionTerminalSettingsToDB',
    async (executionTerminalSettings, { getState }) => {
        const { userData } = getState();
        const userIdentifier = userData.username || userData.userEmailAddress;
        const response = await axios.get();

        return executionTerminalSettings;
    }
);

export const saveSpecialCommandTerminalSettingsToDB = createAsyncThunk(
    'terminalSettings/saveSpecialCommandTerminalSettingsToDB',
    async (specialCommandTerminalSettings, { getState }) => {
        const { userData } = getState();
        const userIdentifier = userData.username || userData.userEmailAddress;
        const response = await axios.get();

        return specialCommandTerminalSettings;
    }
);

const initialState = {
    executionTerminalSettings: {
        themes: {
            light: {
                themeBGColor: '#f5f5f5',
                themeToolbarColor: '#eeeeee',
                themeColor: '#212121',
                themePromptColor: '#00e676',
            },
            dark: {
                themeBGColor: '#757575',
                themeToolbarColor: '#424242',
                themeColor: '#fafafa',
                themePromptColor: '##e0e0e0',
            },
        },
        selectedThemeName: 'light',
    },
    specialCommandTerminalSettings: {
        themes: {
            light: {
                themeBGColor: '#f5f5f5',
                themeToolbarColor: '#eeeeee',
                themeColor: '#212121',
                themePromptColor: '#00e676',
            },
        },
        selectedThemeName: 'light',
    },
};

const terminalSettingsSlice = createSlice({
    name: 'terminalSettings',
    initialState,
    reducers: {
        setExecutionTerminalSelectedThemeName: (state, action) => {
            const themeName = action.payload;
            if (state.executionTerminalSettings.themes[themeName]) {
                state.executionTerminalSettings.selectedThemeName = themeName;
                toast.success(`Theme changed to: ${themeName}`);
            } else {
                toast.error(`Theme '${themeName}' does not exist`);
            }
        },
        setSpecialCommandTerminalSelectedThemeName: (state, { payload }) => {
            if (state.specialCommandTerminalSettings.themes[payload]) {
                state.specialCommandTerminalSettings.selectedThemeName =
                    payload;
                toast.success(`Theme changed to: ${payload}`);
            } else {
                toast.error(`Theme '${payload}' does not exist`);
            }
        },
        addThemeToExecutionTerminalThemes: (
            state,
            { payload: { themeName, theme } }
        ) => {
            if (!state.executionTerminalSettings.themes[themeName]) {
                state.executionTerminalSettings.themes[themeName] = theme;
                toast.success(`Theme '${themeName}' added successfully`);
            } else {
                toast.error(`Theme '${themeName}' already exists`);
            }
        },
        addThemeToSpecialCommandTerminalThemes: (
            state,
            { payload: { themeName, theme } }
        ) => {
            if (!state.specialCommandTerminalSettings.themes[themeName]) {
                state.specialCommandTerminalSettings.themes[themeName] = theme;
                toast.success(`Theme '${themeName}' added successfully`);
            } else {
                toast.error(`Theme '${themeName}' already exists`);
            }
        },
        removeThemeFromExecutionTerminalThemes: (state, { payload }) => {
            if (state.executionTerminalSettings.themes[payload]) {
                delete state.executionTerminalSettings.themes[payload];
                toast.success(`Theme '${payload}' removed successfully`);
            } else {
                toast.error(`Theme '${payload}' does not exist`);
            }
        },
        removeThemeFromSpecialCommandTerminalThemes: (state, { payload }) => {
            if (state.specialCommandTerminalSettings.themes[payload]) {
                delete state.specialCommandTerminalSettings.themes[payload];
                toast.success(`Theme '${payload}' removed successfully`);
            } else {
                toast.error(`Theme '${payload}' does not exist`);
            }
        },
        // ... other reducers ...
    },
});

export const {
    setExecutionTerminalSelectedThemeName,
    setSpecialCommandTerminalSelectedThemeName,
    addThemeToExecutionTerminalThemes,
    addThemeToSpecialCommandTerminalThemes,
    removeThemeFromExecutionTerminalThemes,
    removeThemeFromSpecialCommandTerminalThemes,
} = terminalSettingsSlice.actions;

export default terminalSettingsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    name: "userDataSlice",
    initialState: {
        username: null,
        email: null,
    },
    reducers: {
        setUserData: (state, action) => {
            let { username, email } = action.payload;
            console.log(action.payload);
            [state.username, state.email] = [username, email];
        }
    }
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
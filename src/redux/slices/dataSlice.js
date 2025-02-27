import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("users")) || [];

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
        deleteUser: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        },
        editUser: (state, action) => {
            const { index, newData } = action.payload;
            state[index] = newData;
        },
        editUser: (state, action) => {
            const { index, newData } = action.payload;
            if (state[index]) {
                state[index] = { ...state[index], ...newData };
            }
        },


    },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/dataSlice";

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
});

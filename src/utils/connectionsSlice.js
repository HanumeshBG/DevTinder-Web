import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
        removeConnection: (state, action) => {
            const newArray = state.data.filter(connection => connection._id !== action.payload);
            return newArray;
        }
    }
})

export const { addConnection, removeConnection } = connectionsSlice.actions;

export default connectionsSlice.reducer;
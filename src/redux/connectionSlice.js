import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name : "connection",
    initialState : [],
    reducers : {
        addConnectionRequest : (state, action) => {
            return action.payload;
        },
        removeConnectionRequest : (state, action) => {
            return state.filter((user) => user?._id !== action.payload)
        }
    }
})

export const {addConnectionRequest, removeConnectionRequest} = connectionSlice.actions;
export default connectionSlice.reducer;
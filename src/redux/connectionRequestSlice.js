import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
    name : "connectionRequest",
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

export const {addConnectionRequest, removeConnectionRequest} = connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;
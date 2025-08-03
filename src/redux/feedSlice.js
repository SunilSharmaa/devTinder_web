import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : [],
    reducers : {
        addFeedUser : (state, action) => {
            return action.payload
        }, 
        removeFeedUser : (state, action) => {
            return state.filter((user) => user._id !== action.payload);
        }
    }
})

export const {addFeedUser, removeFeedUser} = feedSlice.actions;
export default feedSlice.reducer;
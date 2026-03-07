import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionRequestReducer from "./connectionRequestSlice";
import connectionReducer from "./connectionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connectionRequest: connectionRequestReducer,
    connection: connectionReducer,
  },
});

export default store;

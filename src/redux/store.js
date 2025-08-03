import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const store = configureStore({
  reducer: { userReducer, feedReducer, connectionReducer},

});

export default store;

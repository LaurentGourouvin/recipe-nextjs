import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice.js";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});

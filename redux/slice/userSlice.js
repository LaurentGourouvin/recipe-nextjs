import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser as login } from "../../axios/auth/axios_auth";
import { getCurrentUser } from "../../axios/auth/axios_auth";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    isLogged: false,
    email: "",
    firstname: "",
    lastname: "",
    id: null,
  },
  reducers: {
    disconnect: (state) => {
      return {
        ...state,
        token: "",
        isLogged: false,
        email: "",
        firstname: "",
        lastname: "",
        id: null,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload?.codeStatus) return { ...state };
      return { ...state, ...action.payload, isLogged: true };
    });

    builder.addCase(currentUser.fulfilled, (state, action) => {
      if (action.payload?.codeStatus) return { ...state };
      if (action.payload === undefined) return { ...state };
      return {
        ...state,
        isLogged: true,
        token: action.payload?.token,
        email: action.payload?.user_email,
        firstname: action.payload?.user_firstname,
        lastname: action.payload?.user_lastname,
        id: action.payload?.user_id,
      };
    });
  },
});

// Je créer une fonction thunk qui porte le nom de mon slice "user"
// avec l'action "loginUser" sur laquelle je pourrais agir via l'extraReducers
export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  const response = await login(user);
  // condition me permettant d'obtenir une valeur serializable pour redux
  if (response?.data) return response.data;
  return response;
});

export const currentUser = createAsyncThunk("user/currentUser", async () => {
  const response = await getCurrentUser();
  if (response?.data) return response.data;
  return response;
});

export const { disconnect } = userSlice.actions;

export default userSlice.reducer;

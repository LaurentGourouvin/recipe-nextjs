import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { loginUser as login } from "../../axios/auth/axios_auth";
import {
  getFavorites as axiosGetFavorites,
  getLikes as axiosGetLikes,
} from "../../axios/likeFavorites/likeFavorites";
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
    favorites: [],
    likes: [],
  },
  reducers: {
    updateUser: (state, action) => {
      return {
        ...state,
        email: action.payload.user_email,
        firstname: action.payload.user_firstname,
        lastname: action.payload.user_lastname,
      };
    },
    addOneFavorite: (state, action) => {
      const newFavoritesList = state.favorites.concat(action.payload);
      return { ...state, favorites: newFavoritesList };
    },
    addOneLike: (state, action) => {
      const newLikeList = state.likes.concat(action.payload);
      return { ...state, likes: newLikeList };
    },
    deleteOneFavorite: (state, action) => {
      const favoritesList = state.favorites;
      const newFavoritesList = favoritesList.filter(
        (recipe) => recipe.recipe_id !== action.payload
      );
      return {
        ...state,
        favorites: newFavoritesList,
      };
    },
    deleteOneLike: (state, action) => {
      const likesList = state.likes;
      const newLikesList = likesList.filter(
        (recipe) => recipe.recipe_id !== action.payload
      );
      return { ...state, likes: newLikesList };
    },
    disconnect: (state) => {
      return {
        ...state,
        token: "",
        isLogged: false,
        email: "",
        firstname: "",
        lastname: "",
        favorites: [],
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

    builder.addCase(getFavorites.fulfilled, (state, action) => {
      if (action.payload?.codeStatus) return { ...state };
      if (action.payload === undefined) return { ...state };
      if (action.payload?.length > 0) {
        return {
          ...state,
          favorites: action.payload,
        };
      }
    });

    builder.addCase(getLikes.fulfilled, (state, action) => {
      if (action.payload?.codeStatus) return { ...state };
      if (action.payload === undefined) return { ...state };
      if (action.payload?.length > 0) {
        return {
          ...state,
          favorites: action.payload,
        };
      }
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

export const getFavorites = createAsyncThunk(
  "user/getFavorites",
  async (userId, { getState }) => {
    const state = getState();
    if (userId === null || userId === undefined) userId = state.user.id;
    const response = await axiosGetFavorites(userId);

    return response.data;
  }
);

export const getLikes = createAsyncThunk(
  "user/getLikes",
  async (userId, { getState }) => {
    const state = getState();
    if (userId === null || userId === undefined) userId = state.user.id;
    const response = await axiosGetLikes(userId);

    return response.data;
  }
);
export const {
  disconnect,
  updateUser,
  addOneFavorite,
  deleteOneFavorite,
  addOneLike,
  deleteOneLike,
} = userSlice.actions;

export default userSlice.reducer;

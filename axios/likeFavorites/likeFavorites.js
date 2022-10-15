import { getRequest, postRequest, putRequest } from "../axios";
import { useState, useEffect } from "react";

export const getFavorites = async (userId) => {
  try {
    const favorites = await getRequest(`/likefavorites/favorites/${userId}`);

    return favorites;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const getLikes = async (userId) => {
  try {
    const likes = await getRequest(`/likefavorites/likes/${userId}`);

    return likes;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const createDefaultFavorite = async (recipeId) => {
  try {
    const favorites = await postRequest(`/likefavorites/favorites`, {
      recipeId: recipeId,
    });
    return favorites;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const updateFavorite = async (recipeId, booleanIsFavorite) => {
  try {
    const favorites = await putRequest(`/likefavorites/updateFavorite`, {
      recipeId: recipeId,
      isFavorite: booleanIsFavorite,
    });
    return favorites;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const updateLike = async (recipeId, booleanIsLike) => {
  try {
    const likes = await putRequest(`/likefavorites/updateLike`, {
      recipeId: recipeId,
      isLike: booleanIsLike,
    });
    return likes;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const getFavoritesOrLikeByRecipeId = async (recipId) => {
  try {
    const favorites = await getRequest(`/likefavorites/${recipId}`);
    return favorites;
  } catch (error) {
    console.error(error);
    return {
      codeStatus: error.response.status,
      message: error.response.data.errorDescription,
    };
  }
};

export const useGetFavoritesByUserId = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getRequest(url)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, [url]);

  return { data, error, loading };
};

export const useGetLikeByUserId = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    getRequest(`/likefavorites/`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoader(false));
  }, []);

  return { data, error, loading };
};

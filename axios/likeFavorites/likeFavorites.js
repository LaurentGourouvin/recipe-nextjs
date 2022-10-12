import { getRequest, postRequest, putRequest } from "../axios";

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

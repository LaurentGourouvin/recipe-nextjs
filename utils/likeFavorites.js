import {
  createDefaultFavorite,
  getFavoritesOrLikeByRecipeId,
  updateFavorite,
  updateLike,
} from "../axios/likeFavorites/likeFavorites";

// Fonction permettant l'ajout ou le retrait d'une recette dans les favoris
export const updateRecipeFavorite = async (userData, recipeId, recipeTitle) => {
  // Je dois vérifier dans la liste des favoris de l'utilisateur si la recette existe
  const resultFindFavoriteRecipe = userData.favorites.find(
    (oneRecipe) => oneRecipe.recipe_id === recipeId
  );

  if (!resultFindFavoriteRecipe) {
    // Je vérifie qu'une relation entre la recette et l'utilisateur existe dans la base de donnée
    // Si aucune relation n'existe, je la crée
    const favoritesUser = await getFavoritesOrLikeByRecipeId(recipeId);
    if (favoritesUser.data === "") {
      const defaultFavoriteLikeInDB = await createDefaultFavorite(
        Number(recipeId)
      );
    }
    // Je mets la recette en favoris dans la base de donnée
    const resultUpdate = await updateFavorite(Number(recipeId), true);
    return true;
  } else {
    // Si la recette est déjà en favoris je l'enlève de la liste des favoris de la base de donnée
    const resultUpdate = await updateFavorite(Number(recipeId), false);
    return false;
  }
};

// Fonction permettant l'ajout ou le retrait d'une recette dans les likes
export const updateRecipeLike = async (userData, recipeId, recipeTitle) => {
  // Je dois vérifier dans la liste des favoris de l'utilisateur si la recette existe
  const resultFindLikeRecipe = userData.likes.find(
    (oneRecipe) => oneRecipe.recipe_id === recipeId
  );

  if (!resultFindLikeRecipe) {
    // Je vérifie qu'une relation entre la recette et l'utilisateur existe dans la base de donnée
    // Si aucune relation n'existe, je la crée
    const likesUser = await getFavoritesOrLikeByRecipeId(recipeId);
    if (likesUser.data === "") {
      const defaultFavoriteLikeInDB = await createDefaultFavorite(
        Number(recipeId)
      );
    }
    // Je mets la recette en favoris dans la base de donnée
    const resultUpdate = await updateLike(Number(recipeId), true);
    return true;
  } else {
    // Si la recette est déjà en favoris je l'enlève de la liste des favoris de la base de donnée
    const resultUpdate = await updateLike(Number(recipeId), false);
    return false;
  }
};

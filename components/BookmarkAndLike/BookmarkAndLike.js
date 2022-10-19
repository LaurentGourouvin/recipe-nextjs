// Import node_module
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import Own Module
import { isFavoriteInFavoritesList, isLikeInLikesList } from "../../utils/likeFavorites";
import { addOneLike, addOneFavorite, deleteOneLike, deleteOneFavorite } from "../../redux/slice/userSlice";
import { updateRecipeFavorite } from "../../utils/likeFavorites";

// Import icons
import { Star } from "../elements/icons/Star";
import { StarSolid } from "../elements/icons/StarSolid";
import { Like } from "../elements/icons/Like";
import { LikeSolid } from "../elements/icons/LikeSolid";

const BookmarkAndLike = (recipe) => {
  // State
  const [socialInteraction, setSocialInteraction] = useState({ isFavorite: false, isLike: false });

  // Récupération du state redux
  const favoritesList = useSelector((state) => state.user.favorites);
  const likesList = useSelector((state) => state.user.likes);

  const dispatch = useDispatch();

  // Je vérifie lors de l'initalisation du composant si la recette est liké ou en favoris pour l'utilisateur
  const checkFavorite = isFavoriteInFavoritesList(favoritesList, recipe.recipe_id);
  const checkLike = isLikeInLikesList(likesList, recipe.recipe_id);

  // Handlers
  const handleClickFavorite = async () => {
    setSocialInteraction((prevState) => ({ ...prevState, isFavorite: !socialInteraction.isFavorite }));

    // Je mets à jour l'information dans ma base de donnée
    const favoriteUpdating = await updateRecipeFavorite(favoritesList, recipe.recipe_id);

    // Si une modification a eu lieu en base de donnée je modifie mon state redux
    if (favoriteUpdating) {
      dispatch(
        addOneFavorite({
          recipe_id: recipe.recipe_id,
          recipe_title: recipe.recipe_title,
          recipe_image_large: recipe.recipe_image_large,
          recipe_image_medium: recipe.recipe_image_medium,
          recipe_image_small: recipe.recipe_image_small,
          recipe_duration: recipe.recipe_duration,
          recipe_person: recipe.recipe_person,
          reicpe_level: recipe.recipe_level,
        })
      );
    } else {
      dispatch(deleteOneFavorite(recipe));
    }
  };

  const handleClickLike = () => {
    setSocialInteraction((prevState) => ({ ...prevState, isLike: !socialInteraction.isLike }));
  };

  useEffect(() => {
    setSocialInteraction((prevState) => ({ ...prevState, isFavorite: checkFavorite, isLike: checkLike }));
  }, [checkLike, checkFavorite]);

  return (
    <p className="py-1 text-center flex justify-end gap-1 absolute bottom-0 right-1">
      <button
        type="button"
        name="add-remove-favorite-button"
        aria-label="add remove favorite button"
        className="hover:text-amber-600 text-slate-500"
        onClick={handleClickFavorite}
      >
        {socialInteraction.isFavorite ? <StarSolid style={"w-4 h-4 text-amber-600"} /> : <Star style={"w-4 h-4"} />}
      </button>
      <button
        type="button"
        name="add-remove-like-button"
        aria-label="add remove like button"
        className="hover:text-blue-400 text-slate-500"
        onClick={handleClickLike}
      >
        {socialInteraction.isLike ? <LikeSolid style={"w-4 h-4 text-blue-400"} /> : <Like style={"w-4 h-4"} />}
      </button>
    </p>
  );
};

export default BookmarkAndLike;

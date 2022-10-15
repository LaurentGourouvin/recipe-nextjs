// Import node_module
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Import Own Module
import { Star } from "../elements/icons/Star";
import { StarSolid } from "../elements/icons/StarSolid";
import { Like } from "../elements/icons/Like";
import { LikeSolid } from "../elements/icons/LikeSolid";
import { Clock } from "../elements/icons/Clock";
import { Chart } from "../elements/icons/Chart";
import { UserGroup } from "../elements/icons/UserGroup";
import {
  updateRecipeFavorite,
  updateRecipeLike,
} from "../../utils/likeFavorites";
import {
  deleteOneFavorite,
  addOneFavorite,
  deleteOneLike,
  addOneLike,
} from "../../redux/slice/userSlice";

const CardRecipe = ({
  recipe_image_large,
  recipe_image_medium,
  recipe_image_small,
  recipe_title,
  recipe_id,
  recipe_duration,
  recipe_person,
  recipe_level,
}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(null);

  const isFavorite = user.favorites.find(
    (oneRecipe) => oneRecipe.recipe_id === recipe_id
  );

  const isLike = user.likes.find(
    (oneRecipe) => oneRecipe.recipe_id === recipe_id
  );

  const handleClickFavorite = async (e) => {
    const resultUpdate = await updateRecipeFavorite(
      user,
      recipe_id,
      recipe_title
    );

    // Si resultatUpdate vaut true = j'ajoute une recette dans le state sinon je la retire
    if (resultUpdate) {
      dispatch(
        addOneFavorite({
          recipe_id,
          recipe_title,
          recipe_image_small,
          recipe_person,
          recipe_level,
          recipe_duration,
        })
      );
    } else {
      dispatch(deleteOneFavorite(recipe_id));
    }
    setUpdate(resultUpdate);
  };

  const handleClickLike = async (e) => {
    const resultUpdate = await updateRecipeLike(user, recipe_id, recipe_title);

    // Si resultatUpdate vaut true = j'ajoute une recette dans le state sinon je la retire
    if (resultUpdate) {
      dispatch(
        addOneLike({
          recipe_id,
          recipe_title,
          recipe_image_small,
          recipe_person,
          recipe_level,
          recipe_duration,
        })
      );
    } else {
      dispatch(deleteOneLike(recipe_id));
    }
    setUpdate(resultUpdate);
  };
  useEffect(() => {}, [update]);

  return (
    <article className="recipe-card relative bg-white border border-slate-300">
      <div className="mx-auto">
        <Image
          src={recipe_image_small}
          alt={`illustration de ${recipe_title}`}
          layout="fixed"
          height={200}
          width={200}
          priority={true}
        />
      </div>

      <div className="recipe-card-informations">
        <p className="flex items-center gap-1">
          <Clock style={"w-4 h-4 block"} /> {recipe_duration}min
        </p>
        <p className="flex items-center  gap-1">
          <Chart style={"w-4 h-4 block"} /> {recipe_level}
        </p>
        <p className="flex items-center text-center gap-1">
          <UserGroup style={"w-4 h-4 block"} /> {recipe_person}{" "}
          {recipe_person > 1 ? "personnes" : "personne"}
        </p>
      </div>
      <Link href={`/recipes/${recipe_id}`}>
        <a className="hover:cursor-pointer">
          <h2 className="text-slate-700 font-light text-xl mt-2 text-center">
            {recipe_title}
          </h2>
        </a>
      </Link>
      {user.isLogged && (
        <p className="py-1 text-center flex justify-end gap-1 absolute bottom-0 right-1">
          <button
            type="button"
            name="add-remove-favorite-button"
            aria-label="add remove favorite button"
            className="hover:text-amber-600 text-slate-500"
            onClick={handleClickFavorite}
          >
            {isFavorite ? (
              <StarSolid style={"w-4 h-4 text-amber-600"} />
            ) : (
              <Star style={"w-4 h-4"} />
            )}
          </button>
          <button
            type="button"
            name="add-remove-like-button"
            aria-label="add remove like button"
            className="hover:text-blue-400 text-slate-500"
            onClick={handleClickLike}
          >
            {isLike ? (
              <LikeSolid style={"w-4 h-4 text-blue-400"} />
            ) : (
              <Like style={"w-4 h-4"} />
            )}
          </button>
        </p>
      )}
    </article>
  );
};

export default CardRecipe;

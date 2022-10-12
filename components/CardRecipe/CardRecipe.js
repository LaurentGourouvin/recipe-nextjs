import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart } from "../elements/icons/Heart";
import { HeartSolid } from "../elements/icons/HeartSolid";
import { Like } from "../elements/icons/Like";
import { updateRecipeFavorite } from "../../utils/likeFavorites";
import {
  getFavorites,
  deleteOneFavorite,
  addOneFavorite,
} from "../../redux/slice/userSlice";

const CardRecipe = ({ recipe_image, recipe_title, recipe_id }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(null);
  const isFavorite = user.favorites.find(
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
      dispatch(addOneFavorite({ recipe_id, recipe_title }));
    } else {
      dispatch(deleteOneFavorite(recipe_id));
    }
    setUpdate(resultUpdate);
  };

  useEffect(() => {}, [update]);

  return (
    <article className="recipe-card relative">
      <Image
        className="rounded-xl"
        src={recipe_image}
        alt="crumble aux prunes"
        layout="intrinsic"
        width={220}
        height={220}
      />

      <Link href={`/recipes/${recipe_id}`}>
        <a className="hover:cursor-pointer">
          <h2 className="text-rose-600 font-light mt-2 text-center">
            {recipe_title}
          </h2>
        </a>
      </Link>
      {user.isLogged && (
        <p className="py-1 text-center flex justify-end gap-1 absolute bottom-0 right-0">
          <button
            type="button"
            className="hover:text-red-600"
            onClick={handleClickFavorite}
          >
            {isFavorite ? (
              <HeartSolid style={"w-4 h-4 text-red-400"} />
            ) : (
              <Heart style={"w-4 h-4"} />
            )}
          </button>
          <button type="button" className="hover:text-blue-400">
            <Like style={"w-4 h-4"} />
          </button>
        </p>
      )}
    </article>
  );
};

export default CardRecipe;

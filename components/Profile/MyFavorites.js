import { useEffect } from "react";
import { useSelector } from "react-redux";
import RecipesList from "../Recipes";

const MyFavorites = (props) => {
  const user = useSelector((state) => state.user);

  useEffect(() => {}, [user.favorites.lentgh]);

  return (
    <>
      <section className="my-2 bg-slate-800 text-white p-2 rounded-lg shadow-md">
        <p>Voici vos recettes préférées !</p>
      </section>
      <section className="container-recipe-card">
        {user.favorites.length > 0 ? (
          <RecipesList data={user.favorites} />
        ) : (
          <p>Vous n&apos;avez aucune recette en favoris :(</p>
        )}
      </section>
    </>
  );
};
export default MyFavorites;

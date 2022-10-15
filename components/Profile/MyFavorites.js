import { useGetFavoritesByUserId } from "../../axios/likeFavorites/likeFavorites";
import Loading from "../Loading/Loading";
import CardRecipe from "../CardRecipe/CardRecipe";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MyFavorites = (props) => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log("composant");
  }, [user.favorites.lentgh]);

  return (
    <>
      <section className="my-2 bg-slate-800 text-white p-2 rounded-lg shadow-md">
        <p>Voici vos recettes préférées !</p>
      </section>
      <section className="container-recipe-card">
        {user.favorites.length > 0 ? (
          user.favorites.map((recipe) => (
            <CardRecipe key={recipe.recipe_id} {...recipe} />
          ))
        ) : (
          <p>Vous n&apos;avez aucune recette en favoris :(</p>
        )}
      </section>
    </>
  );
};
export default MyFavorites;

import { useSelector } from "react-redux";
import UpdateRecipeProfile from "../../../components/Profile/UpdateRecipeProfile";
import MenuProfile from "../../../components/Profile/MenuProfile";
import Head from "next/head";
import { useRouter } from "next/router";
import { getRecipeById } from "../../../axios/recipe/axios_recipe";
import {
  getIngredientByRecipeId,
  getAllIngredients,
} from "../../../axios/ingredient/ingredient";
import { useEffect, useState } from "react";

const UpdateRecipe = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState({});
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientsBdd, setIngredientsBdd] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchRecipe = async () => {
      const recipe = await getRecipeById(id);
      setRecipe(recipe.data);
    };
    const fetchIngredientByRecipeId = async () => {
      const ingredients = await getIngredientByRecipeId(id);
      setIngredientsList(ingredients.data);
    };
    const fetchAllIngredient = async () => {
      const ingredients = await getAllIngredients();
      setIngredientsBdd(ingredients.data);
    };

    fetchRecipe();
    fetchIngredientByRecipeId();
    fetchAllIngredient();
  }, [id]);
  return (
    <>
      <Head>
        <meta name="description" content="Site de recette en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Mise à jour d&apos;une recette</title>
      </Head>
      <div className="container p-2">
        {!user.isLogged && (
          <p className="text-lg text-white">Vous n&apos;êtes pas connecté</p>
        )}
        {user.isLogged && (
          <>
            <MenuProfile />

            <UpdateRecipeProfile
              {...recipe}
              ingredientsList={ingredientsList}
              ingredientsBdd={ingredientsBdd}
            />
          </>
        )}
      </div>
    </>
  );
};

export default UpdateRecipe;

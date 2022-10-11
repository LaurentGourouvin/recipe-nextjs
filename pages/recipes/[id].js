import { useState } from "react";
import { useRouter } from "next/router";
import { useGetRecipeById } from "../../axios/recipe/axios_recipe";
import Loading from "../../components/Loading/Loading";
import RecipeDetail from "../../components/RecipeDetail/RecipeDetail";

const Recipe = () => {
  const myRecipe = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const {
    data: recipe,
    error,
    loading,
  } = useGetRecipeById(`/recipe/recipebyid/${id}`);

  return (
    <>
      {loading && <Loading />}
      {!loading && <RecipeDetail {...recipe} />}
    </>
  );
};
export default Recipe;

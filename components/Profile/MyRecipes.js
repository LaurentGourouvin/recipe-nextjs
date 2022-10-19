import { useGetRecipeByUserId } from "../../axios/recipe/axios_recipe";
import Loading from "../Loading/Loading";
import RecipesList from "../Recipes/";

const MyRecipes = (props) => {
  const { data: recipes, loading } = useGetRecipeByUserId(`/recipe/recipebyuserid/${props.id}`);

  return (
    <>
      <section className="my-2 bg-slate-800 text-white p-2 rounded-lg shadow-md">
        <p>Voici les recettes que vous avez ajouté sur notre site internet.</p>
        <p>Nous vous remercions de contribuer à la communauté de &quot;Recipe&quot;</p>
      </section>
      <section className="container-recipe-card">
        {loading && <Loading />}
        {!loading && <RecipesList data={recipes} />}
      </section>
    </>
  );
};
export default MyRecipes;

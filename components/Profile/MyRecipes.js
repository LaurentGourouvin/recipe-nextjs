import { useGetRecipeByUserId } from "../../axios/recipe/axios_recipe";
import Loading from "../Loading/Loading";
import CardRecipe from "../CardRecipe/CardRecipe";
import { data } from "autoprefixer";

const MyRecipes = (props) => {
  const recipes = useGetRecipeByUserId(`/recipe/recipebyuserid/${props.id}`);

  return (
    <>
      <section className="my-2 bg-slate-800 text-white p-2 rounded-lg shadow-md">
        <p>Voici les recettes que vous avez ajouté sur notre site internet.</p>
        <p>
          Nous vous remercions de contribuer à la communauté de
          &quot;Recipe&quot;
        </p>
      </section>
      <section className="container-recipe-card">
        {/* {recipes.loading ? (
          <Loading />
        ) : (
          recipes.data.map((recipe) => (
            <CardRecipe key={recipe.recipe_id} {...recipe} />
          ))
        )} */}
        {recipes.loading && <Loading />}
        {recipes?.data ? (
          recipes.data.map((recipe) => (
            <CardRecipe key={recipe.recipe_id} {...recipe} />
          ))
        ) : (
          <p>Vous n&apos;avez créer aucune recette :(</p>
        )}
      </section>
    </>
  );
};
export default MyRecipes;

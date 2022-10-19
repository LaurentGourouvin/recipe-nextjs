import CardRecipe from "../components/Recipes/CardRecipe";

const useListRecipe = (data) => {
  return data.map((recipe) => <CardRecipe key={recipe.recipe_id} recipe={recipe} />);
};
export default useListRecipe;

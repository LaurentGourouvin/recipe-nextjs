import useListRecipe from "../../hooks/useListRecipe";

const RecipesList = ({ data }) => {
  const listRecipe = useListRecipe(data);
  return <section className="container-recipe-card">{listRecipe}</section>;
};

export default RecipesList;

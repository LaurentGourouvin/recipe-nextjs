// Import node_module
import { useState, useEffect } from "react";

// Import own module
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { getRecipeByName } from "../../axios/recipe/axios_recipe";
import CardRecipe from "../CardRecipe/CardRecipe";

const SearchBar = ({ searchBarIsOpen, setSearchBarIsOpen }) => {
  const refSearchBar = useClickOutSide(() => setSearchBarIsOpen(false));
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangeSearchText = async (e) => {
    setSearchText((prevState) => e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("j'envoie le formulaire");
    setLoading(false);
    const searchRecipes = await getRecipeByName(searchText);
    setRecipes((prevState) => searchRecipes.data);
    setLoading(false);
  };

  useEffect(() => {}, [loading]);

  return (
    <div
      ref={refSearchBar}
      className={`bg-app bg-app-searchbar  bg-slate-50 text-slate-700 p-2 pb-10 fixed right-0 h-full max-h-screen w-full md:w-1/5 overflow-auto
    ${!searchBarIsOpen ? "translate-x-full " : ""} duration-300 md:shadow-2xl`}
    >
      <section className="my-2  flex flex-col items-center">
        <article>
          <h2 className="text-2xl">Rechercher une recette</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Ex: tartes aux fraises"
              className="p-2 border border-slate-400 rounded"
              value={searchText}
              onChange={handleChangeSearchText}
            />
            <button type="submit">Rechercher</button>
          </form>
        </article>
        <article className="my-2 p-2 h-1/2 overflow-y">
          {recipes?.length > 0 && (
            <>
              <h3 className="text-xl">Résultat de votre recherche: </h3>
              <div className="flex flex-col gap-2">
                {recipes.map((oneRecipe) => (
                  <CardRecipe
                    key={oneRecipe.recipe_id}
                    searchBarIsOpen={searchBarIsOpen}
                    setSearchBarIsOpen={setSearchBarIsOpen}
                    {...oneRecipe}
                  />
                ))}
              </div>
            </>
          )}
        </article>
      </section>
    </div>
  );
};

export default SearchBar;

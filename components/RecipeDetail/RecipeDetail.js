// Import node_module
import Head from "next/head";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// Import Own Module
import { Edit } from "../elements/icons/Edit";
import { Trash } from "../elements/icons/Trash";
import { Clock } from "../elements/icons/Clock";
import { Chart } from "../elements/icons/Chart";
import { UserGroup } from "../elements/icons/UserGroup";
import { deleteRecipe } from "../../axios/recipe/axios_recipe";
import { useGetIngredientsByRecipe } from "../../axios/ingredient/ingredient";
import { ChevronLeft } from "../elements/icons/ChevronLeft";

const RecipeDetail = (recipe) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const { loading, data: ingredients } = useGetIngredientsByRecipe(
    Number(router.query.id)
  );

  const deleteTheRecipe = async () => {
    const deleteThisRecipe = await deleteRecipe(recipe.recipe_id);
    if (deleteThisRecipe?.status === 204) {
      toast.success("Recette supprimée, redirection en cours...");
      router.push("/profile/recipes");
    } else {
      toast.warning("Echec lors de la suppression");
    }
  };

  return (
    <>
      <Head>
        <meta name="description" content="Site de recette en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Recette : {`${recipe.recipe_title}`}</title>
      </Head>
      <section className="flex flex-col gap-2 mb-5 bg-white bg-opacity-90 border border-slate-300  rounded-lg">
        <p className="p-2 font-semibold">
          <a className="flex" onClick={() => router.back()}>
            <ChevronLeft style={"h-6 w-6"} /> Retour
          </a>
        </p>
        <header className="flex flex-col items-center relative">
          <h2 className="text-2xl text-rose-500 text-center font-bold py-2">
            {recipe.recipe_title}
          </h2>

          <p className="self-end flex p-2">
            {user.id === recipe.user_id ? (
              <>
                <Edit />
                <button
                  name="delete-recipe-button"
                  aria-label="delete recipe button"
                  type="button"
                  onClick={deleteTheRecipe}
                >
                  <Trash />
                </button>
              </>
            ) : null}
          </p>

          <div
            style={{ backgroundImage: `url(${recipe.recipe_image_medium})` }}
            className="w-full min-h-[10rem] sm:min-h-[20rem] bg-cover bg-center bg-no-repeat relative border-t border-b border-slate-300 aspect-square sm:aspect-auto"
          ></div>
        </header>
        <section>
          <article className="recipe-detail-informations">
            <p className="flex items-center justify-center gap-2">
              <Clock style={"w-6 h-6 block"} /> {recipe.recipe_duration}min
            </p>
            <p className="flex items-center justify-center gap-2">
              <Chart style={"w-6 h-6 block"} /> {recipe.recipe_level}
            </p>
            <p className="flex items-center justify-center gap-2">
              <UserGroup style={"w-6 h-6 block"} /> {recipe.recipe_person}{" "}
              {recipe.recipe_person > 1 ? " personnes" : " personne"}
            </p>
          </article>
          <hr />
        </section>
        <section className="p-2">
          <h3 className="text-xl text-rose-500 ">Ingrédients</h3>
          <article>
            <ul className="px-4 py-2">
              {!loading &&
                ingredients.map((oneIngeredient, index) => (
                  <li
                    key={index}
                  >{`${oneIngeredient.recipe_has_ingredient_quantity} ${oneIngeredient.recipe_has_ingredient_unit} - ${oneIngeredient.ingredient_name}`}</li>
                ))}
            </ul>
          </article>
        </section>
        <main className="p-2">
          <p
            dangerouslySetInnerHTML={{ __html: recipe.recipe_description }}
          ></p>
        </main>

        <footer className="flex flex-col text-right p-2">
          <p>
            Auteur:{" "}
            <span className="italic text-rose-500">
              {recipe.user_firstname} {recipe.user_lastname}
            </span>
          </p>
          <p>
            Créee le{" "}
            <span className="italic">
              {recipe.recipe_created_at?.split("", 10)}
            </span>
          </p>
        </footer>
      </section>
    </>
  );
};

export default RecipeDetail;

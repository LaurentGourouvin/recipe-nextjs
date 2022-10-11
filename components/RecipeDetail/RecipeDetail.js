import Image from "next/image";
import { Edit } from "../elements/icons/Edit";
import { Trash } from "../elements/icons/Trash";
import { useSelector } from "react-redux";
import { deleteRecipe } from "../../axios/recipe/axios_recipe";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const RecipeDetail = (recipe) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();

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
    <section className="flex flex-col gap-2">
      <header className="flex flex-col items-center">
        <h2 className="text-2xl text-red-500 self-start">
          {recipe.recipe_title}
        </h2>

        <p className="self-end flex p-2">
          {user.id === recipe.user_id ? (
            <>
              <Edit />
              <button type="button" onClick={deleteTheRecipe}>
                <Trash />
              </button>
            </>
          ) : null}
        </p>
        <Image
          src={recipe?.recipe_image}
          alt="Image de la recette"
          layout="fixed"
          width={325}
          height={220}
          className="rounded"
        />
      </header>

      <main>
        <p dangerouslySetInnerHTML={{ __html: recipe.recipe_description }}></p>
      </main>

      <footer className="flex flex-col text-right">
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
  );
};

export default RecipeDetail;

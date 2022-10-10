import Image from "next/image";
import { Edit } from "../elements/icons/Edit";
import { Trash } from "../elements/icons/Trash";
import { useSelector } from "react-redux";

const RecipeDetail = (recipe) => {
  const user = useSelector((state) => state.user);

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
              <Trash />
            </>
          ) : null}
        </p>
        <Image
          src={recipe.recipe_image}
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

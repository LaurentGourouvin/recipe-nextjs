// Import node_module
import Link from "next/link";
import Image from "next/image";

// Import Own Module
import BookmarkAndLike from "../BookmarkAndLike/BookmarkAndLike";
import AuthRequired from "../AuthRequired/AuthRequired";

// Import icons
import { Clock } from "../elements/icons/Clock";
import { Chart } from "../elements/icons/Chart";
import { UserGroup } from "../elements/icons/UserGroup";

const CardRecipe = (props) => {
  const { recipe } = props;

  return (
    <article className="recipe-card relative bg-white border border-slate-300">
      <div className="mx-auto">
        <Link href={`/recipes/${recipe.recipe_id}`}>
          <a className="hover:cursor-pointer">
            <Image
              src={recipe.recipe_image_small}
              alt={`illustration de ${recipe.recipe_title}`}
              layout="fixed"
              height={200}
              width={200}
              priority={true}
            />
          </a>
        </Link>
      </div>

      <div className="recipe-card-informations">
        <p className="flex items-center gap-1">
          <Clock style={"w-4 h-4 block"} /> {recipe.recipe_duration}min
        </p>
        <p className="flex items-center  gap-1">
          <Chart style={"w-4 h-4 block"} /> {recipe.recipe_level}
        </p>
        <p className="flex items-center text-center gap-1">
          <UserGroup style={"w-4 h-4 block"} /> {recipe.recipe_person}{" "}
          {recipe.recipe_person > 1 ? "personnes" : "personne"}
        </p>
      </div>
      <Link href={`/recipes/${recipe.recipe_id}`}>
        <a className="hover:cursor-pointer">
          <h2 className="text-slate-700 font-light text-xl mt-2 text-center">{recipe.recipe_title}</h2>
        </a>
      </Link>
      <AuthRequired>
        <BookmarkAndLike {...recipe} />
      </AuthRequired>
    </article>
  );
};

export default CardRecipe;

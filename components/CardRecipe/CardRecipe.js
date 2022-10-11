import Image from "next/image";
import Link from "next/link";
const CardRecipe = ({ recipe_image, recipe_title, recipe_id }) => {
  return (
    <article className="recipe-card">
      <Image
        className="rounded-xl"
        src={recipe_image}
        alt="crumble aux prunes"
        layout="intrinsic"
        width={220}
        height={220}
      />
      <Link href={`/recipes/${recipe_id}`}>
        <a className="hover:cursor-pointer">
          <h2 className="text-rose-600 font-light mt-2">{recipe_title}</h2>
        </a>
      </Link>
    </article>
  );
};

export default CardRecipe;

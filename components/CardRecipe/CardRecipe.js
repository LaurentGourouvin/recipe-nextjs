import Image from "next/image";

const CardRecipe = ({ imageUrl, titleRecipe, idRecipe }) => {
  return (
    <article className="recipe-card">
      <Image
        className="rounded-xl"
        src={imageUrl}
        alt="crumble aux prunes"
        layout="intrinsic"
        width={220}
        height={220}
      />
      <h2 className="text-rose-600 font-light mt-2">{titleRecipe}</h2>
    </article>
  );
};

export default CardRecipe;

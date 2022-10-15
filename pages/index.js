// Import Next/React
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

// Own import
import CardRecipe from "../components/CardRecipe/CardRecipe";
import Loading from "../components/Loading/Loading";
import { useGetAllRecipe } from "../axios/recipe/axios_recipe";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: recipes, error, loading } = useGetAllRecipe("/recipe");

  return (
    <>
      <Head>
        <meta name="description" content="Site de recette en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Recipe</title>
      </Head>

      <div className="text-white">
        {/* <Navbar /> */}
        <section className="container mb-2 p-2 bg-black bg-opacity-30 rounded-md">
          <h1 className="text-2xl text-center font-bold p-2">
            Découvrez des recettes en ligne créees par notre communauté
          </h1>
          <article className="flex flex-col text-justify  gap-2 p-2 rounded-lg items-center ">
            <Image
              src="/images/design/chef-resize.png"
              alt="Toque de chef"
              layout="fixed"
              width={280}
              height={200}
              priority={true}
            />
            <p>
              Vous ne savez pas quoi à faire manger ce soir ? Vous voulez
              préparer un planning de repas pour les semaines à venir ?
            </p>
            <p>
              N&apos;hésitez plus, notre communauté vos proposes des recettes
              parfaite pour vous aider !
            </p>
            <p>
              Parcourez notre site afin de trouver LA recette qui vous convient
              !
            </p>
          </article>
        </section>
        <section className="container-recipe-card rounded-lg p-2">
          {loading && <Loading />}
          {recipes &&
            recipes.map((oneRecipe) => (
              <CardRecipe key={oneRecipe.recipe_id} {...oneRecipe} />
            ))}
        </section>
      </div>
    </>
  );
};

export default Home;

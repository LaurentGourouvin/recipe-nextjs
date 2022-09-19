// Import Next/React
import { useState } from "react";
import Image from "next/image";

// Own import
import Navbar from "../components/Navbar/Navbar";
import CardRecipe from "../components/CardRecipe/CardRecipe";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-slate-600">
      {/* <Navbar /> */}
      <section className="container-recipe-card ">
        {/* <CardRecipe titleRecipe={"Crumble aux prunes"} />
        <CardRecipe titleRecipe={"Boudin noir"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} />
        <CardRecipe titleRecipe={"Tartiflette"} /> */}

        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/crumble_aux_prunes.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Crumble aux prunes</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/pain_courgette_surimis.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">
            Pain de courgettes au Surimis
          </h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/aubergine_a_la_parmesane.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">
            Aubergine à la parmesane
          </h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/lasagne_bolo.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">
            Lasagnes à la bolognaises
          </h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/moussaka_grec.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Moussaka Grecque</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/chili_con_carne.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Chili Con Carne</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/tartiflette.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Tartiflette</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/couscous_poulet_merguez.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">
            Couscous Poulet Merguez
          </h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/croque_monsieur.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Croque-Monsieur</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/bo_bun.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Bo Bun</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/gratin_pate.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Gratin de pâtes</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/riz_cantonais.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Riz Cantonais</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/poulet_coco_curry.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">
            Poulet au coco et curry
          </h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/boudin_noir_pomme.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">
            Boudins noirs aux pommes
          </h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/pad_thai.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Pad Thai</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/poivron_farci.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Poivrons farcis</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/raviolis_japonais.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Raviolis Japonais</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/ramens_boeuf.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Ramens aux boeufs</h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/escalope_veau.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">
            Escalops de veaux à la crème
          </h2>
        </article>
        <article className="recipe-card">
          <Image
            className="rounded-xl"
            src="/images/recette/mac_cheese.webp"
            alt="crumble aux prunes"
            layout="intrinsic"
            width={220}
            height={220}
          />
          <h2 className="text-rose-600 font-light mt-2">Mac and Cheese</h2>
        </article>
      </section>
    </div>
  );
};

export default Home;

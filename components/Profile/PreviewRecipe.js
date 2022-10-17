// Import Own Module
import { Clock } from "../elements/icons/Clock";
import { Chart } from "../elements/icons/Chart";
import { UserGroup } from "../elements/icons/UserGroup";

const PreviewRecipe = ({
  setPreviewIsOpen,
  recipeTitle,
  recipeImage,
  recipeIngredients,
  recipeDescription,
  recipePerson,
  recipeDuration,
  recipeLevel,
  recipeAuthor,
}) => {
  const date = new Date(Date.now());
  return (
    <div className="absolute mx-auto top-14 h-[80vh] w-[80vw] z-11 bg-white">
      <section className="flex flex-col gap-2 mb-5 bg-white bg-opacity-90 border border-slate-300  rounded-lg">
        <button
          className="bg-red-700 p-2 w-fit text-white"
          onClick={() => setPreviewIsOpen(false)}
        >
          Fermer la preview
        </button>
        <header className="flex flex-col items-center relative">
          <h2 className="text-2xl text-rose-500 text-center font-bold py-2">
            {recipeTitle}
          </h2>

          <div
            style={{ backgroundImage: `url(${recipeImage})` }}
            className="w-full min-h-[10rem] sm:min-h-[20rem] bg-cover bg-center bg-no-repeat relative border-t border-b border-slate-300 aspect-square sm:aspect-auto"
          ></div>
        </header>
        <section>
          <article className="recipe-detail-informations">
            <p className="flex items-center justify-center gap-2">
              <Clock style={"w-6 h-6 block"} /> {recipeDuration}min
            </p>
            <p className="flex items-center justify-center gap-2">
              <Chart style={"w-6 h-6 block"} /> {recipeLevel}
            </p>
            <p className="flex items-center justify-center gap-2">
              <UserGroup style={"w-6 h-6 block"} /> {recipePerson}{" "}
              {recipePerson > 1 ? " personnes" : " personne"}
            </p>
          </article>
          <hr />
        </section>
        <section className="p-2">
          <h3 className="text-xl text-rose-500 ">Ingrédients</h3>
          <article>
            <ul className="px-4 py-2">
              {recipeIngredients.map((oneIngredient) => (
                <li
                  key={oneIngredient.id}
                >{`${oneIngredient.quantity} ${oneIngredient.unit} ${oneIngredient.name}`}</li>
              ))}
            </ul>
          </article>
        </section>
        <main className="p-2">
          <p dangerouslySetInnerHTML={{ __html: recipeDescription }}></p>
        </main>

        <footer className="flex flex-col text-right p-2">
          <p>
            Auteur: <span className="italic text-rose-500">{recipeAuthor}</span>
          </p>
          <p>
            Créee le{" "}
            <span className="italic">{`${date.getFullYear()} - ${
              date.getMonth() + 1
            } - ${date.getDate()}  
            `}</span>
          </p>
        </footer>
      </section>
    </div>
  );
};

export default PreviewRecipe;

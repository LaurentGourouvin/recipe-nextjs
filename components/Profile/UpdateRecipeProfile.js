// Import node_module
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

// Import Own Module
import Tiptap from "../Tiptap/Tiptap";
import { Clock } from "../elements/icons/Clock";
import { Chart } from "../elements/icons/Chart";
import { Check } from "../elements/icons/Check";
import { UserGroup } from "../elements/icons/UserGroup";
import { Pencil } from "../elements/icons/Pencil";
import { CancelIconCircle } from "../elements/icons/CancelIconCircle";
import { MinusCircle } from "../elements/icons/MinusCircle";

const UpdateRecipeProfile = ({
  recipe_title,
  recipe_duration,
  recipe_image_medium,
  recipe_person,
  recipe_level,
  recipe_created_at,
  recipe_description,
  user_firstname,
  user_lastname,
  ingredientsList,
  ingredientsBdd,
}) => {
  // Objet de configuration pour l'éditeur de texte
  const editor = useEditor({
    extensions: [
      Text,
      Paragraph,
      Document,
      Bold,
      Heading.configure({
        HTMLAttributes: {
          class: "font-semibold text-xl",
        },
      }),
    ],
    content:
      "<h1>Comment réaliser ma recette de carotte ?</h1> <p>Dans une premier temps...</p>",
  });

  const router = useRouter();

  // STATE des nouvelles données à envoyer à l'API
  const [updateRecipe, setUpdateRecipe] = useState({
    title: "",
    duration: "",
    level: "",
    person: "",
    description: "",
  });
  const [newIngredients, setNewIngredients] = useState([]);
  const [changeIngredient, setChangeIngredient] = useState({
    ingredient_id: 0,
    ingredient_name: "",
    recipe_has_ingredient_unit: "",
    recipe_has_ingredient_quantity: 0,
  });

  // STATE pour l'affichage des champs
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDuration, setIsEditDuration] = useState(false);
  const [isEditLevel, setIsEditLevel] = useState(false);
  const [isEditPerson, setIsEditPerson] = useState(false);
  const [isEditIngredients, setIsEditIngredients] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);

  // Handlers
  const handleSubmitTitle = (e) => {
    e.preventDefault();
    setIsEditTitle(!isEditTitle);
  };
  const handleSubmitDuration = (e) => {
    e.preventDefault();
    setIsEditDuration(!isEditDuration);
  };
  const handleSubmitLevel = (e) => {
    e.preventDefault();
    setIsEditLevel(!isEditLevel);
  };
  const handleSubmitPerson = (e) => {
    e.preventDefault();
    setIsEditPerson(!isEditPerson);
  };
  const handleSubmitIngredients = (e) => {
    e.preventDefault();

    //Je vérifie qu'il n'y a pas de doublons
    const checkDuplicate = newIngredients.find(
      (ingredient) =>
        ingredient.ingredient_id === changeIngredient.ingredient_id
    );

    if (!checkDuplicate) {
      setNewIngredients((prevState) => newIngredients.concat(changeIngredient));
    }
  };

  const handleClickRemoveIngredient = (id) => {
    const resultFilter = newIngredients.filter(
      (ingredient) => ingredient.ingredient_id !== id
    );
    console.log(resultFilter);
    setNewIngredients((prevState) => resultFilter);
  };
  return (
    <>
      <Head>
        <meta name="description" content="Site de recette en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Recette</title>
      </Head>
      <>
        <section className="flex flex-col gap-2 mb-5 bg-white bg-opacity-90 border border-slate-300  rounded-lg">
          <p className="p-2 font-semibold">Abandonner la mise à jour</p>
          <header className="flex flex-col items-center relative">
            <h2 className="text-2xl text-rose-500 text-center font-bold flex gap-1 py-2">
              {/* MODIFICATION DU TITRE DE LA RECETTE */}
              {!isEditTitle && (
                <>
                  {updateRecipe.title ? updateRecipe.title : recipe_title}
                  <span className="text-black">
                    <button
                      onClick={() => {
                        setIsEditTitle(!isEditTitle);
                      }}
                    >
                      <Pencil style={"h-5 w-5"} />
                    </button>
                  </span>
                </>
              )}
              {isEditTitle && (
                <>
                  <form onSubmit={handleSubmitTitle} className="flex">
                    <input
                      className="bg-slate-200 text-black rounded-md border border-slate-300 w-full mx-auto"
                      type="text"
                      placeholder={`${recipe_title}`}
                      onChange={(e) => {
                        setUpdateRecipe((prevState) => ({
                          ...prevState,
                          title: e.target.value,
                        }));
                      }}
                    />
                    <button type="submit">
                      <Check style={"h-5 w-5 text-green-600"} />
                    </button>
                    <button
                      type="reset"
                      onClick={() => {
                        setIsEditTitle(false);
                        setUpdateRecipe((prevState) => ({
                          ...prevState,
                          title: "",
                        }));
                      }}
                    >
                      <CancelIconCircle style={"h-5 w-5 text-red-600"} />
                    </button>
                  </form>
                </>
              )}
            </h2>
            <div
              style={{
                backgroundImage: `url(${recipe_image_medium})`,
              }}
              className="w-full min-h-[10rem] sm:min-h-[20rem] bg-cover bg-center bg-no-repeat relative border-t border-b border-slate-300 aspect-square sm:aspect-auto"
            ></div>
          </header>
          <section>
            <article className="recipe-detail-informations">
              {/* MODIFICATION DE LA DUREE DE LA RECETTE */}
              <p className="flex items-center justify-center gap-2">
                {!isEditDuration && (
                  <>
                    <Clock style={"w-6 h-6 block"} />{" "}
                    {updateRecipe.duration
                      ? updateRecipe.duration
                      : recipe_duration}
                    min{" "}
                    <button
                      onClick={() => {
                        setIsEditDuration(!isEditDuration);
                      }}
                    >
                      <Pencil style={"w-5 h-5 text-black"} />
                    </button>
                  </>
                )}
                {isEditDuration && (
                  <>
                    <form onSubmit={handleSubmitDuration} className="flex">
                      <input
                        className="bg-slate-200 text-black rounded-md border border-slate-300 w-1/2 mx-auto"
                        type="number"
                        placeholder={`${recipe_duration}`}
                        onChange={(e) => {
                          setUpdateRecipe((prevState) => ({
                            ...prevState,
                            duration: e.target.value,
                          }));
                        }}
                      />
                      <button type="submit">
                        <Check style={"h-5 w-5 text-green-600"} />
                      </button>
                      <button
                        type="reset"
                        onClick={() => {
                          setIsEditDuration(false);
                          setUpdateRecipe((prevState) => ({
                            ...prevState,
                            duration: "",
                          }));
                        }}
                      >
                        <CancelIconCircle style={"h-5 w-5 text-red-600"} />
                      </button>
                    </form>
                  </>
                )}
              </p>

              {/* MODIFICATION DE LA DIFFICULTE DE LA RECETTE */}
              <p className="flex items-center justify-center gap-2">
                {!isEditLevel && (
                  <>
                    <Chart style={"w-6 h-6 block"} />{" "}
                    {updateRecipe.level ? updateRecipe.level : recipe_level}
                    <button
                      onClick={() => {
                        setIsEditLevel(!isEditLevel);
                      }}
                    >
                      <Pencil style={"w-5 h-5 text-black"} />
                    </button>
                  </>
                )}
                {isEditLevel && (
                  <>
                    <form onSubmit={handleSubmitLevel} className="flex">
                      <select
                        onChange={(e) => {
                          setUpdateRecipe((prevState) => ({
                            ...prevState,
                            level: e.target.value,
                          }));
                        }}
                      >
                        <option value="Facile">Facile</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Difficile">Difficle</option>
                      </select>
                      <button type="submit">
                        <Check style={"h-5 w-5 text-green-600"} />
                      </button>
                      <button
                        type="reset"
                        onClick={() => {
                          setIsEditLevel(!isEditLevel);
                          setUpdateRecipe((prevState) => ({
                            ...prevState,
                            level: "",
                          }));
                        }}
                      >
                        <CancelIconCircle style={"h-5 w-5 text-red-600"} />
                      </button>
                    </form>
                  </>
                )}
              </p>

              {/* MODIFICATION DU NOMBRE DE PERSONNE */}
              <p className="flex items-center justify-center gap-2">
                {!isEditPerson && (
                  <>
                    <UserGroup style={"w-6 h-6 block"} />{" "}
                    {updateRecipe.person ? updateRecipe.person : recipe_person}
                    {recipe_person > 1 ? " personnes" : " personne"}
                    <button
                      onClick={() => {
                        setIsEditPerson(!isEditPerson);
                      }}
                    >
                      <Pencil style={"w-5 h-5 text-black"} />
                    </button>
                  </>
                )}
                {isEditPerson && (
                  <>
                    <form onSubmit={handleSubmitPerson} className="flex">
                      <input
                        className="bg-slate-200 text-black rounded-md border border-slate-300 w-1/2 mx-auto"
                        type="number"
                        placeholder={`${recipe_person}`}
                        onChange={(e) => {
                          setUpdateRecipe((prevState) => ({
                            ...prevState,
                            person: e.target.value,
                          }));
                        }}
                      />

                      <button type="submit">
                        <Check style={"h-5 w-5 text-green-600"} />
                      </button>
                      <button
                        type="reset"
                        onClick={() => {
                          setIsEditPerson(!isEditPerson);
                          setUpdateRecipe((prevState) => ({
                            ...prevState,
                            person: "",
                          }));
                        }}
                      >
                        <CancelIconCircle style={"h-5 w-5 text-red-600"} />
                      </button>
                    </form>
                  </>
                )}
              </p>
            </article>
            <hr />
          </section>
          <section className="p-2">
            <h3 className="text-xl text-rose-500 flex gap-1">
              Ingrédients
              <button
                type="button"
                onClick={() => {
                  setIsEditIngredients(!isEditIngredients);
                  if (newIngredients.length > 0) {
                    return;
                  }
                  setNewIngredients(ingredientsList);
                }}
              >
                <Pencil style={"w-5 h-5 text-black"} />
              </button>
            </h3>
            {!isEditIngredients && (
              <article>
                <ul className="px-4 py-2">
                  {newIngredients.length === 0
                    ? ingredientsList.map((oneIngredient, index) => (
                        <li
                          key={index}
                        >{`${oneIngredient.recipe_has_ingredient_quantity} ${oneIngredient.recipe_has_ingredient_unit} - ${oneIngredient.ingredient_name}`}</li>
                      ))
                    : newIngredients.map((ingredient, index) => (
                        <li
                          key={index}
                        >{`${ingredient.recipe_has_ingredient_quantity} ${ingredient.recipe_has_ingredient_unit} - ${ingredient.ingredient_name}`}</li>
                      ))}
                </ul>
              </article>
            )}
            {/* MODIFICATION DES INGREDIENTS */}
            {isEditIngredients && (
              <>
                <div className="flex flex-col sm:flex-row gap-2">
                  <article className="border border-slate-300 shadow-md rounded p-2 flex flex-col sm:w-1/2">
                    <form
                      onSubmit={handleSubmitIngredients}
                      className="flex flex-col"
                    >
                      <p>Sélectionner des ingrédients :</p>
                      <select
                        className="bg-slate-200 text-black rounded-md border border-slate-300"
                        type="option"
                        onChange={(e) => {
                          const ingredientWithId = ingredientsBdd.find(
                            (oneIngredient) =>
                              oneIngredient.ingredient_name === e.target.value
                          );
                          setChangeIngredient((prevState) => ({
                            ...prevState,
                            ingredient_name: e.target.value,
                            ingredient_id: ingredientWithId.ingredient_id,
                          }));
                        }}
                        required
                      >
                        <option>
                          -- Merci de sélectionner un ingrédient --
                        </option>
                        {ingredientsBdd?.length > 0
                          ? ingredientsBdd.map((ingredient) => (
                              <option
                                key={ingredient.ingredient_id}
                                id={ingredient.ingredient_id}
                              >
                                {ingredient.ingredient_name}
                              </option>
                            ))
                          : ""}
                      </select>
                      <label className="flex justify-evenly gap-1 py-2">
                        Quantité :
                        <input
                          type="number"
                          placeholder="0"
                          className="bg-slate-200 text-black rounded-md w-[2.5rem] text-center border border-slate-300"
                          onChange={(e) => {
                            setChangeIngredient((prevState) => ({
                              ...prevState,
                              recipe_has_ingredient_quantity: e.target.value,
                            }));
                          }}
                          required
                        />
                        <select
                          type="option"
                          className="bg-slate-200 text-black rounded-md border border-slate-300"
                          onChange={(e) => {
                            setChangeIngredient((prevState) => ({
                              ...prevState,
                              recipe_has_ingredient_unit: e.target.value,
                            }));
                          }}
                          required
                        >
                          <option></option>
                          <option value="ml">ml</option>
                          <option value="cl">cl</option>
                          <option value="L">L</option>
                          <option value="Gr">Gr</option>
                          <option value="Kg">Kg</option>
                          <option value="pièce(s)">pièce(s)</option>
                        </select>
                        unité
                      </label>
                      <button
                        type="submit"
                        className="rounded bg-green-600 text-white w-1/2 text-sm p-1 my-2 mx-auto"
                      >
                        Ajouter l&apos;ingrédient
                      </button>
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          className="flex p-2 text-white items-center rounded my-2 bg-green-600"
                          onClick={() => {
                            setIsEditIngredients(!isEditIngredients);
                          }}
                        >
                          Valider les ingrédients
                        </button>
                      </div>
                    </form>
                  </article>
                  <article className="border border-slate-300 shadow-md rounded p-2 flex flex-col sm:w-1/2">
                    Liste des ingredients:
                    <ul>
                      {newIngredients.map((oneIngredient, index) => (
                        <li className="flex" key={index}>
                          <button
                            type="button"
                            onClick={() =>
                              handleClickRemoveIngredient(
                                oneIngredient.ingredient_id
                              )
                            }
                          >
                            <MinusCircle style={"h-5 w-5 text-red-500"} />
                          </button>
                          {`${oneIngredient.recipe_has_ingredient_quantity} ${oneIngredient.recipe_has_ingredient_unit} - ${oneIngredient.ingredient_name}`}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </>
            )}
          </section>
          <main className="p-2">
            <button
              type="button"
              className="flex gap-1 mx-auto my-2 sm:mx-0 items-center bg-amber-500 shadow:md p-2 rounded text-white"
              onClick={() => {
                setIsEditDescription(!isEditDescription);
              }}
            >
              Modifier la description <Pencil style={"w-4 h-4"} />
            </button>
            {!isEditDescription && (
              <p dangerouslySetInnerHTML={{ __html: recipe_description }}></p>
            )}
            {isEditDescription && <Tiptap editor={editor} />}
          </main>

          <footer className="flex flex-col text-right p-2">
            <p>
              Auteur:{" "}
              <span className="italic text-rose-500">
                {user_firstname} {user_lastname}
              </span>
            </p>
            <p>
              Créee le{" "}
              <span className="italic">{recipe_created_at?.split("", 10)}</span>
            </p>
          </footer>
        </section>
      </>
    </>
  );
};
export default UpdateRecipeProfile;

// Import node_module
import { useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// Import Own Module
import Tiptap from "../Tiptap/Tiptap";
import { createRecipe } from "../../axios/recipe/axios_recipe";
import { useGetAllIngredients } from "../../axios/ingredient/ingredient";
import { MinusCircle } from "../elements/icons/MinusCircle";

const AddRecipe = () => {
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

  // State [A REFACTORISER]
  const router = useRouter();
  const [recipeTitle, setRecipeTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [ingredientsForRecipe, setIngredientsForRecipe] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState(0);
  const [person, setPerson] = useState(0);
  const [unit, setUnit] = useState("");
  const [errorForm, setErrorForm] = useState({
    duration: "",
    person: "",
    ingredient: "",
  });
  const [selectIngredient, setSelectIngredient] = useState({
    id: null,
    name: "",
    quantity: 0,
    unit: "unité",
  });
  const { error, data: ingredientsList } = useGetAllIngredients();

  // Contrôle du champ title
  const handleChangeTitle = (e) => {
    setRecipeTitle(e.target.value);
  };

  // Contrôle du champ file
  const handleChangeSelectedFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Gestion de la liste des ingredients
  const handleChangeSelectedIngredient = (e) => {
    const ingredient = ingredientsList.find(
      (ingredient) => ingredient.ingredient_name === e.target.value
    );

    setSelectIngredient((prevState) => ({
      ...prevState,
      id: ingredient?.ingredient_id,
      name: e.target.value,
    }));
  };

  // Contrôle du champ unit
  const handleChangeUnit = (e) => {
    setUnit((prevState) => e.target.value);
    setSelectIngredient((prevState) => ({
      ...prevState,
      unit: e.target.value,
    }));
  };

  // Contrôle du champ quantity
  const handleChangeQuantity = (e) => {
    setQuantity((prevState) => e.target.value);
    setSelectIngredient((prevState) => ({
      ...prevState,
      quantity: Number(e.target.value),
    }));
  };

  // Contrôle du champ person
  const handleChangePerson = (e) => {
    setPerson((prevState) => Number(e.target.value));
  };

  // Contrôle du champ duration
  const handleChangeDuration = (e) => {
    setDuration((prevState) => Number(e.target.value));
  };

  // Contrôle du champ level
  const handleChangeLevel = (e) => {
    setLevel((prevState) => e.target.value);
  };

  // Fonction pour retirer un ingrédient de la liste
  const handleClickRemoveIngredient = (id) => {
    // je supprime l'ingrédiant ayant l'$id de la liste
    const listToFilter = ingredientsForRecipe.filter(
      (ingredient) => ingredient.id !== id
    );
    setIngredientsForRecipe((prevState) => listToFilter);
  };

  // Fonction pour ajouter des ingrédients à la nouvelle recette
  const handleClickAddIngredient = (e) => {
    // Vérification pour éviter les doublons
    const checkDuplicate = ingredientsForRecipe.find(
      (ingredient) => ingredient.id === selectIngredient.id
    );
    // Si l'utilisateur sélectionne l'option par défaut, je quitte la fonction
    if (selectIngredient?.id === undefined) return null;

    if (quantity === 0 || unit === "") {
      toast.warning(
        "Merci de selectionner une quantité et une unité de mesure !"
      );

      return null;
    }
    // Si pas de doublons, je l'ajoute à la liste
    if (!checkDuplicate) {
      setIngredientsForRecipe((prevState) =>
        ingredientsForRecipe.concat(selectIngredient)
      );
      setErrorForm((prevState) => ({ ...prevState, ingredient: "" }));
    }

    // Après l'ajout d'un ingrédient je remets les champs quantity et unit aux valeur initiales
    setQuantity((prevState) => 0);
    setUnit((prevState) => "");
  };

  // Envoie du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Je remets à zéro mes erreurs avant chaque verification de champs pour l'envoie des données
    setErrorForm((prevState) => ({ duration: "", person: "", ingredient: "" }));

    // Je vérifie que j'ai bien des ingrédients dans ma liste pour la nouvelle recette
    if (ingredientsForRecipe.length === 0) {
      setErrorForm((prevState) => ({
        ...prevState,
        ingredient: "Merci d'ajouter des ingrédients",
      }));
    }

    // Constitution du FormData pour l'envoie des données à l'API
    const formData = new FormData();
    formData.append("title", recipeTitle);
    formData.append("file", selectedFile);
    formData.append("description", editor.getHTML());

    // A TERMINER MODIFICATION DU FORMDATA AVEC LES NOUVELLES ENTREE BDD
    formData.append("level", level);
    formData.append("duration", duration);
    formData.append("person", person);

    // Je dois créer une nouvelle entrée de mon formData par ingrédient dans ma liste
    ingredientsForRecipe.forEach((ingredient, index) => {
      formData.append(`ingredient_${index}`, JSON.stringify(ingredient));
    });

    // Je boucle sur mon formdata pour détecter des erreurs avec mon formulaire
    for (let data of formData) {
      switch (data[0]) {
        case "duration":
          if (data[1] === "0") {
            setErrorForm((prevState) => ({
              ...prevState,
              duration: "La durée ne peut être à 0",
            }));
          }
          break;

        case "person":
          if (data[1] === "0") {
            setErrorForm((prevState) => ({
              ...prevState,
              person: "La recette doit être pour minimum une personne",
            }));
          }
          break;
        default:
          break;
      }
    }

    // A REACTIVER POUR L'ENVOIE DES DONNEES A L'API !!!!

    const resultCreateRecipe = await createRecipe(formData);
    if (resultCreateRecipe.status === 201) {
      toast.success("Recette créee ! Redirection en cours...");
      setErrorForm((prevState) => ({
        ...prevState,
        duration: "",
        person: "",
        ingredient: "",
      }));
      setTimeout(() => {
        router.push(`/recipes/${resultCreateRecipe.data.recipe_id}`);
      }, 1500);
    } else {
      toast.warning(
        "Création de la recette impossible. Merci de vous reconnecter !"
      );
    }
  };

  return (
    <>
      <section className="my-2 bg-slate-800 text-white p-2 rounded-lg shadow-md">
        <h3 className="text-lg text-center ">
          Envie de partager vos talents culinaire avec la communauté ? Vous êtes
          au bon endroit ! A vous de jouer !
        </h3>
      </section>
      <section>
        <form
          onSubmit={handleSubmit}
          className="py-2"
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between my-2 ">
            <article className="bg-white hover:bg-slate-50 border border-slate-300 shadow-md p-2 rounded-lg">
              <label className="flex flex-col items-center">
                <p className="py-2">Nom de votre superbe recette :</p>
                <input
                  type="text"
                  className="border border-slate-300 p-2"
                  placeholder="Ma super recette"
                  name="title"
                  id="title"
                  value={recipeTitle}
                  onChange={handleChangeTitle}
                  required
                />
              </label>
              <label className="flex-col items-center">
                <p className="py-2">
                  Sublimer la recette avec une jolie photo:{" "}
                </p>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleChangeSelectedFile}
                  className="text-green-500"
                  required
                />
              </label>
            </article>
            <article className="bg-white hover:bg-slate-50 border border-slate-300 shadow-md p-2 rounded-lg flex flex-col sm:justify-evenly items-center">
              <label className="py-1">
                Temps de préparation (min):{" "}
                <input
                  className="bg-slate-200 text-black rounded-md w-[2.5rem] text-center border border-slate-300"
                  type="number"
                  placeholder="0"
                  value={duration}
                  onChange={handleChangeDuration}
                  required
                />
              </label>

              {errorForm.duration !== "" && (
                <p className="text-xs font-bold bg-red-200 p-1 rounded text-red-800">
                  {errorForm.duration}
                </p>
              )}

              <label className="py-1">
                Nombres de personne :{" "}
                <input
                  className="bg-slate-200 text-black rounded-md w-[2.5rem] text-center border border-slate-300"
                  type="number"
                  placeholder="0"
                  value={person}
                  onChange={handleChangePerson}
                  required
                />
              </label>
              {errorForm.person !== "" && (
                <p className="text-xs font-bold bg-red-200 p-1 rounded text-red-800">
                  {errorForm.person}
                </p>
              )}
              <label>
                Difficulté de la recette:{" "}
                <select
                  type="option"
                  value={level}
                  onChange={handleChangeLevel}
                  className="bg-slate-200 text-black rounded-md border border-slate-300"
                  required
                >
                  <option></option>
                  <option value="Facile">Facile</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Difficile">Difficile</option>
                </select>
              </label>
            </article>
            <article className="bg-white hover:bg-slate-50 border border-slate-300 shadow-md p-2 rounded-lg flex flex-col sm:justify-between items-center">
              <p>Sélectionner des ingrédients :</p>
              <select
                className="bg-slate-200 text-black rounded-md border border-slate-300"
                type="option"
                value={selectIngredient.name}
                onChange={handleChangeSelectedIngredient}
              >
                <option>-- Merci de sélectionner un ingrédient --</option>
                {ingredientsList?.length > 0
                  ? ingredientsList.map((ingredient) => (
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
                  value={quantity}
                  onChange={handleChangeQuantity}
                  className="bg-slate-200 text-black rounded-md w-[2.5rem] text-center border border-slate-300"
                />
                <select
                  type="option"
                  className="bg-slate-200 text-black rounded-md border border-slate-300"
                  value={unit}
                  onChange={handleChangeUnit}
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
                type="button"
                className="rounded bg-red-800 text-white p-1 my-2"
                onClick={handleClickAddIngredient}
              >
                Ajouter l&apos;ingrédient
              </button>
              {errorForm.ingredient !== "" && (
                <p className="text-xs font-bold bg-red-200 p-1 rounded text-red-800">
                  {errorForm.ingredient}
                </p>
              )}
            </article>
            <article className="bg-white hover:bg-slate-50 border border-slate-300 shadow-md p-2 rounded-lg sm:w-80">
              <p>Vos ingrédients : </p>
              <div className="overflow-y-auto max-h-[7rem] my-2">
                {ingredientsForRecipe.map((ingredient) => (
                  <li className="flex gap-2" key={ingredient.id}>
                    <button
                      type="button"
                      onClick={() => handleClickRemoveIngredient(ingredient.id)}
                      value={ingredient.id}
                    >
                      <MinusCircle style={"w-6 h-6 text-red-600"} />
                    </button>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </div>
            </article>
          </div>

          <div className="my-8 bg-white border border-slate-300 p-2 rounded-lg shadow-md">
            <label className="flex-col">
              <p className="my-2 text-lg">
                Rédigez votre recette grâce à l&apos;outil ci-dessous :
              </p>
              <Tiptap editor={editor} />
            </label>
          </div>

          <div className="container flex flex-row gap-4 justify-center mt-4">
            <button
              type="submit"
              className="rounded bg-red-800 text-white border p-2 shadow-md"
            >
              Valider la recette
            </button>
            <button
              type="button"
              className="rounded bg-white text-black border p-2 shadow-md"
            >
              Aperçu de la recette
            </button>
            <button
              type="reset"
              className="rounded bg-slate-800 text-white border p-2 shadow-md"
            >
              Annuler
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddRecipe;

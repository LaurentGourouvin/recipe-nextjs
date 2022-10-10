import { useState } from "react";
import Tiptap from "../Tiptap/Tiptap";
import { useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import { createRecipe } from "../../axios/recipe/axios_recipe";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AddRecipe = () => {
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
  const [recipeTitle, setRecipeTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChangeTitle = (e) => {
    setRecipeTitle(e.target.value);
  };
  const handleChangeSelectedFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeTitle);
    formData.append("file", selectedFile);
    formData.append("description", editor.getHTML());

    const resultCreateRecipe = await createRecipe(formData);
    if (resultCreateRecipe.status === 201) {
      toast.success("Recette créee ! Redirection en cours...");
      setTimeout(() => {
        router.push(`/recipes/${resultCreateRecipe.data.recipe_id}`);
      }, 1500);
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
          <div className="flex-col ">
            <label>
              <p className="py-3 text-lg">Nom de votre superbe recette :</p>
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
            <label className="flex-col">
              <p className="text-lg py-2">
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
          </div>
          <hr />
          <label className="flex-col">
            <p className="my-2 text-lg">
              Expliquer comment réaliser cette recette :
            </p>
            <Tiptap editor={editor} />
          </label>

          <div className="container flex flex-row gap-4 justify-center mt-4">
            <button
              type="submit"
              className="rounded bg-rose-600 text-white p-2"
            >
              Valider la recette
            </button>
            <button
              type="reset"
              className="rounded bg-slate-800 text-white p-2"
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

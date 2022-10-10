// Import Next/React
import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
// Own import
import Navbar from "../components/Navbar/Navbar";
import CardRecipe from "../components/CardRecipe/CardRecipe";
import Loading from "../components/Loading/Loading";
import { useGetAllRecipe } from "../axios/recipe/axios_recipe";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../redux/slice/userSlice";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: recipes, error, loading } = useGetAllRecipe("/recipe");
  // const dispatch = useDispatch();
  // const isLogged = useSelector((state) => state.user.isLogged);

  // useEffect(() => {
  //   const fetchUser = () => {
  //     dispatch(currentUser());
  //   };
  //   // vérification si l'utilisateur n'est pas connecté
  //   if (!isLogged) {
  //     fetchUser();
  //   }
  // }, [isLogged, dispatch]);

  return (
    <>
      <Head>
        <title>Recipe</title>
      </Head>

      <div className="text-slate-600">
        {/* <Navbar /> */}
        <section className="container-recipe-card ">
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

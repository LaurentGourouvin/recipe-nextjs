import { useSelector } from "react-redux";
import MenuProfile from "../../components/Profile/MenuProfile";
import MyRecipes from "../../components/Profile/MyRecipes";
import Head from "next/head";

const Recipes = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>Mes recettes</title>
      </Head>
      <div className="container p-2">
        {!user.isLogged && <p>Vous n&apos;êtes pas connecté</p>}
        {user.isLogged && (
          <>
            <MenuProfile />
            <MyRecipes {...user} />
          </>
        )}
      </div>
    </>
  );
};
export default Recipes;

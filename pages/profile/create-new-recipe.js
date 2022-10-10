import { useSelector } from "react-redux";
import AddRecipe from "../../components/Profile/AddRecipe";
import MenuProfile from "../../components/Profile/MenuProfile";
import Head from "next/head";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>Création d&apos;une nouvelle recette</title>
      </Head>
      <div className="container p-2">
        {!user.isLogged && <p>Vous n&apos;êtes pas connecté</p>}
        {user.isLogged && (
          <>
            <MenuProfile />
            <AddRecipe />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;

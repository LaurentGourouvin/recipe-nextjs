// Import node_module
import { useSelector } from "react-redux";
import Head from "next/head";

// Import Own Module
import MenuProfile from "../../components/Profile/MenuProfile";
import CreateRecipeForm from "../../components/Form/CreateRecipeForm/CreateRecipeForm";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <meta name="description" content="Site de recette en ligne" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>Création d&apos;une nouvelle recette</title>
      </Head>
      <div className="container p-2">
        {!user.isLogged && <p className="text-lg text-white">Vous n&apos;êtes pas connecté</p>}
        {user.isLogged && (
          <>
            <MenuProfile />
            <CreateRecipeForm />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;

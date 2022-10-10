import { useSelector } from "react-redux";
import UpdateProfile from "../../components/Profile/UpdateProfile";
import MenuProfile from "../../components/Profile/MenuProfile";
import Head from "next/head";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Head>
        <title>Modification de mon profil</title>
      </Head>

      <div className="container p-2">
        {!user.isLogged && <p>Vous n&apos;êtes pas connecté</p>}
        {user.isLogged && (
          <>
            <MenuProfile />
            <UpdateProfile />
          </>
        )}
      </div>
    </>
  );
};

export default Profile;

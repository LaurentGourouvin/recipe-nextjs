import { useSelector } from "react-redux";
import { UserIcon } from "../../components/elements/icons/UserIcon";
import { Heart } from "../../components/elements/icons/Heart";
import { FolderPlus } from "../../components/elements/icons/FolderPlus";
import { Cake } from "../../components/elements/icons/Cake";
import Link from "next/link";

const MenuProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <h2 className="text-2xl my-2">
        Bonjour{" "}
        <span className="text-red-500 italic">
          {`${user.firstname} ${user.lastname}`},
        </span>
      </h2>
      <section className="my-2 bg-rose-600 text-white p-2 rounded-lg shadow-md">
        <p className="my-2">Bienvenue sur votre profil.</p>
        <hr />
        <ul className="pl-2 text-sm mt-3 sm:flex sm: justify-evenly sm:gap-2">
          <Link href="/profile">
            <li className="p-1 hover:underline flex gap-1 items-center">
              <UserIcon />
              <a>Modifier le Profil</a>
            </li>
          </Link>
          <Link href="/profile/recipes">
            <li className="p-1 hover:underline flex gap-1 items-center">
              <Cake />
              <a>Mes Recettes</a>
            </li>
          </Link>
          <li className="p-1 hover:underline flex gap-1 items-center">
            <Heart />
            <a>Mes Favoris</a>
          </li>
          <Link href="/profile/create-new-recipe">
            <li className="p-1 hover:underline flex gap-1 items-center">
              <FolderPlus />
              <a>Ajouter une nouvelle recette</a>
            </li>
          </Link>
        </ul>
      </section>
    </>
  );
};
export default MenuProfile;

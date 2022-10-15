import { useSelector } from "react-redux";
import { UserIcon } from "../../components/elements/icons/UserIcon";
import { Heart } from "../../components/elements/icons/Heart";
import { PlusCircle } from "../../components/elements/icons/PlusCircle";
import { Cake } from "../../components/elements/icons/Cake";
import Link from "next/link";

const MenuProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <h2 className="text-2xl my-2 ">
        Bonjour{" "}
        <span className="text-red-500 italic p-2">
          {`${user.firstname} ${user.lastname}`},
        </span>
      </h2>
      <section className="my-2 bg-red-800 text-white p-2 rounded-lg shadow-md">
        <p className="my-2">Bienvenue sur votre profil.</p>
        <hr />
        <ul className="pl-2 text-sm mt-3 sm:flex sm: justify-between sm:gap-1">
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
          <Link href="/profile/favorites">
            <li className="p-1 hover:underline flex gap-1 items-center">
              <Heart style={"w-6 h-6"} />
              <a>Mes Favoris</a>
            </li>
          </Link>
          <Link href="/profile/create-new-recipe">
            <li className="p-1 hover:underline flex gap-1 items-center">
              <PlusCircle />
              <a>Ajouter une nouvelle recette</a>
            </li>
          </Link>
        </ul>
      </section>
    </>
  );
};
export default MenuProfile;

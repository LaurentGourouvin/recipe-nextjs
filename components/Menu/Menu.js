// Import Next/React
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// Import Own Module
import { ChevrontRight } from "../elements/icons/ChevronRight";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { UserIcon } from "../elements/icons/UserIcon";
import { Heart } from "../elements/icons/Heart";
import { Leave } from "../elements/icons/Leave";
import { Cake } from "../elements/icons/Cake";
import { disconnect } from "../../redux/slice/userSlice";
import { logoutUser } from "../../axios/auth/axios_auth";
import { toast } from "react-toastify";
import { PlusCircle } from "../elements/icons/PlusCircle";

const Menu = ({ isOpen, setIsOpen }) => {
  const refMenu = useClickOutSide(() => setIsOpen(false));
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  return (
    <div
      ref={refMenu}
      className={`bg-slate-50 fixed h-full w-full md:w-1/6 
    ${!isOpen ? "-translate-x-full" : "-translate-x-0"} duration-300 md:shadow-2xl`}
    >
      <section className="menu-header">
        {!isLogged && (
          <>
            <button className="menu-login-btn">
              <Link href="/authentification/login">
                <a
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Connexion
                </a>
              </Link>
            </button>

            <p className="text-rose-600 underline">
              <Link href="/authentification/register">
                <a
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Inscription
                </a>
              </Link>
            </p>
          </>
        )}
        {isLogged && (
          <>
            <button
              onClick={async () => {
                setIsOpen(false);
                const isLogout = await logoutUser();
                dispatch(disconnect());
                toast.info("Déconnexion réussie");
                router.push("/");
              }}
              className="menu-login-btn"
            >
              <span className="flex gap-2">
                <Leave /> Déconnexion
              </span>
            </button>
          </>
        )}
      </section>

      <main className="container p-3 text-slate-600 mx-auto">
        {!isLogged && (
          <p>
            Decouvrez des recettes du monde entier, partagées par notre communauté en créant votre profil
            <span className="text-rose-600 italic"> Recipe.</span>
          </p>
        )}
        {isLogged && (
          <>
            <p className="text-black">
              Bonjour <span className="italic text-red-500">{`${user.firstname} ${user.lastname}`}</span>
            </p>
            <ul className="pl-2 text-sm mt-3">
              <Link href="/profile">
                <li className="p-1 hover:text-red-500 flex gap-1 items-center">
                  <UserIcon />
                  <a
                    id="profil-link"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Mon Profil
                  </a>
                </li>
              </Link>
              <Link href="/profile/recipes">
                <li className="p-1 hover:text-red-500 flex gap-1 items-center">
                  <Cake />
                  <a
                    id="recipe-link"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Mes Recettes
                  </a>
                </li>
              </Link>
              <Link href="/profile/favorites">
                <li className="p-1  flex gap-1 items-center">
                  <Heart style={"w-6 h-6"} />
                  <a
                    id="favorites-link"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Mes Favoris
                  </a>
                </li>
              </Link>
              <Link href="/profile/create-new-recipe">
                <li className="p-1 hover:text-red-500 flex gap-1 items-center">
                  <PlusCircle />
                  <a
                    id="new-recipe-link"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Ajouter une nouvelle recette
                  </a>
                </li>
              </Link>
            </ul>
          </>
        )}
        <div className="container flex flex-row justify-center pt-5">
          <Image
            src="/images/design/Eating_Time.svg"
            width={100}
            height={100}
            layout="fixed"
            alt="Horloge avec une pomme verte"
            priority={true}
          />
        </div>
        <ul className="flex flex-col py-5">
          <li className="menu-items">
            <p className="menu-items-content">
              <Link href="/">
                <a onClick={() => setIsOpen(false)}>Accueil</a>
              </Link>
              <span>
                <ChevrontRight />
              </span>
            </p>
          </li>
          <li className="menu-items">
            <p className="menu-items-content">
              <span>
                <ChevrontRight />
              </span>
            </p>
          </li>
          <li className="menu-items">
            <p className="menu-items-content">
              Communauté
              <span>
                <ChevrontRight />
              </span>
            </p>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Menu;

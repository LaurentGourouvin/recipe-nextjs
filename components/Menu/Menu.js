// Import Next/React
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Import Own Module
import { ChevrontRight } from "../elements/icons/ChevronRight";
import { useClickOutSide } from "../../hooks/useClickOutSide";

const Menu = ({ isOpen, setIsOpen }) => {
  const refMenu = useClickOutSide(() => setIsOpen(false));

  return (
    <div
      ref={refMenu}
      className={`bg-slate-50 fixed h-full md:w-1/6 
    ${
      !isOpen ? "-translate-x-full" : "-translate-x-0"
    } duration-300 md:shadow-2xl`}
    >
      <section className="menu-header">
        <button className="menu-login-btn">
          <Link href="/login">
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
          <Link href="/login">
            <a
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Inscription
            </a>
          </Link>
        </p>
      </section>

      <main className="container p-3 text-slate-600 mx-auto">
        <p>
          Decouvrez des recettes du monde entier, partagées par notre communauté
          en créant votre profil{" "}
          <span className="text-rose-600 italic">Recipe.</span>
        </p>
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
              <Link href="#">
                <a onClick={() => setIsOpen(false)}>Recettes par catégories</a>
              </Link>
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

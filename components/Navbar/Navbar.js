// Next/React Import
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Own Import
import { MenuIcon } from "../elements/icons/MenuIcon";
import { SearchIcon } from "../elements/icons/SearchIcon";
import { CancelIconCircle } from "../elements/icons/CancelIconCircle";

import Menu from "../Menu/Menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-container fixed w-full z-10">
      <section className="navbar-content">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <CancelIconCircle /> : <MenuIcon />}
        </button>

        <p className="navbar-image-title">
          <Image
            src="/images/design/Vegetable.svg"
            width={35}
            height={35}
            layout="fixed"
            alt="marmitte"
            priority={true}
          />
          <span className="navbar-title">
            <Link href="/">Recipe</Link>
          </span>
        </p>
        <SearchIcon />
      </section>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Navbar;

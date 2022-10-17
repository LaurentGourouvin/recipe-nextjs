// Next/React Import
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, getFavorites } from "../../redux/slice/userSlice";

// Own Import
import { MenuIcon } from "../elements/icons/MenuIcon";
import { SearchIcon } from "../elements/icons/SearchIcon";
import { CancelIconCircle } from "../elements/icons/CancelIconCircle";
import SearchBar from "../SearchBar/SearchBar";
import Menu from "../Menu/Menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchBarIsOpen, setSearchBarIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(currentUser());
      await dispatch(getFavorites());
    };
    // vérification si l'utilisateur n'est pas connecté
    if (!isLogged) {
      fetchUser();
    }
  }, [isLogged, dispatch]);

  return (
    <header className="navbar-container fixed w-full z-10">
      <section className="navbar-content">
        <button
          name="button-menu"
          type="button"
          aria-label="bouton menu"
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
            <Link href="/">
              <a>Recipe</a>
            </Link>
          </span>
        </p>
        <button
          name="button-search-bar"
          type="button"
          aria-label="button searchbar"
          onClick={() => {
            setSearchBarIsOpen(!searchBarIsOpen);
          }}
        >
          <SearchIcon />
        </button>
      </section>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      <SearchBar
        searchBarIsOpen={searchBarIsOpen}
        setSearchBarIsOpen={setSearchBarIsOpen}
      />
    </header>
  );
};

export default Navbar;

import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../../axios/auth/axios_auth";

// const regexPassword = new RegExp(
//   "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$"
// );

const RegisterForm = () => {
  const regexPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
  );

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ isError: false, message: "" });
  const [displayErrorPassword, setDisplayErrorPassword] = useState("");

  const checkPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setDisplayErrorPassword(true);
    } else {
      setDisplayErrorPassword(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Si le password valide la REGEX je peux inscrire l'utilisateur
    if (!displayErrorPassword) {
      const register = await registerUser(user);
      if (register?.codeStatus) {
        setError((prevState) => ({
          ...prevState,
          isError: true,
          message: register.message,
        }));
        return null;
      }

      toast.success(
        "Création de profil réussi ! \nRedirection vers la page de connexion en cours..."
      );
      setTimeout(() => {
        Router.push("/authentification/login");
      }, 1500);
    }
  };

  const handleReset = (e) => {
    setUser((prevState) => ({
      ...prevState,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    }));
  };

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="py-2">
      {error.isError && (
        <p className="text-center text-red-500 font-semibold">
          {error.message}
        </p>
      )}
      <label className="flex flex-col">
        <p className="p-2">Nom</p>
        <input
          type="text"
          className="border-2 border-slate-400 p-2"
          id="firstname"
          name="firstname"
          value={user.firstname}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col">
        <p className="p-2">Prénom</p>
        <input
          type="text"
          className="border-2 border-slate-400 p-2"
          id="lastname"
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col">
        <p className="p-2">Email</p>
        <input
          type="email"
          className="border-2 border-slate-400 p-2"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col">
        <p className="p-2">Mot de passe</p>
        <input
          type="password"
          className="border-2 border-slate-400 p-2"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          title="Le mot de passe doit contenir 1 caratère spécial, 1 chiffre et une longueur minimum de 8 caratères."
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
          required
        />
      </label>
      <label className="flex flex-col">
        <p className="p-2">Confirmer le mot de passe</p>
        <input
          type="password"
          className="border-2 border-slate-400 p-2"
          id="confirmPassword"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          title="Le mot de passe doit contenir 1 caratère spécial, 1 chiffre et une longueur minimum de 8 caratères."
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
          required
        />
        {displayErrorPassword && (
          <div className="container text-sm pt-3 text-red-500">
            <p>Les mots de passes ne sont pas identiques !</p>
          </div>
        )}
      </label>

      <div className="container flex flex-row gap-4 justify-center mt-4">
        <button
          type="submit"
          onClick={() => checkPassword(user.password, user.confirmPassword)}
          className="rounded bg-rose-600 text-white p-2"
        >
          Valider
        </button>
        <button
          onClick={handleReset}
          type="reset"
          className="rounded bg-slate-800 text-white p-2"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

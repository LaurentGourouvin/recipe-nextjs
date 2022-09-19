import { useState } from "react";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <label className="flex flex-col">
        <p className="p-2">Nom</p>
        <input
          type="text"
          className="border-2 border-slate-400 p-2"
          id="firstname"
          name="firstname"
          value={user.firstname}
          onChange={handleChange}
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
        />
      </label>
      <label className="flex flex-col">
        <p className="p-2">Mot de passe</p>
        <input
          type="text"
          className="border-2 border-slate-400 p-2"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
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
        />
        <div className="container text-sm pt-3">
          <p>Votre mot de passe doit contenir:</p>
          <li className="pl-4">8 caractères minimums.</li>
          <li className="pl-4">1 caractère spécial.</li>
          <li className="pl-4">1 chiffre.</li>
        </div>
      </label>

      <div className="container flex flex-row gap-4 justify-center mt-4">
        <button type="submit" className="rounded bg-rose-600 text-white p-2">
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

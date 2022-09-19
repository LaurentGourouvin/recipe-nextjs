import { useState } from "react";

const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = (e) => {
    setUser((prevState) => ({ ...prevState, email: "", password: "" }));
  };

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <form className="py-2" onSubmit={handleSubmit}>
      <label className="flex flex-col">
        <p className="p-2">Email</p>
        <input
          type="email"
          className="border-2 border-slate-400 p-2"
          value={user.email}
          onChange={handleChange}
          name="email"
          id="email"
        />
      </label>
      <label className="flex flex-col">
        <p className="p-2">Mot de passe</p>
        <input
          type="password"
          className="border-2 border-slate-400 p-2"
          value={user.password}
          onChange={handleChange}
          name="password"
          id="password"
        />
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

export default LoginForm;

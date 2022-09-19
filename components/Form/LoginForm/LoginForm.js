import { useState } from "react";

const LoginForm = () => {
  return (
    <form className="py-2">
      <label className="flex flex-col">
        <p className="p-2">Email</p>
        <input type="email" className="border-2 border-slate-400 p-2" />
      </label>
      <label className="flex flex-col">
        <p className="p-2">Mot de passe</p>
        <input type="password" className="border-2 border-slate-400 p-2" />
      </label>

      <div className="container flex flex-row gap-4 justify-center mt-4">
        <button className="rounded bg-rose-600 text-white p-2">Valider</button>
        <button className="rounded bg-slate-800 text-white p-2">Annuler</button>
      </div>
    </form>
  );
};

export default LoginForm;

import { useState } from "react";
// import { loginUser } from "../../../axios/auth/axios_auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser, currentUser } from "../../../redux/slice/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorLogin, setErrorLogin] = useState({ error: false, message: "" });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isLogin = await dispatch(loginUser(user));
    if (isLogin.payload.codeStatus === 404) {
      setErrorLogin((prevState) => ({
        ...prevState,
        error: true,
        message: "Email ou mot de passe incorrect.",
      }));
      return null;
    }
    dispatch(currentUser());
    toast.success("Vous êtes connecté, redirection en cours...");

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const handleReset = (e) => {
    setUser((prevState) => ({ ...prevState, email: "", password: "" }));
  };

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <form className="py-2" onSubmit={handleSubmit}>
      {errorLogin.error && (
        <p className="text-center text-red-500 font-semibold">
          {errorLogin.message}
        </p>
      )}
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

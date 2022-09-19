import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

const LoginPage = () => {
  const [clickOnLogin, setIsClickOnLogin] = useState(true);
  const [clickOnRegister, setIsClickOnRegister] = useState(false);

  return (
    <div className="container p-2">
      <header className="flex flex-row justify-center gap-4">
        <h2
          className={`p-2 ${
            clickOnLogin &&
            "text-rose-600 border-b-4 border-rose-600 easi-in-out transition-all duration-200"
          }`}
        >
          <button
            onClick={() => {
              setIsClickOnLogin(!clickOnLogin);
              setIsClickOnRegister(false);
            }}
          >
            Connexion
          </button>
        </h2>
        <h2
          className={`p-2 ${
            clickOnRegister &&
            "text-rose-600 border-b-4 border-rose-600 easi-in-out transition-all duration-200"
          }`}
        >
          <button
            onClick={() => {
              setIsClickOnLogin(false);
              setIsClickOnRegister(!clickOnRegister);
            }}
          >
            Inscription
          </button>
        </h2>
      </header>
      <section className="container py-4 md:w-2/6 md:mx-auto">
        {clickOnLogin && <LoginForm />}
        {clickOnRegister && <RegisterForm />}
      </section>
    </div>
  );
};

export default LoginPage;

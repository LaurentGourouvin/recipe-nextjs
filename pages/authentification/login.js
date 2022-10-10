import LoginForm from "../../components/Form/LoginForm/LoginForm";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Connexion à Recipe</title>
      </Head>

      <div className="container p-2">
        <h2 className="text-4xl text-slate-500 italic">Connexion</h2>
        <section className="container py-4 md:w-2/6 md:mx-auto">
          <LoginForm />
        </section>
      </div>
    </>
  );
};

export default Login;

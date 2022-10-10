import RegisterForm from "../../components/Form/RegisterForm/RegisterForm";
import Head from "next/head";

const register = () => {
  return (
    <>
      <Head>
        <title>Inscription à Recipe</title>
      </Head>
      <div className="container p-2">
        <h2 className="text-4xl text-slate-500 italic">Inscription</h2>
        <section className="container py-4 md:w-2/6 md:mx-auto">
          <RegisterForm />
        </section>
      </div>
    </>
  );
};

export default register;

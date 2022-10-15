import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { updateUser as updateUserFromRedux } from "../../redux/slice/userSlice";
import { useState } from "react";
import { updateUser } from "../../axios/auth/axios_auth";
import { toast } from "react-toastify";
import Link from "next/link";

const UpdateProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userUpdate, setUserUpdate] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setUserUpdate((prevState) => ({
      ...prevState,
      firstname: "",
      lastname: "",
      email: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("envoie du formulaire.");
    const resultUpdateUser = await updateUser(userUpdate);
    if (resultUpdateUser.status === 201) {
      toast.success("Modification réussie !");
      dispatch(updateUserFromRedux(resultUpdateUser.data));
    } else {
      toast.warning("Modification refusée !");
    }
    console.log(resultUpdateUser);
  };
  return (
    <>
      <section className="my-2 bg-slate-800 text-white p-2 rounded-lg shadow-md">
        <p className="my-2">
          Dans cette section vous avez la possibilité de modifier les
          informations liées à votre compte comme :
        </p>
        <ul className="list-disc text-sm ml-6">
          <li>La modification de votre nom</li>
          <li>La modification de votre prénom</li>
          <li>Effectuer un changement de mot de passe</li>
          <li>Mettre à jour votre adresse e-mail</li>
        </ul>
      </section>
      <section className="flex flex-col sm:flex-row items-center sm:justify-between my-2 gap-2">
        {/* <article>
          <Image
            src="/images/design/Metabolism.svg"
            width={150}
            height={150}
            layout="fixed"
            alt="marmitte"
            priority={true}
          />
        </article> */}
        <article className="p-2 bg-white rounded-lg shadow-lg sm:self-start border">
          <h3 className="text-xl font-semibold my-2 text-red-500">
            Comment modifier votre mot de passe ?
          </h3>
          <p>
            Pour modifier ou tout simplement réinitialiser votre mot passe,
            veuillez suivre la procédure suivante :
          </p>
          <ul className="my-2 p-2 list-decimal list-inside">
            <li>
              Cliquez sur le lien suivant:{" "}
              <Link href="#">
                <a className="text-rose-500 font-semibold">
                  Réinitialiser le mot de passe
                </a>
              </Link>
            </li>
            <li>
              Un e-mail est envoyé à l&apos;adresse liée à votre compte sur le
              site.
            </li>
            <li>
              Après avoir cliqué sur le lien contenu dans l&apos;e-mail, vous
              aurez accès à la modification de celui-ci.
            </li>
          </ul>
        </article>
        <article className="p-2 bg-white rounded-lg shadow-lg border">
          <h3 className="text-xl font-semibold my-2 text-red-500">
            Formulaire de modification
          </h3>
          <form onSubmit={handleSubmit} className="py-2">
            <label className="flex flex-col">
              <p className="p-2">Nom</p>
              <input
                type="text"
                className="border-2 border-slate-400 p-2"
                id="firstname"
                name="firstname"
                value={userUpdate.firstname}
                onChange={handleChange}
                placeholder={user.firstname}
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
                value={userUpdate.lastname}
                onChange={handleChange}
                placeholder={user.lastname}
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
                value={userUpdate.email}
                onChange={handleChange}
                placeholder={user.email}
                required
              />
            </label>

            <div className="container flex flex-row gap-4 justify-center mt-4">
              <button
                type="submit"
                className="rounded bg-red-800 text-white p-2"
              >
                Valider
              </button>
              <button
                type="reset"
                onClick={handleReset}
                className="rounded bg-slate-800 text-white p-2"
              >
                Annuler
              </button>
            </div>
          </form>
        </article>
      </section>
    </>
  );
};

export default UpdateProfile;

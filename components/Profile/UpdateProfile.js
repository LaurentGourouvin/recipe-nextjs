import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { updateUser as updateUserFromRedux } from "../../redux/slice/userSlice";
import { useState } from "react";
import { updateUser } from "../../axios/auth/axios_auth";
import { toast } from "react-toastify";

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
      <section className="flex flex-col sm:flex-row items-center sm:justify-around p-4 m-2">
        <article>
          <Image
            src="/images/design/Metabolism.svg"
            width={150}
            height={150}
            layout="fixed"
            alt="marmitte"
            priority={true}
          />
        </article>
        <article className="p-2">
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
                className="rounded bg-rose-600 text-white p-2"
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

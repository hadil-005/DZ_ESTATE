import React from "react";

const Logi = () => {
  return (
    <div className="w-full lg:w-2/3 px-4 mx-auto mt-24 lg:ml-20">
      <div className="mb-8">
        <h2 className="text-customBlue text-3xl font-semibold mb-4">
          Créer un compte
        </h2>
        <img src="chemin/vers/image.jpg" alt="Illustration" />
      </div>
      <form className="flex flex-col gap-4 max-w-md mx-auto lg:ml-1">
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="nom" className="text-xl">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              placeholder="Entrer votre Nom"
              className="w-full h-12 rounded border border-gray-300 bg-gray-100"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="prenom" className="text-xl">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              placeholder="Entrer votre Prénom"
              className="w-full h-12 rounded border border-gray-300 bg-gray-100"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="text-xl">
            Rôle
          </label>
          <select
            id="role"
            className="w-full h-12 rounded border border-gray-300 bg-gray-100 "
          >
            <option value="">Choisir un rôle</option>
            <option value="doctor">Docteur</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrer votre Email"
            className="w-full h-12 rounded border border-gray-300 bg-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="motDePasse" className="text-xl">
            Mot de passe
          </label>
          <input
            type="password"
            id="motDePasse"
            placeholder="Entrer votre Mot de passe"
            className="w-full h-12 rounded border border-gray-300 bg-gray-100"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmation" className="text-xl">
            Confirmation
          </label>
          <input
            type="password"
            id="confirmation"
            placeholder="Confirmer votre mot de passe"
            className="w-full h-12 rounded border border-gray-300 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full h-14 bg-customBlue text-white rounded mt-4"
        >
          Créer un compte
        </button>
      </form>
      <div className="flex items-center justify-center my-4 max-w-md mx-auto lg:ml-1">
        <hr className="flex-1 border-t border-gray-300" />
        <span className="mx-4 text-gray-500">OU</span>
        <hr className="flex-1 border-t border-gray-300" />
      </div>
      <button
        type="button"
        className="w-full h-14 bg-white border border-gray-300 flex items-center justify-center rounded max-w-md mx-auto lg:ml-1"
      >
        <img
          src="chemin/vers/google-icon.png"
          alt="Google"
          className="w-6 h-6 mr-2"
        />
        <span>Continuer avec Google</span>
      </button>
      <div className="flex justify-center my-4 lg:justify-start lg:ml-20">
        <div className="text-center">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{" "}
            <a href="/signup" className="text-customBlue">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logi;

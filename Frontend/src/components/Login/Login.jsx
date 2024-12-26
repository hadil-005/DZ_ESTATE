import React from "react";
import axios from "axios";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";


function Login() {
  const navigate = useNavigate();
  // Fonction de réussite de l'authentification Google
  const handleGoogleSuccess = (credentialResponse) => {
    // Validez le jeton Google côté serveur
    fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Authentification réussie :", data))
      .catch((err) =>
        console.error("Erreur lors de l'authentification :", err)
      );
  };

  // Fonction de gestion du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.motDePasse.value;

    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

   try {
     // Envoi des données au backend
     const response = await axios.post(
       "http://127.0.0.1:3000/api/users/login",
       { email, password }
     );
     console.log("Connexion réussie :", response.data);

     // Récupérer le token et les informations de l'utilisateur
     const token = response.data.token;
     const userData = response.data.user;

     // Sauvegarder dans localStorage
     localStorage.setItem("token", token);
     localStorage.setItem("first_name", userData.first_name);
     localStorage.setItem("family_name", userData.family_name);

     console.log("Utilisateur connecté :", userData);
     alert("Connexion réussie !");

     // Naviguer vers la page d'accueil (Home)
     navigate("/home");
   } catch (error) {
     console.error(
       "Erreur lors de la connexion :",
       error.response?.data || error.message
     );
     alert(error.response?.data?.message || "Erreur lors de la connexion.");
   }

  };

  return (
    <div className="relative w-full max-w-3xl p-6 lg:p-12 rounded shadow-md mt-6 lg:mt-0">
      {/* Logo en haut à gauche */}
      <div className="top-0 left-0 pt-10">
        <div className="absolute top-0 left-0 pt-21 z-10">
          <img
            src={logo}
            alt="logo"
            className="w-60 h-auto" // Ajustez la taille du logo ici
          />
        </div>
      </div>
      {/* Titre */}
      <h2 className="text-3xl font-bold text-center mb-6 flex mt-14">
        Se connecter
      </h2>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-1 overflow-auto"
      >
        {/* Email */}
        <div className="flex flex-col w-4/5">
          <label htmlFor="email" className="text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrer votre email"
            className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
          />
        </div>

        {/* Mot de passe */}
        <div className="flex flex-col w-4/5">
          <label htmlFor="motDePasse" className="text-lg font-medium mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="motDePasse"
            placeholder="Entrer votre mot de passe"
            className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
          />
        </div>

        {/* Checkbox "Remember me" */}
        <div className="flex items-center mt-5">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 mb-1 accent-green-600"
          />
          <span>
            <label htmlFor="remember" className="text-[16px] ml-2 font-normal">
              Remember me
            </label>
          </span>
        </div>

        {/* Bouton de connexion */}
        <div className="mt-5">
          <button
            type="submit"
            className="w-4/5 h-14 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </div>
      </form>

      {/* Ligne de séparation */}
      <div className="flex items-center justify-center my-4 w-4/5">
        <hr className="flex-1 border-t border-gray-300" />
        <span className="mx-4 text-gray-500">OU</span>
        <hr className="flex-1 border-t border-gray-300" />
      </div>

      {/* Bouton pour se connecter avec Google */}
      <div className="flex flex-col w-4/5">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Connexion Google échouée")}
          useOneTap
          shape="rectangular"
          size="large"
          text="continue_with"
          theme="outline"
          render={(renderProps) => (
            <div className="mt-5">
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="w-4/5 h-14 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700 transition"
              >
                Continuer avec Google
              </button>
            </div>
          )}
        />
      </div>

      {/* Lien vers la page de création de compte */}
      <div className="flex items-center justify-center my-4 w-4/5">
        <p className="text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Créez-en un maintenant.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

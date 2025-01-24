import React, { useState } from "react"; // Ajout de useState
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Signp = () => {
  // const onSuccess = (credentialResponse) => {
  //   console.log(credentialResponse.credential);
  // };
 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    family_name: "",
    email: "",
    password: "",
    confirmation: "",
    phone_number: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    for (const key in formData) {
      if (!formData[key]) {
        alert(`Veuillez remplir le champ ${key}`);
        return;
      }
    }

    // Validation du numéro de téléphone (par exemple, 10 chiffres)
    const phoneRegex = /^[0-9]{10}$/; // Ici, on accepte un numéro de téléphone de 10 chiffres
    if (!phoneRegex.test(formData.phone_number)) {
      alert("Veuillez entrer un numéro de téléphone valide (10 chiffres)");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Veuillez entrer un email valide");
      return;
    }
    // Vérifier si les mots de passe correspondent
    if (formData.password !== formData.confirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log("Données avant l'envoi :", formData);

   try {
     console.log("Tentative d'envoi des données au backend...");
     const response = await axios.post(
       "http://127.0.0.1:3000/api/users/signup",
       
       {
         first_name: formData.first_name,
         family_name: formData.family_name,
         email: formData.email,
         password: formData.password,
         phone_number: formData.phone_number,
       }
     );
     console.log("Réponse du serveur :", response);

     // Récupérer le token et les informations de l'utilisateur
     const token = response.data.token;
     const userData = response.data.user;

     // Sauvegarder dans localStorage
     localStorage.setItem("token", token);
     localStorage.setItem("first_name", userData.first_name);
     localStorage.setItem("family_name", userData.family_name);

     console.log("Utilisateur créé :", userData);
     alert("Inscription réussie ! Bienvenue !");

     // Naviguer vers la page d'accueil (Home)
     navigate("/home");
   } catch (error) {
     console.error("Erreur lors de l'inscription :", error);
     if (error.response && error.response.data) {
       alert(error.response.data.message); // Message spécifique du backend
     } else {
       alert("Erreur inattendue. Veuillez réessayer.");
     }
   }

  };

  return (
    <div className="relative w-full max-w-3xl p-6 lg:p-12 rounded shadow-md mt-6 lg:mt-0">
      <div className="top-0 left-0">
        <div className="absolute top-0 left-0 p-4 z-10">
          <img src={logo} alt="logo" className="w-60 h-auto" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center mb-6 flex mt-16">
        Créer un compte
      </h2>

      <form
        className="flex flex-col gap-1 overflow-auto"
        onSubmit={handleSubmit}
      >
        {/* Nom et Prénom */}
        <div className="flex gap-4 w-4/5">
          <div className="flex flex-col w-1/2">
            <label htmlFor="first_name" className="text-lg font-medium mb-2">
              Prénom
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name" // Mise à jour ici
              placeholder="Entrer votre Prénom"
              className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="family_name" className="text-lg font-medium mb-2">
              Nom
            </label>
            <input
              type="text"
              id="family_name"
              name="family_name" // Mise à jour ici
              placeholder="Entrer votre Nom"
              className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
              value={formData.family_name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col w-4/5">
          <label htmlFor="email" className="text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrer votre Email"
            className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Numéro de téléphone */}
        <div className="flex flex-col w-4/5">
          <label htmlFor="phone_number" className="text-lg font-medium mb-2">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number" // Mise à jour ici
            placeholder="Entrer votre numéro de téléphone"
            className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        {/* Mot de passe */}
        <div className="flex flex-col w-4/5">
          <label htmlFor="password" className="text-lg font-medium mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password" // Mise à jour ici
            placeholder="Entrer votre Mot de passe"
            className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Confirmation du mot de passe */}
        <div className="flex flex-col w-4/5">
          <label htmlFor="confirmation" className="text-lg font-medium mb-2">
            Confirmation
          </label>
          <input
            type="password"
            id="confirmation"
            name="confirmation"
            placeholder="Confirmer votre mot de passe"
            className="w-full h-10 rounded border border-gray-300 bg-gray-100 px-4"
            value={formData.confirmation}
            onChange={handleChange}
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-4/5 h-14 bg-[#1C84FF] text-white rounded mt-4 hover:bg-blue-700 transition"
        >
          Créer un compte
        </button>
      </form>

      <div className="flex items-center justify-center my-4 w-4/5">
        <hr className="flex-1 border-t border-gray-300" />
        <span className="mx-4 text-gray-500">OU</span>
        <hr className="flex-1 border-t border-gray-300" />
      </div>

      {/* <div className="flex flex-col w-4/5">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
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
      </div> */}

      <div className="flex items-center justify-center my-4 w-4/5">
        <p className="text-gray-600">
          Avez-vous déjà un compte ?{" "}
          <a href="/signin" className="text-[#1C84FF] hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signp;

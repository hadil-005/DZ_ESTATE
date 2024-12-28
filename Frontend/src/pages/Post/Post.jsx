import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import PhotoUploader from "./PhotoUploader";
import VideoUploader from "./VideoUploader";
import FormulaireSelect from "./FormulaireSelect";
import { useTranslation } from "react-i18next";
import  "../../components/Multilingue/i18n"
import axios from "axios";

function Post() {
  const { i18n, t } = useTranslation(); // Utilisez i18n de react-i18next
  const [search, setSearch] = useState(""); // État pour la recherche
  const [showList, setShowList] = useState(false); // État pour afficher ou masquer la liste
  const [photos, setPhotos] = useState([]); // État pour les photos
  const wilayas = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaia",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Alger",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arreridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Ain Defla",
    "Naama",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "Timimoun",
    "Bordj Badji Mokhtar",
    "Ouled Djellal",
    "Béni Abbès",
    "In Salah",
    "In Guezzam",
    "Touggourt",
    "Djanet",
    "El Meghaier",
    "El Meniaa",
  ]; // Liste des wilayas

  // Filtrer les wilayas en fonction de la recherche
  const filteredWilayas = wilayas.filter((wilaya) =>
    wilaya.toLowerCase().startsWith(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value); // Met à jour la recherche
    setShowList(value !== ""); // Affiche la liste uniquement si le champ n'est pas vide
  };

  const handleWilayaClick = (wilaya) => {
    setSearch(wilaya); // Remplit le champ avec la wilaya sélectionnée
    setShowList(false); // Masque la liste
  };

  // Vérification des cases à cocher
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox((prev) => (prev === id ? null : id));
  };

  const [typeBien, setTypeBien] = useState(""); // Stockage du type de bien sélectionné
  // Fonction qui met à jour le type de bien dans le parent
  const handleSelect = (value) => {
    setTypeBien(value);
  };

  // Vérifie si des photos ont été téléchargées
  const handlePhotoUpload = (newPhotos) => {
    setPhotos(newPhotos);
  };

  const [selectedTypeBien, setSelectedTypeBien] = useState(""); // État pour suivre le type de bien

  // Validation du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut (rechargement de la page)

    // Sélectionner les champs requis
    const wilaya = search.trim();
    const commune = document.getElementById("commune").value.trim();
    const adresse = document.getElementById("addresseM").value.trim();
    const titre = document.getElementById("titre").value.trim();
    const description = document.getElementById("description").value.trim();
    const surface = document.getElementById("surface").value.trim();
    const prix = document.getElementById("prix").value.trim();

    // Vérifier les champs requis
    const champsVides = [];

    if (!wilaya) champsVides.push("Wilaya");
    if (!commune) champsVides.push("Commune");
    if (!adresse) champsVides.push("Adresse");
    if (!titre) champsVides.push("Titre de publication");
    if (!description) champsVides.push("Description");
    if (!surface) champsVides.push("Surface");
    if (!prix) champsVides.push("Prix");

    // Vérification des photos
    if (photos.length === 0) champsVides.push("Photos");
    // Vérifier si au moins une case à cocher est sélectionnée
    if (selectedCheckbox === null) {
      champsVides.push("Case à cocher");
    }
    // Vérification du type de bien
    if (!typeBien || typeBien === "") {
      // Vérification si le type de bien n'est pas sélectionné
      champsVides.push("Type de bien");
    }

    if (champsVides.length > 0) {
      alert(`Veuillez remplir les champs :\n${champsVides.join(", ")}`);
      return;
    }

    // Si tout est valide
    alert("Votre bien a été publié avec succès !");
    // Effectuer l'action pour soumettre les données, par exemple une requête API
  };

  return (
    <div>
      <Navbar />
      <div className="mt-24 ml-12 flex flex-col ">
        <h1 className="text-[#1C84FF] text-left text-[40px] font-bold mb-8">
          {t("Publier")}
        </h1>
        <div className="flex space-x-60 w-full h-screen overflow-auto mt-6">
          <div className="space-y-3 ml-32 w-full lg:w-1/2 flex flex-col p-6 lg:p-1 lg:pt-4">
            <div className="flex flex-col space-y-2 ">
              <label className="font-semibold " htmlFor="wilaya">
                {t("Wilaya")}
              </label>
              <input
                type="text"
                placeholder={t("wilaya")}
                id="wilaya"
                value={search}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
              {/* Affichage des wilayas filtrées */}
              {showList && filteredWilayas.length > 0 && (
                <ul className="list-disc ml-6 border border-gray-300 rounded-md shadow-md bg-white max-h-60 overflow-auto">
                  {filteredWilayas.map((wilaya, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-gray-700 hover:text-blue-500 px-2 py-1"
                      onClick={() => handleWilayaClick(wilaya)} // Clique sur une wilaya
                    >
                      {wilaya}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="commune" className="font-semibold">
                {t("Commune")}
              </label>
              <input
                placeholder={t("commune")}
                id="commune"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>

            <div className="flex flex-col space-y-2 ">
              <label htmlFor="addresseM" className="font-semibold ">
                {t("Addresse")}
              </label>
              <input
                placeholder={t("addresse")}
                id="addresseM"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="titre" className="font-semibold ">
                {t("Titre")}
              </label>
              <input
                placeholder={t("titre")}
                id="titre"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="font-semibold ">
                {t("Description")}
              </label>
              <textarea
                placeholder={t("description")}
                id="description"
                type="text"
                className="border border-[#9F9F9F] transition-all duration-150 ease-in-out rounded-md p-1 mb-4 w-3/4"
              />
            </div>
          </div>
          <div className="space-y-3 w-full lg:w-1/2 flex flex-col p-6 lg:p-1 lg:pt-4">
            <div className="flex flex-col space-y-2 ">
              <PhotoUploader onUpload={handlePhotoUpload} />

              <VideoUploader />
              <FormulaireSelect onSelect={handleSelect} />
              <div className="flex flex-col ml-2 space-y-2">
                <label htmlFor="surface" className="font-semibold ">
                  {t("Surface")}
                </label>
                <input
                  placeholder={t("surface")}
                  id="surface"
                  type="number"
                  className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
                />
              </div>
              <div className="flex flex-col ml-2 space-y-2">
                <label htmlFor="prix" className="font-semibold ">
                  {t("Prix")}
                </label>
                <input
                  placeholder={t("prix")}
                  id="prix"
                  type="number"
                  className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
                />
              </div>
              <div className="ml-2 flex items-center lg:space-x-[50%] lg:flex-row sm:flex-col ">
                <div className="ml-2 flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="avendre"
                    className="accent-green-600"
                    checked={selectedCheckbox === "avendre"}
                    onChange={() => handleCheckboxChange("avendre")}
                  ></input>
                  <label htmlFor="avendre" className="font-semibold ">
                    {t("vendre")}
                  </label>
                </div>
                <div className="ml-2 flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="alouer"
                    checked={selectedCheckbox === "alouer"}
                    onChange={() => handleCheckboxChange("alouer")}
                    className=" accent-green-600"
                  ></input>
                  <label htmlFor="alouer" className="font-semibold">
                    {t("louer")}
                  </label>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <button
                onClick={handleSubmit}
                className="bg-[#1C84FF] hover:bg-blue-700 transition  text-white font-bold text-[20px] rounded-md w-28 h-12 ml-[60%]"
              >
                 {t("publier")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;

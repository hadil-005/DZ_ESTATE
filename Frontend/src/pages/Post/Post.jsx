import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import PhotoUploader from "./PhotoUploader";
import VideoUploader from "./VideoUploader ";
import FormulaireSelect from "./FormulaireSelect";

export const Post = () => {
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

  // Vérifie si des photos ont été téléchargées
  const handlePhotoUpload = (newPhotos) => {
    setPhotos(newPhotos);
  };

  // Validation du formulaire
;

   

   

  

 
  


 const handleSubmit = (e) => {
   e.preventDefault(); // Empêche le comportement par défaut (rechargement de la page)

   if (validateForm()) {
     // On vérifie la validité avant la soumission
     alert("Formulaire valide et prêt à être soumis !");
     // Effectuer l'action pour soumettre les données, par exemple une requête API
   }
 };
  

  return (
    <div>
      <Navbar />
      <div className="mt-24 ml-12 flex flex-col ">
        <h1 className="text-[#1C84FF] text-left text-[40px] font-bold mb-8">
          Publier votre bien
        </h1>
        <div className="flex space-x-60 w-full h-screen overflow-auto mt-6">
          <div className="space-y-3  ml-32 w-full lg:w-1/2 flex flex-col p-6 lg:p-1 lg:pt-4">
            <div className="flex flex-col space-y-2 ">
              <label className="font-semibold " id="addresse">
                Addresse
              </label>
              <input
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
                placeholder="veuillez saisie l'addresse de votre bien"
                id="addresse"
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <label className="font-semibold " htmlFor="wilaya">
                Wilaya
              </label>
              <input
                type="text"
                placeholder="veuillez saisie la wilaya "
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
                Commune
              </label>
              <input
                placeholder="veuillez saisie la commune"
                id="commune"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="quartier" className="font-semibold ">
                Quartier
              </label>
              <input
                placeholder="veuillez saisie le quartier"
                id="quartier"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="addresseM" className="font-semibold ">
                Addresse(Celle de Google Maps)
              </label>
              <input
                placeholder="veuillez saisie l'addresse"
                id="addresseM"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="téléphone" className="font-semibold ">
                N° de téléphone
              </label>
              <input
                placeholder="veuillez saisie votre N° de téléphone"
                id="téléphone"
                type="number"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
          </div>
          <div className="space-y-3 w-full lg:w-1/2 flex flex-col p-6 lg:p-1 lg:pt-4">
            <div className="flex flex-col space-y-2 ">
              <PhotoUploader onUpload={handlePhotoUpload}></PhotoUploader>
              <VideoUploader></VideoUploader>
              <FormulaireSelect></FormulaireSelect>
              <div className="flex flex-col ml-2 space-y-2">
                <label htmlFor="surface" className="font-semibold ">
                  Surface
                </label>
                <input
                  placeholder="veuillez saisie votre la surface (m²)"
                  id="surface"
                  type="number"
                  className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
                />
              </div>
              <div className="flex flex-col ml-2 space-y-2">
                <label htmlFor="prix" className="font-semibold ">
                  Prix
                </label>
                <input
                  placeholder="veuillez saisie votre le prix (DA)"
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
                    A vendre
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
                    A louer
                  </label>
                </div>
              </div>
              <div className="flex flex-col ml-2 space-y-2">
                <label htmlFor="description" className="font-semibold ">
                  Description
                </label>
                <textarea
                  placeholder="veuillez ajouter une description"
                  id="description"
                  type="text"
                  className="border border-[#9F9F9F] transition-all duration-150 ease-in-out rounded-md p-1 mb-4 w-3/4"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="bg-[#1C84FF] hover:bg-blue-700 transition text-white font-bold text-[20px] rounded-md w-28 h-12 ml-[60%]"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

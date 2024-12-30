import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import PhotoUploader from "./PhotoUploader";
import VideoUploader from "./VideoUploader";
import FormulaireSelect from "./FormulaireSelect";
import { useTranslation } from "react-i18next";
import "../../components/Multilingue/i18n";
import axios from "axios";

function Post() {
  const { i18n, t } = useTranslation();
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [typeBien, setTypeBien] = useState("");
  const [selectedTypeBien, setSelectedTypeBien] = useState("");

  const wilayas = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaia", "Biskra", 
    "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", 
    "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", 
    "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", 
    "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", 
    "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", 
    "Tipaza", "Mila", "Ain Defla", "Naama", "Aïn Témouchent", "Ghardaïa", "Relizane", 
    "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", "In Salah", 
    "In Guezzam", "Touggourt", "Djanet", "El Meghaier", "El Meniaa"
  ];

  const filteredWilayas = wilayas.filter((wilaya) =>
    wilaya.toLowerCase().startsWith(search.toLowerCase())
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setShowList(value !== "");
  };

  const handleWilayaClick = (wilaya) => {
    setSearch(wilaya);
    setShowList(false);
  };

  const handleCheckboxChange = (id) => {
    setSelectedCheckbox((prev) => (prev === id ? null : id));
  };

  const handleSelect = (value) => {
    setTypeBien(value);
  };

  const handlePhotoUpload = (newPhotos) => {
    setPhotos(newPhotos);
  };
const handleSubmit = (e) => {
  e.preventDefault();

  // Collecte des données du formulaire
  const wilaya = search.trim();
  const commune = document.getElementById("commune").value.trim();
  const adresse = document.getElementById("addresseM").value.trim();
  const titre = document.getElementById("titre").value.trim();
  const description = document.getElementById("description").value.trim();
  const surface = document.getElementById("surface").value.trim();
  const prix = document.getElementById("prix").value.trim();

  // Vérification des champs vides
  const champsVides = [];
  if (!wilaya) champsVides.push("Wilaya");
  if (!commune) champsVides.push("Commune");
  if (!adresse) champsVides.push("Adresse");
  if (!titre) champsVides.push("Titre de publication");
  if (!description) champsVides.push("Description");
  if (!surface) champsVides.push("Surface");
  if (!prix) champsVides.push("Prix");
  if (photos.length === 0) champsVides.push("Photos");
  if (selectedCheckbox === null) champsVides.push("Case à cocher");
  if (!typeBien || typeBien === "") champsVides.push("Type de bien");

  if (champsVides.length > 0) {
    alert(`Veuillez remplir les champs :\n${champsVides.join(", ")}`);
    return;
  }

  // Préparation des données à envoyer
  const formData = new FormData();
  formData.append("wilaya", wilaya);
  formData.append("commune", commune);
  formData.append("adresse", adresse);
  formData.append("title", titre);
  formData.append("description", description);
  formData.append("area", surface);
  formData.append("price", prix);
  formData.append("transaction_status", selectedCheckbox); // Type de transaction
  formData.append("typeBien", typeBien);

  // // Ajoute les photos au FormData
  // photos.forEach((photo) => {
    
  //   formData.append("photos[]", photo);
  // });

  // Envoie les données au backend via axios
    console.log("//////////***********");
   axios
     .post("http://127.0.0.1:3000/api/property/create", formData)
     .then((response) => {
       alert("Votre bien a été publié avec succès !");
       // Réinitialise le formulaire après succès
       setSearch("");
       setPhotos([]);
       setSelectedCheckbox(null);
       setTypeBien("");
     })
     .catch((error) => {
       console.error("Erreur lors de la soumission du formulaire : ", error);
       alert("Une erreur est survenue lors de la publication de votre bien.");
     });
};



  return (
    <div>
      <Navbar />
      <div className="mt-24 ml-12 flex flex-col">
        <h1 className="text-[#1C84FF] text-left text-[40px] font-bold mb-8">{t("Publier")}</h1>
        <div className="flex space-x-60 w-full h-screen overflow-auto mt-6">
          <div className="space-y-3 ml-32 w-full lg:w-1/2 flex flex-col p-6 lg:p-1 lg:pt-4">
            <div className="flex flex-col space-y-2">
              <label className="font-semibold" htmlFor="wilaya">{t("Wilaya")}</label>
              <input
                type="text"
                placeholder={t("wilaya")}
                id="wilaya"
                value={search}
                onChange={handleInputChange}
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
              {showList && filteredWilayas.length > 0 && (
                <ul className="list-disc ml-6 border border-gray-300 rounded-md shadow-md bg-white max-h-60 overflow-auto">
                  {filteredWilayas.map((wilaya, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-gray-700 hover:text-blue-500 px-2 py-1"
                      onClick={() => handleWilayaClick(wilaya)}
                    >
                      {wilaya}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="commune" className="font-semibold">{t("Commune")}</label>
              <input
                placeholder={t("commune")}
                id="commune"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="addresseM" className="font-semibold">{t("Addresse")}</label>
              <input
                placeholder={t("addresse")}
                id="addresseM"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="titre" className="font-semibold">{t("Titre")}</label>
              <input
                placeholder={t("titre")}
                id="titre"
                type="text"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="font-semibold">{t("Description")}</label>
              <textarea
                placeholder={t("description")}
                id="description"
                type="text"
                className="border border-[#9F9F9F] transition-all duration-150 ease-in-out rounded-md p-1 mb-4 w-3/4"
              />
            </div>
          </div>

          <div className="space-y-3 w-full lg:w-1/2 flex flex-col p-6 lg:p-1 lg:pt-4">
            <PhotoUploader onUpload={handlePhotoUpload} />
        
            <FormulaireSelect onSelect={handleSelect} />

            <div className="flex flex-col ml-2 space-y-2">
              <label htmlFor="surface" className="font-semibold">{t("Surface")}</label>
              <input
                placeholder={t("surface")}
                id="surface"
                type="number"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>
            <div className="flex flex-col ml-2 space-y-2">
              <label htmlFor="prix" className="font-semibold">{t("Prix")}</label>
              <input
                placeholder={t("prix")}
                id="prix"
                type="number"
                className="border border-[#9F9F9F] rounded-md p-1 mb-4 w-3/4"
              />
            </div>

            <div className="ml-2 flex items-center lg:space-x-[50%] lg:flex-row sm:flex-col">
              <div className="ml-2 flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="a_vendre"
                  className="accent-green-600"
                  checked={selectedCheckbox === "a vendre"}
                  onChange={() => handleCheckboxChange("a vendre")}
                />
                <label htmlFor="a vendre" className="font-semibold">{t("vendre")}</label>
              </div>
              <div className="ml-2 flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="a_louer"
                  checked={selectedCheckbox === "a louer"}
                  onChange={() => handleCheckboxChange("a louer")}
                  className="accent-green-600"
                />
                <label htmlFor="a louer" className="font-semibold">{t("louer")}</label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-[#1C84FF] hover:bg-blue-700 transition text-white font-bold text-[20px] rounded-md w-28 h-12 ml-[60%]"
            >
              {t("publier")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

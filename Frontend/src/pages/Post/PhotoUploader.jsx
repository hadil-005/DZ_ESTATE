import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../../components/Multilingue/i18n";
import axios from "axios";

const PhotoUploader = ({ onUpload }) => {
  const { i18n, t } = useTranslation(); // Utilisez i18n de react-i18next
  const [photos, setPhotos] = useState([]); // Liste des fichiers ajoutés
  const fileInputRef = useRef(null); // Référence pour l'élément input file
  const [uploading, setUploading] = useState(false); // Pour afficher l'état de l'upload
  // Fonction pour ouvrir le sélecteur de fichiers
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simule un clic sur l'input file
    }
  };

  // Fonction pour ajouter une photo
  const addPhoto = async (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos); // Ajoute les fichiers sélectionnés à la liste
    onUpload(newPhotos); // Transmet les photos au parent
    // Envoie les fichiers au backend via Axios
    try {
      setUploading(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("photos", file); // "photos" correspond au champ de votre formulaire
      });

      // Remplacez par l'URL de votre backend
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important pour l'upload de fichiers
          },
        }
      );

      console.log("Fichiers téléchargés avec succès :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'upload des fichiers :", error);
    } finally {
      setUploading(false);
    }

    e.target.value = ""; // Réinitialise l'input pour éviter l'affichage du dernier fichier sélectionné
  };

  // Fonction pour supprimer une photo
  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, idx) => idx !== index);
    setPhotos(newPhotos); // Supprime l'élément de la liste
    onUpload(newPhotos); // Met à jour les photos dans le parent
  };

  return (
    <div className="ml-2 w-3/4 space-y-2">
      <p className="block text-[16px] font-semibold mb-2"> {t("Photos")}</p>

      {/* Input file masqué */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={addPhoto}
        className="hidden"
        data-testid="file-input"
      />

      {/* Liste des cases */}
      <div className="mt-2 border border-[#9F9F9F] rounded-lg overflow-hidden">
        {/* Affichage dynamique des cases */}
        {photos.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border-b border-gray-200 last:border-none"
          >
            {/* Affichage du fichier */}
            <span className="text-sm text-gray-700 truncate w-3/4">
              {file.name}
            </span>
            {/* Bouton "-" pour supprimer */}
            <button
              onClick={() => removePhoto(index)}
              className="text-[#CD0000] hover:text-red-700 font-bold text-lg"
            >
              −
            </button>
          </div>
        ))}

        {/* Dernière case avec le bouton "+" */}
        <div className="flex justify-between items-center p-2">
          <span className="text-sm text-gray-500 italic w-3/4">
            {t("photo")}
          </span>
          <button
            onClick={openFileSelector}
            className="text-[#4CAF50] hover:text-green-700 font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploader;

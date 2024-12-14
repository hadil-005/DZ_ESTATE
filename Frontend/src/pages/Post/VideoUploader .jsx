import React, { useState, useRef } from "react";

const VideoUploader = () => {
  const [videos, setVideos] = useState([]); // Liste des fichiers vidéos ajoutés
  const fileInputRef = useRef(null); // Référence pour l'élément input file

  // Fonction pour ouvrir le sélecteur de fichiers
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simule un clic sur l'input file
    }
  };

  // Fonction pour ajouter une vidéo
  const addVideo = (e) => {
    const files = Array.from(e.target.files);
    setVideos([...videos, ...files]); // Ajoute les fichiers vidéos à la liste
    e.target.value = ""; // Réinitialise l'input pour éviter l'affichage du dernier fichier sélectionné
  };

  // Fonction pour supprimer une vidéo
  const removeVideo = (index) => {
    setVideos(videos.filter((_, idx) => idx !== index)); // Supprime l'élément de la liste
  };

  return (
    <div className="ml-2 w-3/4 space-y-2">
      <p className="block text-[16px] font-semibold mb-2">Ajouter des vidéos</p>

      {/* Input file masqué pour accepter uniquement les fichiers vidéo */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*" // Change accept pour vidéos
        onChange={addVideo}
        className="hidden"
      />

      {/* Liste des vidéos */}
      <div className="mt-2 border border-[#9F9F9F] rounded-lg overflow-hidden">
        {/* Affichage dynamique des vidéos */}
        {videos.map((file, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border-b border-gray-200 last:border-none"
          >
            {/* Affichage du nom de la vidéo */}
            <span className="text-sm text-gray-700 truncate w-3/4">
              {file.name}
            </span>
            {/* Bouton "-" pour supprimer */}
            <button
              onClick={() => removeVideo(index)}
              className="text-[#CD0000] hover:text-red-700 font-bold text-lg"
            >
              −
            </button>
          </div>
        ))}

        {/* Dernière case avec le bouton "+" */}
        <div className="flex justify-between items-center p-2">
          <span className="text-sm text-gray-500 italic w-3/4">
            Ajouter une vidéo
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

export default VideoUploader;

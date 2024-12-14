import React, { useRef, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import Avataru from "./Avataru";
import { Badge, Avatar } from "@material-tailwind/react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function Discussion() {
  const fileInputRef = useRef(null); // Référence pour l'input image
  const fileInputOtherRef = useRef(null); // Référence pour l'input autre fichier
  const [uploadedFiles, setUploadedFiles] = useState([]); // Fichiers téléchargés
  const [message, setMessage] = useState(""); // Texte du message
  const [sentMessages, setSentMessages] = useState([]); // Liste des messages envoyés
  const [isOnline, setIsOnline] = useState(true); // Etat pour savoir si l'utilisateur est en ligne

  // Ouvre le sélecteur de images
  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };
  // Ouvre le sélecteur de fichiers autres que les images
  const handleFileClick = () => {
    fileInputOtherRef.current.click();
  };
  // Gère l'ajout de fichiers
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Gère les changements dans le <textarea>
  const handleMessageChange = (event) => {
    const text = event.target.innerText;
    setMessage(text);

    // Détection de la langue basée sur les caractères
    const arabicRegex = /[\u0600-\u06FF]/; // Détecte les caractères arabes
    const isArabic = arabicRegex.test(text);

    // Appliquer la classe de direction
    event.target.setAttribute("dir", isArabic ? "rtl" : "ltr");
    event.target.style.textAlign = isArabic ? "right" : "left";
  };

  // Supprime un fichier
  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Envoi du message
  const handleSendMessage = () => {
    if (message.trim() || uploadedFiles.length > 0) {
      const newMessage = {
        text: message.trim(),
        files: uploadedFiles,
        timestamp: new Date().toLocaleTimeString(),
      };
      setSentMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage(""); // Réinitialise le champ texte
      setUploadedFiles([]); // Réinitialise les fichiers

      // Réinitialise le contenu éditable
      const editableDiv = document.querySelector('[contenteditable="true"]');
      if (editableDiv) {
        editableDiv.innerText = "";
        editableDiv.setAttribute("dir", "ltr");
        editableDiv.style.textAlign = "left";
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-7 mt-24 p-4">
          <div>
            {isOnline ? (
              <Badge color="green" overlap="circular" placement="bottom-end">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="profile picture"
                />
              </Badge>
            ) : (
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="profile picture"
              />
            )}
          </div>

          <div className="absolute w-2/3  bottom-0 ml-44 p-4 ">
            {/* Messages envoyés */}
            <div className="mb-4 space-y-2">
              {sentMessages.map((msg, index) => (
                <div
                  key={index}
                  className="w-fit max-w-[24rem] p-3 bg-gray-100 rounded-md shadow ml-auto break-words"
                >
                  {/* Texte du message */}
                  {msg.text && (
                    <p className="text-sm text-gray-700">{msg.text}</p>
                  )}

                  {/* Liste des fichiers joints */}
                  {msg.files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.files.map((file, i) => (
                        <div key={i}>
                          {file.type.startsWith("image/") ? (
                            // Aperçu de l'image
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full max-h-40 object-cover rounded-md"
                            />
                          ) : (
                            // Lien téléchargeable pour les autres fichiers
                            <a
                              href={URL.createObjectURL(file)}
                              download={file.name}
                              className="text-blue-500 underline text-xs"
                            >
                              {file.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Horodatage */}
                  <span className="text-xs text-gray-400 block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Champ d'entrée du message */}
            <div className="relative w-[900px] min-h-[50px] max-h-[300px] rounded-md bg-[#D9D9D9] px-2 focus:outline-none overflow-auto border">
              <div
                contentEditable
                suppressContentEditableWarning
                className="w-full  min-h-[40px] max-h-[200px] p-2 rounded-md"
                style={{
                  outline: "none",
                  border: "none",
                  textAlign: "left",
                }}
                onInput={handleMessageChange}
                dir="ltr"
              ></div>
              <div className="mt-2 flex  flex-wrap">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-gray-200 px-2 py-1 rounded-full m-1"
                  >
                    <span className="text-xs">{file.name}</span>
                    <XMarkIcon
                      className="w-4 h-4 ml-1 text-red-500 cursor-pointer"
                      onClick={() => removeFile(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons */}
            <div className="absolute left-[-3%] bottom-4 transform -translate-y-1/2 cursor-pointer">
              <PhotoIcon
                className="w-6 h-6 text-[#1C84FF]"
                onClick={handleGalleryClick}
              />
            </div>
            <div className="absolute left-[-7%] bottom-4 transform -translate-y-1/2 cursor-pointer">
              <PaperClipIcon
                className="w-6 h-6 text-[#1C84FF]"
                onClick={handleFileClick} // Permet d'ouvrir le sélecteur de fichiers
              />
            </div>
            <div className="absolute left-[73%] bottom-4 transform -translate-y-1/2 cursor-pointer">
              <PaperAirplaneIcon
                className="w-6 h-6 text-[#1C84FF]"
                onClick={handleSendMessage}
              />
            </div>

            {/* Input de type fichier, masqué */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              type="file"
              ref={fileInputOtherRef}
              accept="*/*" // Accepte tous les fichiers sauf les images
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discussion;

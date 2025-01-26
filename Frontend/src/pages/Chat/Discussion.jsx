import React, { useRef, useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Avatar } from "@material-tailwind/react";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

function Discussion({ user }) {
  const fileInputRef = useRef(null);
  const fileInputOtherRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  // Convertir un fichier en base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Convertir base64 en fichier
  const base64ToFile = (base64, name, type) => {
    if (!base64 || typeof base64 !== "string") {
      console.error("Invalid base64 value:", base64);
      return null;
    }

    try {
      const base64Data = base64.split(",")[1];
      if (!base64Data) {
        console.error("Invalid base64 format:", base64);
        return null;
      }

      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new File([byteArray], name, { type });
    } catch (error) {
      console.error("Error converting base64 to file:", error);
      return null;
    }
  };

  // Charger les messages depuis localStorage
  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem("sentMessages")) || [];

    // Reconvertir les fichiers base64 en objets File
    const messagesWithFiles = savedMessages.map((msg) => ({
      ...msg,
      files: msg.files
        .map((file) => {
          if (!file.base64 || !file.name || !file.type) {
            console.error("Invalid file data:", file);
            return null;
          }
          return base64ToFile(file.base64, file.name, file.type);
        })
        .filter(Boolean), // Supprimer les fichiers invalides
    }));

    setSentMessages(messagesWithFiles);
  }, []);

  // Sauvegarder les messages dans localStorage
  const saveMessagesToLocalStorage = (messages) => {
    const messagesToSave = messages.map((msg) => ({
      ...msg,
      files: msg.files.map((file) => ({
        name: file.name,
        type: file.type,
        base64: file.base64,
      })),
    }));

    localStorage.setItem("sentMessages", JSON.stringify(messagesToSave));
  };

  // Envoyer un message
  const handleSendMessage = async () => {
    if (!message.trim() && uploadedFiles.length === 0) return;

    // Convertir les fichiers en base64
    const filesWithBase64 = await Promise.all(
      uploadedFiles.map(async (file) => ({
        name: file.name,
        type: file.type,
        base64: await fileToBase64(file),
      }))
    );

    const newMessage = {
      text: message,
      files: filesWithBase64,
      timestamp: new Date().toLocaleString(),
    };

    const updatedMessages = [...sentMessages, newMessage];
    setSentMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);
    setMessage("");
    setUploadedFiles([]);
  };

  // Gérer l'ajout de fichiers
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  // Supprimer un fichier
  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="flex-1 ml-7 mt-2 p-4">
          <div className="flex items-center gap-4">
            <Avatar
              src={user?.avatar || "default-avatar.jpg"}
              alt={user?.name || "Anonymous"}
            />
            <h2 className="text-xl font-bold">{user?.name || "Anonymous"}</h2>
          </div>

          <div className="absolute w-2/3 bottom-0 ml-44 p-4">
            {/* Afficher les messages envoyés */}
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

                  {/* Fichiers joints */}
                  {msg.files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.files.map((file, i) => {
                        if (!file) return null; // Ignorer les fichiers invalides
                        return (
                          <div key={i}>
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full max-h-40 object-cover rounded-md"
                              />
                            ) : (
                              <a
                                href={URL.createObjectURL(file)}
                                download={file.name}
                                className="text-blue-500 underline text-xs"
                              >
                                {file.name}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Horodatage */}
                  <span className="text-xs text-gray-400 block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Champ de saisie du message */}
            <div className="relative w-[900px] min-h-[40px] max-h-[100px] rounded-md bg-[#D9D9D9] px-2 focus:outline-none overflow-auto border">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[40px] max-h-[200px] p-2 rounded-md "
                style={{
                  outline: "none",
                  border: "none",
                  textAlign: "left",
                }}
                placeholder="Écrivez votre message..."
              />
              <div className="mt-2 flex flex-wrap">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-[#D9D9D9] px-2 py-1 rounded-full m-1"   >
                    <span className="text-xs">{file.name}</span>
                    <XMarkIcon
                      className="w-4 h-4 ml-1 text-red-500 cursor-pointer"
                      onClick={() => handleRemoveFile(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons */}
            <div className="absolute left-[-3%] bottom-4 transform -translate-y-1/2 cursor-pointer">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <PhotoIcon
                className="w-6 h-6 text-[#1C84FF]"
                onClick={() => fileInputRef.current.click()}
                aria-label="Ajouter une image"
              />
            </div>
            <div className="absolute left-[-7%] bottom-4 transform -translate-y-1/2 cursor-pointer">
              <input
                type="file"
                ref={fileInputOtherRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <PaperClipIcon
                className="w-6 h-6 text-[#1C84FF]"
                onClick={() => fileInputOtherRef.current.click()}
              />
            </div>
            <div className="absolute left-[83%] bottom-4 transform -translate-y-1/2 cursor-pointer">
              <PaperAirplaneIcon
                className="w-6 h-6 text-[#1C84FF]"
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Discussion.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

Discussion.defaultProps = {
  user: {
    avatar: "default-avatar.jpg",
    name: "Anonymous",
  },
};

export default Discussion;

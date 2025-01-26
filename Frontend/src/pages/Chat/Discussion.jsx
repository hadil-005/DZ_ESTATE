import React, { useRef, useState, useEffect } from "react";
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
import PropTypes from "prop-types";

function Discussion({ user, selectedReceiverId }) {
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

  // Envoi du message
  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      console.error("No token found!");
      return;
    }

    const msgElement = document.getElementById("msg");
    if (msgElement && msgElement.textContent.trim()) {
      const msg = msgElement.textContent.trim();
      const formData = new FormData();

      // Append message content
      formData.append("content", msg);

      // Dynamically set the receiver_id and content
      const receiver_id = 2; // Get dynamically selected receiver ID
      const content = msg; // Use the message content from the input field

      // Log FormData for debugging purposes
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/messages/cmassage",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Ensure content type is application/json
            },
            body: JSON.stringify({ receiver_id, content }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Message sent successfully:", data);

          setSentMessages((prevMessages) => {
            const updatedMessages = [
              ...prevMessages,
              { text: msg, timestamp: new Date().toLocaleString(), files: [] },
            ];

            // Sauvegarder dans localStorage
            localStorage.setItem(
              "sentMessages",
              JSON.stringify(updatedMessages)
            );

            return updatedMessages;
          });
          setMessage(""); // Clear input
        } else {
          console.error("Error sending message:", response.statusText);
          alert("Failed to send message. Please try again.");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("A network error occurred. Please check your connection.");
      }
    } else {
      console.error("Message input element not found or is empty.");
      alert("Please enter a message.");
    }
  };
  // Charger les messages au démarrage (lors du rechargement de la page)
  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("sentMessages")) || [];
    setSentMessages(storedMessages); // Charger les messages depuis le localStorage
  }, []);

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
                id="msg"
                className="w-full min-h-[40px] max-h-[200px] p-2 rounded-md bg-red-300"
                style={{
                  outline: "none",
                  border: "none",
                  textAlign: "left",
                }}
                onInput={handleMessageChange}
                dir="ltr"
              ></div>
              <div className="mt-2 flex flex-wrap">
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
                aria-label="Ajouter une image"
              />
            </div>
            <div className="absolute left-[-7%] bottom-4 transform -translate-y-1/2 cursor-pointer">
              <PaperClipIcon
                className="w-6 h-6 text-[#1C84FF]"
                onClick={handleFileClick}
              />
            </div>
            <div className="absolute left-[73%] bottom-4 transform -translate-y-1/2 cursor-pointer">
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

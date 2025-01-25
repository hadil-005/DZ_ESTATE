import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Import des icônes des réseaux sociaux

const Footer = () => {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSendComment = async () => {
    if (!comment.trim()) {
      alert("Veuillez saisir un commentaire.");
      return;
    }

    const alertData = { content: comment };

    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/comments/createc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alertData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Commentaire ajouté :", data.comment);
        alert("Votre commentaire a été ajouté !");
        setComment("");
      } else {
        const errorData = await response.json();
        console.error("Erreur :", errorData.error);
        alert(errorData.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
      alert("Une erreur réseau est survenue. Veuillez réessayer.");
    }
  };

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <footer className="bg-gray-950 text-gray-400 py-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Section Votre commentaire */}
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-4">Votre commentaire</h3>
            <div className="flex items-center">
              <input
                type="text"
                id="comment"
                placeholder="Que pensez-vous de notre service"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-72 bg-inherit rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleSendComment}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-sm flex items-center ml-2"
              >
                Envoyer →
              </button>
            </div>
          </div>

          {/* Section Réseaux sociaux */}
          <div className="flex-1" style={{ marginRight: "-150px" }}>
            <h3 className="text-white font-semibold mb-4">
              Nos réseaux sociaux
            </h3>
            <div className="flex justify-center items-center gap-6 mr-96">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-white text-2xl hover:text-blue-600" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-white text-2xl hover:text-blue-400" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-white text-2xl hover:text-pink-600" />
              </a>
            </div>
          </div>

          {/* Section Contactez-nous */}
          <div className="flex-1" style={{ marginRight: "-300px" }}>
            <h3 className="text-white font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-2">
              <li>dzestate@gmail.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>
        </div>

        <div className="h-0.5 bg-gray-700 w-9/12 mx-auto my-8"></div>

        <div className="text-center text-sm text-gray-500">
          Copyright © 2024. DZ-ESTATE
        </div>
      </div>
    </footer>
  );
};

export default Footer;

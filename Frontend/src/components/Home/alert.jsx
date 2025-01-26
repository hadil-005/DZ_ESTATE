import React, { useState } from "react";
import "./home.css";
import axios from "axios";
// import { ConsoleLogEntry } from "selenium-webdriver/bidi/logEntries";

const Alert = () => {
  const [search, setSearch] = useState("");
  const [searchc, setSearchc] = useState("");
  const [showList, setShowList] = useState(false);
  const [showListc, setShowListc] = useState(false);
  const [propertyType, setPropertyType] = useState("house");
  const [roomsNumber, setRoomsNumber] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const wilayas = ["Adrar", "Chlef"];

  const communes = ["Adrar", "Tamest", "Charouine", "Reggane", "In Zghmir"];

  const filteredWilayas = wilayas.filter((wilaya) =>
    wilaya.toLowerCase().startsWith(search.toLowerCase())
  );

  const filtercommunes = communes.filter((commune) =>
    commune.toLowerCase().startsWith(searchc.toLowerCase())
  );

  const handleWilayaClick = (wilaya) => {
    setSearch(wilaya);
    setShowList(false);
  };

  const handleCommuneClick = (commune) => {
    setSearchc(commune);
    setShowListc(false);
  };
  const handleSubmit = async () => {
    const alertData = {
      wilaya: search,
      commune: searchc,
      property_type: propertyType,
      max_price: maxPrice,
      area: maxArea,
      rooms_number: roomsNumber,
    };
    const token = localStorage.getItem("token");
    console.log(token);
    console.log("here");

    try {
      const response = await fetch("http://127.0.0.1:3000/api/alerts/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indique que le corps est au format JSON
          Authorization: `Bearer ${token}`, // Ajoute le token d'authentification
        },
        credentials: "include", // Inclut les cookies
        body: JSON.stringify(alertData), // Convertit l'objet en JSON
      });
      console.log("here");

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du backend :", data);
    } catch (error) {
      console.error("Erreur lors de la création de l'alerte :", error);
    }
  };

  const handleSubmit1 = async () => {
    try {
      const alertData = {
        wilaya: search,
        commune: searchc,
        property_type: propertyType,
        max_price: maxPrice,
        area: maxArea,
        rooms_number: roomsNumber,
      };

      console.log("Données envoyées :", alertData);

      const response = await axios.post(
        "http://127.0.0.1:3000/api/alerts/alert",
        alertData,
        {
          withCredentials: true, // Inclut les cookies
        }
      );

      console.log("Réponse du backend :", response);

      if (response.status === 201) {
        alert("Alerte créée avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'alerte :", error);
      if (error.response) {
        console.log("Réponse d'erreur du backend :", error.response.data);
      } else if (error.request) {
        console.log("Aucune réponse reçue du backend :", error.request);
      } else {
        console.log(
          "Erreur lors de la configuration de la requête :",
          error.message
        );
      }
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  return (
    <div>
      <div className="alarm">
        <div className="overlay">
          <p className="custom-text1">Personnalisez vos alertes</p>
          <p className="custom-text2">
            Vous recevrez une notification si la propriété que vous recherchez
            est disponible
          </p>
          <div className="labels">
            <div className="label">
              <label htmlFor="propertyType" className="custom-text2">
                Qu'est-ce que tu cherches?{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="propertyType"
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="maison">Maison</option>
                <option value="appartement">Appartement</option>
                <option value="studio">Studio</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="custom-text2" htmlFor="wilaya">
                Wilaya
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="wilaya"
                id="wilaya"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowList(e.target.value !== "");
                }}
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

            <div className="flex flex-col">
              <label className="custom-text2" htmlFor="commune">
                Commune
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="commune"
                id="commune"
                value={searchc}
                onChange={(e) => {
                  setSearchc(e.target.value);
                  setShowListc(e.target.value !== "");
                }}
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {showListc && filtercommunes.length > 0 && (
                <ul className="list-disc ml-6 border border-gray-300 rounded-md shadow-md bg-white max-h-60 overflow-auto">
                  {filtercommunes.map((commune, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-gray-700 hover:text-blue-500 px-2 py-1"
                      onClick={() => handleCommuneClick(commune)}
                    >
                      {commune}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="label">
              <label htmlFor="budget" className="custom-text2">
                Budget (DA) <span style={{ color: "red" }}>*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="price"
                  step="10"
                  className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="label">
              <label htmlFor="roomsNumber" className="custom-text2">
                Nombre de chambres <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="roomsNumber"
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={roomsNumber}
                onChange={(e) => setRoomsNumber(e.target.value)}
              >
                <option value="" disabled hidden>
                  Nombre de chambres
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="label">
              <label htmlFor="area" className="custom-text2">
                Surface (m2) <span style={{ color: "red" }}>*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  placeholder="Max"
                  step="10"
                  className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            className="w-full h-[40px] mt-10 bg-blue-600 text-white font-poppins rounded-[5px] hover:bg-blue-700 transition-all duration-200"
            onClick={handleSubmit}
          >
            Créer une alerte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;

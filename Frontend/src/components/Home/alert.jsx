import React, { useState } from "react";
import "./home.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../components/Multilingue/i18n";

const Alert = () => {
  const { i18n, t } = useTranslation();
  const [search, setSearch] = useState("");
  const [searchc, setSearchc] = useState("");
  const [showList, setShowList] = useState(false);
  const [showListc, setShowListc] = useState(false);
  const [propertyType, setPropertyType] = useState("house");
  const [roomsNumber, setRoomsNumber] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const wilayas = [
    "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaia","Biskra","Béchar","Blida","Bouira","Tamanrasset", "Tébessa","Tlemcen","Tiaret","Tizi Ouzou", "Alger", "Djelfa","Jijel","Sétif","Saïda", "Skikda","Sidi Bel Abbès",
    "Annaba", "Guelma", "Constantine", "Médéa","Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt","El Oued", "Khenchela",
    "Souk Ahras","Tipaza", "Mila","Ain Defla", "Naama","Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Bordj Badji Mokhtar","Ouled Djellal","Béni Abbès","In Salah","In Guezzam","Touggourt","Djanet","El Meghaier","El Meniaa",
  ];

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

    try {
      const response = await fetch("http://127.0.0.1:3000/api/alerts/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(alertData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du backend :", data);
    } catch (error) {
      console.error("Erreur lors de la création de l'alerte :", error);
    }
  };

  return (
    <div>
      <div className="alarm">
        <div className="overlay">
          <p
            className={`custom-text1 ${
              i18n.language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("customizeAlerts")}
          </p>
          <p
            className={`custom-text2 ${
              i18n.language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("youWillReceiveNotification")}
          </p>
          <div className="labels">
            <div className="label">
              <label htmlFor="propertyType" className="custom-text2">
                {t("whatAreYouLookingFor")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="propertyType"
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="maison">{t("house")}</option>
                <option value="appartement">{t("apartment")}</option>
                <option value="studio">{t("studio")}</option>
                <option value="villa">{t("villa")}</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="custom-text2" htmlFor="wilaya">
                {t("wilaya")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("wilayaPlaceholder")}
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
                {t("commune")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={t("communePlaceholder")}
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
                {t("budget")} <span style={{ color: "red" }}>*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={t("pricePlaceholder")}
                  step="10"
                  className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="label">
              <label htmlFor="roomsNumber" className="custom-text2">
                {t("numberOfRooms")} <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="roomsNumber"
                className="w-[80%] px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={roomsNumber}
                onChange={(e) => setRoomsNumber(e.target.value)}
              >
                <option value="" disabled hidden>
                  {t("numberOfRoomsPlaceholder")}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div className="label">
              <label htmlFor="area" className="custom-text2">
                {t("area")} (m2) <span style={{ color: "red" }}>*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={maxArea}
                  onChange={(e) => setMaxArea(e.target.value)}
                  placeholder={t("maxAreaPlaceholder")}
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
            {t("createAlert")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;

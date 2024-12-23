import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import drapeau from "../../assets/drapeau.png";
import profile from "../../assets/profil.png";
import { Navbar as MaterialNavbar, Typography, Button, IconButton } from "@material-tailwind/react"; // Importez le composant Navbar de Material Tailwind
import "../Multilingue/i18n"


export const Navbar = () => {
  const { i18n ,t} = useTranslation(); // Utilisez i18n de react-i18next
  const [click, setClick] = useState(false);
 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour la liste déroulante
  const [hoverMessage, setHoverMessage] = useState(""); // État pour le message
  // Langue actuelle, par défaut en français
  const [currentLang, setCurrentLang] = useState(i18n.language || "fr");
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Gère l'ouverture/fermeture de la liste
  // const selectLanguage = (language) => {
  //   console.log(`Langue sélectionnée : ${language}`); // Remplacez par votre logique
  //   setIsDropdownOpen(false); // Ferme la liste après sélection
  // };
  // Changer la langue et la direction
  const selectLanguage = (lang) => {
    setIsDropdownOpen(false); // Ferme le menu déroulant
    setCurrentLang(lang); // Met à jour la langue sélectionnée
    i18n.changeLanguage(lang); // Changer la langue (si vous utilisez i18next)

    // Mettre à jour les attributs HTML pour gérer la direction (RTL/LTR)
    document.documentElement.lang = lang === "ar" ? "ar" : "fr";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const links = [
    { name: t("accueil"), link: "" },
    { name: t("decouvrir"), link: "" },
    { name: t("apropos"), link: "" },
    { name: t("faq"), link: "" },
    { name: t("avis"), link: "" },
  ];

  const linkss = [{ name: t("publier"), link: "post" }];
  const links1 = [{ name: t("login"), link: "signin" }];
 

  return (
    <MaterialNavbar
      className={` fixed w-full top-0 right-0 bg-black flex items-center justify-between flex-row px-4 py-5 transition-all duration-500 shadow-lg z-50`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="log" className="w-44 h-11" />
      </Link>
      {/* Menu principal */}
      <ul
        className={`${
          click
            ? "block absolute bg-black left-4 right-4 -mt-2"
            : "hidden md:flex md:gap-4"
        } flex flex-col md:flex-row text-white items-center transition-all duration-300`}
        style={{ top: "calc(100% + 10px)", zIndex: "1000" }}
      >
        {links.map((link, idx) => (
          <li key={idx} className="flex items-center ml-8">
            <Link
              onClick={closeMenu}
              to={`/${link.link}`}
              className={` text-white hover:text-[#1C84FF] font-semibold block md:text-bold md:mx-2`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Drapeau et liste déroulante */}
      <div className="header flex justify-between items-center"></div>

      <div className="relative ">
        <img
          src={drapeau}
          alt="drapeau"
          className="cursor-pointer "
          onClick={toggleDropdown} // Ouvre/ferme la liste
          onMouseEnter={() => setHoverMessage(t("langue"))} // Message au survol
          onMouseLeave={() => setHoverMessage("")} // Cache le message
        />
        {hoverMessage && (
          <div
            className="absolute w-44 h-6  flex items-center justify-center bg-white text-black text-sm font-semibold rounded-md"
            style={{ zIndex: 10 }}
          >
            {hoverMessage}
          </div>
        )}
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            <li
              className="px-4 py-2 text-black  cursor-pointer hover:bg-gray-100"
              onClick={() => selectLanguage("ar")}
            >
              {t("Arabe")}
            </li>
            <li
              className="px-4 text-black py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => selectLanguage("fr")}
            >
              {t("Français")}
            </li>
          </ul>
        )}
      </div>
      {/* Publier et Profil */}
      <ul
        className={`${
          click
            ? "block absolute bg-black left-4 right-4 -mt-8"
            : "hidden md:flex md:gap-4"
        } flex flex-col md:flex-row text-[#1C84FF] items-center gap-4 transition-all duration-300`}
        style={{ top: "calc(100% + 10px)", zIndex: "1000" }}
      >
        {linkss.map((link, idx) => (
          <li key={idx}>
            <Link
              onClick={closeMenu}
              to={`/${link.link}`}
              className={` text-[#1C84FF] hover:text-white font-semibold block md:text-bold md:mx-2`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul
        className={`${
          click
            ? "block absolute bg-black left-4 right-4 -mt-2"
            : "hidden md:flex md:gap-4"
        } flex flex-col md:flex-row text-[#1C84FF] mr-8 items-center gap-4 transition-all duration-300`}
        style={{ top: "calc(100% + 10px)", zIndex: "1000" }}
      >
        {links1.map((link, idx) => (
          <li key={idx} className="flex items-center space-x-4">
            <img className="mb-1 hover:fill-white" src={profile} alt="Profil" />
            <Link
              onClick={closeMenu}
              to={`/${link.link}`}
              className={` text-[#1C84FF] hover:text-white font-semibold block md:text-bold md:mx-2`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Bouton mobile */}
      <div className="md:hidden">
        <button
          onClick={handleClick}
          className="text-gray-500 bg-black hover:text-[#1C84FF] focus:outline-none"
        >
          <svg
            className="w-6 h-6 fill-none stroke-white"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            {click ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.293 5.293L12 11.586 5.707 5.293A1 1 0 004.293 6.707l6 6a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </div>
    </MaterialNavbar>
  );
};

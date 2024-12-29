import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import drapeau from "../../assets/drapeau.png";
import profile from "../../assets/profil.png";
import {
  Navbar as MaterialNavbar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import "../Multilingue/i18n";

export const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [click, setClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Liste déroulante
  const [hoverMessage, setHoverMessage] = useState(""); // Message au survol
  const [currentLang, setCurrentLang] = useState(i18n.language || "fr");

  // Ajouter l'état pour l'utilisateur
  const [user, setUser] = useState(null);

  // Vérifiez si un utilisateur est connecté à chaque chargement
  useEffect(() => {
    const firstName = localStorage.getItem("first_name");
    const familyName = localStorage.getItem("family_name");

    if (firstName && familyName) {
      setUser({ first_name: firstName, family_name: familyName });
    }
  }, []);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const selectLanguage = (lang) => {
    setIsDropdownOpen(false);
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang === "ar" ? "ar" : "fr";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("first_name");
    localStorage.removeItem("family_name");
    setUser(null); // Réinitialisez l'état utilisateur
  };

  const links = [
    { name: t("accueil"), link: "" },
    { name: t("decouvrir"), link: "" },
    { name: t("apropos"), link: "" },
    { name: t("faq"), link: "" },
    { name: t("avis"), link: "" },
  ];

  const linkss = [{ name: t("publierp"), link: "post" }];
  const links1 = [{ name: t("login"), link: "signin" }];

  return (
    <MaterialNavbar className="fixed w-full top-0 right-0 bg-black flex items-center justify-between flex-row px-4 py-5 transition-all duration-500 shadow-lg z-50">
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-44 h-11" />
      </Link>

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
              className="text-white hover:text-[#1C84FF] font-semibold block md:text-bold md:mx-2"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative">
        <img
          src={drapeau}
          alt="Drapeau"
          className="cursor-pointer"
          onClick={toggleDropdown}
          onMouseEnter={() => setHoverMessage(t("langue"))}
          onMouseLeave={() => setHoverMessage("")}
        />
        {hoverMessage && (
          <div
            className="absolute w-44 h-6 flex items-center justify-center bg-white text-black text-sm font-semibold rounded-md"
            style={{ zIndex: 10 }}
          >
            {hoverMessage}
          </div>
        )}
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
            <li
              className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
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
            {user ? (
              // Si l'utilisateur est connecté, afficher le lien "Publier un bien"
              <Link
                onClick={closeMenu}
                to={`/${link.link}`}
                className="text-[#1C84FF] hover:text-white font-semibold block md:text-bold md:mx-2"
              >
                {link.name}
              </Link>
            ) : (
              // Si l'utilisateur n'est pas connecté, rediriger ou afficher un message
              <button
                onClick={() => {
                  alert(t("connectez_vous_publier"));
                  window.location.href = "/signin"; // Redirige vers la page de connexion
                }}
                className="text-[#1C84FF] hover:text-white font-semibold block md:text-bold md:mx-2"
              >
                {link.name}
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Affichage du profil ou bouton de connexion */}
      <ul>
        {user ? (
          <li className="flex items-center space-x-4">
            <img className="mb-1 hover:fill-white" src={profile} alt="Profil" />
            <span className="text-[#1C84FF] hover:text-white font-semibold">
              {user.first_name} {user.family_name}
            </span>
            {/* Bouton de déconnexion */}
            <button
              onClick={handleLogout}
              className="ml-4 px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            >
              {t("déconnexion")}
            </button>
          </li>
        ) : (
          links1.map((link, idx) => (
            <li key={idx} className="flex items-center space-x-4">
              <img
                className="mb-1 hover:fill-white"
                src={profile}
                alt="Profil"
              />
              <Link
                onClick={closeMenu}
                to={`/${link.link}`}
                className="text-[#1C84FF] hover:text-white font-semibold block md:text-bold md:mx-2"
              >
                {link.name}
              </Link>
            </li>
          ))
        )}
      </ul>

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

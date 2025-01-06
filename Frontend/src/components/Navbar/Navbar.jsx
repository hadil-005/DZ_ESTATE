import React, { useState, useEffect } from "react";
import styles from "../../components/Navbar/Navbar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import drapeau from "../../assets/drapeau.png";
import profile from "../../assets/profil.png";




export const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // État pour la liste déroulante
  const [hoverMessage, setHoverMessage] = useState(""); // État pour le message
  // Track scroll direction
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setScrollingUp(true);  // Scrolling up
    } else {
      setScrollingUp(false);  // Scrolling down
    }
    setLastScrollY(window.scrollY);  // Update scroll position
  };

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change la langue
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr"; // Gère RTL
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen); // Gère l'ouverture/fermeture de la liste
  const selectLanguage = (language) => {
    console.log(`Langue sélectionnée : ${language}`); // Remplacez par votre logique
    setIsDropdownOpen(false); // Ferme la liste après sélection
  };

  const links = [
    { name: "Acceuil", link: "" },
    { name: "Découvrir", link: "./property" },
    { name: "A propos", link: "apropos" },
    { name: "FAQ", link: "aide" },
    { name: "AVIS", link: "avis" },
  ];

  const linkss = [{ name: "+ Publier votre bien", link: "publier" }];
  const links1 = [{ name: "login", link: "contact" }];

  return (
<div
      className={`${styles.header} fixed w-full top-0 right-0 bg-black flex items-center justify-between flex-row px-4 py-5 transition-all duration-1000 shadow-lg z-50 ${
        !scrollingUp ? "top-[-100px]" : "top-0"
      }`}  // Toggle visibility based on scroll direction
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
              className={`${styles.navLink} text-white hover:text-[#1C84FF] font-semibold block md:text-bold md:mx-2`}
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
          onMouseEnter={() => setHoverMessage("choisissez  votre langue")} // Message au survol
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
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => selectLanguage("arabe")}
            >
              Arabe
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => selectLanguage("français")}
            >
              Français
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
              className={`${styles.navLink} text-[#1C84FF] hover:text-white font-semibold block md:text-bold md:mx-2`}
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
            <img className="mb-1 hover:fill-white"  src={profile} alt="Profil" />
            <Link
              onClick={closeMenu}
              to={`/${link.link}`}
              className={`${styles.navLink} text-[#1C84FF] hover:text-white font-semibold block md:text-bold md:mx-2`}
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
    </div>
  );
};
import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
const Footer = () => {
    
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin'); // Navigate to the /signin route
  };
    return (
      <footer className="bg-gray-950 text-gray-400 py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Logo and Comment */}
          <div className="md:col-span-2">
            <img src={logo} className='mb-20'></img>
            <div>
              <p className="text-white font-semibold mb-4">Votre commentaire</p>
              <div className="flex items-center w-fit">
                <input
                  type="text"
                  placeholder="Que pensez-vous de notre service"
                  className="w-full bg-inherit rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-sm flex items-center ">
                Envoyer→
                </button>
              </div>
            </div>
          </div>
  
          {/* Discover */}
          <div className="mt-24">
            <h2 className="text-white font-semibold mb-4">Découvrir</h2>
            <ul className="space-y-2">
              {["Alger", "Batna", "Bejaia", "Bouira", "Setif", "Oran"].map(
                (city, index) => (
                  <li key={index} className="hover:text-white cursor-pointer">
                    {city}
                  </li>
                )
              )}
            </ul>
          </div>
  
          {/* Quick Links */}
          <div className="mt-24">
            <h2 className="text-white font-semibold mb-4">Liens rapides</h2>
            <ul className="space-y-2">
              {[
                "À propos de nous",
                "Découvrir",
                "FAQ",
                "Commentaires",
                "Politique de confidentialité",
                "Conditions générales",
              ].map((link, index) => (
                <li key={index} className="hover:text-white cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
  
          {/* Contact Us */}
          <div className="mt-24">
            <h2 className="text-white font-semibold mb-4">Contactez-nous</h2>
            <ul className="space-y-2">
              <li>dzestate@gmail.com</li>
              <li>(123) 456-7890</li>
            </ul>
          </div>
  
          {/* Join Us */}
          <div className="space-y-4 mt-24">
            <div>
              <h2 className="text-white font-semibold mb-2">Rejoignez-nous</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm" onClick={handleClick}>
              S'INSCRIRE
              </button>
            </div>
            <div>
              <h2 className="text-white font-semibold mb-2">Publiez votre propriété</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-sm" onClick={handleClick}>
              Publier
              </button>
            </div>
          </div>
        </div>
        <div class="h-0.5 bg-gray-700 w-9/12 mx-auto mt-20"></div>
        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-500 mt-10">
          Copyright © 2024. DZ-ESTATE
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
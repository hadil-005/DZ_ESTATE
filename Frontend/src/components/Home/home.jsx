import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from React Router
import './home.css';
import Cuisine from '../../assets/cuisine.png'
import Homep from '../../assets/Homep.png'
import Building from '../../assets/building.png'
import Box from '../../assets/box.png'
import women from '../../assets/women.png'
import find from '../../assets/find.png'
import sell from '../../assets/sell.png'
import buy from '../../assets/buy.png'
import sale from '../../assets/sale.png'
import { Navbar } from '../Navbar/Navbar';
import  Footer  from '../Footer/Footer';
import { TfiQuoteLeft } from "react-icons/tfi";
import { FaMapMarkerAlt ,FaBed, FaBath, FaRulerCombined, FaDollarSign } from 'react-icons/fa';
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet"></link>

const Home = () => {
    const [user, setUser] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);
      
        const toggleFAQ = (index) => {
          setOpenIndex(openIndex === index ? null : index);
        };
      
        const faqs = [
          {
            question: "Comment puis-je publier un bien à vendre ou à louer ?",
            answer:
              "Cras vitae ac nunc orci. Purus amet tortor non at phasellus ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus, scelerisque volutpat nec sit vel donec. Sagittis, id volutpat erat vel.",
          },
          {
            question: "Puis-je contacter les propriétaires directement via la plateforme ?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            question: "Quels types de propriétés sont répertoriés sur Dz-Estate ?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            question: "Comment rechercher des propriétés dans une ville ou un quartier spécifique ?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
          {
            question: "Puis-je planifier une visite de propriété via Dz-Estate ?",
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ];
        const Article = ({ title, image, location, bedrooms, bathrooms, surface, price, isNew, saleType }) => {
          return (
              <div className="article relative bg-white p-5 rounded-lg shadow-md w-full max-w-sm">
                  {/* Image with badges */}
                  <div className="relative">
                      <img src={image} alt={title} className="article-image w-full h-48 object-cover rounded-lg" />
                      
                      {/* FOR SALE / FOR RENT Badge */}
                      {saleType && (
                          <span className={`absolute top-2 left-2 ${saleType === 'For Sale' ? 'bg-blue-500' : 'bg-yellow-500'} text-white px-3 py-1 rounded-md text-sm font-semibold`}>
                              {saleType}
                          </span>
                      )}
      
                      {/* NEW Badge */}
                      {isNew && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                              NEW
                          </span>
                      )}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-semibold text-lg text-gray-800 mt-4">{title}</h3>
                  
                  {/* Location */}
                  <div className="location flex items-center text-gray-600 text-sm mt-2">
                      <FaMapMarkerAlt className="size-5 mr-2 text-blue-500" />
                      <span>{location}</span>
                  </div>
                  
                  {/* Details */}
                  <div className="details flex justify-between text-sm text-gray-700 mt-3">
                      <div className="detail flex items-center gap-1">
                          <FaBed className="icon size-6 text-blue-500" />
                          <span>{bedrooms}</span>
                      </div>
                      <div className="detail flex items-center gap-1">
                          <FaBath className="icon size-6 text-blue-500" />
                          <span>{bathrooms}</span>
                      </div>
                      <div className="detail flex items-center gap-1">
                          <FaRulerCombined className="icon size-6 text-blue-500" />
                          <span>{surface}m²</span>
                      </div>
                      <div className="flex text-red-600 items-center gap-1 font-bold text-lg">
                          <span>{price}</span>
                          <FaDollarSign />
                      </div>
                  </div>
              </div>
          );
      };
      
    
    return (
      <div className="home">
        <Navbar/>
        <div
          style={{
            backgroundImage: `url(${Homep})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="h-20 "></div>
          <div className="alarm">
            <div className="overlay">
              <p className="custom-text1">Personnalisez vos alertes</p>
              <p className="custom-text2">
                Vous recevrez une notification si la propriété que vous
                recherchez est disponible
              </p>
              <div className="labels">
                <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Qu'est-ce que tu cherches?{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    id="nom"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins"
                    style={{ color: "gray", paddingLeft: "5px" }}
                  >
                    <option value="house">Maison</option>
                    <option value="apartment">Appartement</option>
                    <option value="condo">Copropriété</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>

                <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Votre wilaya <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="nom"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins"
                    style={{ color: "gray", paddingLeft: "5px" }}
                  >
                    <option value="" disabled selected>
                      Votre wilaya
                    </option>
                    <option value="algiers">Alger</option>
                    <option value="bejaia">Bejaia</option>
                    <option value="khenchela">Khenchela</option>
                    <option value="oran">Oran</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Votre commune <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="nom"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins"
                    style={{ color: "gray", paddingLeft: "5px" }}
                  >
                    <option value="" disabled selected>
                      Votre commune
                    </option>
                    <option value="algiers">Alger</option>
                    <option value="bejaia">Bejaia</option>
                    <option value="khenchela">Khenchela</option>
                    <option value="oran">Oran</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Budget minimum (DA) <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    placeholder=" Min"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins "
                    style={{ paddingLeft: "5px" }}
                  />
                </div>
                <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Budget maximum (DA) <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    placeholder=" Max"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins"
                    style={{ paddingLeft: "5px" }}
                  />
                </div>
                <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Nombre de chambres <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="nom"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins"
                    style={{ color: "gray", paddingLeft: "5px" }}
                  >
                    <option value="" disabled selected hidden>
                      4
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Surface (m2) <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    placeholder=" surface"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins"
                    style={{ paddingLeft: "5px" }}
                  />
                </div>
                {/* <div className="label">
                  <label htmlFor="nom" className="custom-text2">
                    Numéro de salle de bain{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="nom"
                    className="w-[80%] h-12 rounded-[5px] border border-gray-300 bg-gray-100 font-poppins"
                    style={{ color: "gray", paddingLeft: "5px" }}
                  >
                    <option value="" disabled selected hidden>
                      2
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div> */}
              </div>
              <button
                className="w-full h-[40px] bg-blue-600 text-white font-poppins rounded-[5px] hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 "
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginTop: "40px",
                }}
              >
                PERSONNALISER L'ALERTE
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-28">
          <div className="w-1/2">
            <p className="custom-text1 text-blue-500 m-20 text-5xl">
              À propos de nous
            </p>
            <p className="custom-text2 m-20 text-xl">
              Dz-Estate est une plateforme en ligne moderne dédiée à simplifier
              les transactions immobilières en Algérie. Elle se positionne comme
              un hub de confiance pour l'achat, la vente et la location de biens
              immobiliers, offrant une expérience fluide aux utilisateurs à la
              recherche de maisons, d'appartements ou d'espaces commerciaux.
              Avec une interface intuitive et des fonctionnalités de recherche
              avancées, Dz-Estate permet aux utilisateurs de filtrer les biens
              par localisation, gamme de prix et type, garantissant ainsi qu'ils
              trouvent le bien idéal correspondant à leurs besoins. La
              plateforme propose également des annonces détaillées, accompagnées
              de photos et de descriptions, facilitant l'exploration des options
              depuis le confort de chez soi. Que vous soyez acheteur, vendeur ou
              locataire, Dz-Estate est votre solution incontournable pour
              l'immobilier en Algérie.{" "}
            </p>
          </div>
          <div className="relative w-1/2 top-10">
            <img src={sale} alt="log" className="absolute top-8 left-1/4 " />
            <img
              src={Building}
              alt="log"
              className="absolute top-1/4 right-10 "
            />
            <img src={Box} alt="log" className="absolute top-1/2 left-1/4 " />
          </div>
        </div>
        <p className="custom-text1 text-blue-500 m-20 text-5xl text-center">
          Découvrez nos meilleures offres
        </p>
        <div className="see-more-btn">
          <Link to="./property">
            <button className="btn-see-more">Voir plus &gt;</button>
          </Link>
        </div>
        <div className="articles">
          {/* Example of multiple articles using the Article component */}
          {/* Example of multiple articles using the Article component */}
          <Article
            title="Appartement confortable"
            image={Cuisine}
            location="Alger"
            bedrooms="3"
            bathrooms="2"
            surface="120"
            price="250,000"
            isNew={true} // Show NEW tag for this article
            saleType="For Sale" // Show FOR SALE tag for this article
          />

          <Article
            title="Villa de Luxe"
            image={Cuisine}
            location="Oran"
            bedrooms="4"
            bathrooms="3"
            surface="200"
            price="450,000"
            isNew={false} // No NEW tag for this article
            saleType="For Rent" // Show FOR RENT tag for this article
          />

          <Article
            title="Condo moderne"
            image={Cuisine}
            location="Bejaia"
            bedrooms="2"
            bathrooms="1"
            surface="80"
            price="150,000"
            isNew={true} // Show NEW tag for this article
            saleType="For Sale" // Show FOR SALE tag for this article
          />
        </div>

        <div className="bg-black h-80 ">
          <p className="custom-text1 text-white text-center mt-10 pt-10">
            Pourquoi nous choisir
          </p>
          <div className="flex mt-10">
            <div className="w-1/3 flex flex-col items-center">
              <img src={find} alt="log" />
              <p className="costum-text2 text-white mt- font-bold mt-4">
                Trouvez votre future maison
              </p>
              <p className="costum-text2 text-white text-center text-xs mt-3">
                Nous vous aidons à trouver un nouveau logement en vous offrant{" "}
                <br />
                un expérience immobilière intelligente
              </p>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              <img src={buy} alt="log" />
              <p className="costum-text2 text-white mt-4 font-bold">
                Acheter ou louer des propriétés
              </p>
              <p className="costum-text2 text-white text-center text-xs mt-3">
                Des millions de maisons et d'appartements <br />
                dans vos villes préférées
              </p>
            </div>
            <div className="w-1/3 flex flex-col items-center">
              <img src={sell} alt="log" />
              <p className="costum-text2 text-white mt-4 font-bold">
                Vendre ou louer votre propriété
              </p>
              <p className="costum-text2 text-white text-center text-xs mt-3">
                Inscrivez-vous maintenant et vendez ou louez <br />
                vos propriétés
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-500 text-white py-16">
          <div className="max-w-6xl mx-auto px-6 md:flex justify-between items-center">
            {/* Left Section */}
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Que disent nos clients de nous ?
              </h2>
              <p className="text-lg mb-6">
                Différentes versions ont évolué au fil des années, parfois par
                accident, parfois volontairement injecté de l'humour, etc.
              </p>
              <div className="flex space-x-8">
                <div>
                  <h3 className="text-2xl font-bold">10m+</h3>
                  <p>Des gens heureux</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">4.88</h3>
                  <p>Note globale</p>
                  <div className="flex text-yellow-400 mt-1">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-blue-500 p-6  ">
                <div className="flex items-center mb-4">
                  <img
                    src={women}
                    alt="User"
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-white text-lg font-semibold">
                      Cameron Williamson
                    </h4>
                    <p className="text-white">Designer</p>
                  </div>
                  <div>
                    <TfiQuoteLeft className="text-gray-300 text-7xl ml-20" />
                  </div>
                </div>
                <p className="text-white  mb-4">
                  "Recherches de multiplex, comparaisons de biens et <br />
                  le prêt estimateur. Fonctionne très bien. Lorem ipsum dolor
                  sit <br />
                  amet, consectetur élite adipeuse, sed do eiusmod tempor <br />
                  incididunt ut labore et douleur."
                </p>
                <div className="flex space-x-4">
                  <button className="w-14 h-8 bg-gray-200 text-gray-800 text-xl rounded-full flex justify-center items-center">
                    &#8249;
                  </button>
                  <button className="w-14 h-8 bg-gray-200 text-gray-800 text-xl rounded-full flex justify-center items-center">
                    &#8250;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Vous avez d'autres questions ?
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-lg ${
                  openIndex === index ? "bg-gray-100" : ""
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className="text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 text-gray-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default Home;
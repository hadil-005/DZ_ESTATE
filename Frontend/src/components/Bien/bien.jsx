import React, { useState } from "react";
import { Link } from "react-router-dom";  // Import Link from React Router
import Cuisine from '../../assets/cuisine.png'

import { Navbar } from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { FaTag, FaMapMarkerAlt, FaHome, FaBed, FaListAlt, FaPhoneAlt } from "react-icons/fa";
import Bienp from "../../assets/bienp.png";
import Article from '../Article/Article';   
const Bien = () => {
    const location = useLocation();
    const article = location.state || {};
    const [mainImage, setMainImage] = useState(article.image || Bienp);
    const [showDescription, setShowDescription] = useState(false);
    const [showContact, setShowContact] = useState(false);

    // Function to handle the image click and toggle behavior
    const handleMediaClick = (clickedMedia) => {
        // Set the clicked media (image or video) as the main display
        setMainImage(clickedMedia);
      };
      

    return (
        <div>
            <Navbar />

            {/* Blue Title Section */}
            <div className="bg-white py-6 mt-32">
                <h1 className="text-4xl font-bold text-blue-500 text-left ml-4">
                    Property Details
                </h1>
            </div>

            <div className="p-6 max-w-7xl mx-auto mt-12">
                {/* Header Section */}
                <h1 className="text-4xl font-bold mb-6 text-left text-gray-800">
                    {article.title || "Property Details"}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Section - Image and Carousel */}
                    <div className="lg:col-span-3">
  
{/* Main Display */}
<div className="relative">
  {mainImage.includes('.mp4') || mainImage.includes('.webm') ? (
    <video
      src={mainImage}
      controls
      className="w-full h-auto rounded-lg shadow-lg"
    />
  ) : (
    <img
      src={mainImage}
      alt={article.title || "Default Image"}
      className="w-full h-auto rounded-lg shadow-lg"
    />
  )}
</div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
  {/* Render Images */}
  {article.images && article.images.map((imgSrc, index) => (
    <img
      key={index}
      src={imgSrc}
      alt={`Property View ${index + 1}`}
      className="w-full h-32 rounded-lg border border-gray-300 hover:border-orange-500 cursor-pointer"
      onClick={() => handleMediaClick(imgSrc)}
      onError={(e) => (e.target.src = 'path-to-placeholder-image.jpg')}
    />
  ))}

  {/* Render Videos */}
  {article.videos && article.videos.map((videoSrc, index) => (
    <video
      key={`video-${index}`}
      src={videoSrc}
      className="w-full h-32 rounded-lg border border-gray-300 hover:border-orange-500 cursor-pointer"
      onClick={() => handleMediaClick(videoSrc)}
      onError={(e) => console.error(`Failed to load video: ${videoSrc}`)}
    />
  ))}
</div>




                    </div>

                    {/* Right Section - Overview */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">Overview Section</h1>
                        <div className="space-y-6">
                            {/* Price */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md">
                                <span className="font-semibold text-lg px-4">Price: {article.price || "25,000,000"} DZD</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaTag size={24} />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md">
                                <span className="font-semibold text-lg px-4">Details de localisation</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaMapMarkerAlt size={24} />
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md">
                                <span className="font-semibold text-lg px-4">Property Type: Villa</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaHome size={24} />
                                </div>
                            </div>

                            {/* Bedrooms */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md">
                                <span className="font-semibold text-lg px-4">Nombre de chambres: 3</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaBed size={24} />
                                </div>
                            </div>

                            {/* Additional Features */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md cursor-pointer" onClick={() => setShowDescription(!showDescription)}>
                                <span className="font-semibold text-lg px-4">Caractéristiques supplémentaires</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaListAlt size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {showDescription && (
                            <div className="mt-8">
                                <p className="text-gray-700 leading-relaxed">
                                    This stunning modern villa is located in the heart of Hydra. With spacious
                                    living areas, an open-concept kitchen, and beautifully landscaped gardens, it
                                    offers the perfect blend of luxury and comfort. Close to schools, shops, and
                                    transportation.
                                </p>
                            </div>
                        )}

                        {/* Contact Information */}
                        <div className="mt-8 space-y-4">
                            <div
                                className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md cursor-pointer"
                                onClick={() => setShowContact(!showContact)}
                            >
                                <span className="font-semibold text-lg px-4">Contact Informations</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaPhoneAlt size={24} />
                                </div>
                            </div>
                        </div>

                        {showContact && (
                            <div className="mt-8">
                                <ul className="text-gray-700">
                                    <li><strong>Phone:</strong> +213 555 123 456</li>
                                    <li><strong>Email:</strong> flanbenflan@realestate.dz</li>
                                </ul>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="mt-8 flex gap-4">
  <button className="bg-blue-500 text-white px-4  h-12 rounded-lg text-sm hover:bg-blue-600 flex-grow">
    DEMANDE UNE VISITE
  </button>
  <button className="bg-blue-500 text-white px-4  h-12 rounded-lg text-sm hover:bg-blue-600 flex-grow">
    ENVOYER UN MESSAGE
  </button>
</div>

                    </div>
                </div>
            </div>
            <p className='custom-text1 text-blue-500 m-20 text-5xl text-center'>Découvrez nos meilleures offres</p>
 <div className="see-more-btn">
 <Link to="../property">
                <button className="btn-see-more">Voir plus &gt;</button>
                </Link>
            </div>
 <div className="articles">
                {/* Example of multiple articles using the Article component */}
               {/* Example of multiple articles using the Article component */}
               <Article 
    title="Appartement confortable"
    image={Cuisine} 
    wilaya="Alger" 
    commune='Birtouta'
    bedrooms="3" 
    bathrooms="2" 
    surface="120" 
    price="250,000"
    isNew={true}  // Show NEW tag for this article
    saleType="For Sale"  // Show FOR SALE tag for this article
/>

<Article 
    title="Villa de Luxe"
    image={Cuisine} 
    wilaya="Oran" 
    commune="Oran"
    bedrooms="4" 
    bathrooms="3" 
    surface="200" 
    price="450,000"
    category="villa"
    isNew={false}  // No NEW tag for this article
    saleType="For Rent"  // Show FOR RENT tag for this article
/>

<Article 
    title="Condo moderne"
    image={Cuisine} 
    wilaya="Bejaia" 
    commune="Ville"
    bedrooms="2" 
    bathrooms="1" 
    surface="80" 
    price="150,000"
    isNew={true}  // Show NEW tag for this article
    saleType="For Sale"  // Show FOR SALE tag for this article
/>
</div>
        </div>
    );
};

export default Bien;

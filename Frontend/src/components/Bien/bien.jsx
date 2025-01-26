import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";  // Import Link from React Router
import Cuisine from '../../assets/cuisine.png'
import { Navbar } from '../Navbar/Navbar';
import  Footer  from '../Footer/Footer';
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
  const [properties, setProperties] = useState([]); // State for properties
    
useEffect(() => {

    const fetchProperties = async () => {

      try {

        const response = await fetch('http://localhost:3000/api/property/getThreeRandomProperties'); // Adjust the URL as needed

        const data = await response.json();

        

        if (response.ok) {

          setProperties(data.properties); // Set the fetched properties

        } else {

          console.error(data.message);

        }

      } catch (error) {

        console.error('Error fetching properties:', error);

      }

    };


    fetchProperties();

  }, []);

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
      className="w-full h-auto max-h-[500px] rounded-lg shadow-lg"
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
                                <span className="font-semibold text-lg px-4">Price: {article.price || "no price"} DZD</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaTag size={24} />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md">
                                <span className="font-semibold text-lg px-4"> {article.wilaya}, {article.commune}</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaMapMarkerAlt size={24} />
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md">
                                <span className="font-semibold text-lg px-4">Property Type: {article.category}</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaHome size={24} />
                                </div>
                            </div>

                            {/* Bedrooms */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md">
                                <span className="font-semibold text-lg px-4">Nombre de chambres: {article.bedrooms}</span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaBed size={24} />
                                </div>
                            </div>

                            {/* Additional Features */}
                            <div className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md cursor-pointer" onClick={() => setShowDescription(!showDescription)}>
                                <span className="font-semibold text-lg px-4">Caractéristiques supplémentaires </span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaListAlt size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {showDescription && (
                            <div className="mt-8">
                                <p className="text-gray-700 leading-relaxed">
                                {article.description}
                                </p>
                            </div>
                        )}

                        {/* Contact Information */}
                        <div className="mt-8 space-y-4">
                            <div
                                className="flex items-center justify-between h-16 bg-gray-100 rounded-lg shadow-md cursor-pointer"
                                onClick={() => setShowContact(!showContact)}
                            >
                                <span className="font-semibold text-lg px-4">Contact Informations </span>
                                <div className="flex items-center justify-center bg-orange-500 text-white h-full w-16">
                                    <FaPhoneAlt size={24} />
                                </div>
                            </div>
                        </div>

                        {showContact && (
                            <div className="mt-8">
                                <ul className="text-gray-700">
                                    <li><strong>Phone:</strong> {article.phone_number}</li>
                                    <li><strong>Email:</strong> {article.email}</li>
                                </ul>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="mt-8">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">Demander une visite</h2>
  <div className="flex justify-center">
    <Link to="../disc">
      <button className="bg-blue-500 text-white px-4 h-12 rounded-lg text-sm hover:bg-blue-600">
        ENVOYER UN MESSAGE
      </button>
    </Link>
  </div>
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

{/* Map through the properties and render Article components */}

{properties.map((property) => (

  <Article 

    key={property.id} // Use the property ID as the key

    title={property.title}

    image={property.photo1 || Cuisine} // Use the fetched image or a default

    wilaya={property.wilaya} 

    commune={property.commune}

    //bedrooms="3" // You may need to adjust this based on your data

    ///bathrooms="2" // You may need to adjust this based on your data

    surface={property.area}// You may need to adjust this based on your data

    price={property.price}

    isNew={true}  // Adjust based on your logic

    saleType={property.transaction_status}  // Adjust based on your data

  />

))}

</div>
<Footer />
        </div>
    );
};

export default Bien;
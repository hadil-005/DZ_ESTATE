import React, { useState } from "react";
import { FaBookmark, FaHeart, FaMapMarkerAlt, FaBed, FaSquare, FaDollarSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Article = ({ title, image, wilaya, commune, bedrooms, surface, price, saleType, category, images, videos}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLike = () => setLiked(!liked);
  const handleSave = () => setSaved(!saved);

  // Function to navigate to the Bien page and pass article data
  const handleNavigate = () => {
    navigate("/Bien", {
      state: { 
        title, 
        image, 
        wilaya,
        commune, 
        price, 
        saleType, 
        bedrooms, 
        surface,
        category,
        images,
        videos,
      }
    });
  };

  return (
    <div className="article relative bg-white p-5 rounded-lg shadow-md w-full max-w-sm">
      {/* Image */}
      <div className="relative group" onClick={handleNavigate}>
        <img 
          src={image} 
          alt={title} 
          className="article-image w-full h-48 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90 cursor-pointer"
        />
        {saleType && (
          <span 
            className={`absolute top-2 left-2 ${
              saleType === 'For Sale' ? 'bg-blue-500' : 'bg-green-500'
            } text-white px-3 py-1 rounded-md text-sm font-semibold`}
          >
            {saleType}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-lg text-gray-800 mt-4 hover:underline cursor-pointer" onClick={handleNavigate}>
        {title}
      </h3>

      {/* Location */}
      <div className="location flex items-center text-gray-600 text-sm mt-2">
        <FaMapMarkerAlt className="size-5 mr-2 text-blue-500" />
        <span>{wilaya}, {commune}</span>
      </div>

      {/* Details */}
      <div className="details flex justify-between text-sm mt-3">
        <div className="detail flex items-center ">
          <FaBed className="icon size-5 text-blue-500" />
          <span>{bedrooms}</span>
        </div>
        <div className="detail flex items-center ">
          <FaSquare className="icon size-4 text-blue-500" />
          <span>{surface}m²</span>
        </div>
      

      {/* Actions */}
      <div className="flex justify-between items-center gap-2 ">
        <div className="flex justify-between items-center gap-1">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 text-2xl ${
            liked ? "text-red-500" : "text-black"
          }`}
        >
          <FaHeart 
            className={`${
              liked ? "fill-red-500" : "fill-white stroke-black"
            } stroke-[40px] size-5`}
          />
        </button>
        <span>{surface}</span>
        </div>
        <div className="flex justify-between items-center gap-1">
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 text-2xl ${
            saved ? "text-green-500" : "text-black "
          } size-4`}
        >
          <FaBookmark
            className={`${
              saved ? "fill-green-500" : "fill-white stroke-black"
            } stroke-[32px]`}
          />
        </button>
        <span>{surface}</span>
        </div>
        <div className="flex text-red-600 ml-4 items-center gap-1 font-bold text-lg">
          <span>{price}</span>
          <FaDollarSign />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Article;

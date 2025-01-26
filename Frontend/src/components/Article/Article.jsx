import React, { useState } from "react";
import { FaBookmark, FaHeart, FaMapMarkerAlt, FaBed, FaSquare, FaDollarSign } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios'; // Import Axios

const Article = ({ title, image, wilaya, commune, bedrooms,phone_number ,likes_count, property_id, user_id,  save_count, surface, price ,email, description,adress_gmaps, saleType, category, images, videos}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(likes_count); // Initialize likes count
  const [saveCount, setSaveCount] = useState(save_count); // Initialize save count
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes
    try {
      const response = await axios.post('https://dz-estate-smpt.vercel.app//api/property/like', { user_id, property_id });
      console.log("Received user_id:", user_id);
      if (response.status === 201) {
        setLiked(true);
        setLikesCount(prevCount => prevCount + 1); // Increment likes count
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleSave = async () => {
    if (saved) return; // Prevent multiple saves
    try {
      const response = await axios.post('https://dz-estate-smpt.vercel.app//api/property/save', { user_id, property_id });
      console.log("Received user_id:", user_id);
      if (response.status === 201) {
        setSaved(true);
        setSaveCount(prevCount => prevCount + 1); // Increment save count
      }
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };
  // Function to navigate to the Bien page and pass article data
  const handleNavigate = () => {
    navigate("/Bien", {
      state: { 
        title, email,phone_number , save_count, likes_count,
        image, property_id, user_id,
        adress_gmaps,
        wilaya,
        commune, 
        description,
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
        <span>{likesCount}</span>
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
        <span>{saveCount}</span>
        </div>
        <div className="flex text-red-600 ml-4 items-center gap-1 font-bold text-lg">
          <span>{price} DZD</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Article;

import React from 'react';
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from '../../components/Navbar/Navbar';
import Article from '../../components/Article/Article'; // Import the new Article component
import Cuisine from '../../assets/cuisine.png'

const Favoris  = () => {
  const likedArticles = [
      //{ title: "Villa Moderne Hydra", image: Cuisine, bedrooms: 5,  surface: 500, price: "450,000", category: "House", wilaya: "Algiers", commune: "Hydra", saleType : "For Sale", },
      //{ title: "Appartement Vue sur Mer", image: Cuisine,  bedrooms: 3, surface: 120, price: "300,000", category: "Apartment", wilaya: "Oran", commune: "Oran Centre", saleType : "For Rent"},
  ];
  return (
        <div>
          <Navbar />
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1  ml-7 mt-24 p-4">
            <h1 className="text-5xl font-bold text-blue-500 text-left ml-4">
                    Favoris
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {likedArticles.length > 0 ? (
              likedArticles.map((article, index) => <Article key={index} {...article} />)
            ) : (
                  <p className="text-center text-xl text-gray-500 mt-44">No liked articles yet.</p>
              )}
          </div>
            </div>
            </div>
            </div>
  );
};

export default Favoris;

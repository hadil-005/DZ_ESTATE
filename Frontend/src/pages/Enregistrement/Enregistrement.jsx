import React, { useEffect, useState } from 'react';
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from '../../components/Navbar/Navbar';
import Article from '../../components/Article/Article'; 
const Enregistrement = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const fetchSavedProperties = async () => {
    try {
      const response = await fetch(`https://dz-estate-wjy4.onrender.com/api/property/:user_id/getSavedProperties`);
      if (!response.ok) {
        throw new Error('Failed to fetch saved properties');
      }
      const data = await response.json();
      setSavedArticles(data.saved_properties);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-7 mt-24 p-4">
          <h1 className="text-5xl font-bold text-blue-500 text-left ml-4">
            Enregistrements
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedArticles.length > 0 ? (
              savedArticles.map((article, index) => (
                <Article key={index} title={article.title} image={article.photo_address} price={article.price} />
              ))
            ) : (
              <p className="text-center text-xl text-gray-500 mt-44">Aucun article enregistré pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enregistrement;

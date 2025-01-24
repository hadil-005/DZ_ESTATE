import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from "../../components/Navbar/Navbar";
import Article from "../../components/Article/Article"; // Import the new Article component
import Cuisine from "../../assets/cuisine.png";

const Historique = () => {
  const [filter, setFilter] = useState("all");

  const historiques = [
    //{ title: "Villa Moderne Hydra1", image: Cuisine, bedrooms: 5, surface: 500, price: "450,000", category: "House", wilaya: "Algiers", commune: "Hydra", saleType: "For Sale" },
    //{ title: "Appartement Vue sur Mer1", image: Cuisine, bedrooms: 3, surface: 120, price: "300,000", category: "Apartment", wilaya: "Oran", commune: "Oran Centre", saleType: "For Rent" },
  ];

  const posts = [
    //{ title: "Villa Moderne Hydra2", image: Cuisine, bedrooms: 5, surface: 500, price: "450,000", category: "House", wilaya: "Algiers", commune: "Hydra", saleType: "For Sale" },
    //{ title: "Appartement Vue sur Mer2", image: Cuisine, bedrooms: 3, surface: 120, price: "300,000", category: "Apartment", wilaya: "Oran", commune: "Oran Centre", saleType: "For Rent" },
  ];

  // Combine historiques and posts when "Tous les Echanges" is selected
  const combinedData = filter === "all" ? [...historiques, ...posts] : filter.includes("historique") ? historiques : posts;

  // Apply filtering logic based on the filter state
  const filteredData = combinedData.filter((item) => {
    if (filter === "all") return true;
    if (filter === "sales-historique") return item.saleType === "For Sale" && historiques.includes(item);
    if (filter === "sales-posts") return item.saleType === "For Sale" && posts.includes(item);
    if (filter === "rent-historique") return item.saleType === "For Rent" && historiques.includes(item);
    if (filter === "rent-posts") return item.saleType === "For Rent" && posts.includes(item);
    return false;
  });

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-7 mt-24 p-4">
          <h1 className="text-5xl font-bold text-blue-500 text-left ml-4">Historique</h1>

          {/* Tabs for filtering */}
          <div className="flex justify-start space-x-6 border-b border-gray-300 mt-10">
  <button
    className={`pb-2 text-lg font-semibold ${
      filter === "all"
        ? "text-black border-b-4 border-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`}
    onClick={() => setFilter("all")}
  >
    Toutes les échanges
  </button>
  <button
    className={`pb-2 text-lg font-semibold ${
      filter === "sales-historique"
        ? "text-black border-b-4 border-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`}
    onClick={() => setFilter("sales-historique")}
  >
    Achats
  </button>
  <button
    className={`pb-2 text-lg font-semibold ${
      filter === "sales-posts"
        ? "text-black border-b-4 border-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`}
    onClick={() => setFilter("sales-posts")}
  >
    Ventes
  </button>
  <button
    className={`pb-2 text-lg font-semibold ${
      filter === "rent-historique"
        ? "text-black border-b-4 border-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`}
    onClick={() => setFilter("rent-historique")}
  >
    Locations
  </button>
  <button
    className={`pb-2 text-lg font-semibold ${
      filter === "rent-posts"
        ? "text-black border-b-4 border-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`}
    onClick={() => setFilter("rent-posts")}
  >
    Loyers
  </button>
</div>



          {/* Render Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((article, index) => <Article key={index} {...article} />)
            ) : (
              <>
                <p className="text-center text-xl text-gray-500 mt-44">Aucun article trouvé pour ce filtre.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historique;

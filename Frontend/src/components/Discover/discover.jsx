import React, { useState } from "react";
import { Navbar } from '../Navbar/Navbar';
import Cuisine from "../../assets/cuisine.png";
import Bienp from "../../assets/bienp.png";
import Building from "../../assets/building.png";
import Homep from "../../assets/Homep.png";
import Estate from "../../assets/estate.png";
import Vid from "../../assets/vi.mp4";
import  Footer  from '../Footer/Footer';
import DropdownFilter from "./dropdown";
import Article from '../Article/Article'; // Import the new Article component


// Article Component
// Main Component
const PropertyPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    wilaya: "",
    commune: "",
    surfaceMin: "",
    surfaceMax: "",
    priceMin: "",
    priceMax: "",
  });
  const [visibleArticles, setVisibleArticles] = useState(9);

  const articles = [
    { title: "Villa Moderne Hydra", image: Cuisine, bedrooms: 5,  surface: 500, price: "450,000", category: "House", wilaya: "Algiers", commune: "Hydra", saleType : "For Sale", 
      images: [
        Building,
        Estate,
        Homep,
        Bienp
      ],
      videos: [
        Vid,
        Vid
      ],
    },
    { title: "Appartement Vue sur Mer", image: Cuisine,  bedrooms: 3, surface: 120, price: "300,000", category: "Apartment", wilaya: "Oran", commune: "Oran Centre", saleType : "For Rent"},
    { title: "Terrain Résidentiel Béjaïa", image: Cuisine, bedrooms: null,  surface: 600, price: "200,000", category: "Land", wilaya: "Béjaïa", commune: "Béjaïa Ville",   shaleType : "For Rent"},
    { title: "Duplex à Dely Ibrahim", image: Cuisine, bedrooms: 4,  surface: 300, price: "350,000", category: "Apartment", wilaya: "Algiers", commune: "Dely Ibrahim",   saleType : "For Sale"},
    { title: "Villa Luxueuse Chéraga", image: Cuisine,  bedrooms: 6,  surface: 550, price: "500,000", category: "House", wilaya: "Algiers", commune: "Chéraga",   saleType : "For Sale"},
    { title: "Studio à Bab El Oued", image: Cuisine,  bedrooms: 1,  surface: 40, price: "80,000", category: "Apartment", wilaya: "Algiers", commune: "Bab El Oued",   saleType : "For Rent"},
    { title: "F2 à Tizi Ouzou", image: Cuisine,  bedrooms: 2,  surface: 60, price: "100,000", category: "Apartment", wilaya: "Tizi Ouzou", commune: "Tizi Ouzou Ville", saleType : "For Rent"},
    { title: "Maison Familiale Blida", image: Cuisine, bedrooms: 4,  surface: 200, price: "250,000", category: "House", wilaya: "Blida", commune: "Blida Ville",  saleType : "For Sale"},
    { title: "Penthouse à Sidi Bel Abbès", image: Cuisine, bedrooms: 3, surface: 180, price: "275,000", category: "Apartment", wilaya: "Sidi Bel Abbès", commune: "Sidi Bel Abbès",   saleType : "For Sale"},
    { title: "Terrain Agricole Mostaganem", image: Cuisine, bedrooms: 0,  surface: 2000, price: "150,000", category: "Land", wilaya: "Mostaganem", commune: "Mazagran",   saleType : "For Sale"},
    { title: "Appartement F4 Constantine", image: Cuisine,  bedrooms: 4, surface: 100, price: "220,000", category: "Apartment", wilaya: "Constantine", commune: "Constantine Ville",  saleType : "For Sale" },
    { title: "Villa avec Piscine Annaba", image: Cuisine,  bedrooms: 6,  surface: 450, price: "480,000", category: "House", wilaya: "Annaba", commune: "Annaba Ville",  saleType : "For Rent"},
    { title: "F3 Neuf à Ghardaïa", image: Cuisine,  bedrooms: 3, surface: 90, price: "180,000", category: "Apartment", wilaya: "Ghardaïa", commune: "Ghardaïa Ville",   saleType : "For Rent" },
    { title: "Maison Traditionnelle Timimoun", image: Cuisine,  bedrooms: 3,  surface: 150, price: "100,000", category: "House", wilaya: "Adrar", commune: "Timimoun",   saleType : "For Sale"},
    { title: "Terrain Industriel Setif", image: Cuisine,  bedrooms: 0,  surface: 1000, price: "300,000", category: "Land", wilaya: "Setif", commune: "El Eulma",   saleType : "For Rent"},
    { title: "F2 à Tizi Ouzou", image: Cuisine,  bedrooms: 2,  surface: 60, price: "100,000", category: "Apartment", wilaya: "Tizi Ouzou", commune: "Tizi Ouzou Ville", saleType : "For Rent"},
    { title: "Maison Familiale Blida", image: Cuisine, bedrooms: 4,  surface: 200, price: "250,000", category: "House", wilaya: "Blida", commune: "Blida Ville",  saleType : "For Sale"},
    { title: "Penthouse à Sidi Bel Abbès", image: Cuisine, bedrooms: 3, surface: 180, price: "275,000", category: "Apartment", wilaya: "Sidi Bel Abbès", commune: "Sidi Bel Abbès",   saleType : "For Sale"},
    { title: "Terrain Agricole Mostaganem", image: Cuisine, bedrooms: 0,  surface: 2000, price: "150,000", category: "Land", wilaya: "Mostaganem", commune: "Mazagran",   saleType : "For Sale"},
    { title: "Appartement F4 Constantine", image: Cuisine,  bedrooms: 4, surface: 100, price: "220,000", category: "Apartment", wilaya: "Constantine", commune: "Constantine Ville",  saleType : "For Sale" },
    { title: "Villa avec Piscine Annaba", image: Cuisine,  bedrooms: 6,  surface: 450, price: "480,000", category: "House", wilaya: "Annaba", commune: "Annaba Ville",  saleType : "For Rent"},
    { title: "F3 Neuf à Ghardaïa", image: Cuisine,  bedrooms: 3, surface: 90, price: "180,000", category: "Apartment", wilaya: "Ghardaïa", commune: "Ghardaïa Ville",   saleType : "For Rent" },
    { title: "Maison Traditionnelle Timimoun", image: Cuisine,  bedrooms: 3,  surface: 150, price: "100,000", category: "House", wilaya: "Adrar", commune: "Timimoun",   saleType : "For Sale"},
    { title: "Terrain Industriel Setif", image: Cuisine,  bedrooms: 0,  surface: 1000, price: "300,000", category: "Land", wilaya: "Setif", commune: "El Eulma",   saleType : "For Rent"},
  ];
  

  // Filter Articles
  const filteredArticles = articles.filter((article) => {
    const matchesSurface =
      (filters.surfaceMin === "" || article.surface >= Number(filters.surfaceMin)) &&
      (filters.surfaceMax === "" || article.surface <= Number(filters.surfaceMax));
    const matchesPrice =
      (filters.priceMin === "" || Number(article.price.replace(/,/g, "")) >= Number(filters.priceMin)) &&
      (filters.priceMax === "" || Number(article.price.replace(/,/g, "")) <= Number(filters.priceMax));
    return (
      (filters.search === "" || article.commune.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || article.category === filters.category) &&
      (filters.wilaya === "" || article.wilaya === filters.wilaya) &&
      (filters.commune === "" || article.commune === filters.commune) &&
      matchesSurface &&
      matchesPrice
    );
  });
  const displayedArticles = filteredArticles.slice(0, visibleArticles);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const loadMoreArticles = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 9);
  };

  return (
    <div>
    <div className="p-8 bg-gray-100">
        <Navbar />
      {/* Filters Section */}
      <div className="w-full max-w-4xl mx-auto mt-16">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Cherchez par commune"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <DropdownFilter filters={filters} handleFilterChange={handleFilterChange} />

      </div>

      {/* Recommended Articles */}
      <h2 className="text-2xl font-semibold mb-6">Le plus recommandé</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article, index) => (
            <Article key={index} {...article} />
          ))}
        </div>
        {visibleArticles < filteredArticles.length && (
          <div className="flex justify-center">
            <button
              onClick={loadMoreArticles}
              className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
    </div>
    <Footer />
    </div>
  );
};

export default PropertyPage;
import React, { useState, useEffect } from "react";
import { Navbar } from '../Navbar/Navbar';
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
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [properties, setProperties] = useState([]); // State for properties

  useEffect(() => {

    const fetchRecommendedProperties = async () => {
      try {
        const response = await fetch('https://dz-estate-wjy4.onrender.com/api/property/randomp?limit=30'); // Adjust the URL as needed
        const data = await response.json();
        setRecommendedArticles(data);
      } catch (error) {
        console.error('Error fetching recommended properties:', error);
      }
    };
    fetchRecommendedProperties();
  }, []);


  // Filter Articles

  const filteredArticles = recommendedArticles.filter((article) => {
    const matchesSurface =
      (filters.surfaceMin === "" || article.surface >= Number(filters.surfaceMin)) &&
      (filters.surfaceMax === "" || article.surface <= Number(filters.surfaceMax));
    const matchesPrice =
      (filters.priceMin === "" || Number(article.price.replace(/,/g, "")) >= Number(filters.priceMin)) &&
      (filters.priceMax === "" || Number(article.price.replace(/,/g, "")) <= Number(filters.priceMax));
  
    return (
      (filters.search === "" || (article.commune && article.commune.toLowerCase().includes(filters.search.toLowerCase()))) &&
      (filters.category === "" || article.category === filters.category) &&
      (filters.wilaya === "" || article.wilaya === filters.wilaya) &&
      (filters.commune === "" || article.commune === filters.commune) &&
      matchesSurface &&
      matchesPrice
    );
  });
  

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  
    if (name === "search") {
      console.log('Searching for commune:', value); // Log the search value
      try {
        const response = await fetch('https://dz-estate-wjy4.onrender.com/api/property/searchProperties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ commune: value }),
        });
  
        if (!response.ok) {
          const errorText = await response.text(); // Get the error message from the response
          throw new Error(`Failed to fetch search results: ${errorText}`);
        }
  
        const data = await response.json();
        setSearchResults(data.properties || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]); // Clear results on error
      }
    }
  };

  // Determine which articles to display

  const displayedArticles = searchResults.length > 0 ? searchResults : filteredArticles.slice(0, visibleArticles);


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

<Article 
key={index}
title={article.title}

            image={article.photo1} // Use the fetched image or a default
            images={[article.photo2, article.photo3]}
            wilaya={article.wilaya}  
            user_id = {article.user_id}
            property_id = {article.id}
            commune={article.commune}
            save_count={article.save_count}
            likes_count={article.likes_count}
            bedrooms={article.rooms} // You may need to adjust this based on your data

            category={article.property_type}
            description={article.description}
            adress_gmaps={article.adress_gmaps}
            email={article.email}
            phone_number ={article.phone_number}
            surface={article.area}// You may need to adjust this based on your data

            price={article.price}

            isNew={true}  // Adjust based on your logic

            saleType={article.transaction_status}
             />

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

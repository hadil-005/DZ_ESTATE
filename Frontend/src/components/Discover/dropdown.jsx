import React from "react";

const DropdownFilter = ({ filters, handleFilterChange }) => {
  const wilayaToCommunes = {
    Algiers: ["BAB EL OUED", "BARAKI", "BIR MOURAD RAIS", "BIRTOUTA"],
    Oran: ["Oran Centre", "Mazagran"],
    Béjaïa: ["Béjaïa Ville"],
    Blida: ["Blida Ville"],
    Constantine: ["Constantine Ville"],
    Annaba: ["Annaba Ville"],
    Ghardaïa: ["Ghardaïa Ville"],
    Timimoun: ["Timimoun"],
    Setif: ["El Eulma"],
  };

  const Communes =
    filters.wilaya && wilayaToCommunes[filters.wilaya]
      ? wilayaToCommunes[filters.wilaya]
      : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {/* "Que cherchez-vous ?" */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Que cherchez-vous ? <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Land">Land</option>
        </select>
      </div>

      {/* "Votre wilaya" */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Votre wilaya <span className="text-red-500">*</span>
        </label>
        <select
          name="wilaya"
          value={filters.wilaya}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">All</option>
          {Object.keys(wilayaToCommunes).map((wilaya) => (
            <option key={wilaya} value={wilaya}>
              {wilaya}
            </option>
          ))}
        </select>
      </div>

      {/* "Votre commune" */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Votre commune <span className="text-red-500">*</span>
        </label>
        <select
          name="commune"
          value={filters.commune}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          disabled={!filters.wilaya}
        >
          <option value="">All</option>
          {Communes.map((commune) => (
            <option key={commune} value={commune}>
              {commune}
            </option>
          ))}
        </select>
      </div>

      {/* Surface Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Surface (m²)
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            name="surfaceMin"
            value={filters.surfaceMin}
            onChange={handleFilterChange}
            placeholder="Min"
            step="10"
            className="w-full px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            name="surfaceMax"
            value={filters.surfaceMax}
            onChange={handleFilterChange}
            placeholder="Max"
            step="10"
            className="w-full px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Prix Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prix (DA)
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            name="priceMin"
            value={filters.priceMin}
            onChange={handleFilterChange}
            placeholder="Min"
            step="10"
            className="w-full px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="number"
            name="priceMax"
            value={filters.priceMax}
            onChange={handleFilterChange}
            placeholder="Max"
            step="10"
            className="w-full px-2 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DropdownFilter;

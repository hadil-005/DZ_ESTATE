import React, { useState } from "react";

function FormulaireSelect() {
  const [typeBien, setTypeBien] = useState("");

  // Fonction pour gérer le changement de sélection
  const handleChange = (event) => {
    setTypeBien(event.target.value);
  };

  return (
    <div className="flex flex-col  ml-2 space-y-2">
      <div className="flex items-center  space-x-4">
        {/* Select pour choisir le type de bien */}
        <div className="flex flex-col  w-full ">
          <label htmlFor="typeBien" className="font-semibold">
            Type
          </label>
          <select
            id="typeBien"
            className="w-3/4  h-8 rounded-md border border-[#9F9F9F]"
            value={typeBien}
            onChange={handleChange}
          >
            <option value="">Sélectionner </option>
            <option value="1">Appartement</option>
            <option value="2">Maison</option>
            <option value="3">Studio</option>
            <option value="4">Villa</option>
          </select>
        </div>

        {/* Champs conditionnels affichés selon le type sélectionné */}
        {typeBien === "1" && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <label
                htmlFor="nombreChambres"
                className="block text-sm font-semibold"
              >
                Nombre de chambres
              </label>
              <input
                type="number"
                id="nombreChambres"
                className="mt-1 block w-1/12 h-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex items-center space-x-3">
              <label
                htmlFor="nombreSallesDeBains"
                className="block text-sm font-semibold"
              >
                Nombre de salles de bains
              </label>
              <input
                type="number"
                id="nombreSallesDeBains"
                className="mt-1 block w-1/12 h-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        )}

        {typeBien === "2" && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <label
                htmlFor="nombreChambres"
                className="block text-sm font-semibold"
              >
                Nombre de chambres
              </label>
              <input
                type="number"
                id="nombreChambres"
                className="mt-1 block w-1/12 h-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex items-center space-x-3">
              <label
                htmlFor="nombreSallesDeBains"
                className="block text-sm font-semibold"
              >
                Nombre de salles de bains
              </label>
              <input
                type="number"
                id="nombreSallesDeBains"
                className="mt-1 block w-1/12 h-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        )}

        {typeBien === "4" && (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <label
                htmlFor="nombreChambres"
                className="block text-sm font-semibold"
              >
                Nombre de chambres
              </label>
              <input
                type="number"
                id="nombreChambres"
                className="mt-1 block w-1/12 h-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex items-center space-x-3">
              {" "}
              <label
                htmlFor="nombreSallesDeBains"
                className="block text-sm font-semibold"
              >
                Nombre de salles de bains
              </label>
              <input
                type="number"
                id="nombreSallesDeBains"
                className="mt-1 block w-1/12 h-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
            <div className="flex items-center space-x-3">
              <label
                htmlFor="jardinVilla"
                className="block text-sm font-semibold"
              >
                Surface du jardin (en m²)
              </label>
              <input
                type="number"
                id="jardinVilla"
                className="mt-1 block w-1/12 h-8 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormulaireSelect;

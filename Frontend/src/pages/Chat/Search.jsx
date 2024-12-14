import React from "react";
import { DocSearch } from "@docsearch/react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const APP_ID = "your-app-id";
const INDEX_NAME = "your-index-name";
const API_KEY = "your-algolia-api-key";

const Search = () => {
  return (
    <div className="relative w-full">
      {/* Input avec du padding à gauche pour laisser de la place à l'icône */}
      <Input
        type="text"
        placeholder="Search"
        className="pl-10 focus:!border-t-gray-900 group-hover:border-2 group-hover:!border-gray-900 w-full"
        labelProps={{
          className: "hidden",
        }}
      />

      {/* Icône positionnée à l'intérieur de l'input */}
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600 pointer-events-none">
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

export default Search;

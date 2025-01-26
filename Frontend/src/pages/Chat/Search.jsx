import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const MessageSearch = ({ users, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction pour gérer le changement dans le champ de recherche
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrage des utilisateurs selon le nom
    const filteredUsers = users.filter((user) => {
      const matchesSearchTerm =
        value === "" || user.name.toLowerCase().includes(value.toLowerCase());
      return matchesSearchTerm;
    });

    // Retourner les utilisateurs filtrés via le callback
    onFilter(filteredUsers);
  };

  return (
    <div className="relative w-full">
      {/* Champ de recherche */}
      <Input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-10 focus:!border-gray-900 w-full"
        labelProps={{
          className: "hidden",
        }}
      />

      {/* Icône de recherche */}
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600 pointer-events-none">
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </div>
  );
};

MessageSearch.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired, // Nom de l'utilisateur
      avatar: PropTypes.string, // Facultatif : avatar de l'utilisateur
    })
  ).isRequired, // Liste des utilisateurs
  onFilter: PropTypes.func.isRequired, // Fonction appelée lors de la recherche
};

export default MessageSearch;

import React from "react";
import { Avatar, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const Avataru = ({ avatar, name, onClick }) => {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer"
      onClick={onClick} // Gère le clic
    >
      <Avatar src={avatar} alt={name} />
      <div>
        <Typography variant="h6">{name}</Typography>
       
      </div>
    </div>
  );
};

Avataru.propTypes = {
  avatar: PropTypes.string.isRequired, // URL de l'avatar
  name: PropTypes.string.isRequired, // Nom de l'utilisateur
 
  onClick: PropTypes.func, // Fonction appelée au clic
};


export default Avataru;

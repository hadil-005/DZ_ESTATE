import React, { createContext, useState, useContext } from "react";

// Créer un contexte d'utilisateur
const UserContext = createContext();

// Créer un composant fournisseur de contexte pour envelopper l'application
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const setUserInfo = (userData) => {
      setUser(userData);
    };
  return (
    <UserContext.Provider value={{ user, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => {
  return useContext(UserContext);
};

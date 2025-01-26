import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import Avataru from "./Avataru";
import Search from "./Search";
import Discussion from "./Discussion";

export const Chat = () => {
  const [users, setUsers] = useState([]); // Liste des utilisateurs
  const [filteredUsers, setFilteredUsers] = useState([]); // Utilisateurs filtrés
  const [selectedUser, setSelectedUser] = useState(null); // Utilisateur sélectionné
  const [page, setPage] = useState(1); // Page actuelle pour la pagination
  const [loading, setLoading] = useState(false); // Indicateur de chargement

  const listRef = useRef(null); // Référence pour la div scrollable

  // Simuler une API pour charger les utilisateurs
  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      // Exemple de données simulées
      const newUsers = Array.from({ length: 20 }, (_, index) => ({
        id: (page - 1) * 20 + index + 1,
        name: `User ${(page - 1) * 20 + index + 1}`,
        avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
      }));

      // Éviter les doublons
      setUsers((prev) => {
        const userIds = new Set(prev.map((user) => user.id));
        return [...prev, ...newUsers.filter((user) => !userIds.has(user.id))];
      });

      // Mettre à jour les utilisateurs filtrés
      setFilteredUsers((prev) => {
        const userIds = new Set(prev.map((user) => user.id));
        return [...prev, ...newUsers.filter((user) => !userIds.has(user.id))];
      });
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les utilisateurs lors du premier rendu
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Gestion de la recherche
  const handleFilter = (filtered) => {
    setFilteredUsers(filtered);
  };

  // Gestion du clic sur un avatar
  const handleAvatarClick = (user) => {
    setSelectedUser(user);
  };

  // Gestion du scroll infini
  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
      setPage((prevPage) => prevPage + 1); // Charger la page suivante
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 ml-7 mt-24 p-4">
          {!selectedUser ? (
            <>
              {/* Titre et champ de recherche */}
              <h1 className="text-[#1C84FF] mb-6 font-bold text-[40px]">
                Messages
              </h1>
              <Search users={users} onFilter={handleFilter} />

              {/* Liste des utilisateurs */}
              <div
                ref={listRef}
                className="flex flex-col mt-7 gap-6 overflow-y-auto h-[calc(100vh-160px)]"
                onScroll={handleScroll}
              >
                {filteredUsers.map((user) => (
                  <Avataru
                    key={user.id}
                    avatar={user.avatar}
                    name={user.name}
                    onClick={() => handleAvatarClick(user)}
                  />
                ))}

                {/* Indicateur de chargement */}
                {loading && (
                  <p className="text-center text-gray-500">Chargement...</p>
                )}
              </div>

              {/* Aucun utilisateur trouvé */}
              {!loading && filteredUsers.length === 0 && (
                <p className="text-center text-gray-500">
                  Aucun utilisateur trouvé.
                </p>
              )}
            </>
          ) : (
            // Affichage de la discussion avec l'utilisateur sélectionné
            <Discussion user={selectedUser} />
          )}
        </div>
      </div>
    </div>
  );
};

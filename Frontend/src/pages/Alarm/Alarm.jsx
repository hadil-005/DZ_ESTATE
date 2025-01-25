import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Navbar } from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom"; // Importing the useNavigate hook
import Women from "../../assets/women.png";

const NotificationPage = () => {
  const notificationsCount = 3; // Replace with the actual count if dynamic
  const notificationMessage =
    "Salut, on met à votre disposition une nouvelle offre, merci de consulter le lien suivant.";
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle navigation on notification click
  const handleNotificationClick = (postId) => {
    navigate(`/bien/${postId}`); // Navigates to the specific post page using its postId
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/5">
          <Sidebar />
        </div>

        {/* Notifications List Area */}
        <div className="flex-1 pt-28 ">
          <h1 className="text-2xl font-bold text-blue-500 mb-4">Liste de notification</h1>
          <div className="flex items-center space-x-2 border-b pb-2 mb-4">
            <span className="text-xl font-bold text-red-500">{notificationsCount}</span>
            <span className="text-lg font-semibold text-gray-700">Notifications</span>
          </div>

          <div>
            {notificationsCount > 0 ? (
              Array.from({ length: notificationsCount }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center pt-8 pb-2 border-b bg-white space-x-4 cursor-pointer"
                  onClick={() => handleNotificationClick(index + 1)} // Example: Passing an id based on index
                >
                  <img
                    src={Women} // Replace with the correct path for the static image
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-sm text-black font-bold">{notificationMessage}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Aucune notification disponible.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;

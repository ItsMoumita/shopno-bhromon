import React, { useContext } from "react";
import { FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex items-center justify-between 
      bg-white dark:bg-[#1f1f2e] shadow-md px-6 py-4 
      fixed top-0 left-64 right-0 h-16 z-20">
      
      {/* Left Title */}
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
        Dashboard
      </h2>

      {/* Right User Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaEnvelope className="text-[#4657F0]" />
          <span>{user?.email || "user@example.com"}</span>
        </div>
        <img
          src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/male-placeholder-image.jpg"}
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-[#4657F0]"
        />
      </div>
    </header>
  );
};

export default DashboardNavbar;
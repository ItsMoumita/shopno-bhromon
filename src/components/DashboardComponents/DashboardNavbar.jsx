import React, { useContext } from "react";
import { FaEnvelope, FaBars } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";   

const DashboardNavbar = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex items-center bg-white dark:bg-[#1f1f2e] shadow-md px-4 md:px-6 py-4 fixed top-0 left-0 md:left-64 right-0 h-16 z-20">
      
      {/* ✅ Mobile Menu Button + Logo (hidden on large) */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FaBars size={22} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/travel-logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>
      </div>

      {/* ✅ Right side: ml-auto flushes it to the far right */}
      <div className="flex items-center gap-6 ml-auto">
        <div className="hidden sm:flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <FaEnvelope className="text-[#4657F0]" />
          <span className="text-sm">
            {user?.email || "user@example.com"}
          </span>
        </div>
        <img
          src={
            user?.photoURL ||
            "https://i.ibb.co/MBtjqXQ/male-placeholder-image.jpg"
          }
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-[#4657F0]"
        />
      </div>
    </header>
  );
};

export default DashboardNavbar;
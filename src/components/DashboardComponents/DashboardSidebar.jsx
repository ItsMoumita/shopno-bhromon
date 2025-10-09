import {
  FaTachometerAlt,
  FaRegHeart,
  FaMoneyBill,
  FaUserEdit,
  FaUsers,
  FaArrowAltCircleLeft
} from "react-icons/fa";
import { RiHotelLine } from "react-icons/ri";
import { TbPackages } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import { IoMdClose } from "react-icons/io"; 
import { TbDatabaseEdit } from "react-icons/tb";

const DashboardSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`bg-white dark:bg-[#1f1f2e] shadow-md w-64 min-h-screen fixed top-0 left-0 z-30 flex flex-col justify-between transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Logo + Close Button */}
      <div>
        <div className="flex items-center justify-between px-4 pt-6 pb-4">
          <Link to="/" className="flex items-center ml-18 gap-2">
            <img
              src="/travel-logo.png"
              alt="Site Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Close button - only show on small devices */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-3 px-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <FaUsers /> All Users
          </NavLink>

          <NavLink
            to="/dashboard/add-packages"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <TbPackages />Add Packages
          </NavLink>
          <NavLink
            to="/dashboard/manage-packages"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <TbDatabaseEdit />Manage Packages
          </NavLink>

          <NavLink
            to="/dashboard/add-resorts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <RiHotelLine />Add Resorts
          </NavLink>
          <NavLink
            to="/dashboard/manage-resorts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <FaRegHeart />Manage Resorts
          </NavLink>

          <NavLink
            to="/dashboard/all-bookings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <FaMoneyBill /> All Bookings
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-[#4657F0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#292b51]"
              }`
            }
          >
            <FaUserEdit /> Profile Edit
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive
                ? "bg-red-600 text-white"
                : "text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-white/80"
            }`
          }
        >
          <FaArrowAltCircleLeft />Back to Home
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
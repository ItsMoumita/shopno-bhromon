import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { Link, NavLink } from "react-router";
import { ThemeToggle } from "../ExtraComponents/ThemeToggle";

const menu = [
  { name: "Home", path: "/" },
  { name: "Packages", path: "/packages" },
  { name: "Resorts", path: "/resorts" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user, setUser, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOuthandle = () => {
    logOut()
      .then(() => {
        setUser(null);
        setIsMenuOpen(false);
        Swal.fire({
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <nav className="sticky top-0 bg-white dark:bg-[#12121c] shadow z-50">
      <div className="max-w-7xl px-4 mx-auto py-0  flex justify-between items-center relative">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/public/travel-logo.png"
            alt="Site Logo"
            className="h-20 w-auto object-contain"
          />

        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-md font-semibold uppercase tracking-wide">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-5 transition-all ${isActive
                  ? "bg-gray-100 dark:bg-[#292b51] border-b-[3px] border-[#4657F0] text-black dark:text-[#fcfcfd]/80"
                  : "text-gray-800 dark:text-[#fcfcfd] hover:text-[#4657F0]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Auth Section */}
          {user ? (
            <button
              onClick={logOuthandle}
              className="ml-3 px-4 py-2 rounded bg-[#4657F0] text-white hover:bg-[#2f3fd9] transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-3 py-2 text-gray-700 dark:text-[#fcfcfd] hover:text-[#4657F0]"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-2 text-gray-700 dark:text-[#fcfcfd] hover:text-[#4657F0]"
              >
                Register
              </NavLink>
            </>
          )}
          <ThemeToggle></ThemeToggle>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-10 h-10 grid place-items-center focus:outline-none"
          >
            {isMenuOpen ? (
              <CgMenuMotion className="text-2xl text-[#4657F0]" />
            ) : (
              <RiMenuAddLine className="text-2xl text-[#4657F0]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        
        {isMenuOpen && (
          <div className="flex flex-col absolute top-full left-0 w-full bg-white dark:bg-[#12121c] border-b shadow-lg z-50 p-4 lg:hidden text-base">
             
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${isActive
                    ? "bg-gray-100 dark:bg-[#292b51] border-l-4 border-[#4657F0] text-[#4657F0] dark:text-gray-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#4657F0]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Auth actions */}
            {user ? (
              <button
                onClick={logOuthandle}
                className="mt-3 px-4 py-2 rounded bg-[#4657F0] text-white hover:bg-[#2f3fd9] transition"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-[#4657F0]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-[#4657F0]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
            <ThemeToggle></ThemeToggle>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
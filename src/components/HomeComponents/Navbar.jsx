import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
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
    <nav className="fixed top-10 left-1/2 transform -translate-x-1/2 
                w-[95%] max-w-7xl bg-white dark:bg-[#12121c] 
                shadow z-50 transition-colors duration-300 rounded-lg ">
      <div className=" flex justify-between items-center px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/travel-logo.png"
            alt="Site Logo"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6 text-md font-semibold uppercase tracking-wide">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-5 transition-all duration-300 ease-in-out ${
                  isActive
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
              className="ml-3 px-4 py-2 rounded bg-[#4657F0] text-white hover:bg-[#2f3fd9] transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-3 py-2 text-gray-700 dark:text-[#fcfcfd] hover:text-[#4657F0] transition-colors duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-3 py-2 text-gray-700 dark:text-[#fcfcfd] hover:text-[#4657F0] transition-colors duration-300"
              >
                Register
              </NavLink>
            </>
          )}
          <ThemeToggle />
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="w-10 h-10 grid place-items-center focus:outline-none transition-transform duration-300"
          >
            {isMenuOpen ? (
              <CgMenuMotion className="text-2xl text-[#4657F0] transform rotate-90 transition-transform duration-300" />
            ) : (
              <RiMenuAddLine className="text-2xl text-[#4657F0] transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-full left-0 w-full bg-white dark:bg-[#12121c] shadow-lg z-50 overflow-hidden lg:hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-112 rounded-lg opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 rounded transition-all duration-300 ${
                  isActive
                    ? "bg-gray-100 dark:bg-[#292b51] border-l-4 border-[#4657F0] text-[#4657F0] font-semibold"
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
              className="mt-3 px-4 py-2 rounded bg-[#4657F0] text-white hover:bg-[#2f3fd9] transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-[#4657F0] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-[#4657F0] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
          <div className="mt-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
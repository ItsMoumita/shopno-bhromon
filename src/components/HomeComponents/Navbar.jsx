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
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const logOuthandle = () => {
    logOut()
      .then(() => {
        setUser(null);
        setDropdownOpen(false);
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
      <div className="max-w-7xl px-4 mx-auto flex justify-between items-center relative">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/travel-logo.png"
            alt="Site Logo"
            className="h-14 w-auto object-contain"
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

          {/* Admin Dashboard (only visible if role is admin) */}
          {user?.role === "admin" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-5 transition-all ${isActive
                  ? "bg-gray-100 dark:bg-[#292b51] border-b-[3px] border-[#4657F0] text-black dark:text-[#fcfcfd]/80"
                  : "text-gray-800 dark:text-[#fcfcfd] hover:text-[#4657F0]"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Auth Section */}
          {!user ? (
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
              <ThemeToggle></ThemeToggle>
            </>
          ) : (
            <>
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  logOuthandle();
                }}
                className="px-3 py-2 text-gray-700 dark:text-[#fcfcfd] hover:text-[#4657F0]"
              >
                Logout
              </NavLink>
              
              <ThemeToggle></ThemeToggle>
             
              {/* Profile Picture with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/MBtjqXQ/male-placeholder-image.jpg"}
                  alt="profile"
                  className="h-10 w-10 rounded-full cursor-pointer border-2 border-[#4657F0]"
                />

                {/* Dropdown: Only Username */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-50 dark:bg-[#1b1b2b] shadow-lg rounded-md py-2 z-[100]">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {user.displayName || user.email}
                    </div>
                  </div>
                )}
              </div>


            </>
          )}
        </ul>

        {/* Mobile Toggle */}
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
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#12121c] shadow-md py-4 px-6 space-y-3">
          {/* ✅ Profile for all logged-in users */}
          {user && (
            <div className="flex items-center gap-3 mb-2 mt-4 px-2">
              <img
                src={user.photoURL || "https://i.ibb.co/MBtjqXQ/male-placeholder-image.jpg"}
                alt="profile"
                className="h-9 w-9 rounded-full border-2 border-[#4657F0]"
              />
              <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                {user.displayName || user.email}
              </span>
            </div>
          )}
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-all ${isActive
                  ? "bg-gray-100 dark:bg-[#292b51] border-l-4 border-[#4657F0] text-[#4657F0] font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#4657F0] hover:bg-gray-50 dark:hover:bg-[#1f2937]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* ✅ Dashboard only for Admin */}
          {user?.role === "admin" && (
            <NavLink
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-all ${isActive
                  ? "bg-gray-100 dark:bg-[#292b51] border-l-4 border-[#4657F0] text-[#4657F0] font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:text-[#4657F0] hover:bg-gray-50 dark:hover:bg-[#1f2937]"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-all ${isActive
                    ? "bg-gray-100 dark:bg-[#292b51] border-l-4 border-[#4657F0] text-[#4657F0] font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#4657F0] hover:bg-gray-50 dark:hover:bg-[#1f2937]"
                  }`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-all ${isActive
                    ? "bg-gray-100 dark:bg-[#292b51] border-l-4 border-[#4657F0] text-[#4657F0] font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#4657F0] hover:bg-gray-50 dark:hover:bg-[#1f2937]"
                  }`
                }
              >
                Register
              </NavLink>
              <ThemeToggle></ThemeToggle>
            </>
          ) : (
            <>


              {/* ✅ Logout  */}
              <NavLink
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  logOuthandle();
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-[#4657F0] hover:bg-gray-50 dark:hover:bg-[#1f2937] transition-all"
              >
                Logout
              </NavLink>
              <ThemeToggle></ThemeToggle>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
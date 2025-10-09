import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, X, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { PAGE_ROUTE_URLS, HEADER_LINKS } from "../../utils/constant";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md sticky top-0 z-50 transition-colors">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to={PAGE_ROUTE_URLS.HOME}
          className="text-2xl font-bold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
        >
          MyApp
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {HEADER_LINKS.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-500 dark:text-indigo-400 border-b-2 border-indigo-500 dark:border-indigo-400 pb-1"
                    : "hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Buttons + Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Link
            to={PAGE_ROUTE_URLS.LOGIN}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to={PAGE_ROUTE_URLS.REGISTER}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white dark:text-white text-sm font-semibold rounded-md transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
          <ul className="flex flex-col items-center gap-4 py-4 text-sm font-medium">
            {HEADER_LINKS.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-500 dark:text-indigo-400"
                      : "hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li className="flex gap-4 mt-2">
              <Link
                to={PAGE_ROUTE_URLS.LOGIN}
                onClick={closeMenu}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to={PAGE_ROUTE_URLS.REGISTER}
                onClick={closeMenu}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white dark:text-white text-sm font-semibold rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

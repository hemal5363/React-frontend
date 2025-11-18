import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Moon, Sun, X, Menu, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { PAGE_ROUTE_URLS } from "../../utils/constant";
import { isAdmin, isUserLogin, logOut } from "../../utils/helper";
import Button from "../common/Button";
import LinkButton from "../common/LinkButton";
import IconButton from "../common/IconButton";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [headerLists, setHeaderLists] = useState<
    { name: string; path: string }[]
  >([]);

  useEffect(() => {
    const lists = [
      { name: "Home", path: PAGE_ROUTE_URLS.HOME },
      {
        name: "Products",
        path: isAdmin()
          ? PAGE_ROUTE_URLS.PRODUCT_LIST
          : PAGE_ROUTE_URLS.PRODUCTS,
      },
      isAdmin() && { name: "Users", path: PAGE_ROUTE_URLS.USERS },
    ].filter(Boolean) as { name: string; path: string }[];
    setHeaderLists(lists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin()]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);
  const closeProfileMenu = () => setShowProfileMenu(false);

  return (
    <header className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md sticky top-0 z-50 transition-colors">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <LinkButton
          to={PAGE_ROUTE_URLS.HOME}
          className="text-2xl font-bold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
        >
          MyApp
        </LinkButton>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {headerLists.map((link) => (
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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 relative">
          <IconButton onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>

          {isUserLogin() ? (
            <div className="relative">
              <IconButton
                onClick={toggleProfileMenu}
                className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <User size={20} />
              </IconButton>

              {showProfileMenu && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                  onMouseLeave={closeProfileMenu}
                >
                  <ul className="py-2 text-center text-sm text-gray-700 dark:text-gray-200">
                    {/* Future: add Profile or Settings links here */}
                    <li>
                      <NavLink
                        to={PAGE_ROUTE_URLS.CHANGE_PASSWORD}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Change Password
                      </NavLink>
                    </li>
                    <li>
                      <Button
                        onClick={() => {
                          logOut();
                          closeProfileMenu();
                        }}
                        size="sm"
                      >
                        Logout
                      </Button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <LinkButton to={PAGE_ROUTE_URLS.LOGIN} variant="ghost" size="md">
                Login
              </LinkButton>
              <LinkButton
                to={PAGE_ROUTE_URLS.REGISTER}
                variant="primary"
                size="md"
              >
                Register
              </LinkButton>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <IconButton onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
          <IconButton onClick={toggleMenu} variant="ghost">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
          <ul className="flex flex-col items-center gap-4 py-4 text-sm font-medium">
            {headerLists.map((link) => (
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
              {isUserLogin() ? (
                <Button size="sm" onClick={logOut}>
                  Logout
                </Button>
              ) : (
                <>
                  <LinkButton
                    to={PAGE_ROUTE_URLS.LOGIN}
                    variant="ghost"
                    size="sm"
                  >
                    Login
                  </LinkButton>
                  <LinkButton
                    to={PAGE_ROUTE_URLS.REGISTER}
                    variant="primary"
                    size="sm"
                  >
                    Register
                  </LinkButton>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

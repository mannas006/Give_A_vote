import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleMenuItemClick = () => {
    // Close the menu when a menu item is clicked
    setMenuOpen(false);
  };

  return (
    <nav className={`p-4 shadow-md ${menuOpen ? 'bg-transparent' : 'bg-white'} dark:bg-gray-800 relative`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 dark:text-white hover:text-yellow-500 transition-colors"
        >
          🗳️ Pollify
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="sm:hidden text-2xl text-gray-800 dark:text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? 'block sm:flex flex-row' : 'hidden sm:flex'
          } sm:flex-row items-center gap-6 sm:gap-8 mt-4 sm:mt-0`}
        >
          <Link
            to="/details"
            className="text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleMenuItemClick}
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleMenuItemClick}
          >
            Show Poll
          </Link>
          <Link
            to="/create"
            className="text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleMenuItemClick}
          >
            Create Poll
          </Link>
          <Link
            to="/leaderboard"
            className="text-gray-800 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleMenuItemClick}
          >
            Leaderboard
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all ease-in-out duration-200"
            onClick={handleMenuItemClick}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all ease-in-out duration-200"
            onClick={handleMenuItemClick}
          >
            Log In
          </Link>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-800 dark:text-white"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>

      {/* Background Blur Effect */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"
          onClick={() => setMenuOpen(false)} // Close menu when clicking outside
        ></div>
      )}

      {/* Mobile Menu Items */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex flex-col items-center gap-6">
              <Link
                to="/details"
                className="text-gray-800 dark:text-white font-semibold text-2xl sm:text-3xl hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleMenuItemClick}
              >
                Home
              </Link>
              <Link
                to="/"
                className="text-gray-800 dark:text-white font-semibold text-2xl sm:text-3xl hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleMenuItemClick}
              >
                Show Poll
              </Link>
              <Link
                to="/create"
                className="text-gray-800 dark:text-white font-semibold text-2xl sm:text-3xl hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleMenuItemClick}
              >
                Create Poll
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-800 dark:text-white font-semibold text-2xl sm:text-3xl hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleMenuItemClick}
              >
                Leaderboard
              </Link>
              <Link
                to="/signup"
                className="text-green-500 text-xl font-bold hover:text-green-600"
                onClick={handleMenuItemClick}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-blue-500 text-xl font-bold hover:text-blue-600"
                onClick={handleMenuItemClick}
              >
                Log In
              </Link>

              {/* Dark Mode Toggle Button inside the Mobile Menu */}
              <button
                onClick={toggleDarkMode}
                className="text-2xl text-gray-800 dark:text-white"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>

              {/* Close Menu Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-3xl text-gray-800 dark:text-white"
                aria-label="Close Menu"
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

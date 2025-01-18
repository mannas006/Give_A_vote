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
        >
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? 'block sm:flex flex-row' : 'hidden sm:flex'
          } sm:flex-row items-center gap-4 sm:gap-8 mt-4 sm:mt-0`}
        >
          <Link
            to="/details"
            className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500"
            onClick={handleMenuItemClick}
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500"
            onClick={handleMenuItemClick}
          >
            Show Poll
          </Link>
          <Link
            to="/create"
            className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500"
            onClick={handleMenuItemClick}
          >
            Create Poll
          </Link>
          <Link
            to="/leaderboard"
            className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500"
            onClick={handleMenuItemClick}
          >
            Leaderboard
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleMenuItemClick}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleMenuItemClick}
          >
            Log In
          </Link>
          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-800 dark:text-white"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>

      {/* Background Blur Effect */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-0 backdrop-blur-md z-10"
          onClick={() => setMenuOpen(false)} // Close menu when clicking outside
        ></div>
      )}

      {/* Menu Items */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
            <div className="flex flex-col items-center gap-8">
              <Link
                to="/details"
                className="text-yellow-600 dark:text-yellow-400 font-semibold text-2xl sm:text-3xl hover:text-yellow-500"
                onClick={handleMenuItemClick}
              >
                Home
              </Link>
              <Link
                to="/"
                className="text-yellow-600 dark:text-yellow-400 font-semibold text-2xl sm:text-3xl hover:text-yellow-500"
                onClick={handleMenuItemClick}
              >
                Show Poll
              </Link>
              <Link
                to="/create"
                className="text-yellow-600 dark:text-yellow-400 font-semibold text-2xl sm:text-3xl hover:text-yellow-500"
                onClick={handleMenuItemClick}
              >
                Create Poll
              </Link>
              <Link
                to="/leaderboard"
                className="text-yellow-600 dark:text-yellow-400 font-semibold text-2xl sm:text-3xl hover:text-yellow-500"
                onClick={handleMenuItemClick}
              >
                Leaderboard
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 text-xl sm:text-2xl"
                onClick={handleMenuItemClick}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-xl sm:text-2xl"
                onClick={handleMenuItemClick}
              >
                Log In
              </Link>
              <button
                onClick={toggleDarkMode}
                className="text-3xl text-gray-800 dark:text-white"
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>

              {/* Close Menu Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-3xl text-gray-800 dark:text-white"
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

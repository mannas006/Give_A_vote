import React from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
      {/* 🗳️ Pollify Logo with dashing hover effect */}
      <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white hover:text-yellow-500 transition-colors">
        🗳️ Pollify
      </Link>
      
      <div className="flex items-center gap-4">
        <Link to="/details" className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500"> Home </Link>
        <Link to="/" className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500">Show Poll</Link>
        <Link to="/create" className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500">Create Poll</Link>
        <Link to="/leaderboard" className="text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-500">Leaderboard</Link>
        <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Sign Up</Link>
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"> Log In </Link>
        <button onClick={toggleDarkMode} className="text-2xl text-gray-800 dark:text-white">
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

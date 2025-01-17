import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const navigate = useNavigate();

  // 🔄 Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await logIn(email, password);
      if (error) {
        setError("Invalid email or password.");
      } else {
        navigate("/"); // Redirect on successful login
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-all">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back! 👋
        </h2>

        {/* 🔔 Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-sm text-red-500 bg-red-100 dark:bg-red-900 p-2 rounded"
          >
            {error}
          </motion.p>
        )}

        {/* 📧 Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
        />

        {/* 🔒 Password Input with Show/Hide */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mb-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none dark:bg-gray-700 dark:text-white transition-all"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-2.5 right-3 text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* 🔗 Forgot Password */}
        <div className="flex justify-end mb-4">
          <a
            href="/forgot-password"
            className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
          >
            Forgot Password?
          </a>
        </div>

        {/* 🚀 Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all"
        >
          Log In
        </motion.button>

        {/* 🔄 Redirect to Sign Up */}
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-500 hover:text-indigo-600 font-semibold"
          >
            Sign Up
          </a>
        </p>
      </motion.form>
    </div>
  );
}

export default Login;

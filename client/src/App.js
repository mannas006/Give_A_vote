import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Details from "./components/Details";
import CreatePoll from "./components/CreatePoll"; // Import the actual CreatePoll component
import PollDetail from "./components/PollDetail"; // New page for detailed view
import PollItem from "./components/PollItem"; 
import PollList from "./components/PollList";
import Leaderboard from "./components/Leaderboard";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext"; // Supabase AuthContext
import { SupabaseProvider } from "./contexts/SupabaseContext"; // Import the SupabaseProvider
function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10 text-gray-800 dark:text-white">
        Welcome to the Voting App!
      </h1>
      <PollList /> {/* Add PollList here to show polls on the homepage */}
    </div>
  );
}

// 🔒 Protected Route using Supabase Auth
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <p className="text-center text-gray-800 dark:text-white">Loading...</p>;
  }

  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 Toggle Dark Mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Apply Dark Mode class to body
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <AuthProvider>
        <SupabaseProvider>
          <NotificationProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-all">
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Routes>
              <Route path="/details" element={<Details />} />
              <Route path="/" element={<Home />} />
              <Route path="/polls" element={<PollList />} /> {/* Changed to /polls */}
              <Route path="/poll/:id" element={<PollItem />} />

              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/poll/:id" element={<PollDetail />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePoll />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          </NotificationProvider>
        </SupabaseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase"; // Ensure this is correctly imported

// Create the AuthContext
const AuthContext = createContext();

// Custom hook for accessing the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to wait for session check

  // Function to handle sign-up
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return { error };

    setCurrentUser(data.user);
    return { user: data.user };
  };

  // Function to handle login
  const logIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error };

    setCurrentUser(data.user);
    return { user: data.user };
  };

  // Function to log out
  const logOut = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  // Check user session on initial load
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setCurrentUser(data.session.user);
      }
      setLoading(false);
    };

    checkSession();

    // Listen for auth state changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signUp, logIn, logOut, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

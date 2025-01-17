import React, { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://uamoddpaekoysvcvflgx.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhbW9kZHBhZWtveXN2Y3ZmbGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5OTkyMTYsImV4cCI6MjA1MjU3NTIxNn0.PG7ye-L8A1ZFw7FIOkxwynnosCO_fUNVn-meVf1fPs8"; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// Create context
const SupabaseContext = createContext();

// Create SupabaseProvider to wrap your app and provide Supabase client
export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Custom hook to access Supabase client
export const useSupabase = () => {
  return useContext(SupabaseContext);
};

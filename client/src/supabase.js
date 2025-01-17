import { createClient } from "@supabase/supabase-js";

// Hardcoded Supabase URL and Anon Key
const supabaseUrl = "https://uamoddpaekoysvcvflgx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhbW9kZHBhZWtveXN2Y3ZmbGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5OTkyMTYsImV4cCI6MjA1MjU3NTIxNn0.PG7ye-L8A1ZFw7FIOkxwynnosCO_fUNVn-meVf1fPs8";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

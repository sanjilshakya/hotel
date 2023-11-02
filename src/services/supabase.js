import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rvpsckladdcyvotwfjfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2cHNja2xhZGRjeXZvdHdmamZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4MzkzNDYsImV4cCI6MjAxNDQxNTM0Nn0.E8tN015SFL2HrdOSxMdME-Rmnm-yQp8wqCAz9rhjm6Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

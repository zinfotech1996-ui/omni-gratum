import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://wkcqjszmijxobzglvxzo.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZiZjViMzFlLWE5MmYtNDFkNC1iZGRhLTczNTQwYTAzNzM1ZSJ9.eyJwcm9qZWN0SWQiOiJ3a2NxanN6bWlqeG9iemdsdnh6byIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY4Njk0NDM0LCJleHAiOjIwODQwNTQ0MzQsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.CEWbjpJkHZhiCxkUOm_5b-zzGWC6QehJZ9QoRGjdjgw';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };
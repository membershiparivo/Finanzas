/*
  # Add INSERT policy for users table

  1. Changes
    - Add new RLS policy to allow users to insert their own data during signup
    
  2. Security
    - Policy ensures users can only create their own user record
    - Policy validates that the new row's ID matches the authenticated user's ID
*/

CREATE POLICY "Users can insert their own data"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);
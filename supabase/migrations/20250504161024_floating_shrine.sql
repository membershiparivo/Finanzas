/*
  # Fix users table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Add new RLS policies for users table that allow:
      - Users to insert their own profile during signup
      - Users to read their own profile
      - Users to update their own profile
      - Users to delete their own profile

  2. Security
    - Enable RLS on users table
    - Add policies for authenticated users to manage their own data
*/

-- First, enable RLS on the users table if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can delete their own data" ON users;

-- Create new policies
CREATE POLICY "Users can insert their own data"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own data"
ON users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete their own data"
ON users
FOR DELETE
TO authenticated
USING (auth.uid() = id);
/*
  # Update users table RLS policies

  1. Changes
    - Add policy to allow new users to create their own profile during signup
    - Ensure authenticated users can only access their own data
    - Allow unauthenticated access for signup process
  
  2. Security
    - Maintains RLS on users table
    - Updates policies to handle signup flow correctly
    - Preserves existing security for authenticated users
*/

-- Drop existing policies to recreate them with correct permissions
DROP POLICY IF EXISTS "Users can delete their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can view their own data" ON users;

-- Create new policies with correct permissions
CREATE POLICY "Enable insert for authentication" ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on user_id" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable delete for users based on user_id" ON public.users
  FOR DELETE
  USING (auth.uid() = id);
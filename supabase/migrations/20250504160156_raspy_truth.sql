/*
  # Initial Schema for Retirement Planning App

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `full_name` (text)
      - `created_at` (timestamp)
    - `expenses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `label` (text)
      - `amount` (numeric)
      - `frequency` (text)
      - `category` (text)
      - `subcategory` (text, nullable)
      - `editable` (boolean)
    - `debts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `label` (text)
      - `balance` (numeric)
      - `interest_rate` (numeric)
      - `monthly_payment` (numeric)
      - `extra_payment` (numeric, nullable)
      - `debt_type` (text)
    - `income`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `label` (text)
      - `amount` (numeric)
      - `type` (text)
      - `frequency` (text)
      - `continues_post_retirement` (boolean)
    - `future_scenarios`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `year` (integer)
      - `income_projection` (numeric)
      - `expense_projection` (numeric)
      - `notes` (text, nullable)
    - `savings_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `monthly_saving` (numeric)
      - `return_rate` (numeric)
      - `retirement_year` (integer)
      - `withdrawal_per_year` (numeric)
      - `target_age` (integer)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users NOT NULL,
  label TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  frequency TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  editable BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Debts table
CREATE TABLE IF NOT EXISTS debts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users NOT NULL,
  label TEXT NOT NULL,
  balance NUMERIC NOT NULL,
  interest_rate NUMERIC NOT NULL,
  monthly_payment NUMERIC NOT NULL,
  extra_payment NUMERIC,
  debt_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Income table
CREATE TABLE IF NOT EXISTS income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users NOT NULL,
  label TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  continues_post_retirement BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Future scenarios table
CREATE TABLE IF NOT EXISTS future_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users NOT NULL,
  year INTEGER NOT NULL,
  income_projection NUMERIC NOT NULL,
  expense_projection NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Savings goals table
CREATE TABLE IF NOT EXISTS savings_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users NOT NULL,
  monthly_saving NUMERIC NOT NULL,
  return_rate NUMERIC NOT NULL,
  retirement_year INTEGER NOT NULL,
  withdrawal_per_year NUMERIC NOT NULL,
  target_age INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE income ENABLE ROW LEVEL SECURITY;
ALTER TABLE future_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users policies
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Expenses policies
CREATE POLICY "Users can view their own expenses"
  ON expenses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses"
  ON expenses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses"
  ON expenses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses"
  ON expenses FOR DELETE
  USING (auth.uid() = user_id);

-- Debts policies
CREATE POLICY "Users can view their own debts"
  ON debts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own debts"
  ON debts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debts"
  ON debts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debts"
  ON debts FOR DELETE
  USING (auth.uid() = user_id);

-- Income policies
CREATE POLICY "Users can view their own income"
  ON income FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own income"
  ON income FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own income"
  ON income FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own income"
  ON income FOR DELETE
  USING (auth.uid() = user_id);

-- Future scenarios policies
CREATE POLICY "Users can view their own future scenarios"
  ON future_scenarios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own future scenarios"
  ON future_scenarios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own future scenarios"
  ON future_scenarios FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own future scenarios"
  ON future_scenarios FOR DELETE
  USING (auth.uid() = user_id);

-- Savings goals policies
CREATE POLICY "Users can view their own savings goals"
  ON savings_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own savings goals"
  ON savings_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own savings goals"
  ON savings_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own savings goals"
  ON savings_goals FOR DELETE
  USING (auth.uid() = user_id);
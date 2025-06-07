export interface User {
  id: string;
  email: string;
  full_name: string;
}

export interface Expense {
  id: string;
  user_id: string;
  label: string;
  amount: number;
  frequency: string;
  category: string;
  subcategory?: string;
  editable: boolean;
}

export interface Debt {
  id: string;
  user_id: string;
  label: string;
  balance: number;
  interest_rate: number;
  monthly_payment: number;
  extra_payment?: number;
  debt_type: string;
}

export interface Income {
  id: string;
  user_id: string;
  label: string;
  amount: number;
  type: string;
  frequency: string;
  continues_post_retirement: boolean;
}

export interface FutureScenario {
  id: string;
  user_id: string;
  year: number;
  income_projection: number;
  expense_projection: number;
  notes?: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  monthly_saving: number;
  return_rate: number;
  retirement_year: number;
  withdrawal_per_year: number;
  target_age: number;
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/forms/FormField';
import Button from '../components/ui/Button';
import { PiggyBank } from 'lucide-react';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, fullName);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <PiggyBank className="h-16 w-16 text-blue-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Start planning your retirement today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <FormField
              label="Full Name"
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
            />

            <FormField
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
            />

            <FormField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <FormField
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <Button 
              type="submit" 
              fullWidth 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <div className="text-sm text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
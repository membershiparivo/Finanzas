import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/forms/FormField';
import Button from '../components/ui/Button';
import { PiggyBank } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage('Check your email for a password reset link');
    } catch (error) {
      setError('Failed to reset password. Please check your email address.');
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
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We'll send you an email with a link to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {message && (
              <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg">
                {message}
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg">
                {error}
              </div>
            )}
            
            <FormField
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
            />

            <Button 
              type="submit" 
              fullWidth 
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <div className="text-sm text-center">
              <Link 
                to="/login" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
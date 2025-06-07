import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, signOut } = useAuth();
  
  const firstName = user?.full_name.split(' ')[0] || '';

  return (
    <header className="bg-white shadow-sm py-4 px-4 fixed top-0 left-0 right-0 z-10">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          {user && (
            <p className="text-sm text-gray-600">Welcome, {firstName}</p>
          )}
        </div>
        {user && (
          <button 
            onClick={() => signOut()} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
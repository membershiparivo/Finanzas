import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, DollarSign, CreditCard, Briefcase, BarChart, PieChart } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg py-2 px-4 z-10">
      <div className="flex justify-between max-w-md mx-auto">
        <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" />
        <NavItem to="/expenses" icon={<DollarSign className="w-6 h-6" />} label="Expenses" />
        <NavItem to="/debts" icon={<CreditCard className="w-6 h-6" />} label="Debts" />
        <NavItem to="/income" icon={<Briefcase className="w-6 h-6" />} label="Income" />
        <NavItem to="/future" icon={<BarChart className="w-6 h-6" />} label="Future" />
        <NavItem to="/summary" icon={<PieChart className="w-6 h-6" />} label="Summary" />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex flex-col items-center justify-center text-xs
        ${isActive ? 'text-blue-500' : 'text-gray-500'}
      `}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </NavLink>
  );
};

export default Navigation;
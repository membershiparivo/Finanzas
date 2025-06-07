import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { 
  DollarSign, 
  CreditCard, 
  Briefcase, 
  BarChart, 
  Calculator,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const firstName = user?.full_name.split(' ')[0] || 'there';

  const menuItems = [
    {
      title: 'Track My Expenses',
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      link: '/expenses',
      description: 'Track daily, fixed and periodic expenses'
    },
    {
      title: 'Review My Debts',
      icon: <CreditCard className="w-6 h-6 text-red-500" />,
      link: '/debts',
      description: 'Manage loans and credit card debts'
    },
    {
      title: 'Add My Income',
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      link: '/income',
      description: 'Record regular and passive income'
    },
    {
      title: 'Model My Future',
      icon: <BarChart className="w-6 h-6 text-purple-500" />,
      link: '/future',
      description: 'See how your finances may change over time'
    },
    {
      title: 'Calculate My Savings Plan',
      icon: <Calculator className="w-6 h-6 text-amber-500" />,
      link: '/savings',
      description: 'Create a savings plan for retirement'
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Header title="Retirement Planning" />
      
      <main className="pt-24 px-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hello, {firstName}!
        </h2>
        
        <p className="text-gray-600 mb-8">
          Let's start planning your retirement journey. What would you like to do today?
        </p>
        
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              initial="initial"
              animate="animate"
              variants={cardVariants}
            >
              <Card 
                className="transition-all duration-150 hover:shadow-lg cursor-pointer"
                onClick={() => navigate(item.link)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-gray-100">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Home;
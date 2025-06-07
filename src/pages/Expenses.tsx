import React, { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Tabs, TabList, Tab, TabPanel } from '../components/ui/Tabs';
import { Plus } from 'lucide-react';

// This would eventually pull from Supabase
const mockDailyExpenses = [
  { id: '1', label: 'Groceries', amount: 120, frequency: 'weekly' },
  { id: '2', label: 'Restaurants & Takeout', amount: 60, frequency: 'weekly' },
  { id: '3', label: 'Coffee/Snacks', amount: 5, frequency: 'daily' },
  { id: '4', label: 'Transportation', amount: 40, frequency: 'weekly' },
];

const mockFixedExpenses = [
  { 
    id: '1', 
    label: 'Primary Home', 
    amount: 1500, 
    frequency: 'monthly',
    subcategories: [
      { id: '1-1', label: 'Mortgage', amount: 1200 },
      { id: '1-2', label: 'Insurance', amount: 100 },
      { id: '1-3', label: 'Property Taxes', amount: 200 },
    ]
  },
  { 
    id: '2', 
    label: 'Car Payments', 
    amount: 350, 
    frequency: 'monthly',
    subcategories: [
      { id: '2-1', label: 'Car Loan', amount: 300 },
      { id: '2-2', label: 'Insurance', amount: 50 },
    ]
  },
];

const mockAnnualExpenses = [
  { id: '1', label: 'Health Insurance', amount: 2400, frequency: 'yearly' },
  { id: '2', label: 'Home Repairs', amount: 1000, frequency: 'yearly' },
  { id: '3', label: 'Subscriptions', amount: 360, frequency: 'yearly' },
];

const Expenses = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  const formatAmount = (amount: number, frequency: string) => {
    return `$${amount.toFixed(2)}/${frequency.replace('ly', '')}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Header title="My Expenses" />
      
      <main className="pt-24 px-4 max-w-md mx-auto">
        <Tabs activeTab={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab>Daily</Tab>
            <Tab>Fixed</Tab>
            <Tab>Annual</Tab>
            <Tab>Compare</Tab>
          </TabList>
          
          <div className="mt-6">
            <TabPanel>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Daily (Flexible) Expenses</h2>
              <div className="space-y-3">
                {mockDailyExpenses.map((expense) => (
                  <Card key={expense.id}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{expense.label}</span>
                      <span className="text-gray-700">{formatAmount(expense.amount, expense.frequency)}</span>
                    </div>
                  </Card>
                ))}
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="mt-4 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Daily Expense
                </Button>
              </div>
            </TabPanel>
            
            <TabPanel>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Permanent (Fixed) Expenses</h2>
              <div className="space-y-3">
                {mockFixedExpenses.map((expense) => (
                  <Card key={expense.id} className="overflow-hidden">
                    <div 
                      className="flex justify-between items-center cursor-pointer p-1"
                      onClick={() => toggleExpand(expense.id)}
                    >
                      <span className="font-medium">{expense.label}</span>
                      <div className="flex items-center">
                        <span className="text-gray-700 mr-2">
                          {formatAmount(expense.amount, expense.frequency)}
                        </span>
                        <span className="text-blue-500">
                          {expandedItem === expense.id ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>
                    
                    {expandedItem === expense.id && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        {expense.subcategories.map((sub) => (
                          <div 
                            key={sub.id} 
                            className="flex justify-between items-center py-1 px-2"
                          >
                            <span className="text-sm text-gray-600">{sub.label}</span>
                            <span className="text-sm">${sub.amount}/mo</span>
                          </div>
                        ))}
                        <Button 
                          variant="outline" 
                          className="mt-2 text-sm w-full flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Subcategory
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="mt-4 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Fixed Expense
                </Button>
              </div>
            </TabPanel>
            
            <TabPanel>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Annual/Periodic Expenses</h2>
              <div className="space-y-3">
                {mockAnnualExpenses.map((expense) => (
                  <Card key={expense.id}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{expense.label}</span>
                      <span className="text-gray-700">{formatAmount(expense.amount, expense.frequency)}</span>
                    </div>
                  </Card>
                ))}
                <Button 
                  variant="outline" 
                  fullWidth 
                  className="mt-4 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Periodic Expense
                </Button>
              </div>
            </TabPanel>
            
            <TabPanel>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Lifestyle Cost Comparison</h2>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <h3 className="font-medium text-center mb-2">Current Home</h3>
                  <div className="text-center text-2xl font-bold text-blue-600">$2,500</div>
                  <p className="text-sm text-center text-gray-600">per month</p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-medium text-center mb-2">Study Abroad</h3>
                  <div className="text-center text-2xl font-bold text-green-600">$1,800</div>
                  <p className="text-sm text-center text-gray-600">per month</p>
                </Card>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Studying abroad costs 28% less than your current housing costs.
              </p>
            </TabPanel>
          </div>
        </Tabs>
      </main>
      
      <Navigation />
    </div>
  );
};

export default Expenses;
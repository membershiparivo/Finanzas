import React from 'react';

interface TabsProps {
  children: React.ReactNode;
  activeTab: number;
  onChange: (index: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ children, activeTab, onChange }) => {
  return (
    <div className="w-full">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            activeTab,
            onChange,
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabListProps {
  children: React.ReactNode;
  activeTab?: number;
  onChange?: (index: number) => void;
}

export const TabList: React.FC<TabListProps> = ({ children, activeTab, onChange }) => {
  return (
    <div className="flex border-b border-gray-200">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive: index === activeTab,
            onClick: () => onChange && onChange(index),
          });
        }
        return child;
      })}
    </div>
  );
};

interface TabProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
        }
      `}
    >
      {children}
    </button>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div className="py-4">{children}</div>;
};
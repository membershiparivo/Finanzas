import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    outline: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        py-3 px-4 rounded-lg font-medium transition duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
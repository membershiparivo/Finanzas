import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  required = false,
  placeholder = '',
  error,
  min,
  max,
  step,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`w-full p-3 border rounded-lg ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
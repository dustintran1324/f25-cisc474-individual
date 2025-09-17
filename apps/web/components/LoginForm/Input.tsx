import { forwardRef } from 'react';

export interface InputField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
}

interface InputProps {
  field: InputField;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ field, value, onChange, error }, ref) => {
    const { name, label, type = 'text', placeholder, required = false } = field;

    return (
      <div className="space-y-xs">
        <label htmlFor={name} className="block text-sm font-medium text-default-gray">
          {label}
          {required && <span className="text-default-gray ml-xs">*</span>}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-default-gray/60 focus:outline-none focus:ring-default-gray focus:border-default-gray sm:text-sm ${
            error 
              ? 'border-default-gray text-default-gray placeholder-default-gray/40 focus:ring-default-gray focus:border-default-gray' 
              : 'border-default-gray/30'
          }`}
        />
        {error && (
          <p className="text-sm text-default-gray" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
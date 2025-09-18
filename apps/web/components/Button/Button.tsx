import { forwardRef, ReactNode } from 'react';

export type ButtonTheme = 'fill' | 'border' | 'text';

export interface ButtonProps {
  children?: ReactNode;
  text?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  theme?: ButtonTheme;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    text, 
    leftIcon, 
    rightIcon, 
    theme = 'fill', 
    onClick, 
    type = 'button',
    disabled = false,
    className = '',
    ...props 
  }, ref) => {
    
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-default-gray disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
    
    const sizeClasses = 'px-4 py-2 text-sm';
    
    const themeClasses = {
      fill: 'text-white border border-transparent hover:opacity-80',
      border: 'bg-white border hover:bg-gray-50',
      text: 'bg-transparent border border-transparent hover:bg-gray-100'
    };

    const themeStyles = {
      fill: { backgroundColor: '#2e2e2e', color: 'white' },
      border: { backgroundColor: 'white', color: '#2e2e2e', borderColor: '#2e2e2e' },
      text: { backgroundColor: 'transparent', color: '#2e2e2e' }
    };

    const combinedClasses = `${baseClasses} ${sizeClasses} ${themeClasses[theme]} ${className}`;

    const content = children || text;

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedClasses}
        style={themeStyles[theme]}
        {...props}
      >
        {leftIcon && (
          <span className="mr-2 flex-shrink-0">
            {leftIcon}
          </span>
        )}
        
        {content && (
          <span className="flex-1">
            {content}
          </span>
        )}
        
        {rightIcon && (
          <span className="ml-2 flex-shrink-0">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
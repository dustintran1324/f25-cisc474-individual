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
    
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-default-gray disabled:opacity-50 disabled:cursor-not-allowed';
    
    const sizeClasses = 'px-4 py-2 text-sm';
    
    const themeClasses = {
      fill: 'bg-default-gray text-white hover:bg-default-gray/80 border border-transparent',
      border: 'bg-white text-default-gray border border-default-gray/30 hover:bg-default-gray/5',
      text: 'bg-transparent text-default-gray hover:bg-default-gray/10 border border-transparent'
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
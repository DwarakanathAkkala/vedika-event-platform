// src/components/ui/Button.tsx
import React from 'react';
import toast from 'react-hot-toast';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost'; // RESTORED
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, onClick, ...props }) => {
    // Use a common shadow style for all buttons for modern depth
    const baseStyle = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-center shadow-md";

    let variantStyle = '';
    // Re-implementing stable variants with modern colors
    if (variant === 'primary') {
        // Primary: Strong Indigo
        variantStyle = 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600 focus:ring-offset-gray-50';
    } else if (variant === 'secondary') {
        // Secondary: Accent Rose/Pink
        variantStyle = 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500 focus:ring-offset-gray-50';
    } else if (variant === 'ghost') {
        // Ghost: Transparent background, dark text
        variantStyle = 'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-indigo-600';
    }

    const finalClassName = `${baseStyle} ${variantStyle} ${className || ''}`;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (children === 'Trigger Checkpoint 1.A Toast') {
            toast.success("VEDIKA Toast System is Functional!", { icon: '🥳' });
        }
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button className={finalClassName} onClick={handleClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
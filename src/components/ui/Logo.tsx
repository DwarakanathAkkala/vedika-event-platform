// src/components/ui/Logo.tsx (Full file)
import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> { }

const Logo: React.FC<LogoProps> = ({ className, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-6 w-6 ${className || ''}`}
            {...rest}
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.85-3.328a.75.75 0 0 0-1.299-.544l-3.71-2.906a.75.75 0 0 0-.171.865L9.673 12l-3.71 4.706a.75.75 0 0 0 .171.865l3.71-2.906a.75.75 0 0 0 1.299-.544V12a.75.75 0 0 0 .75-.75h2.25a.75.75 0 0 0 0-1.5h-2.25V8.672Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

export default Logo;
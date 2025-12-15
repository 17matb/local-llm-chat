import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'ghostIcon' | 'ghostText' | 'classicYellow';
}

const Button = ({ variant, className, children, ...props }: ButtonProps) => {
  switch (variant) {
    case 'ghostIcon':
      return (
        <button
          {...props}
          className={`flex items-center justify-center shrink-0 gap-2 rounded-xl h-8 aspect-square overflow-hidden text-sm hover:bg-dark/10 dark:hover:bg-light/10 active:bg-dark/15 dark:active:bg-light/15 duration-100 cursor-pointer squircle ${className}`}
        >
          {children}
        </button>
      );
    case 'ghostText':
      return (
        <button
          {...props}
          className={`flex items-center justify-start shrink-0 gap-2 rounded-xl px-2 min-w-8 h-8 text-sm hover:bg-dark/10 dark:hover:bg-light/10 active:bg-dark/15 dark:active:bg-light/15 duration-100 cursor-pointer w-full text-nowrap squircle ${className}`}
        >
          {children}
        </button>
      );
    case 'classicYellow':
      return (
        <button className="bg-primary hover:bg-primary/80 active:bg-primary/70 duration-100 text-light text-sm h-8 px-2 rounded-xl cursor-pointer squircle">
          {children}
        </button>
      );
  }
};

export default Button;

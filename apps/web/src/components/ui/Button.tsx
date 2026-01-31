import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | 'ghostIcon'
    | 'ghostText'
    | 'smallClassicAccent'
    | 'largeClassicAccent'
    | 'largeClassicAccentIcon';
}

const Button = ({ variant, className, children, ...props }: ButtonProps) => {
  const commonStyles =
    'flex items-center shrink-0 gap-2 duration-100 cursor-pointer squircle';

  let variantStyles = '';

  switch (variant) {
    case 'ghostIcon':
      variantStyles =
        'justify-center hover:bg-bg-overlay rounded-xl h-8 aspect-square overflow-hidden text-sm active:bg-bg-overlay/70';
      break;
    case 'ghostText':
      variantStyles =
        'justify-start hover:bg-bg-overlay rounded-xl px-2 min-w-8 h-8 text-sm active:bg-bg-overlay/70 text-nowrap';
      break;
    case 'smallClassicAccent':
      variantStyles =
        'justify-center bg-accent hover:bg-accent/80 active:bg-accent/70 text-fg-on-accent text-sm h-8 px-2 rounded-xl';
      break;
    case 'largeClassicAccent':
      variantStyles =
        'justify-center bg-accent hover:bg-accent/80 active:bg-accent/70 text-fg-on-accent h-12 px-4 rounded-3xl';
      break;
    case 'largeClassicAccentIcon':
      variantStyles =
        'justify-center bg-accent hover:bg-accent/80 active:bg-accent/70 text-fg-on-accent h-12 aspect-square rounded-3xl';
      break;
  }

  return (
    <button
      {...props}
      className={`${commonStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

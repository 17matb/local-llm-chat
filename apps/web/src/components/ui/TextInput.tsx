import type React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
}

const TextInput = ({ className, type, ...props }: Props) => {
  return (
    <input
      {...props}
      type={type === 'password' ? 'password' : 'text'}
      className={`border border-dark/10 bg-dark/10 dark:border-light/10 dark:bg-light/10 w-full h-12 px-4 squircle rounded-3xl focus:outline-0 focus:border-dark/30 dark:focus:border-light/30 ${className}`}
    />
  );
};

export default TextInput;

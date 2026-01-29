import type { LucideIcon } from 'lucide-react';
import type React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
}

const TextInput = ({
  className,
  type,
  rightIcon: RightIcon,
  onRightIconClick,
  ...props
}: Props) => {
  return (
    <div className="relative w-full">
      <input
        {...props}
        type={type === 'password' ? 'password' : 'text'}
        className={`border border-dark/10 bg-dark/10 dark:border-light/10 dark:bg-light/10 w-full h-12 px-4 squircle rounded-3xl focus:outline-0 focus:border-dark/30 dark:focus:border-light/30 ${className}`}
      />
      {RightIcon && (
        <button className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
          <RightIcon size={18} />
        </button>
      )}
    </div>
  );
};

export default TextInput;

import type { LucideIcon } from 'lucide-react';
import type React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  onRightIconClick?: () => void;
}

const TextInput = ({
  className,
  type,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconClick,
  ...props
}: Props) => {
  return (
    <div className="relative w-full">
      {LeftIcon && (
        <LeftIcon
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none"
        />
      )}
      <input
        {...props}
        type={type === 'password' ? 'password' : 'text'}
        className={`border border-fg-subtle/10 focus:outline-0 focus:border-fg-subtle/30 bg-bg-surface w-full h-12 px-4 squircle-md ${LeftIcon && 'pl-11'} ${RightIcon && 'pr-11'} ${className}`}
      />
      {RightIcon && (
        <button
          onClick={() => onRightIconClick}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          <RightIcon size={16} />
        </button>
      )}
    </div>
  );
};

export default TextInput;

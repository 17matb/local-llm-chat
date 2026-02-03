import { cn } from '@/utils/cn';
import { Button as ButtonPrimitive } from '@base-ui/react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'flex items-center justify-center shrink-0 gap-2 duration-100 cursor-pointer px-2',
  {
    variants: {
      variant: {
        default:
          'bg-accent hover:bg-accent/80 active:bg-accent/70 text-fg-on-accent',
        ghost: 'hover:bg-bg-overlay active:bg-bg-overlay/70',
        destructive:
          'bg-destructive hover:bg-destructive/80 active:bg-destructive/70 text-fg-on-accent',
      },
      size: {
        default: 'h-10 px-5 squircle-md',
        sm: 'text-sm h-8 squircle-sm',
        icon: 'size-12 squircle-md',
        'icon-sm': 'text-sm size-8 squircle-sm',
      },
    },
  },
);

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

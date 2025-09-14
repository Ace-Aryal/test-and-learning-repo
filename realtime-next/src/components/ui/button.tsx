import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
const buttonVariants = cva(
  `cursor-pointer inline-flex active:scale-95 items-center rounded-lg justify-center text-sm font-medium transition-all focus:opacity-90 focus:outline-none 
     disabled:opacity-50 disabled:pointer-events-none
  `,
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90   text-white",
        ghost: "bg-transparent  hover:bg-background/90 text-white",
      },
      size: {
        default: " h-10 py-2 px-4",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
      },
    },

    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export default function Button({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : children}
    </button>
  );
}

import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes } from "react";
const buttonVariants = cva(
  `inline-flex active:scale-95 items-center rounded-md justify-center text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400
  focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
  `,
  {
    variants: {
      variant: {
        default: "bg-slate-900 hover:bg-slate-800   text-white",
        ghost: "bg-transparent hover:stext-late-900 hover:bg-slate-200",
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
    VariantProps<typeof buttonVariants> {}

export default function Button() {
  return <div>Button</div>;
}

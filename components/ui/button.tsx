import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "rt-inline-flex rt-items-center rt-justify-center rt-gap-2 rt-whitespace-nowrap rt-rounded-md rt-text-sm rt-font-medium rt-transition-colors focus-visible:rt-outline-none focus-visible:rt-ring-1 focus-visible:rt-ring-[#7d7d7d] disabled:rt-pointer-events-none disabled:rt-opacity-50 [&_svg]:rt-pointer-events-none [&_svg]:rt-size-4 [&_svg]:rt-shrink-0",
  {
    variants: {
      variant: {
        default:
          "rt-bg-[#1e77ed] rt-text-white rt-shadow [&_svg]:rt-size-auto [&_svg]:rt-shrink-0",
        destructive:
          "rt-bg-[#dd5144] rt-text-[hsl(0 0% 98%)] rt-shadow-sm hover:rt-bg-[#dd5144]",
        outline:
          "rt-border rt-border-[#eeeeee] rt-bg-[#f5f5f5] rt-shadow-sm hover:rt-bg-[#65b448] hover:rt-text-[#cfcfcf]",
        secondary: "rt-bg-[#fcc100] rt-text-[#cfcfcf] rt-shadow-sm",
        ghost: "hover:rt-bg-[#65b448] hover:rt-text-[#cfcfcf]",
        link: "rt-text-[#1e77ed] rt-underline-offset-4 hover:rt-underline",
        plain:
          "rt-bg-transparent hover:rt-bg-transparent hover:rt-text-gray-100 [&_svg]:rt-pointer-events-none [&_svg]:rt-size-auto [&_svg]:rt-shrink-0",
      },
      size: {
        default: "rt-py-[11px] rt-px-[77px] rt-text-md rt-font-bold",
        sm: "rt-h-8 rt-rounded-md rt-px-3 rt-text-xs",
        lg: "rt-h-10 rt-rounded-md rt-px-8",
        icon: "rt-h-9 rt-w-9",
        plain: "rt-p-0 rt-w-auto rt-h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

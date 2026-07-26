"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-functional text-ui-md transition-all duration-300 ease-vaelaire focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-midnight text-ivory hover:bg-charcoal active:bg-midnight",
        secondary:
          "bg-transparent border border-midnight text-midnight hover:bg-midnight hover:text-ivory",
        ghost:
          "bg-transparent text-midnight hover:bg-midnight/5",
        champagne:
          "bg-champagne text-midnight hover:bg-champagne/90",
        white:
          "bg-ivory text-midnight hover:bg-white",
      },
      size: {
        sm: "h-9 px-4 text-ui-sm",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-ui-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant, size, href, external, children, ...props }, ref) => {
    const classes = buttonVariants({ variant, size, className });

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

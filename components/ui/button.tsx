import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define button variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline", // Only for actual links
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the ButtonProps interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

// Forward ref for the button component
const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLElement, // Ref type for button, anchor, or Slot
  ButtonProps
>(({ className, variant, size, asChild = false, href, ...props }, ref) => {
  // Determine the component to render (Slot, a, or button)
  const Comp = asChild ? Slot : href ? "a" : "button";

  // Apply the "link" variant only if it's an anchor element (a tag)
  const finalVariant = href ? "link" : variant;

  // Only pass href to anchor elements (for <a> tag)
  const linkProps = href ? { href } : {};

  // Explicitly typing the ref for each component
  if (Comp === "a") {
    return (
      <a
        className={cn(buttonVariants({ variant: finalVariant, size, className }))}
        ref={ref as React.Ref<HTMLAnchorElement>} // Ref forwarding for <a>
        {...linkProps}
        {...props}
      />
    );
  }

  if (Comp === "button") {
    return (
      <button
        className={cn(buttonVariants({ variant: finalVariant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>} // Ref forwarding for <button>
        {...props}
      />
    );
  }

  // For Slot, cast the ref to HTMLElement since it's not a native DOM element
  return (
    <Slot
      className={cn(buttonVariants({ variant: finalVariant, size, className }))}
      ref={ref as React.Ref<HTMLElement>} // Ref forwarding for Slot
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };

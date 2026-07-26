import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "light";
}

export function SectionEyebrow({
  children,
  className,
  variant = "default",
}: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        "text-ui-sm font-functional uppercase tracking-widest",
        variant === "default" ? "text-champagne" : "text-stone",
        className
      )}
    >
      {children}
    </span>
  );
}

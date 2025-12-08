import { cn } from "@/lib/utils";

interface BloodTypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-lg",
  lg: "w-20 h-20 text-2xl",
};

export function BloodTypeBadge({ 
  type, 
  size = "md", 
  variant = "solid",
  className 
}: BloodTypeBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300",
        sizeClasses[size],
        variant === "solid" 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "border-2 border-primary text-primary bg-primary/5",
        className
      )}
    >
      {type}
    </div>
  );
}

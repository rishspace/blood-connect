import { cn } from "@/lib/utils";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface BloodTypeSelectorProps {
  selected: string | null;
  onSelect: (type: string) => void;
  className?: string;
}

export function BloodTypeSelector({ selected, onSelect, className }: BloodTypeSelectorProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-3", className)}>
      {bloodTypes.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={cn(
            "relative flex items-center justify-center h-14 rounded-xl font-bold text-lg transition-all duration-300",
            selected === type
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
              : "bg-card border-2 border-border text-foreground hover:border-primary hover:text-primary hover:scale-102"
          )}
        >
          {type}
          {selected === type && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-success text-[10px] text-success-foreground">
              ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

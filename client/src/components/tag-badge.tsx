import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export function TagBadge({ tag, onClick, selected = false, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-1 bg-terminal-green/10 text-terminal-green rounded text-xs",
        { "cursor-pointer hover:bg-terminal-green/20": !!onClick },
        { "bg-terminal-green/30": selected },
        className
      )}
      onClick={onClick}
    >
      {tag}
    </span>
  );
}

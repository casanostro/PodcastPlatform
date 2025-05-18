import React from "react";
import { cn } from "@/lib/utils";

interface TerminalScreenProps {
  children: React.ReactNode;
  className?: string;
  withHeader?: boolean;
  title?: string;
}

export function TerminalScreen({
  children,
  className,
  withHeader = false,
  title = "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM"
}: TerminalScreenProps) {
  return (
    <div className={cn("terminal-screen", className)}>
      {withHeader && (
        <div className="terminal-header flex items-center justify-between mb-6">
          <span className="font-mono text-black font-semibold">
            {title}
          </span>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

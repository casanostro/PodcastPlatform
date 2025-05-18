import { Link } from "wouter";
import { Mic } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-md bg-terminal-dark border border-terminal-green flex items-center justify-center">
        <Mic className="text-terminal-green h-5 w-5" />
      </div>
      <Link href="/" className="text-terminal-green font-mono text-lg font-bold tracking-tight">
        ROBCO<span className="text-terminal-text">_POD</span>
      </Link>
    </div>
  );
}

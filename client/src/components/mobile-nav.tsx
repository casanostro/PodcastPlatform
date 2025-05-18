import { useEffect } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Logo } from "./logo";

interface MobileNavProps {
  routes: {
    href: string;
    label: string;
    active: boolean;
  }[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ routes, isOpen, onClose }: MobileNavProps) {
  // Close the mobile menu when the route changes
  useEffect(() => {
    if (isOpen) {
      const handleRouteChange = () => {
        onClose();
      };

      window.addEventListener("popstate", handleRouteChange);

      return () => {
        window.removeEventListener("popstate", handleRouteChange);
      };
    }
  }, [isOpen, onClose]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="bg-terminal-dark border-terminal-green/30">
        <SheetHeader className="border-b border-terminal-green/20 pb-4">
          <SheetTitle className="text-terminal-green font-mono flex justify-between items-center">
            <Logo />
            <Button variant="ghost" size="icon" onClick={onClose} className="text-terminal-green">
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={onClose}
              className={`py-2 text-lg font-medium ${
                route.active 
                  ? "text-terminal-green" 
                  : "text-terminal-text hover:text-terminal-green"
              } transition-colors`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

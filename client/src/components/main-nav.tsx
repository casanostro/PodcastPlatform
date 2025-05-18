import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "./logo";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { MobileNav } from "./mobile-nav";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: location === "/",
    },
    {
      href: "/marketplace",
      label: "Marketplace",
      active: location === "/marketplace",
    },
    {
      href: "/projects",
      label: "Projects",
      active: location === "/projects" || location.startsWith("/projects/"),
    },
    {
      href: "/contact",
      label: "Contact",
      active: location === "/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-terminal-dark border-b border-terminal-green/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {routes.map((route) => (
              <Link 
                key={route.href} 
                href={route.href}
                className={`text-terminal-text hover:text-terminal-green font-medium transition-colors ${
                  route.active ? "text-terminal-green" : ""
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-terminal-green"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        routes={routes}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
}

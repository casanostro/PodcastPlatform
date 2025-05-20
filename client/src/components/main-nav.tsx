import { useState } from "react";
import { Link, useLocation } from "wouter";

export function MainNav() {
  const [location] = useLocation();

  // ASCII art pour la supply chain - un convoyeur
  const supplyChainAscii = `
     __n__n__    ___________    __n__n__    
____/       \\__/           \\__/       \\____
|                SUPPLY CHAIN                |
|___/\\________/\\___________/\\________/\\_____|
  `;

  const routes = [
    {
      href: "/",
      label: "ACCUEIL",
      active: location === "/",
      cmd: "MAIN"
    },
    {
      href: "/projects",
      label: "EXPÉRIENCE",
      active: location === "/projects" || location.startsWith("/projects/"),
      cmd: "EXP"
    },
    {
      href: "/portfolio",
      label: "PROJETS",
      active: location === "/portfolio" || location.startsWith("/portfolio/"),
      cmd: "PRJ"
    },
    {
      href: "/blog",
      label: "JOURNAL",
      active: location === "/blog" || location.startsWith("/blog/"),
      cmd: "LOG"
    },
    {
      href: "/contact",
      label: "CONTACT",
      active: location === "/contact",
      cmd: "COM"
    },
  ];

  return (
    <header className="sticky top-0 z-10 bg-terminal-bg border-b-2 border-terminal-green">
      <div className="robco-header">
        <div className="flex items-center justify-between">
          <div className="robco-header-title">
            ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM
          </div>
          <div className="font-mono text-xs">
            COPYRIGHT 2075-2077 ROBCO INDUSTRIES
          </div>
        </div>
        
        {/* ASCII Art Supply Chain Banner */}
        <div className="terminal-ascii-banner overflow-hidden py-1 border-y border-terminal-green/30 my-2">
          <pre className="text-terminal-green/70 text-xs animate-slide-left whitespace-pre overflow-hidden">
            {supplyChainAscii}
          </pre>
        </div>
        
        {/* Terminal Navigation Menu */}
        <nav className="flex mt-3">
          <ul className="robco-menu flex flex-wrap">
            {routes.map((route) => (
              <li 
                key={route.href}
                className={`robco-menu-item mx-2 mb-2 ${route.active ? 'active' : ''}`}
              >
                <Link 
                  href={route.href}
                >
                  <span className="text-terminal-accent">{route.cmd}</span>:{route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

import { Link } from "wouter";
import { Logo } from "./logo";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-terminal-dark border-t border-terminal-green/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo />
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/" className="text-terminal-text hover:text-terminal-green transition-colors">
              Accueil
            </Link>
            <Link href="/projects" className="text-terminal-text hover:text-terminal-green transition-colors">
              Projets
            </Link>
            <Link href="/contact" className="text-terminal-text hover:text-terminal-green transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-terminal-text hover:text-terminal-green transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-terminal-text hover:text-terminal-green transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-terminal-text hover:text-terminal-green transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-terminal-green/20 text-center text-terminal-text/60 text-sm">
          <p>© {new Date().getFullYear()} ROBCO_POD. All rights reserved. TERMINAL v1.0.4</p>
        </div>
      </div>
    </footer>
  );
}

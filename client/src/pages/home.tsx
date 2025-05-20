import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/project-card";
import { Project } from "@shared/schema";

export default function Home() {
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const terminalText = 
`BIENVENUE SUR LE TERMINAL PERSONNEL D'ADRIEN TRIPON.

SCANNING PERSONNEL DATABASE...
* ACCÈS ACCORDÉ *

> CHARGEMENT DU PROFIL...
> EXPERT SUPPLY CHAIN & TRANSFORMATION DIGITALE
> SPÉCIALISTE EN OPTIMISATION DES PROCESSUS LOGISTIQUES
> EXPÉRIENCE EN DIRECTION DE PROJETS ET AMÉLIORATION CONTINUE
 
VOUS POUVEZ NAVIGUER À TRAVERS CE TERMINAL POUR CONSULTER
MON EXPÉRIENCE PROFESSIONNELLE ET MES COMPÉTENCES.

UTILISEZ LES COMMANDES SUIVANTES:
> [EXP] CONSULTER EXPÉRIENCE PROFESSIONNELLE
> [COM] ÉTABLIR UNE COMMUNICATION`;

  // Terminal typing effect
  useEffect(() => {
    if (currentIndex < terminalText.length) {
      const typingSpeed = terminalText[currentIndex] === "\n" ? 300 : Math.random() * 50 + 20;
      
      const timer = setTimeout(() => {
        setTypedText(prev => prev + terminalText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, terminalText]);

  // Cursor blink effect
  useEffect(() => {
    if (isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      
      return () => clearInterval(cursorInterval);
    }
  }, [isTypingComplete]);

  return (
    <div className="terminal-lines p-6">
      {/* Main Terminal Screen */}
      <div className="terminal-screen mb-8 crt-glow">
        <div className="p-6">
          <div className="font-terminal mb-4">
            <pre className="whitespace-pre-wrap">
              {typedText}
              {!isTypingComplete || showCursor ? <span className="cursor">&#9608;</span> : <span style={{opacity: 0}}>&#9608;</span>}
            </pre>
          </div>
          
          {isTypingComplete && (
            <div className="flex flex-col mt-8 space-y-4">
              <Link href="/projects" className="robco-menu-item">
                <span>[EXP] Consulter Expérience Professionnelle</span>
              </Link>
              <Link href="/contact" className="robco-menu-item">
                <span>[COM] Établir Une Communication</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recent Experience Entries */}
      <div className="mb-8">
        <div className="border-b-2 border-terminal-green mb-6">
          <h2 className="text-2xl font-terminal text-terminal-green mb-2">DERNIÈRE EXPÉRIENCE</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects?.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="mt-6 cli-prompt">
          <Link href="/projects" className="text-terminal-green hover:text-terminal-accent">
            AFFICHER TOUTES LES ENTRÉES (UTILISEZ LA COMMANDE EXP POUR PLUS DE DÉTAILS)
          </Link>
        </div>
      </div>
      
      {/* Status Notifications */}
      <div className="terminal-screen p-4 mt-8">
        <div className="cli-prompt text-terminal-green">AVERTISSEMENT SYSTÈME: STATUT EMPLOI ACTUEL EN COURS DE MISE À JOUR</div>
        <div className="cli-prompt text-terminal-accent">RECHERCHE DE NOUVELLE OPPORTUNITÉ ACTIVE - DISPONIBILITÉ: IMMÉDIATE</div>
        <div className="cli-prompt mt-4">UTILISEZ LA COMMANDE [COM] POUR ÉTABLIR UN CONTACT</div>
      </div>
    </div>
  );
}

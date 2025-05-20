import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { ProjectCard } from "@/components/project-card";
import { Project } from "@shared/schema";

export default function Home() {
  const [location, setLocation] = useLocation();
  const { data: projects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // États pour le terminal interactif
  const [bootPhase, setBootPhase] = useState<'preboot' | 'booting' | 'loaded' | 'interactive'>('preboot');
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalResponses, setTerminalResponses] = useState("");
  const [currentPath, setCurrentPath] = useState("C:\\ROBCO\\USERS\\ADRIEN>");
  const inputRef = useRef<HTMLInputElement>(null);

  // Texte de démarrage du terminal
  const bootSequence = [
    "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
    "- SERVER 1 -",
    "",
    "Initializing...",
    "Loading ROBCO OS v.85.1.2...",
    "System check completed",
    "MEMORY........16384 KB OK",
    "PROCESSOR.....1.6 GHZ OK",
    "GRAPHICS......EGA/VGA OK",
    "SOUND.........ROBCO SOUND MATRIX OK",
    "",
    "**********************************",
    "**     SYSTÈME OPÉRATIONNEL     **",
    "**********************************",
    "",
    "BIENVENUE SUR LE TERMINAL PERSONNEL D'ADRIEN TRIPON",
    ""
  ];

  const mainMenu = [
    "SCANNING PERSONNEL DATABASE...",
    "* ACCÈS ACCORDÉ *",
    "",
    "> CHARGEMENT DU PROFIL...",
    "> EXPERT SUPPLY CHAIN & TRANSFORMATION DIGITALE",
    "> SPÉCIALISTE EN OPTIMISATION DES PROCESSUS LOGISTIQUES",
    "> EXPÉRIENCE EN DIRECTION DE PROJETS ET AMÉLIORATION CONTINUE",
    "",
    "Pour naviguer, utilisez les commandes suivantes:",
    "",
    "HELP        - Afficher la liste des commandes",
    "CV          - Afficher mon parcours professionnel",
    "PROJECTS    - Consulter mes projets",
    "BLOG        - Accéder à mes notes de terrain",
    "CONTACT     - Établir une communication",
    "CLEAR       - Effacer l'écran",
    ""
  ];

  // ASCII art pour la supply chain - un convoyeur
  const supplyChainAscii = `
       __n__n__    ___________    __n__n__    
  ____/       \\__/           \\__/       \\____
 |                SUPPLY CHAIN                |
 |___/\\________/\\___________/\\________/\\_____|
  `;

  // Effet de frappe pour la séquence de démarrage
  useEffect(() => {
    if (bootPhase === 'preboot') {
      setTimeout(() => {
        setBootPhase('booting');
      }, 1000);
    } 
    else if (bootPhase === 'booting') {
      const bootIndex = currentIndex;
      
      if (bootIndex < bootSequence.length) {
        const timer = setTimeout(() => {
          setTypedText(prev => prev + bootSequence[bootIndex] + "\n");
          setCurrentIndex(bootIndex + 1);
        }, Math.random() * 100 + 50);
        
        return () => clearTimeout(timer);
      } else {
        setBootPhase('loaded');
        setCurrentIndex(0);
      }
    }
    else if (bootPhase === 'loaded') {
      const mainIndex = currentIndex;
      
      if (mainIndex < mainMenu.length) {
        const timer = setTimeout(() => {
          setTypedText(prev => prev + mainMenu[mainIndex] + "\n");
          setCurrentIndex(mainIndex + 1);
        }, Math.random() * 50 + 30);
        
        return () => clearTimeout(timer);
      } else {
        setBootPhase('interactive');
        setTerminalResponses([...bootSequence, ...mainMenu].join("\n"));
      }
    }
  }, [bootPhase, currentIndex, bootSequence, mainMenu]);

  // Focus sur l'input lorsque le terminal est interactif
  useEffect(() => {
    if (bootPhase === 'interactive' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootPhase]);

  // Effet de clignotement du curseur
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Gestion des commandes du terminal
  const handleCommand = (input: string) => {
    const command = input.trim().toLowerCase();
    
    // Ajout de la commande à l'historique
    if (command) {
      setCommandHistory(prev => [command, ...prev.slice(0, 9)]);
      setHistoryIndex(-1);
    }
    
    // Ajout de la commande à l'écran du terminal
    setTerminalResponses(prev => 
      prev + "\n" + currentPath + " " + input + "\n"
    );
    
    // Traitement des commandes
    if (command === 'help' || command === 'aide') {
      setTerminalResponses(prev => 
        prev + "\n" +
        "Commandes disponibles:\n\n" +
        "HELP        - Afficher cette aide\n" +
        "CV          - Consulter mon expérience professionnelle\n" +
        "PROJECTS    - Voir mes projets\n" +
        "BLOG        - Accéder à mon journal de terrain\n" +
        "CONTACT     - Me contacter\n" +
        "CLEAR       - Effacer l'écran\n" +
        "EXIT        - Quitter le terminal (retour à l'interface principale)\n"
      );
    }
    else if (command === 'cv' || command === 'exp') {
      setTerminalResponses(prev => 
        prev + "\nRedirection vers la section expérience...\n"
      );
      setTimeout(() => setLocation('/projects'), 1000);
    }
    else if (command === 'projects' || command === 'projets') {
      setTerminalResponses(prev => 
        prev + "\nChargement de la section projets...\n"
      );
      setTimeout(() => setLocation('/portfolio'), 1000);
    }
    else if (command === 'blog' || command === 'journal') {
      setTerminalResponses(prev => 
        prev + "\nOuverture du journal de terrain...\n"
      );
      setTimeout(() => setLocation('/blog'), 1000);
    }
    else if (command === 'contact' || command === 'com') {
      setTerminalResponses(prev => 
        prev + "\nInitialisation du module de communication...\n"
      );
      setTimeout(() => setLocation('/contact'), 1000);
    }
    else if (command === 'clear' || command === 'cls') {
      setTerminalResponses("");
    }
    else if (command === 'exit' || command === 'quit') {
      setTerminalResponses(prev => 
        prev + "\nMaintien de l'interface actuelle.\n" +
        "Utilisez la navigation en haut de l'écran pour vous déplacer.\n"
      );
    }
    else if (command === 'ascii') {
      setTerminalResponses(prev => 
        prev + "\n" + supplyChainAscii + "\n"
      );
    }
    else if (command === '') {
      // Ne rien faire si la commande est vide
    }
    else {
      setTerminalResponses(prev => 
        prev + "\nCommande non reconnue. Tapez 'HELP' pour voir les commandes disponibles.\n"
      );
    }
    
    setUserInput("");
  };

  // Gestion de la soumission du formulaire
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(userInput);
  };

  // Gestion des touches spéciales (flèches haut/bas pour l'historique)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setUserInput(commandHistory[newIndex]);
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setUserInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setUserInput("");
      }
    }
    else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complétion simplifiée
      const commands = ['help', 'cv', 'projects', 'blog', 'contact', 'clear', 'exit', 'ascii'];
      const input = userInput.toLowerCase();
      
      if (input) {
        const match = commands.find(cmd => cmd.startsWith(input));
        if (match) {
          setUserInput(match);
        }
      }
    }
  };

  return (
    <div className="terminal-lines p-6">
      {/* ASCII Art Supply Chain */}
      <div className="terminal-ascii-banner mb-4 overflow-hidden">
        <pre className="text-terminal-green/75 animate-slide-left whitespace-pre overflow-hidden">
          {supplyChainAscii}
        </pre>
      </div>

      {/* Terminal interactif */}
      <div className="terminal-screen mb-8 crt-glow">
        <div className="p-6">
          {/* Affichage du terminal pendant le démarrage */}
          {bootPhase !== 'interactive' && (
            <div className="font-terminal mb-4">
              <pre className="whitespace-pre-wrap">
                {typedText}
                {showCursor && <span className="cursor">&#9608;</span>}
              </pre>
            </div>
          )}
          
          {/* Terminal interactif après démarrage */}
          {bootPhase === 'interactive' && (
            <div className="font-terminal">
              <pre className="whitespace-pre-wrap mb-4 text-terminal-green">
                {terminalResponses}
              </pre>
              
              <form onSubmit={handleInputSubmit} className="flex items-center">
                <span className="text-terminal-accent mr-2">{currentPath}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none text-terminal-green focus:outline-none flex-1"
                  autoComplete="off"
                  spellCheck="false"
                />
                {showCursor && <span className="cursor">&#9608;</span>}
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Menu de navigation rapide */}
      <div className="mb-8">
        <div className="border-b-2 border-terminal-green mb-6">
          <h2 className="text-2xl font-terminal text-terminal-green mb-2">ACCÈS RAPIDE</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/projects" className="terminal-screen p-4 hover:border-terminal-green">
            <div className="cli-prompt text-terminal-accent">[EXP] EXPÉRIENCE</div>
            <div className="text-sm mt-2">Consulter mon parcours professionnel et mes compétences</div>
          </Link>
          
          <Link href="/portfolio" className="terminal-screen p-4 hover:border-terminal-green">
            <div className="cli-prompt text-terminal-accent">[PRJ] PROJETS</div>
            <div className="text-sm mt-2">Découvrir mes réalisations et cas d'études</div>
          </Link>
          
          <Link href="/blog" className="terminal-screen p-4 hover:border-terminal-green">
            <div className="cli-prompt text-terminal-accent">[LOG] JOURNAL</div>
            <div className="text-sm mt-2">Lire mes notes de terrain et réflexions</div>
          </Link>
          
          <Link href="/contact" className="terminal-screen p-4 hover:border-terminal-green">
            <div className="cli-prompt text-terminal-accent">[COM] CONTACT</div>
            <div className="text-sm mt-2">Établir une communication directe</div>
          </Link>
        </div>
      </div>
      
      {/* Dernière expérience */}
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
            AFFICHER TOUTES LES ENTRÉES (UTILISEZ LA COMMANDE 'CV' POUR PLUS DE DÉTAILS)
          </Link>
        </div>
      </div>
      
      {/* Status Notifications */}
      <div className="terminal-screen p-4 mt-8">
        <div className="cli-prompt text-terminal-green">AVERTISSEMENT SYSTÈME: STATUT EMPLOI ACTUEL EN COURS DE MISE À JOUR</div>
        <div className="cli-prompt text-terminal-accent">RECHERCHE DE NOUVELLE OPPORTUNITÉ ACTIVE - DISPONIBILITÉ: IMMÉDIATE</div>
        <div className="cli-prompt mt-4">UTILISEZ LA COMMANDE 'CONTACT' POUR ÉTABLIR UN CONTACT</div>
      </div>
    </div>
  );
}

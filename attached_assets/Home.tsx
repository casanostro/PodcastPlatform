import { Link } from 'wouter';
import { useEffect, useState } from 'react';

// Terminal Scanlines Component
const TerminalOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute inset-0 bg-terminal-dark opacity-5 mix-blend-multiply"></div>
      <div className="absolute inset-0 scanlines"></div>
    </div>
  );
};

// Terminal text animation component
const TypingText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50 + delay); // typing speed
      
      return () => clearTimeout(timer);
    } else {
      // After typing is complete, blink the cursor
      const blinkInterval = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500); // cursor blink speed
      
      return () => clearInterval(blinkInterval);
    }
  }, [currentIndex, text, delay]);

  return (
    <div className={`font-terminal ${className || ''}`}>
      {displayText}
      {currentIndex < text.length || cursorVisible ? (
        <span className="text-terminal-green">▌</span>
      ) : (
        <span className="opacity-0">▌</span>
      )}
    </div>
  );
};

const Home = () => {
  const [bootupComplete, setBootupComplete] = useState(false);
  const [bootPhase, setBootPhase] = useState(1);
  const [bootPercentage, setBootPercentage] = useState(0);

  // Simulate terminal boot sequence
  useEffect(() => {
    if (bootPhase === 1) {
      // Phase 1: Loading progress
      const interval = setInterval(() => {
        setBootPercentage(prev => {
          const newValue = prev + Math.floor(Math.random() * 5) + 1;
          if (newValue >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootPhase(2), 800);
            return 100;
          }
          return newValue;
        });
      }, 100);
      
      return () => clearInterval(interval);
    } else if (bootPhase === 2) {
      // Phase 2: Final boot
      const timer = setTimeout(() => {
        setBootupComplete(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [bootPhase]);

  // Main render content
  const renderContent = () => {
    if (!bootupComplete) {
      // Boot sequence screen
      return (
        <div className="container mx-auto px-4 max-w-4xl animate-terminal-boot">
          <div className="bg-terminal-dark p-6 border border-terminal-green mb-4">
            <div className="mb-4">
              <div className="font-robco text-2xl text-terminal-header">
                SYSTÈME D'EXPLOITATION UNIFIÉ
              </div>
              <div className="font-terminal text-terminal-text text-sm">
                COPYRIGHT 2025 - TOUS DROITS RÉSERVÉS
              </div>
              <div className="h-0.5 bg-terminal-green/30 my-3"></div>
            </div>
            
            {bootPhase === 1 ? (
              /* Phase 1: Loading bar */
              <>
                <div className="font-terminal text-terminal-text mb-2">
                  INITIALISATION SYSTÈME...
                </div>
                
                <div className="w-full h-6 border border-terminal-green/70 p-1 mb-3">
                  <div 
                    className="h-full bg-terminal-green transition-all duration-100 ease-linear"
                    style={{ width: `${bootPercentage}%` }}
                  ></div>
                </div>
                
                <div className="font-terminal text-xs text-terminal-text flex justify-between">
                  <span>- VÉRIFICATION DES DONNÉES -</span>
                  <span>{bootPercentage}%</span>
                </div>
              </>
            ) : (
              /* Phase 2: Loading complete */
              <div className="font-terminal text-terminal-text animate-terminal-flicker">
                <div>INITIALISATION TERMINÉE</div>
                <div className="mt-2">CHARGEMENT DU TERMINAL ADRIEN_TRIPON...</div>
                <div className="mt-4 text-pip-green">
                  ACCÈS AUTORISÉ<span className="animate-cursor-blink">▓</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Main terminal content after boot
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="terminal-screen p-6 border-2 border-terminal-green animate-terminal-boot">
          <div className="mb-6">
            <h1 className="font-robco text-4xl md:text-5xl text-terminal-header mb-2">
              ADRIEN TRIPON
            </h1>
            <div className="border-b border-terminal-green/50 pb-2 mb-2"></div>
            <TypingText 
              text="SUPPLY CHAIN & OPERATIONS PROJECT MANAGER" 
              className="text-pip-green text-xl"
              delay={200}
            />
          </div>
          
          <div className="mb-8 font-terminal text-terminal-text terminal-prompt">
            <p className="mb-4">
              Professionnel de la Supply Chain avec expertise en optimisation des processus 
              logistiques, automatisation et gestion de projet.
            </p>
            <p>
              Diplômé d'un <span className="text-pip-green">Master en Supply Chain Management</span>, 
              je combine des compétences analytiques poussées avec une vision stratégique 
              pour améliorer la performance opérationnelle.
            </p>
          </div>
          
          <div className="mb-8 flex flex-wrap gap-3">
            <a 
              href="/projects"
              className="font-terminal text-sm px-4 py-2 border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-dark transition-colors cursor-pointer inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/projects");
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
              }}
            >
              [ EXPÉRIENCE ]
            </a>
            <a 
              href="/about"
              className="font-terminal text-sm px-4 py-2 border border-pip-green text-pip-green hover:bg-pip-green hover:text-terminal-dark transition-colors cursor-pointer inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/about");
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
              }}
            >
              [ COMPÉTENCES ]
            </a>
            <a 
              href="/contact"
              className="font-terminal text-sm px-4 py-2 border border-pip-amber text-pip-amber hover:bg-pip-amber hover:text-terminal-dark transition-colors cursor-pointer inline-block"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/contact");
                const navEvent = new PopStateEvent('popstate');
                window.dispatchEvent(navEvent);
              }}
            >
              [ CONTACT ]
            </a>
          </div>
          
          <div className="py-4 border-t border-terminal-green/30">
            <div className="font-terminal text-sm text-terminal-header mb-3">
              COMPÉTENCES PRINCIPALES:
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                'S&OP', 'Gestion des stocks', 'SAP', 'Lean Six Sigma',
                'Power BI', 'Amélioration continue', 'Data Analysis', 'Project Management'
              ].map((skill, index) => (
                <div 
                  key={index} 
                  className={`font-terminal px-2 py-1 text-xs border 
                    ${index % 2 === 0 
                      ? 'border-terminal-green text-terminal-green' 
                      : 'border-pip-green text-pip-green'
                    }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between text-xs font-terminal">
            <div className="text-terminal-text">
              <span className="text-pip-amber">DISPONIBILITÉ:</span> AVRIL 2025
            </div>
            <div className="text-terminal-text animate-terminal-flicker">
              <span className="text-pip-green">■</span> STATUS: ONLINE
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex gap-6 justify-center">
            <div className="text-xs font-terminal text-terminal-text">
              <span className="text-pip-green">5+</span> ANS D'EXPÉRIENCE
            </div>
            <div className="text-xs font-terminal text-terminal-text">
              <span className="text-pip-green">10+</span> PROJETS RÉALISÉS
            </div>
            <div className="text-xs font-terminal text-terminal-text">
              <span className="text-pip-green">3</span> INDUSTRIES
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-10 px-4 min-h-screen bg-terminal-bg relative overflow-hidden">
      {/* Terminal overlay */}
      <TerminalOverlay />
      
      {/* Main content */}
      {renderContent()}
    </section>
  );
};

export default Home;

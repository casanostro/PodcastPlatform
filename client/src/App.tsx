import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { MainNav } from "@/components/main-nav";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { Footer } from "@/components/footer";

// Terminal Boot Screen Component
const BootScreen = ({ onBootComplete }: { onBootComplete: () => void }) => {
  const [bootPhase, setBootPhase] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // Boot sequence messages
  const bootSequence = [
    "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    "COPYRIGHT 2074-2077 ROBCO INDUSTRIES",
    "INITIATING DIAGNOSTIC...",
    "SET TERMINAL/INQUIRE",
    "SCANNING MEMORY BANKS...",
    "CHECKING PERIPHERALS...",
    "INITIALIZING SYSTEM...",
    "DATA INTEGRITY CHECK...",
    "LOAD PERSONNEL FILE: ADRIEN_TRIPON.DAT",
    "PERSONNEL SCAN COMPLETE",
    "COMMAND LINE READY",
    "AUTHENTICATING USER...",
    "ACCESS GRANTED",
    "INITIALIZING MAIN INTERFACE..."
  ];

  useEffect(() => {
    // Initial delay before starting boot sequence
    const initialTimer = setTimeout(() => {
      setBootPhase(1);
    }, 800);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    let timer: number | undefined;

    if (bootPhase === 1) {
      // Add boot lines one by one with varying delays
      let lineIndex = 0;
      
      const addLine = () => {
        if (lineIndex < bootSequence.length) {
          setBootLines(prev => [...prev, bootSequence[lineIndex]]);
          lineIndex++;
          
          // Random delay between lines (more authentic)
          const delay = Math.random() * 300 + 150;
          timer = window.setTimeout(addLine, delay);
        } else {
          setBootPhase(2);
        }
      };
      
      timer = window.setTimeout(addLine, 300);
    }
    else if (bootPhase === 2) {
      // Loading progress bar
      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 5) + 1;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootPhase(3), 500);
            return 100;
          }
          return next;
        });
      }, 80);
      
      return () => clearInterval(interval);
    }
    else if (bootPhase === 3) {
      // Final boot message and transition to main app
      setBootLines(prev => [...prev, "BOOT SEQUENCE COMPLETE"]);
      timer = window.setTimeout(() => {
        onBootComplete();
      }, 1200);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [bootPhase, onBootComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-terminal-dark p-6">
      <div className="w-full max-w-2xl terminal-screen p-6 crt-glow">
        <div className="text-xl font-robco text-terminal-header mb-4">
          {bootPhase >= 1 && "ROBCO INDUSTRIES (TM)"}
        </div>
        
        <div className="font-mono text-terminal-green mb-6 overflow-y-auto h-64">
          {bootLines.map((line, index) => (
            <div key={index} className="terminal-line mb-2">
              {line}
            </div>
          ))}
          
          {bootPhase === 1 && (
            <span className="cursor-blink">▌</span>
          )}
        </div>
        
        {bootPhase >= 2 && (
          <div className="mb-4">
            <div className="text-sm mb-1 font-mono">CHARGEMENT SYSTÈME...</div>
            <div className="w-full h-6 border border-terminal-green p-1">
              <div 
                className="h-full bg-terminal-green terminal-flicker"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1 font-mono">
              <span>SÉQUENCE D'INITIALISATION</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}
        
        {bootPhase === 3 && (
          <div className="text-terminal-header mt-4 terminal-flicker">
            BIENVENUE, UTILISATEUR AUTORISÉ
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    // Apply terminal boot animation to the entire app
    const appRoot = document.getElementById("root");
    if (appRoot) {
      appRoot.classList.add("crt-boot");
    }
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  return (
    <>
      {!bootComplete && <BootScreen onBootComplete={handleBootComplete} />}
      
      <div className={`min-h-screen flex flex-col ${bootComplete ? 'crt-boot' : 'opacity-0'}`}>
        <MainNav />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/:slug" component={ProjectDetail} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

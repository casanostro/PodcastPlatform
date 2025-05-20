import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { MainNav } from "@/components/main-nav";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Portfolio from "@/pages/portfolio";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { Footer } from "@/components/footer";

// Terminal Boot Screen Component - Exactly like Fallout 3 RobCo terminals
const BootScreen = ({ onBootComplete }: { onBootComplete: () => void }) => {
  const [bootPhase, setBootPhase] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // Boot sequence messages - authentic RobCo messages
  const bootSequence = [
    "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM",
    "COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
    "-INITIATING DIAGNOSTIC ROUTINES-",
    "SET TERMINAL/INQUIRE",
    ">RIT-V300",
    "SCAN RF ADAPTERS...",
    "RF-3B ADAPTER: OK",
    "RIT-V300 BIOS... SECURE",
    "INITIALIZING ROBCO OS SERVICES",
    "...",
    "...",
    "CHECKING MEMORY BANKS [64K OK]",
    "CHECKING SYSTEM ARCHITECTURE...",
    "CPU: ROBCO CPU 2077 @ 120MHz",
    "MEMORY MODULES: OK",
    "LOAD ROM(1): RBIOS-4.02.08.00",
    "EXEC VERSION 41.10: LOAD SUCCESSFUL!",
    "INITIALIZING FILESYSTEM [OK]",
    ">SET TERMINAL/BOOT",
    "LOAD PERSONNEL FILE: ADRIEN_TRIPON.DAT",
    "RUNNING DECRYPTION ROUTINE",
    "...",
    "PERSONNEL DATA FOUND",
    "LOAD RESUME... [OK]",
    "...",
    ">CMD: AUTHENTICATE",
    "-USER AUTHENTICATED-",
    "ENTER PASSWORD NOW"
  ];

  useEffect(() => {
    // Initial delay before starting boot sequence
    const initialTimer = setTimeout(() => {
      setBootPhase(1);
    }, 1200);

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
      setBootLines(prev => [...prev, "LOGIN SUCCESSFUL", "INITIATING ROBCO INTERFACE..."]);
      timer = window.setTimeout(() => {
        onBootComplete();
      }, 1500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [bootPhase, onBootComplete]);

  return (
    <div className="boot-screen">
      <div className="w-full max-w-2xl">
        <div className="robco-logo crt-flicker">
          ROBCO INDUSTRIES (TM)
        </div>
        
        <div className="boot-messages">
          {bootLines.map((line, index) => (
            <div key={index} className="boot-message">
              {line}
            </div>
          ))}
          
          {bootPhase === 1 && (
            <span className="cursor">&#9608;</span>
          )}
        </div>
        
        {bootPhase >= 2 && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <div className="progress-status">
              <span>SYSTEM INITIALIZATION</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}
        
        {bootPhase === 3 && (
          <div className="text-terminal-green mt-4 crt-flicker text-center">
            WELCOME, AUTHORIZED USER
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
      
      <div className={`robco-wrapper ${bootComplete ? 'crt-boot' : 'opacity-0'}`}>
        <MainNav />
        <main className="robco-content">
          <div className="robco-screen">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/projects" component={Projects} />
              <Route path="/projects/:slug" component={ProjectDetail} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/blog" component={Blog} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { MainNav } from "@/components/main-nav";
import Home from "@/pages/home";
import Marketplace from "@/pages/marketplace";
import Projects from "@/pages/projects";
import ProjectDetail from "@/pages/project-detail";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { Footer } from "@/components/footer";

function App() {
  useEffect(() => {
    // Apply terminal boot animation to the entire app
    const appRoot = document.getElementById("root");
    if (appRoot) {
      appRoot.classList.add("animate-terminal-boot");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col animate-terminal-flicker">
      <MainNav />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/projects" component={Projects} />
          <Route path="/projects/:slug" component={ProjectDetail} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;

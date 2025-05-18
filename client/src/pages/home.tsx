import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { TerminalScreen } from "@/components/terminal-screen";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { generateCursorBlink } from "@/lib/utils";
import { Project } from "@shared/schema";

export default function Home() {
  const { data: projects, isLoading: isLoadingProjects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 lg:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <TerminalScreen className="animate-terminal-flicker max-w-5xl mx-auto p-8" withHeader>
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-terminal-green">
                ROBCO_TERMINAL<span className="animate-cursor-blink">{generateCursorBlink()}</span>
              </h1>
              <p className="text-lg md:text-xl font-mono">PORTFOLIO PROFESSIONNEL</p>
              <div className="h-0.5 bg-terminal-green/30 w-full my-6"></div>
              <p className="mb-6 font-mono text-sm opacity-80">
                &gt; INITIALIZING PROFILE_SYSTEM...<br />
                &gt; ESTABLISHING SECURE CONNECTION...<br />
                &gt; ACCESS GRANTED. TERMINAL READY.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-terminal-green hover:bg-terminal-green/90 text-terminal-dark font-semibold py-3 px-6">
                <Link href="/projects">
                  Voir Projets
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green/10">
                <Link href="/contact">
                  Contact
                </Link>
              </Button>
            </div>
          </TerminalScreen>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-16 bg-terminal-bg">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-2">EXPÉRIENCE PROFESSIONNELLE</h2>
            <p className="text-terminal-text/80 max-w-2xl mx-auto">Un aperçu de mes projets professionnels récents et de mes réalisations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {isLoadingProjects ? (
              Array(4).fill(0).map((_, index) => (
                <TerminalScreen key={index} className="p-5 h-[240px] animate-pulse">
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-5 bg-terminal-green/10 rounded w-1/2"></div>
                    <div className="h-5 bg-terminal-green/10 rounded w-1/6"></div>
                  </div>
                  <div className="h-4 bg-terminal-green/10 rounded mb-4 w-full"></div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array(4).fill(0).map((_, idx) => (
                      <div key={idx} className="h-6 bg-terminal-green/10 rounded w-20"></div>
                    ))}
                  </div>
                </TerminalScreen>
              ))
            ) : (
              projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green">
              <Link href="/projects">
                Voir Tous les Projets
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-terminal-dark">
        <div className="container mx-auto px-4">
          <TerminalScreen className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-6">INTÉRESSÉ PAR MON PROFIL ?</h2>
            <p className="text-lg mb-8">
              Consultez mes projets en détail ou contactez-moi pour discuter de collaborations potentielles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-terminal-green hover:bg-terminal-green/90 text-terminal-dark font-semibold">
                <Link href="/projects">
                  Explorer Mes Projets
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green/10">
                <Link href="/contact">
                  Me Contacter
                </Link>
              </Button>
            </div>
          </TerminalScreen>
        </div>
      </section>
    </>
  );
}

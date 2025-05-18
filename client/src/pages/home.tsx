import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { TerminalScreen } from "@/components/terminal-screen";
import { PodcastCard } from "@/components/podcast-card";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { generateCursorBlink } from "@/lib/utils";
import { PodcastItem, Project } from "@shared/schema";

export default function Home() {
  const { data: podcasts, isLoading: isLoadingPodcasts } = useQuery<PodcastItem[]>({
    queryKey: ['/api/podcasts/featured'],
  });

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
                ROBCO_POD<span className="animate-cursor-blink">{generateCursorBlink()}</span>
              </h1>
              <p className="text-lg md:text-xl font-mono">WELCOME TO THE DEFINITIVE PODCAST MARKETPLACE</p>
              <div className="h-0.5 bg-terminal-green/30 w-full my-6"></div>
              <p className="mb-6 font-mono text-sm opacity-80">
                &gt; INITIALIZING CONTENT_DELIVERY_SYSTEM...<br />
                &gt; ESTABLISHING SECURE CONNECTION...<br />
                &gt; ACCESS GRANTED. TERMINAL READY.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-terminal-green hover:bg-terminal-green/90 text-terminal-dark font-semibold py-3 px-6">
                <Link href="/marketplace">
                  Browse Marketplace
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green/10">
                <Link href="/projects">
                  View Projects
                </Link>
              </Button>
            </div>
          </TerminalScreen>
        </div>
      </section>

      {/* Featured Marketplace Items */}
      <section className="py-16 bg-terminal-dark">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-2">FEATURED EQUIPMENT</h2>
            <p className="text-terminal-text/80 max-w-2xl mx-auto">Discover our most popular podcast gear and professional services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingPodcasts ? (
              Array(3).fill(0).map((_, index) => (
                <TerminalScreen key={index} className="p-5 h-[340px] animate-pulse">
                  <div className="w-full h-48 bg-terminal-green/10 rounded-md mb-4"></div>
                  <div className="h-5 bg-terminal-green/10 rounded mb-2 w-2/3"></div>
                  <div className="h-4 bg-terminal-green/10 rounded mb-4 w-full"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-terminal-green/10 rounded w-1/4"></div>
                    <div className="h-8 bg-terminal-green/10 rounded w-1/3"></div>
                  </div>
                </TerminalScreen>
              ))
            ) : (
              podcasts?.slice(0, 3).map((item) => (
                <PodcastCard key={item.id} item={item} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green">
              <Link href="/marketplace">
                View Full Marketplace
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-16 bg-terminal-bg">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-2">RECENT PROJECTS</h2>
            <p className="text-terminal-text/80 max-w-2xl mx-auto">Browse our latest portfolio projects and case studies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {isLoadingProjects ? (
              Array(2).fill(0).map((_, index) => (
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
              projects?.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green">
              <Link href="/projects">
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-terminal-dark">
        <div className="container mx-auto px-4">
          <TerminalScreen className="max-w-3xl mx-auto p-8 text-center">
            <h2 className="text-3xl font-mono font-bold text-terminal-green mb-6">READY TO UPGRADE YOUR PODCAST?</h2>
            <p className="text-lg mb-8">
              Explore our marketplace for professional equipment or contact us to discuss your podcast needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-terminal-green hover:bg-terminal-green/90 text-terminal-dark font-semibold">
                <Link href="/marketplace">
                  Shop Equipment
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green/10">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </TerminalScreen>
        </div>
      </section>
    </>
  );
}

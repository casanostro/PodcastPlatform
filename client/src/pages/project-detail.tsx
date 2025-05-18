import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Project } from "@shared/schema";
import { TerminalScreen } from "@/components/terminal-screen";
import { TagBadge } from "@/components/tag-badge";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetail() {
  const [match, params] = useRoute<{ slug: string }>("/projects/:slug");
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/slug/${params?.slug}`],
    enabled: !!params?.slug,
  });

  // If slug not found, redirect to projects page
  useEffect(() => {
    if (error) {
      window.location.href = "/projects";
    }
  }, [error]);

  if (isLoading) {
    return (
      <section className="py-16 bg-terminal-dark">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/projects" className="inline-flex items-center text-terminal-green hover:text-terminal-green/80 mb-4">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to projects
            </Link>
            <TerminalScreen className="p-6 animate-pulse">
              <div className="flex justify-between items-start mb-6">
                <div className="h-8 bg-terminal-green/10 rounded w-1/3"></div>
                <div className="h-6 bg-terminal-green/10 rounded w-1/6"></div>
              </div>
              
              <div className="mb-8">
                <div className="w-full h-64 bg-terminal-green/10 rounded-md mb-4"></div>
              </div>
              
              <div className="mb-6">
                <div className="h-6 bg-terminal-green/10 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-terminal-green/10 rounded mb-2 w-full"></div>
                <div className="h-4 bg-terminal-green/10 rounded mb-2 w-full"></div>
              </div>
            </TerminalScreen>
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <section className="py-16 bg-terminal-dark">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/projects" className="inline-flex items-center text-terminal-green hover:text-terminal-green/80 mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to projects
          </Link>
          <TerminalScreen className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-mono font-semibold text-terminal-green">{project.title}</h2>
              <span className={`bg-${project.badgeColor}/20 text-${project.badgeColor} px-3 py-1 rounded font-mono`}>
                {project.badge}
              </span>
            </div>
            
            <div className="mb-8">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover rounded-md mb-4" 
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-mono text-terminal-green mb-3">Project Description</h3>
              <p className="text-terminal-text/90 mb-4">
                {project.description}
              </p>
              <p className="text-terminal-text/90 mb-4">
                This project involved implementing cutting-edge solutions with a focus on efficiency, data-driven decision making, and cross-departmental collaboration.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-mono text-terminal-green mb-3">Key Achievements</h3>
              <ul className="list-disc list-inside space-y-2 text-terminal-text/90">
                <li>Improved workflow efficiency by over 30% through strategic process optimization</li>
                <li>Developed comprehensive data analytics solutions for real-time performance monitoring</li>
                <li>Implemented scalable infrastructure for future growth and expansion</li>
                <li>Created standardized reporting frameworks adopted across multiple departments</li>
                <li>Reduced operational costs while increasing overall productivity</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-mono text-terminal-green mb-3">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <TagBadge 
                    key={index} 
                    tag={tag} 
                    className="px-3 py-1.5 rounded-md" 
                  />
                ))}
              </div>
            </div>
          </TerminalScreen>
        </div>
      </div>
    </section>
  );
}

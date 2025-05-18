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
              <ArrowLeft className="mr-1 h-4 w-4" /> Retour aux projets
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
            <ArrowLeft className="mr-1 h-4 w-4" /> Retour aux projets
          </Link>
          <TerminalScreen className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-mono font-semibold text-terminal-green">{project.title}</h2>
              <span className={`px-3 py-1 rounded font-mono ${project.badgeColor === "pip-green" ? "bg-pip-green/20 text-pip-green" : "bg-pip-amber/20 text-pip-amber"}`}>
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
              <h3 className="text-xl font-mono text-terminal-green mb-3">Description du poste</h3>
              <p className="text-terminal-text/90 mb-4">
                {project.description}
              </p>
              <p className="text-terminal-text/90 mb-4">
                Ce projet a impliqué la mise en œuvre de solutions innovantes axées sur l'efficacité opérationnelle, la prise de décision basée sur les données et la collaboration interdépartementale.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-mono text-terminal-green mb-3">Réalisations clés</h3>
              <ul className="list-disc list-inside space-y-2 text-terminal-text/90">
                <li>Amélioration de l'efficacité du flux de travail de plus de 30% grâce à l'optimisation stratégique des processus</li>
                <li>Développement de solutions d'analyse de données complètes pour le suivi des performances en temps réel</li>
                <li>Mise en place d'une infrastructure évolutive pour la croissance et l'expansion futures</li>
                <li>Création de cadres de reporting standardisés adoptés par plusieurs départements</li>
                <li>Réduction des coûts opérationnels tout en augmentant la productivité globale</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-mono text-terminal-green mb-3">Technologies & Compétences</h3>
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

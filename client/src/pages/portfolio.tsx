import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { getAllTags, slugify } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [typingIndex, setTypingIndex] = useState(0);
  const [introText, setIntroText] = useState("");
  const [showCommandPrompt, setShowCommandPrompt] = useState(true);

  // Terminal intro sequence
  const introSequence = 
`RIT-V300 INITIALIZING PROJECT DATABASE
LOADING PORTFOLIO DATA...
SCANNING FILES...

PORTFOLIO DE PROJETS - ADRIEN TRIPON
SÉLECTIONNEZ UN PROJET POUR CONSULTER LES DÉTAILS:`;

  // Typing effect for intro text
  useEffect(() => {
    if (typingIndex < introSequence.length) {
      const timer = setTimeout(() => {
        setIntroText(prev => prev + introSequence[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, Math.random() * 30 + 20);
      
      return () => clearTimeout(timer);
    }
  }, [typingIndex, introSequence]);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const tags = projects ? getAllTags(projects) : [];

  // Filter projects by selected tag
  const filteredProjects = projects?.filter(
    (project) => selectedFilter === "all" || project.tags.includes(selectedFilter)
  );

  const handleSelectProject = (projectId: number) => {
    setSelectedProject(projectId === selectedProject ? null : projectId);
  };

  const handleFilterChange = (tag: string) => {
    setSelectedFilter(tag);
    setSelectedProject(null);
  };

  // Get details of selected project
  const selectedProjectData = projects?.find(p => p.id === selectedProject);

  // ASCII art for supply chain - a conveyor belt
  const asciiArt = `
       _____________            _____________            _____________
  ____/             \\__________/             \\__________/             \\____
 |                                  PROJECT PORTFOLIO                     |
 |___/\\_____________/\\__________/\\_____________/\\__________/\\_____________|
  `;

  return (
    <div className="terminal-lines p-4">
      <div className="terminal-screen p-6 mb-8">
        {/* ASCII Art */}
        <pre className="text-terminal-green/70 text-sm whitespace-pre-wrap overflow-hidden mb-6 font-mono">
          {asciiArt}
        </pre>
        
        {/* Header and intro text */}
        <pre className="font-terminal whitespace-pre-wrap mb-6 text-terminal-green">
          {introText}
          {typingIndex < introSequence.length && <span className="cursor">&#9608;</span>}
        </pre>
        
        {/* Filter by command line */}
        {typingIndex >= introSequence.length && (
          <div className="mb-6 border-t border-b border-terminal-green/30 py-4">
            <div className="cli-prompt mb-2">FILTRER PAR TECHNOLOGIE:</div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => handleFilterChange("all")}
                className={`px-3 py-1 border ${selectedFilter === "all" 
                  ? "border-terminal-green bg-terminal-green/20 text-terminal-green" 
                  : "border-terminal-green/50 text-terminal-text/80 hover:border-terminal-green"}`}
              >
                TOUS
              </button>
              {tags.map((tag) => (
                <button 
                  key={tag}
                  onClick={() => handleFilterChange(tag)}
                  className={`px-3 py-1 border ${selectedFilter === tag 
                    ? "border-terminal-green bg-terminal-green/20 text-terminal-green" 
                    : "border-terminal-green/50 text-terminal-text/80 hover:border-terminal-green"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects list */}
        {typingIndex >= introSequence.length && filteredProjects && (
          <div className="mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-terminal-green/30">
                  <th className="py-2 pr-2 w-10">#</th>
                  <th className="py-2 pr-4">NOM DU PROJET</th>
                  <th className="py-2 hidden md:table-cell">TYPE</th>
                  <th className="py-2 w-20 text-right">ACCÈS</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Loading state
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-terminal-text/70">
                      CHARGEMENT DES DONNÉES...
                    </td>
                  </tr>
                ) : filteredProjects.length === 0 ? (
                  // No projects found
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-terminal-text/70">
                      AUCUN PROJET TROUVÉ AVEC CE FILTRE
                    </td>
                  </tr>
                ) : (
                  // Project list
                  filteredProjects.map((project, index) => (
                    <tr 
                      key={project.id}
                      className={`border-b border-terminal-green/10 hover:bg-terminal-green/5 cursor-pointer ${selectedProject === project.id ? 'bg-terminal-green/10' : ''}`}
                      onClick={() => handleSelectProject(project.id)}
                    >
                      <td className="py-3 pr-2 text-terminal-accent">[{index + 1}]</td>
                      <td className="py-3 pr-4 font-bold">{project.title}</td>
                      <td className="py-3 hidden md:table-cell text-terminal-text/80">{project.badge}</td>
                      <td className="py-3 text-right">
                        <span className={`text-xs ${selectedProject === project.id ? 'text-pip-green' : 'text-terminal-text/50'}`}>
                          {selectedProject === project.id ? '[ SÉLECTIONNÉ ]' : '[ DÉTAILS ]'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Command prompt */}
        {showCommandPrompt && typingIndex >= introSequence.length && !selectedProject && (
          <div className="cli-prompt">
            COMMANDE:
            <span className="cursor ml-2">&#9608;</span>
          </div>
        )}
      </div>
      
      {/* Selected project details */}
      {selectedProjectData && (
        <div className="terminal-screen p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-terminal text-terminal-green mb-1">{selectedProjectData.title}</h2>
              <div className="text-terminal-accent mb-3">{selectedProjectData.badge}</div>
            </div>
            <button 
              onClick={() => setSelectedProject(null)}
              className="px-3 py-1 border border-terminal-green/50 text-terminal-green/80 hover:border-terminal-green hover:text-terminal-green"
            >
              [ FERMER ]
            </button>
          </div>
          
          <div className="mb-6 border-t border-b border-terminal-green/30 py-4">
            <div className="text-lg mb-3">DESCRIPTION DU PROJET:</div>
            <p className="mb-4 text-terminal-text/90 whitespace-pre-line">{selectedProjectData.description}</p>
          </div>
          
          {/* Project details in a terminal style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-lg mb-2">TECHNOLOGIES:</div>
              <div className="flex flex-wrap gap-2">
                {selectedProjectData.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 border border-terminal-green/50 text-terminal-green text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <div className="text-lg mb-2">OBJECTIFS:</div>
              <ul className="list-disc list-inside space-y-1 text-terminal-text/90">
                <li>Optimisation de l'efficacité opérationnelle</li>
                <li>Réduction des coûts de 15%</li>
                <li>Amélioration de la traçabilité de la chaîne d'approvisionnement</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href={`/portfolio/${slugify(selectedProjectData.title)}`} 
              className="inline-block px-4 py-2 border border-terminal-green text-terminal-green hover:bg-terminal-green/10"
            >
              ACCÉDER AU RAPPORT COMPLET
            </Link>
          </div>
        </div>
      )}
      
      {/* Command help */}
      <div className="terminal-screen p-4 mt-4">
        <div className="text-sm">
          <div className="cli-prompt mb-1">AIDE: UTILISEZ LES NUMÉROS POUR SÉLECTIONNER UN PROJET</div>
          <div className="cli-prompt mb-1">NAVIGATION: 
            <Link href="/" className="text-terminal-accent hover:underline ml-2">[MAIN]</Link> | 
            <Link href="/projects" className="text-terminal-accent hover:underline ml-2">[EXP]</Link> | 
            <Link href="/blog" className="text-terminal-accent hover:underline ml-2">[BLOG]</Link> | 
            <Link href="/contact" className="text-terminal-accent hover:underline ml-2">[COM]</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
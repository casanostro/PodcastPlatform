import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { getAllTags } from "@/lib/utils";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showCommandPrompt, setShowCommandPrompt] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const [introText, setIntroText] = useState("");

  const introSequence = 
`RIT-V300 ACCESSING PERSONNEL DATABASE
LOADING PROFESSIONAL RECORDS...
DECRYPTING ENTRIES...

EXPÉRIENCE PROFESSIONNELLE - ADRIEN TRIPON
SÉLECTIONNEZ UNE ENTRÉE POUR CONSULTER LES DÉTAILS:`;

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

  // Selected project details
  const selectedProjectData = projects?.find(p => p.id === selectedProject);

  return (
    <div className="terminal-lines p-4">
      <div className="terminal-screen p-6 mb-8">
        {/* Header and intro text */}
        <pre className="font-terminal whitespace-pre-wrap mb-6 text-terminal-green">
          {introText}
          {typingIndex < introSequence.length && <span className="cursor">&#9608;</span>}
        </pre>
        
        {/* Filter by command line */}
        {typingIndex >= introSequence.length && (
          <div className="mb-6 border-t border-b border-terminal-green/30 py-4">
            <div className="cli-prompt mb-2">FILTRER PAR COMPÉTENCE:</div>
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
        
        {/* Experience entries list */}
        {typingIndex >= introSequence.length && filteredProjects && (
          <div className="mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-terminal-green/30">
                  <th className="py-2 pr-2 w-10">#</th>
                  <th className="py-2 pr-4">ENTREPRISE</th>
                  <th className="py-2 hidden md:table-cell">POSTE</th>
                  <th className="py-2 w-20 text-right">ACCÈS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr 
                    key={project.id}
                    className={`border-b border-terminal-green/10 hover:bg-terminal-green/5 ${selectedProject === project.id ? 'bg-terminal-green/10' : ''}`}
                    onClick={() => handleSelectProject(project.id)}
                  >
                    <td className="py-3 pr-2 text-terminal-accent">[{index + 1}]</td>
                    <td className="py-3 pr-4 font-bold">{project.title}</td>
                    <td className="py-3 hidden md:table-cell text-terminal-text/80">{project.badge}</td>
                    <td className="py-3 text-right">
                      <span className={`text-xs ${selectedProject === project.id ? 'text-pip-green' : 'text-terminal-text/50'}`}>
                        {selectedProject === project.id ? '[ OUVERT ]' : '[ DÉTAILS ]'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Command prompt */}
        {showCommandPrompt && typingIndex >= introSequence.length && (
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
            <div className={`px-3 py-1 border ${selectedProjectData.badgeColor === 'pip-green' ? 'border-pip-green text-pip-green' : 'border-pip-amber text-pip-amber'}`}>
              {selectedProjectData.badgeColor === 'pip-green' ? 'ACTUEL' : 'ARCHIVÉ'}
            </div>
          </div>
          
          <div className="mb-6 border-t border-b border-terminal-green/30 py-4">
            <div className="text-lg mb-3">DESCRIPTION DU POSTE:</div>
            <p className="mb-4 text-terminal-text/90">{selectedProjectData.description}</p>
            <p className="text-terminal-text/90">Ce projet a impliqué la mise en œuvre de solutions innovantes axées sur l'efficacité opérationnelle, la prise de décision basée sur les données et la collaboration interdépartementale.</p>
          </div>
          
          <div className="mb-6">
            <div className="text-lg mb-2">RÉALISATIONS CLÉS:</div>
            <ul className="list-disc list-inside space-y-1 text-terminal-text/90">
              <li>Amélioration de l'efficacité du flux de travail de plus de 30% grâce à l'optimisation stratégique des processus</li>
              <li>Développement de solutions d'analyse de données complètes pour le suivi des performances en temps réel</li>
              <li>Mise en place d'une infrastructure évolutive pour la croissance et l'expansion futures</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <div className="text-lg mb-2">COMPÉTENCES:</div>
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
          
          <Link href={`/projects/${selectedProjectData.slug}`} className="cli-prompt text-terminal-green hover:text-terminal-accent">
            ACCÉDER AU RAPPORT COMPLET
          </Link>
        </div>
      )}
      
      {/* Command help */}
      <div className="terminal-screen p-4 mt-4">
        <div className="text-sm">
          <div className="cli-prompt mb-1">AIDE: UTILISEZ LES NUMÉROS POUR SÉLECTIONNER UNE EXPÉRIENCE</div>
          <div className="cli-prompt mb-1">RETOUR: <Link href="/" className="text-terminal-accent hover:underline">[MAIN]</Link> | CONTACT: <Link href="/contact" className="text-terminal-accent hover:underline">[COM]</Link></div>
        </div>
      </div>
    </div>
  );
}

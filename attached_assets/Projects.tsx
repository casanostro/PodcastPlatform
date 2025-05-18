import { useQuery } from '@tanstack/react-query';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@shared/schema';
import { Link } from 'wouter';
import { useEffect, useState, useRef } from 'react';

// Composant pour le filtrage des projets
const FilterBar = ({ activeFilter, setActiveFilter }: { 
  activeFilter: string, 
  setActiveFilter: (filter: string) => void 
}) => {
  const filters = [
    { id: 'all', label: 'TOUS' },
    { id: 'aero', label: 'AÉRONAUTIQUE' },
    { id: 'defense', label: 'DÉFENSE' },
    { id: 'luxury', label: 'LUXE' }
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`relative px-4 py-2 font-mono text-xs uppercase transition-all duration-300
            ${activeFilter === filter.id 
              ? 'text-digital-black bg-neon-blue' 
              : 'text-neon-blue bg-transparent border border-neon-blue hover:bg-neon-blue/10'}`}
        >
          {filter.label}
          {activeFilter === filter.id && (
            <span className="absolute -right-1 -top-1 w-2 h-2 bg-neon-magenta"></span>
          )}
        </button>
      ))}
    </div>
  );
};

// Indicateur de chargement animé
const LoadingIndicator = () => (
  <div className="relative p-10 brutalist-container digital-noise">
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-neon-blue animate-spin"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-r-2 border-l-2 border-neon-magenta animate-pulse opacity-70"></div>
      </div>
      <div className="ml-6 font-mono text-neon-blue">
        <div className="text-lg">CHARGEMENT</div>
        <div className="text-xs text-cyber-gray animate-pulse">RÉCUPÉRATION DES DONNÉES...</div>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [appearItems, setAppearItems] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Animation d'entrée lors du chargement
  useEffect(() => {
    if (!isLoading && projects) {
      setTimeout(() => {
        setAppearItems(true);
      }, 300);
    }
  }, [isLoading, projects]);

  // Animation de défilement
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollPosition = window.scrollY;
        const elements = sectionRef.current.querySelectorAll('.project-card');
        
        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.85;
          
          if (isVisible) {
            (element as HTMLElement).style.opacity = '1';
            (element as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      }
    };
    
    handleScroll(); // Vérifier immédiatement au montage
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtrage des projets
  const filteredProjects = projects?.filter(project => {
    if (activeFilter === 'all') return true;
    return project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  return (
    <section ref={sectionRef} id="projects" className="py-16 px-4 relative overflow-hidden bg-digital-black min-h-screen grid-bg">
      <div className="container mx-auto relative z-10">
        <div className="mb-10">
          <h2 className="brutalist-title text-future-white mb-2">
            EXPÉRIENCE PROFESSIONNELLE
          </h2>
          <p className="font-mono text-cyber-gray max-w-2xl">
            Parcours professionnel et contributions en Supply Chain et Operations Management
            dans divers secteurs industriels.
          </p>
        </div>

        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        
        {isLoading ? (
          <LoadingIndicator />
        ) : error ? (
          <div className="brutalist-container border-neon-magenta bg-medium-slate/50">
            <h3 className="font-future text-neon-magenta uppercase mb-2">Erreur de chargement</h3>
            <p className="font-mono text-cyber-gray">{(error as Error).message}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects?.map((project, index) => (
                <div 
                  key={project.id} 
                  className="project-card transition-all duration-700 opacity-0 transform translate-y-8"
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    opacity: appearItems ? 1 : 0,
                    transform: appearItems ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-16">
              <div className="tech-divider w-32 my-4"></div>
            </div>
            
            <div className="text-center mt-6">
              <div className="font-mono text-sm text-cyber-gray">
                <span className="text-neon-blue font-future mr-2">{filteredProjects?.length || 0}</span> 
                expériences professionnelles affichées sur <span className="text-neon-blue font-future ml-1">{projects?.length || 0}</span>
              </div>
            </div>
          </>
        )}
        
        <div className="mt-16 pt-8 border-t border-medium-slate">
          <div className="flex flex-wrap justify-between items-center">
            <div className="font-mono text-xs text-cyber-gray">
              Consultez également la section 
              <span className="inline-block ml-2 mr-1">
                <Link href="/about">
                  <a className="text-neon-magenta hover:underline">COMPÉTENCES</a>
                </Link>
              </span>
              pour plus d'informations
            </div>
            <div className="font-mono text-xs text-neon-blue animate-pulse-slow">
              {new Date().toLocaleDateString('fr-FR')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

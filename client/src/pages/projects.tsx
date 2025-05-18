import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { ProjectCard } from "@/components/project-card";
import { TerminalScreen } from "@/components/terminal-screen";
import { TagBadge } from "@/components/tag-badge";
import { getAllTags } from "@/lib/utils";

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState("all");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const tags = projects ? getAllTags(projects) : [];

  const filteredProjects = projects?.filter(
    (project) => selectedTag === "all" || project.tags.includes(selectedTag)
  );

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "all" : tag);
  };

  return (
    <section id="projects" className="py-16 bg-terminal-bg">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-mono font-bold text-terminal-green mb-2">EXPÉRIENCE PROFESSIONNELLE</h1>
          <p className="text-terminal-text/80 max-w-2xl mx-auto">Découvrez mes projets professionnels et mes réalisations.</p>
        </div>
        
        {/* Filters */}
        {!isLoading && tags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <TagBadge 
                tag="Tous les projets" 
                onClick={() => setSelectedTag("all")} 
                selected={selectedTag === "all"}
                className="px-4 py-2 rounded-md bg-terminal-dark"
              />
              {tags.map((tag) => (
                <TagBadge 
                  key={tag} 
                  tag={tag} 
                  onClick={() => handleTagSelect(tag)} 
                  selected={selectedTag === tag}
                  className="px-4 py-2 rounded-md bg-terminal-dark"
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {isLoading ? (
            // Loading skeletons
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
          ) : filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-2 text-center py-10">
              <p className="text-terminal-text/80 text-lg">
                Aucun projet trouvé avec ce tag. Essayez un autre filtre.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

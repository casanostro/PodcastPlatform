import { Project } from "@shared/schema";
import { TerminalScreen } from "./terminal-screen";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "wouter";
import { TagBadge } from "./tag-badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <TerminalScreen className="group p-0 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-terminal-green/20">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-mono font-semibold text-terminal-green">{project.title}</h3>
          <Badge 
            variant={project.badgeColor === "pip-green" ? "green" : "amber"}
            className="text-xs"
          >
            {project.badge}
          </Badge>
        </div>
        <p className="text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <TagBadge key={index} tag={tag} />
          ))}
        </div>
        <div className="flex justify-end">
          <Button 
            size="sm" 
            variant="outline" 
            className="px-3 py-1.5 bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green"
            asChild
          >
            <Link href={`/projects/${project.slug}`}>
              View Project Details
            </Link>
          </Button>
        </div>
      </div>
    </TerminalScreen>
  );
}

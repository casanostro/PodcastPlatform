import { PodcastItem } from "@shared/schema";
import { TerminalScreen } from "./terminal-screen";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link } from "wouter";

interface PodcastCardProps {
  item: PodcastItem;
}

export function PodcastCard({ item }: PodcastCardProps) {
  return (
    <TerminalScreen className="group p-0 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-terminal-green/20">
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-mono font-semibold text-terminal-green">{item.title}</h3>
          {item.badge && (
            <Badge 
              variant={item.badgeColor === "pip-green" ? "green" : "amber"}
              className="text-xs"
            >
              {item.badge}
            </Badge>
          )}
        </div>
        <p className="text-sm mb-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-terminal-green font-mono font-bold">{item.price}</span>
          <Button 
            size="sm" 
            variant="outline" 
            className="px-3 py-1.5 bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green"
          >
            View Details
          </Button>
        </div>
      </div>
    </TerminalScreen>
  );
}

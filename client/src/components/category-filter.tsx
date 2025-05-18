import { Button } from "./ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          className={
            selectedCategory === "all"
              ? "bg-terminal-green text-terminal-dark"
              : "border-terminal-green/30 text-terminal-text hover:bg-terminal-green/10"
          }
          onClick={() => onSelectCategory("all")}
          size="sm"
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={
              selectedCategory === category
                ? "bg-terminal-green text-terminal-dark"
                : "border-terminal-green/30 text-terminal-text hover:bg-terminal-green/10"
            }
            onClick={() => onSelectCategory(category)}
            size="sm"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function generateCursorBlink(): string {
  return '_';
}

export function getAllTags(projects: any[]): string[] {
  const tagsSet = new Set<string>();
  
  projects.forEach(project => {
    if (project.tags && Array.isArray(project.tags)) {
      project.tags.forEach((tag: string) => tagsSet.add(tag));
    }
  });
  
  return Array.from(tagsSet);
}

export function getAllCategories(items: any[]): string[] {
  const categoriesSet = new Set<string>();
  
  items.forEach(item => {
    if (item.category) {
      categoriesSet.add(item.category);
    }
  });
  
  return Array.from(categoriesSet);
}

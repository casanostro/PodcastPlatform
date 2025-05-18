import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PodcastItem } from "@shared/schema";
import { PodcastCard } from "@/components/podcast-card";
import { TerminalScreen } from "@/components/terminal-screen";
import { CategoryFilter } from "@/components/category-filter";
import { getAllCategories } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const { data: podcasts, isLoading } = useQuery<PodcastItem[]>({
    queryKey: ['/api/podcasts'],
  });

  const categories = podcasts ? getAllCategories(podcasts) : [];

  const filteredPodcasts = podcasts?.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const visiblePodcasts = filteredPodcasts?.slice(0, visibleCount);
  const hasMore = filteredPodcasts ? visibleCount < filteredPodcasts.length : false;

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section id="marketplace" className="py-16 bg-terminal-dark">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-mono font-bold text-terminal-green mb-2">PODCAST MARKETPLACE</h1>
          <p className="text-terminal-text/80 max-w-2xl mx-auto">
            Discover high-quality recording equipment, professional studios, and production services.
          </p>
        </div>
        
        {/* Filters */}
        {!isLoading && categories.length > 0 && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}
        
        {/* Marketplace Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(6).fill(0).map((_, index) => (
              <TerminalScreen key={index} className="p-5 h-[340px] animate-pulse">
                <div className="w-full h-48 bg-terminal-green/10 rounded-md mb-4"></div>
                <div className="h-5 bg-terminal-green/10 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-terminal-green/10 rounded mb-4 w-full"></div>
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-terminal-green/10 rounded w-1/4"></div>
                  <div className="h-8 bg-terminal-green/10 rounded w-1/3"></div>
                </div>
              </TerminalScreen>
            ))
          ) : visiblePodcasts && visiblePodcasts.length > 0 ? (
            visiblePodcasts.map((item) => (
              <PodcastCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-terminal-text/80 text-lg">
                No items found in this category. Try another filter.
              </p>
            </div>
          )}
        </div>
        
        {hasMore && (
          <div className="text-center mt-10">
            <Button 
              variant="outline"
              className="bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green font-medium"
              onClick={loadMore}
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

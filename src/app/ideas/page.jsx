import { IdeaCard } from "@/components/ideas/IdeaCard";
import { fetchIdeas } from "@/lib/ideas/data";
import Filter from "@/components/ideas/Filter";
import Searchbar from "@/components/ideas/Searchbar";

export const metadata = {
  title: "All Ideas",
  description: "Browse All Ideas",
};

export default async function IdeasPage() {
  const ideas = await fetchIdeas();

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Explore Innovations
          </h1>
          <p className="text-muted-foreground">
            Discover the next big thing in the IdeaVault ecosystem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <Searchbar />

          {/* Category Filter */}
          <Filter />
        </div>
      </div>

      {/* Ideas Grid */}
      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
          <p className="text-muted-foreground">
            No ideas found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

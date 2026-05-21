import { fetchIdeas } from "@/lib/ideas/data";
import { IdeaCard } from "./IdeaCard";

export default async function IdeaList({ searchTerm, category }) {
  const ideas = await fetchIdeas(searchTerm, category);

  return (
    <div>
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

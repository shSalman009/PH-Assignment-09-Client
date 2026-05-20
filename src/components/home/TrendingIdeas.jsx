import { Button } from "@/components/ui/button";
import { fetchTrendingIdeas } from "@/lib/ideas/data";
import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { IdeaCard } from "../ideas/IdeaCard";

export default async function TrendingIdeas() {
  const trendingIdeas = await fetchTrendingIdeas();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="w-full  md:text-left text-center space-y-2">
            <div className="flex md:justify-start justify-center items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>Community Favorites</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight">
              Trending Innovations
            </h2>
            <p className="text-muted-foreground text-lg">
              The most discussed startup concepts this week.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex group" asChild>
            <Link href="/ideas">
              See All Ideas{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Trending Ideas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingIdeas.slice(0, 6).map((idea, index) => (
            <IdeaCard key={idea._id} idea={idea} rank={index + 1} />
          ))}
        </div>

        {/* Mobile only - See All Button */}
        <div className="mt-10 md:hidden">
          <Button variant="outline" className="w-full h-12 rounded-xl" asChild>
            <Link href="/ideas">View All Ideas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

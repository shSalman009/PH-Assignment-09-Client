import Filter from "@/components/ideas/Filter";
import Searchbar from "@/components/ideas/Searchbar";
import IdeaList from "@/components/ideas/IdeaList";
import Loading from "@/components/shared/LoadingState";
import { Suspense } from "react";

export const metadata = {
  title: "All Ideas",
  description: "Browse All Ideas",
};

export default async function IdeasPage({ searchParams }) {
  const params = await searchParams;
  const searchTerm = params.title || "";
  const category = params.category || "";

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-between gap-6 mb-10">
        <div className="text-center md:text-start">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Explore Innovations
          </h1>
          <p className="text-muted-foreground">
            Discover the next big thing in the IdeaVault ecosystem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-6 w-full md:w-auto">
          {/* Search Bar */}
          <Searchbar />

          {/* Category Filter */}
          <Filter />
        </div>
      </div>

      {/* Ideas List */}
      <Suspense key={searchTerm + category} fallback={<Loading />}>
        <IdeaList searchTerm={searchTerm} category={category} />
      </Suspense>
    </div>
  );
}

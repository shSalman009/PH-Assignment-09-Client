import { Skeleton } from "@/components/ui/skeleton";

export default function IdeaDetailsLoading() {
  return (
    <div className="container mx-auto max-w-4xl py-10 space-y-8 px-4">
      {/* Breadcrumb Skeleton */}
      <Skeleton className="h-4 w-32" />

      <div className="space-y-4">
        {/* Title & Badge */}
        <Skeleton className="h-10 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>

      {/* Main Image */}
      <Skeleton className="aspect-video w-full rounded-2xl" />

      {/* Content Blocks */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

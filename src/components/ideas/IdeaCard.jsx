import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import BookmarkButton from "./BookmarkButton";
import { toggleBookmarkAction } from "@/lib/bookmarks/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function IdeaCard({ idea, rank, isBookmarked }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-xl hover:-translate-y-1 border-muted-foreground/10 pt-0 relative group">
      {/* Ranking Badge */}
      {rank && (
        <div className="absolute top-2 left-2 z-20 bg-primary text-primary-foreground w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-xl border-4 border-background rotate-[-10deg] group-hover:rotate-0 transition-transform">
          #{rank}
        </div>
      )}

      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Image
          width={400}
          height={225}
          src={idea.imageUrl}
          alt={idea.title}
          className="object-cover w-full h-full transition-transform duration-500"
        />
        <Badge className="absolute top-3 right-3 shadow-sm backdrop-blur-md bg-primary/80">
          {idea.category}
        </Badge>

        {session && (
          <div className="absolute bottom-3 right-3 bg-background rounded-full">
            <BookmarkButton
              isBookmarkedInitially={isBookmarked}
              ideaId={idea._id}
              toggleBookmarkAction={toggleBookmarkAction}
            />
          </div>
        )}
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="line-clamp-1 text-xl group-hover:text-primary transition-colors">
          {idea.title}
        </CardTitle>
        <div className="flex items-center text-xs text-muted-foreground gap-3">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {idea.authorName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />{" "}
            {format(new Date(idea.createdAt), "MMMM d, yyyy")}
          </span>
        </div>
      </CardHeader>

      <CardContent className="grow">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {idea.shortDescription}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full group/btn rounded-xl">
          <Link href={`/ideas/${idea._id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

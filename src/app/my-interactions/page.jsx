import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquareQuote, ExternalLink, Clock } from "lucide-react";

import { fetchCommentsByUserId } from "@/lib/comments/data";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { format } from "date-fns";

export const metadata = {
  title: "My Interactions",
  description:
    "View and manage the comments you've participated in across the IdeaVault community.",
};

export default async function MyInteractionsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const interactions = await fetchCommentsByUserId(session?.user.id);

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="space-y-1 mb-10 md:text-start text-center">
        <h1 className="text-4xl font-bold tracking-tight">My Interactions</h1>
        <p className="text-muted-foreground text-lg">
          Manage your feedback and comments across the community.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="font-semibold text-xl">
          Comments {interactions.length > 0 && `(${interactions.length})`}
        </h2>

        {interactions.length > 0 ? (
          interactions.map((interaction) => (
            <Card key={interaction._id} className="overflow-hidden">
              <CardContent className="w-full flex flex-col justify-between">
                {/* Title and action buttons */}
                <div className="flex justify-between items-center mb-2">
                  <div className=" flex items-center gap-4">
                    <p className="sm:inline-block hidden text-xs text-muted-foreground uppercase tracking-wider font-bold whitespace-nowrap">
                      Commented on
                    </p>
                    <Link
                      href={`/ideas/${interaction.ideaId}`}
                      className="font-bold text-sm line-clamp-1 leading-tight"
                    >
                      {interaction.ideaTitle}
                    </Link>
                  </div>

                  {/* Actions Button */}

                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Link href={`/ideas/${interaction.ideaId}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Date */}
                <div className="flex items-center text-xs text-muted-foreground gap-1.5 mb-2">
                  <Clock className="h-3.5 w-3.5" />
                  {format(new Date(interaction.createdAt), "MMMM d, yyyy")}
                </div>
                {/* Comment */}
                <div className="flex gap-3 items-start bg-primary/5 p-4 rounded-xl">
                  <MessageSquareQuote className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {interaction.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-muted/10 rounded-lg border-2 border-dashed">
            <h2 className="text-xl font-semibold mb-2">No interactions yet</h2>
            <p className="text-muted-foreground mb-6 max-w-sm text-center">
              You haven't left any feedback yet. Explore the vault and share
              your thoughts on upcoming startups!
            </p>
            <Button asChild>
              <Link href="/ideas">Explore Ideas</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

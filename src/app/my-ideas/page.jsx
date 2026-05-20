import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import MyIdeaCard from "@/components/my-ideas/MyIdeaCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { fetchIdeasByEmail } from "@/lib/ideas/data";

export const metadata = {
  title: "My Vault",
  description:
    "Manage, refine, and track the engagement of your submitted startup ideas.",
};

export default async function MyIdeasPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const myIdeas = await fetchIdeasByEmail(session?.user?.email);

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight">
            Your Creative Vault
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage, edit, and track engagement for your startup ideas.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="px-8 shadow-lg transition-transform hover:scale-105"
        >
          <Link href="/ideas/create">
            <Plus className="mr-2 h-5 w-5" /> Add New Idea
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {myIdeas.length > 0 ? (
          myIdeas.map((idea) => <MyIdeaCard key={idea._id} idea={idea} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-muted/10 rounded-lg border-2 border-dashed">
            <h2 className="text-xl font-semibold">Your vault is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start your journey by pitching your first big idea.
            </p>
            <Button asChild>
              <Link href="/ideas/create">Create Idea</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

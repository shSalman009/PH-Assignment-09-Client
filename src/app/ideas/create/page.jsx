import CreateIdeaForm from "@/components/createIdea/CreateIdeaForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createIdea } from "@/lib/ideas/actions";

export default function CreateIdeaPage() {
  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <Card className="w-full max-w-3xl shadow-xl border-muted-foreground/10">
        <CardHeader className="justify-center text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">
            Share Your Startup Idea
          </CardTitle>
          <CardDescription>
            Document your innovation properly to attract collaborators and
            feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateIdeaForm createIdeaAction={createIdea} />
        </CardContent>
      </Card>
    </div>
  );
}

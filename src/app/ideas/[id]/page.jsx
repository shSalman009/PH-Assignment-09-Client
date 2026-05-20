import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  User,
  Target,
  DollarSign,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { fetchIdeaById } from "@/lib/ideas/data";
import Image from "next/image";
import CommentSystem from "@/components/ideaDetails/CommentSystem";

export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;
  const idea = await fetchIdeaById(id);

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="space-y-2">
          <Badge className="mb-2">{idea.category}</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {idea.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {idea.authorName}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />{" "}
              {new Date(idea.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Image
          src={idea.imageUrl}
          alt={idea.title}
          className="w-full md:h-[400px] h-64 object-cover rounded-3xl shadow-lg"
          width={1200}
          height={400}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Overview</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {idea.detailedDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-muted/30 border-none">
              <CardContent>
                <div className="flex items-center gap-2 mb-3 text-primary font-bold">
                  <AlertCircle className="h-5 w-5" /> Problem
                </div>
                <p className="text-sm">{idea.problemStatement}</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-none">
              <CardContent>
                <div className="flex items-center gap-2 mb-3 text-primary font-bold">
                  <Lightbulb className="h-5 w-5" /> Solution
                </div>
                <p className="text-sm">{idea.proposedSolution}</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Comment System Component */}
          <CommentSystem ideaId={id} ideaTitle={idea.title} />
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-sm">Target Audience</p>
                  <p className="text-sm text-muted-foreground">
                    {idea.targetAudience}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-semibold text-sm">Estimated Budget</p>
                  <p className="text-sm text-muted-foreground">
                    {idea.estimatedBudget}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <p className="font-semibold text-sm mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {idea.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

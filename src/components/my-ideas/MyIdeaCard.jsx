import { ExternalLink, MessageSquare, Tag } from "lucide-react";
import Link from "next/link";
import { UpdateIdeaModal } from "@/components/my-ideas/UpdateModal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";
import { format } from "date-fns";
import { updateIdea, deleteIdea } from "@/lib/ideas/actions";
import DeleteIdeaButton from "./DeleteIdeaButton";

export default function MyIdeaCard({ idea }) {
  return (
    <div className="group relative flex flex-col md:flex-row items-center gap-6 bg-card border rounded-3xl p-5 transition-all hover:shadow-xl hover:border-primary/20">
      {/* Image */}
      <div className="relative w-full md:w-64 h-44 shrink-0 overflow-hidden rounded-2xl">
        <Image
          width={256}
          height={176}
          src={idea.imageUrl}
          alt={idea.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-md text-foreground border-none">
          {idea.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="grow space-y-3 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold line-clamp-2">{idea.title}</h3>
            <p className="text-sm text-muted-foreground">
              Published on {format(new Date(idea.createdAt), "MMMM d, yyyy")}
            </p>
          </div>

          {/* Actions for Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              asChild
              title="View Public Page"
            >
              <Link href={`/ideas/${idea._id}`}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <UpdateIdeaModal idea={idea} updateIdeaAction={updateIdea} />
            <DeleteIdeaButton idea={idea} deleteIdeaAction={deleteIdea} />
          </div>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed max-w-2xl">
          {idea.shortDescription}
        </p>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            <MessageSquare className="h-3.5 w-3.5" />
            {idea.commentCount} Feedback(s)
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            <Tag className="h-3.5 w-3.5" />
            Active
          </div>
        </div>
      </div>

      {/* Actions for Mobile */}
      <div className="flex md:hidden w-full gap-2 pt-2 border-t">
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/ideas/${idea._id}`}>View</Link>
        </Button>
        <div className="flex gap-2">
          <UpdateIdeaModal idea={idea} updateIdeaAction={updateIdea} />
          <DeleteIdeaButton idea={idea} deleteIdeaAction={deleteIdea} />
        </div>
      </div>
    </div>
  );
}

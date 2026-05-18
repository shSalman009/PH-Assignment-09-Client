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

export function IdeaCard({ idea }) {
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-md border-muted-foreground/10 pt-0">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Image
          width={400}
          height={225}
          src={idea.imageUrl}
          alt={idea.title}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-3 right-3 shadow-sm">
          {idea.category}
        </Badge>
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="line-clamp-1 text-xl">{idea.title}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground gap-3">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {idea.authorName}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />{" "}
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>

      <CardContent className="grow">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {idea.shortDescription}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full group">
          <Link href={`/ideas/${idea._id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

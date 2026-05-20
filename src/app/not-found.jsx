import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost, Home, ChevronLeft } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="space-y-6 text-center">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Ghost className="h-24 w-24 text-muted-foreground/20 animate-bounce" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-foreground/5 rounded-full blur-md" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="text-base text-muted-foreground max-w-100 mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or never existed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button asChild variant="ghost" className="rounded-xl">
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-xl px-8 shadow-lg shadow-primary/20"
          >
            <Link href="/ideas">Browse All Ideas</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

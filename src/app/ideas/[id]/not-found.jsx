import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LightbulbOff, ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Visual Element */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
        <div className="relative bg-background border-2 border-dashed border-muted-foreground/30 p-8 rounded-[2.5rem] shadow-2xl">
          <LightbulbOff className="h-20 w-20 text-muted-foreground/40" />
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md space-y-4">
        <h1 className="text-7xl font-black tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold">This idea hasn't been born yet.</h2>
        <p className="text-muted-foreground">
          The blueprint you're looking for isn't in the vault. It might have
          been moved or deleted.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Button asChild variant="ghost" className="rounded-xl">
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild className="rounded-xl px-8 shadow-lg shadow-primary/20">
          <Link href="/ideas">Browse All Ideas</Link>
        </Button>
      </div>
    </div>
  );
}

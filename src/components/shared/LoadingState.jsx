import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 bg-primary/20 rounded-full blur-xl animate-pulse" />

        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>

      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Accessing the Vault...
      </p>
    </div>
  );
}

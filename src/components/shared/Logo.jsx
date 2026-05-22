import { Lightbulb, Shield } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
      <div className="relative">
        <Shield className="h-8 w-8 text-primary fill-primary/10 transition-transform group-hover:scale-110" />

        <div className="absolute inset-0 flex items-center justify-center -translate-y-px">
          <Lightbulb className="h-4 w-4 text-primary fill-primary/10" />
        </div>
      </div>

      <span className="text-xl font-black tracking-tighter bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        IDEA<span className="text-foreground">VAULT</span>
      </span>
    </Link>
  );
};

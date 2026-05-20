"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-destructive/5 border border-destructive/20 p-12 rounded-[2.5rem] text-center max-w-xl shadow-2xl shadow-destructive/5">
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 bg-destructive/20 blur-2xl rounded-full animate-pulse" />
          <AlertTriangle className="h-16 w-16 text-destructive relative" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Vault Malfunction
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Something went wrong while processing this blueprint. Our systems have
          logged the incident.
          {error.digest && (
            <code className="block mt-2 text-xs bg-muted p-1 rounded font-mono">
              Error ID: {error.digest}
            </code>
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => unstable_retry()}
            size="lg"
            variant="default"
            className="rounded-xl px-8 group w-full sm:w-auto"
          >
            <RefreshCcw className="mr-2 h-4 w-4 transition-transform group-active:rotate-180" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl px-8 w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

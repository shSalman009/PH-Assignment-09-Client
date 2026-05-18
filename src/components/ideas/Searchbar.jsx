"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import React, { useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search ideas..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );

  // handle category filtering
  const handleChangeCategory = (value) => {
    setCategory(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value !== "all") {
      params.set("category", value.toLowerCase());
    } else {
      params.delete("category");
    }

    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={handleChangeCategory}
      defaultValue="all"
      value={category}
    >
      <SelectTrigger className="w-full sm:w-48">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <SelectValue placeholder="Category" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

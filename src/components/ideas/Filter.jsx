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

export default function Filter() {
  const [category, setCategory] = useState("all");
  return (
    <Select onValueChange={(val) => setCategory(val)} defaultValue="all">
      <SelectTrigger className="w-full sm:w-48">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <SelectValue placeholder="Category" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="Tech">Tech</SelectItem>
        <SelectItem value="AI">AI</SelectItem>
        <SelectItem value="Health">Health</SelectItem>
        <SelectItem value="Education">Education</SelectItem>
        <SelectItem value="Fintech">Fintech</SelectItem>
      </SelectContent>
    </Select>
  );
}

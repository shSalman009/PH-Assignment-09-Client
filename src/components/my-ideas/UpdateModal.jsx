"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ideaSchema } from "@/lib/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

export function UpdateIdeaModal({ idea, updateIdeaAction }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: idea.title || "",
      category: idea.category || "",
      shortDescription: idea.shortDescription || "",
      detailedDescription: idea.detailedDescription || "",
      problemStatement: idea.problemStatement || "",
      proposedSolution: idea.proposedSolution || "",
      targetAudience: idea.targetAudience || "",
      imageUrl: idea.imageUrl || "",
      estimatedBudget: idea.estimatedBudget || "",
      tags: idea.tags ? idea.tags.join(", ") : "",
    },
  });

  const [loading, setLoading] = useState(false);

  // Update Idea Handler
  const handleUpdate = async (values) => {
    try {
      setLoading(true);
      const updatedData = {
        ...values,
        tags: values.tags
          ? values.tags.split(",").map((tag) => tag.trim())
          : [],
      };
      const result = await updateIdeaAction(idea._id, updatedData);
      if (result.modifiedCount > 0) {
        toast.success("Idea updated successfully!");
      } else {
        toast.error("Failed to update idea. Please try again.");
      }
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update idea. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-auto pb-0">
        <DialogHeader>
          <DialogTitle>Update Idea</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
          <FieldGroup className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      {...field}
                      placeholder="e.g., GreenFleet Logistics"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Health">Health</SelectItem>
                        <SelectItem value="AI">AI</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Fintech">Fintech</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="shortDescription"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Short Description</FieldLabel>
                  <Input
                    {...field}
                    placeholder="A quick hook to grab attention"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="detailedDescription"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Detailed Description</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Deep dive into your concept..."
                    className="min-h-32"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="problemStatement"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Problem Statement</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="What problem exists?"
                      className="h-28"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="proposedSolution"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Proposed Solution</FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="How does your idea solve it?"
                      className="h-28"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="targetAudience"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Target Audience</FieldLabel>
                    <Input {...field} placeholder="e.g., Solo Entrepreneurs" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="imageUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Image URL</FieldLabel>
                    <Input {...field} placeholder="https://unsplash.com/..." />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="tags"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Tags (Optional)</FieldLabel>
                    <Input {...field} placeholder="SaaS, Eco, Mobile" />
                    <FieldDescription>
                      Separate tags with commas
                    </FieldDescription>
                  </Field>
                )}
              />
              <Controller
                name="estimatedBudget"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Estimated Budget (Optional)</FieldLabel>
                    <Input {...field} placeholder="e.g. $5,000" />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-border/50 p-4 pb-6 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Update Idea"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

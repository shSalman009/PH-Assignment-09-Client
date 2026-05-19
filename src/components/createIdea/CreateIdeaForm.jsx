"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { ideaSchema } from "@/lib/schemas";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function CreateIdeaForm({ createIdeaAction }) {
  // Form setup with validation
  const form = useForm({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      title: "",
      category: "",
      shortDescription: "",
      detailedDescription: "",
      problemStatement: "",
      proposedSolution: "",
      targetAudience: "",
      imageUrl: "",
      estimatedBudget: "",
      tags: "",
    },
  });

  // User session for author info
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = async (values) => {
    setLoading(true);
    const processedData = {
      ...values,
      tags: values.tags ? values.tags.split(",").map((t) => t.trim()) : [],
      authorName: user.name,
      authorEmail: user.email,
      createdAt: new Date().toISOString(),
      commentCount: 0,
      bookmarkCount: 0,
    };

    const result = await createIdeaAction(processedData);

    if (result.acknowledged) {
      toast.success("Idea submitted successfully!");
      form.reset();
    } else {
      toast.error("Failed to submit idea.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldGroup className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Title</FieldLabel>
                <Input {...field} placeholder="e.g., GreenFleet Logistics" />
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
              <Input {...field} placeholder="A quick hook to grab attention" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                <FieldDescription>Separate tags with commas</FieldDescription>
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

      <Button
        type="submit"
        className="w-full h-14 text-xl font-bold bg-primary hover:bg-primary/90"
      >
        {loading ? "Submitting..." : "Submit Idea to Vault"}
      </Button>
    </form>
  );
}

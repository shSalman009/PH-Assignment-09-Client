"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Controller, useForm } from "react-hook-form";
import { updateProfileSchema } from "@/lib/schemas";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function UpdateProfileModal({ currentUser }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: currentUser.name,
      photoUrl: currentUser.image,
    },
  });

  const [loading, setLoading] = useState(false);

  // Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authClient.updateUser(
        {
          name: data.name,
          image: data.photoUrl,
        },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully!");
            setOpen(false);
          },
          onError: (error) => {
            toast.error(`Failed to update profile: ${error?.message}`);
          },
        },
      );
    } catch (error) {
      toast.error(`Failed to update profile: ${error?.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  {...field}
                  placeholder="John Doe"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="photoUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Photo URL</FieldLabel>
                <Input
                  {...field}
                  placeholder="https://example.com/photo.jpg"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

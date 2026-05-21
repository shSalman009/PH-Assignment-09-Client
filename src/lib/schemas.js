import * as z from "zod";

// Registration Form Validation Schema
export const registerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  photoUrl: z.string().url("Invalid URL format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])/,
      "Password must include uppercase and lowercase letters",
    ),
});

// Login Form Validation Schema
export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])/,
      "Password must include uppercase and lowercase letters",
    ),
});

// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  photoUrl: z.string().url("Invalid URL format"),
});

// Idea schema
export const ideaSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  shortDescription: z.string().min(10, "Give a brief summary (min 10 chars)"),
  detailedDescription: z.string().min(50, "Please explain your idea in detail"),
  problemStatement: z.string().min(20, "Explain the problem you're solving"),
  proposedSolution: z.string().min(20, "Explain how your idea fixes it"),
  targetAudience: z.string().min(3, "Who is this for?"),
  imageUrl: z.string().url("Please provide a valid image URL"),
  estimatedBudget: z.string().optional(),
  tags: z.string().optional(),
});

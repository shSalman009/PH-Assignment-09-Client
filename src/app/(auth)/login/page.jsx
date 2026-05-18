"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { loginFormSchema } from "@/lib/schemas";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Sign-in failed. Please try again.");
        },
        onSuccess: (res) => {
          router.push("/");
        },
      },
    );
    setLoading(false);
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="container mx-auto relative flex pt-20 pb-20 items-center justify-center lg:px-0 px-4">
      <Card className="w-full max-w-[450px] shadow-lg border-muted-foreground/10">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Sign in to your account
          </CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="w-full py-6 text-base"
            type="button"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email and password
              </span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="button"
                variant="link"
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Button>
            </FieldGroup>

            <Button
              disabled={loading}
              className="w-full mt-6 py-6 text-lg font-semibold"
              type="submit"
            >
              {loading ? (
                <span className="flex items-center">
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

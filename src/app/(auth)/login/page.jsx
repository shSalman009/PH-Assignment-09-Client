import LoginForm from "@/components/auth/LoginForm";
import React from "react";

export const metadata = {
  title: "Login",
  description: "Login to your IdeaVault account",
};

export default function LoginPage() {
  return <LoginForm />;
}

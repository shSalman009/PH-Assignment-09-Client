import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

export const metadata = {
  title: "Register",
  description: "Create a new IdeaVault account",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

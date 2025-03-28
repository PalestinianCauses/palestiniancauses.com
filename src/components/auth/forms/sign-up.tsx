"use client";

// REVIEWED

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { signUpSchema, SignUpSchema } from "@/lib/schemas/auth";

export const SignUpForm = function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpSchema>({
    mode: "onBlur",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    resolver: zodResolver(signUpSchema),
  });

  return <form />;
};

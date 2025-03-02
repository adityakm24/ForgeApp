"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Mail, Lock, AlertCircle, Sparkles } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type RegisterValuesType = z.infer<typeof registerFormSchema>;

const defaultValues: RegisterValuesType = {
  email: "",
  password: "",
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const form = useForm<RegisterValuesType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });

  async function handleRegister(values: RegisterValuesType) {
    setError(""); // Reset error state
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      ...values,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      setIsLoading(false);
      setError(error.message);
      return;
    }

    toast.success("Verification email sent. Check your mail.");
    router.replace("/email-verify");
    setIsLoading(false);
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-lg">
      {/* Decorative elements */}
      <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute left-1/3 top-1/2 h-full w-full animate-pulse rounded-full bg-secondary/5 blur-3xl"></div>

      <div className="relative z-10 p-8">
        <form onSubmit={form.handleSubmit(handleRegister)} className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="/" className="group flex flex-col items-center gap-2 font-medium">
              <div className="flex items-center gap-1 text-3xl font-bold text-primary">
                Forge
                <Sparkles className="size-4 text-primary" />
              </div>
            </a>
            <h1 className="mt-2 text-xl font-bold text-foreground">Create Your Account</h1>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Login
              </a>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="size-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  className="pl-10 bg-background"
                  placeholder="hello@sarathadhi.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                  className="pl-10 pr-10 bg-background"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="mt-2 w-full bg-primary hover:bg-primary/90">
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline underline-offset-4">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline underline-offset-4">
              Privacy Policy
            </a>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

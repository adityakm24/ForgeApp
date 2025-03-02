"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Authentication callback failed:", error);
        router.push("/login");
      } else {
        router.push("/dashboard"); // Redirect to a protected page
      }
    };

    handleAuthCallback();
  }, [router]);

  return <div>Processing authentication...</div>;
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function handleAuthCallback() {
      try {
        // First check if a session is already present
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback session error:", error);
          if (isMounted) setErrorMsg(error.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }

        if (session) {
          // 1. Set sb-access-token cookie for server middleware
          document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;

          // 2. Ensure profile record exists
          const user = session.user;
          if (user) {
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("id")
              .eq("id", user.id)
              .maybeSingle();

            if (!profile && !profileError) {
              const email = user.email;
              const fullName = user.user_metadata?.full_name || email?.split("@")[0] || "User";
              const businessName = user.user_metadata?.business_name || "My Workspace";
              await supabase.from("profiles").insert({
                id: user.id,
                email: email,
                full_name: fullName,
                business_name: businessName,
              });
            }
          }

          // 3. Hard navigate to /dashboard so server middleware receives cookie
          window.location.href = "/dashboard";
          return;
        }

        // If session not ready yet, listen for auth state change
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (session) {
            document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
            
            const user = session.user;
            if (user) {
              const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("id")
                .eq("id", user.id)
                .maybeSingle();

              if (!profile && !profileError) {
                const email = user.email;
                const fullName = user.user_metadata?.full_name || email?.split("@")[0] || "User";
                const businessName = user.user_metadata?.business_name || "My Workspace";
                await supabase.from("profiles").insert({
                  id: user.id,
                  email: email,
                  full_name: fullName,
                  business_name: businessName,
                });
              }
            }

            window.location.href = "/dashboard";
          }
        });

        // Timeout fallback if no auth event fires
        const timeout = setTimeout(() => {
          if (isMounted) {
            window.location.href = "/login";
          }
        }, 4000);

        return () => {
          subscription.unsubscribe();
          clearTimeout(timeout);
        };
      } catch (err: any) {
        console.error("Auth callback error:", err);
        if (isMounted) setErrorMsg(err?.message || "Failed to process authentication");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    }

    handleAuthCallback();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] font-[Satoshi] p-6 text-center">
      {errorMsg ? (
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-red-600 font-medium">{errorMsg}</p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-700 font-medium">Completing sign in...</p>
        </div>
      )}
    </div>
  );
}

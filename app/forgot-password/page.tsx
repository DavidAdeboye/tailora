"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"request" | "success">("request");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setStep("success");
    } catch (err: any) {
      console.error("Password reset error:", err);
      setErrorMsg(err.message || "Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDFDFD] font-['Satoshi'] px-4 py-8 text-[#121212]">
      <div className="w-full max-w-[440px] bg-white rounded-[24px] border border-[#E2E4E9] p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
        
        <Link href="/login" className="inline-flex items-center text-sm text-[#6C717D] hover:text-[#121212] mb-6 transition-colors">
          ← Back to Login
        </Link>

        {step === "request" ? (
          <>
            <h1 className="font-['Sora'] font-bold text-[28px] leading-[36px] text-[#121212] mb-2">
              Reset Your Password
            </h1>
            <p className="font-['Satoshi'] font-normal text-[14px] text-[#6C717D] mb-6 leading-[22px]">
              Enter the registered email address associated with your Tailora account. We'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleResetRequest} className="flex flex-col gap-4">
              <div>
                <label className="font-['Satoshi'] font-medium text-[14px] text-[#283145] leading-[20px] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. sarah.adeyemi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[44px] bg-[#FFFFFF] border border-[#E2E4E9] rounded-[10px] px-3.5 font-['Inter'] font-normal text-[14px] text-[#525866] outline-none shadow-[0px_1px_2px_rgba(228,229,231,0.24)] focus:border-[#121212] transition-colors"
                />
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[46px] bg-[#121212] text-[#FFFFFF] rounded-full font-['Satoshi'] font-medium text-[14px] hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 mt-2"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-[64px] h-[64px] rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="font-['Sora'] font-bold text-[24px] text-[#121212] mb-2">Check Your Email</h2>
            <p className="font-['Satoshi'] text-[14px] text-[#6C717D] mb-6 leading-[22px]">
              We have sent a password reset link to <strong className="text-[#121212]">{email}</strong>. Please check your inbox and follow the instructions.
            </p>
            <Link
              href="/login"
              className="inline-flex w-full h-[46px] bg-[#121212] text-white rounded-full font-['Satoshi'] font-medium text-[14px] items-center justify-center hover:bg-black transition-all"
            >
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

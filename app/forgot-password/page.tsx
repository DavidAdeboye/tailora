"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send password reset email.");
      }

      setMessage("Password reset link has been sent to your email address.");
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDFDFD] font-['Satoshi'] text-[#121212] px-4">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-[24px] border border-[#E2E4E9] shadow-[0px_4px_16px_rgba(0,0,0,0.06)]">
        <Link
          href="/login"
          className="inline-flex items-center text-sm font-medium text-[#6C717D] hover:text-[#121212] mb-6 transition-colors"
        >
          ← Back to Log In
        </Link>

        <h1 className="font-['Sora'] font-bold text-[28px] leading-[36px] text-[#121212] mb-2">
          Reset Password
        </h1>
        <p className="font-['Satoshi'] font-normal text-[14px] text-[#6C717D] mb-6">
          Enter the email address associated with your account and we&apos;ll send you instructions to reset your password.
        </p>

        {message ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm mb-6">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-[#121212] mb-1.5">
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-[#E2E4E9] rounded-xl text-sm outline-none focus:border-[#121212] transition-colors"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#121212] text-white font-medium rounded-full text-sm hover:bg-black active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {isLoading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

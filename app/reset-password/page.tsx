"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    const hasUpper = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);
    const hasNumOrSpec = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

    if (!hasUpper || !hasLower || !hasNumOrSpec) {
      setErrorMsg("Password must contain upper and lower case letters, and a number or symbol.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      console.error("Failed to update password:", err);
      setErrorMsg(err.message || "Failed to update password. Link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDFDFD] font-['Satoshi'] px-4 py-8 text-[#121212]">
      <div className="w-full max-w-[440px] bg-white rounded-[24px] border border-[#E2E4E9] p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
        
        {success ? (
          <div className="text-center py-4">
            <div className="w-[64px] h-[64px] rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="font-['Sora'] font-bold text-[24px] text-[#121212] mb-2">Password Updated</h2>
            <p className="font-['Satoshi'] text-[14px] text-[#6C717D] mb-6">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full h-[46px] bg-[#121212] text-white rounded-full font-['Satoshi'] font-medium text-[14px] flex items-center justify-center hover:bg-black transition-all"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            <h1 className="font-['Sora'] font-bold text-[28px] leading-[36px] text-[#121212] mb-2">
              Set New Password
            </h1>
            <p className="font-['Satoshi'] font-normal text-[14px] text-[#6C717D] mb-6 leading-[22px]">
              Please create a new secure password for your Tailora account.
            </p>

            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
              <div>
                <label className="font-['Satoshi'] font-medium text-[14px] text-[#283145] leading-[20px] block mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-[44px] bg-[#FFFFFF] border border-[#E2E4E9] rounded-[10px] px-3.5 font-['Inter'] font-normal text-[14px] text-[#525866] outline-none shadow-[0px_1px_2px_rgba(228,229,231,0.24)] focus:border-[#121212] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black text-xs font-medium"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="font-['Satoshi'] font-medium text-[14px] text-[#283145] leading-[20px] block mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? "Updating Password..." : "Update Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}

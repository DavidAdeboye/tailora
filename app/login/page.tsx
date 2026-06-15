"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from '../../lib/supabase';

interface Slide {
  img: string;
  title: string;
  desc: string;
}

interface SigninFormData {
  email: string;
  password: string;
}

const slides: Slide[] = [
  {
    img: "/Slide1.png",
    title: "Accurate Measurement Recording",
    desc: "Organize and manage client measurements in a secure workspace built for accuracy, efficiency, and seamless collaboration.",
  },
  {
    img: "/Slide2.png",
    title: "Track Collection & Delivery Dates",
    desc: "Set clear fabric deadlines to stay organized, manage tasks efficiently, and always deliver orders on time.",
  },
  {
    img: "/slide3.png",
    title: "Team Workspace Collaboration",
    desc: "Invite teammates, assign responsibilities, and collaborate efficiently to manage orders and workflow together seamlessly.",
  },
];

const SIGNIN_STEPS = 2;

// ── Carousel Panel (shared) ──────────────────────────────────

function CarouselPanel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused]);

  return (
    <div className="absolute inset-0 z-0 lg:relative lg:flex lg:w-[589px] lg:flex-shrink-0 lg:py-2 lg:pl-2">
      <div
        className="relative w-full h-full lg:h-[100vh] overflow-hidden lg:rounded-[24px] lg:border-[6px] lg:border-white lg:shadow-[0_0_50px_rgba(0,0,0,0.25)] bg-[#1A1A1A]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Image
          src={slides[currentSlide].img}
          alt={slides[currentSlide].title}
          fill
          className="object-cover transition-opacity duration-700"
          priority
          key={slides[currentSlide].img}
        />

        {/* Mobile: bottom-only gradient — image stays bright at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent lg:hidden" />

        {/* Exact Figma Gradient for Desktop */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent h-[652px] mt-auto" />

        {/* Mobile: bottom | Desktop: bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 lg:px-10 lg:pb-10 lg:pt-16 flex flex-col gap-4 text-white z-10">
          {/* Carousel indicators — centered on mobile, left on desktop */}
          <div className="bg-white/80 backdrop-blur-md shadow-[0px_0px_2px_rgba(0,0,0,0.04)] rounded-[4px] px-1.5 py-1 inline-flex gap-1 w-max mb-2 self-center lg:self-start">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentSlide ? "w-[43px] bg-[#121212]" : "w-4 bg-[#FDF6EC]"
                }`}
              />
            ))}
          </div>
          <h2 className="font-['Sora'] font-extrabold text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] text-center lg:text-left">
            {slides[currentSlide].title}
          </h2>
          <p className="font-['Satoshi'] font-normal text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px] text-white/95 lg:text-white text-center lg:text-left">
            {slides[currentSlide].desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────

export default function SigninPage() {
  const router = useRouter();

  // Signin state
  const [signinStep, setSigninStep] = useState(1);
  const [signinData, setSigninData] = useState<SigninFormData>({ email: "", password: "" });
  const [signinDone, setSigninDone] = useState(false);

  // Auth state
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signinData.email,
        password: signinData.password,
      });

      if (error) throw error;

      // Successful sign in
      setSigninDone(true);
      setIsLoading(false);
    } catch (error: any) {
      setAuthError(error.message || "Failed to sign in");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      // On success, Supabase redirects to Google then back to redirectTo.
      // No need to setIsGoogleLoading(false) here — page will navigate away.
    } catch (error: any) {
      setAuthError(error.message || "Failed to sign in with Google");
      setIsGoogleLoading(false);
    }
  };

  // ── Signin success screen ──
  if (signinDone) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDFDFD] px-6">
        <div className="flex flex-col items-center text-center w-full max-w-sm">
          <div className="w-[72px] h-[72px] rounded-full bg-green-500 flex items-center justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18L15 25L28 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-[32px] font-['Sora'] font-bold mb-6 text-[#121212]">Sign In Successful</h2>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full h-[46px] bg-[#121212] text-white rounded-full text-[14px] font-['Satoshi'] font-medium hover:bg-black active:scale-[0.98] transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    );
  }

  const step = signinStep;
  const totalSteps = SIGNIN_STEPS;

  const goBack = () => {
    if (signinStep > 1) setSigninStep((s) => s - 1);
  };

  const showBackButton = step > 1;

  const pageTitle = "Welcome Back";

  return (
    <main className="flex min-h-screen bg-[#FDFDFD] font-['Satoshi'] text-[#121212] relative">
      <CarouselPanel />

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 flex-col relative min-h-screen z-10 pointer-events-none">

        {/* ── "Don't have an account?" ──
             Mobile: centered pill at top of panel
             Desktop: absolute top-right text link
        */}
        <div className="flex justify-center pt-[calc(env(safe-area-inset-top)+64px)] lg:absolute lg:top-[60px] lg:right-[100px] lg:pt-0 pointer-events-auto">
          {/* Mobile pill */}
          <div className="flex lg:hidden items-center gap-2 bg-white/40 border border-white/60 backdrop-blur-[50px] rounded-full px-4 py-2.5">
            <span className="font-['Satoshi'] font-normal text-[14px] text-white tracking-[-0.006em]">
              Don't have an account?
            </span>
            <Link
              href="/signup"
              className="font-['Satoshi'] font-bold text-[14px] text-white tracking-[-0.006em]"
            >
              Sign up
            </Link>
          </div>
          {/* Desktop text link */}
          <div className="hidden lg:flex gap-1.5 items-center">
            <span className="font-['Satoshi'] font-normal text-[16px] text-[#6C717D]">
              Don't have an account?
            </span>
            <Link
              href="/signup"
              className="font-['Satoshi'] font-medium text-[14px] text-[#121212] tracking-[-0.006em] hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Form Wrapper */}
        <div className="flex flex-1 flex-col justify-start pt-6 pb-10 lg:justify-center lg:pt-0 lg:pb-0 px-5 lg:px-0 lg:items-start lg:pl-16 xl:pl-24">
          {/* Mobile: solid white card | Desktop: transparent */}
          <div className="w-full max-w-[440px] mx-auto lg:mx-0 flex flex-col pointer-events-auto bg-white lg:bg-transparent py-6 px-4 lg:p-0 rounded-[24px] lg:rounded-none shadow-[0px_0px_4px_rgba(0,0,0,0.08)] lg:shadow-none border-0">

            {showBackButton && (
              <button
                onClick={goBack}
                aria-label="Go back"
                className="mb-4 text-2xl leading-none text-black hover:opacity-60 transition-opacity self-start"
              >
                ←
              </button>
            )}

            {/* Progress bar */}
            <div className="flex flex-col gap-3 mb-6 w-full">
              <span className="font-['Satoshi'] font-medium text-[14px] text-[#595653] text-right w-full">
                {step} of {totalSteps}
              </span>
              <div className="w-full h-1 bg-[#FDF6EC] rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-[#090909] rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <h1 className="font-['Sora'] font-bold text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] text-[#121212] mb-6">
              {pageTitle}
            </h1>

            {/* ── SIGNIN STEPS ── */}
            <div className="flex flex-col gap-6">
              {signinStep === 1 && (
                <>
                  <GoogleButton onClick={handleGoogleSignIn} disabled={isGoogleLoading}>
                    {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                  </GoogleButton>

                  <OrDivider />

                  {authError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {authError}
                    </div>
                  )}

                  <div>
                    <FieldLabel>Email Address</FieldLabel>
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={signinData.email}
                      onChange={(e) => setSigninData((p) => ({ ...p, email: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") setSigninStep(2); }}
                      className={inputCls}
                    />
                  </div>
                  <PrimaryButton onClick={() => setSigninStep(2)}>Continue</PrimaryButton>
                  <p className="font-['Satoshi'] font-medium text-[14px] leading-[20px] text-[#595653]">
                    By continuing, you agree to the{" "}
                    <strong className="text-[#121212] font-medium">
                      General Terms of Use &amp; Privacy Policy
                    </strong>{" "}
                    of Taliora
                  </p>
                </>
              )}

              {signinStep === 2 && (
                <>
                  <div>
                    <FieldLabel>Password</FieldLabel>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={signinData.password}
                      onChange={(e) => setSigninData((p) => ({ ...p, password: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSignIn(); }}
                      className={inputCls}
                    />
                  </div>
                  {authError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                      {authError}
                    </div>
                  )}
                  <PrimaryButton onClick={() => handleSignIn()} disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </PrimaryButton>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

// ── Micro-components ──────────────────────────────────────────

const inputCls =
  "w-full h-[40px] bg-[#FFFFFF] border border-[#E2E4E9] rounded-[10px] px-3 font-['Inter'] font-normal text-[14px] text-[#525866] tracking-[-0.006em] outline-none shadow-[0px_1px_2px_rgba(228,229,231,0.24)] focus:border-[#121212] transition-colors mt-1";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-['Satoshi'] font-medium text-[14px] text-[#283145] leading-[20px] block">
      {children}
    </label>
  );
}

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-[46px] bg-[#121212] text-[#FFFFFF] rounded-full font-['Satoshi'] font-medium text-[14px] leading-[20px] hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

function GoogleButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="w-full h-[46px] bg-white text-[#121212] border border-[#E2E4E9] rounded-full font-['Satoshi'] font-medium text-[14px] leading-[20px] hover:bg-[#F9FAFB] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.616z" fill="#4285F4"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
        <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" fill="#EA4335"/>
      </svg>
      {children}
    </button>
  );
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-[#E2E4E9]" />
      <span className="font-['Satoshi'] text-[13px] text-[#9CA3AF]">or</span>
      <div className="flex-1 h-px bg-[#E2E4E9]" />
    </div>
  );
}
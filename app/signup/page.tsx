"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Slide {
  img: string;
  title: string;
  desc: string;
}

interface FormData {
  fullName: string;
  businessName: string;
  email: string;
  password: string;
}

const slides: Slide[] = [
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    title: "Accurate Measurement Recording",
    desc: "Organize and manage client measurements in a secure workspace built for accuracy, efficiency, and seamless collaboration.",
  },
  {
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80",
    title: "Track Collection & Delivery Dates",
    desc: "Set clear fabric deadlines to stay organized, manage tasks efficiently, and always deliver orders on time.",
  },
  {
    img: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=900&q=80",
    title: "Team Workspace Collaboration",
    desc: "Invite teammates, assign responsibilities, and collaborate efficiently to manage orders and workflow together seamlessly.",
  },
];

const slideMap: Record<number, number> = { 1: 0, 2: 1, 3: 2, 4: 0, 5: 2 };

const TOTAL_STEPS = 4;

export default function SignupPage() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    businessName: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [done, setDone] = useState<boolean>(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const slideIndex = slideMap[step] ?? 0;
  const slide = slides[slideIndex];

  const handleFormChange =
    (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleOtpChange = (val: string, i: number): void => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    i: number
  ): void => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const goNext = (): void => {
    if (step < 5) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  };

  const goBack = (): void => {
    if (step > 1) setStep((s) => s - 1);
  };

  // ── Success screen ──────────────────────────────────────────
  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white font-sans">
        <div className="flex flex-col items-center text-center max-w-sm px-6">
          <div className="w-[72px] h-[72px] rounded-full bg-green-500 flex items-center justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M8 18L15 25L28 11"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign Up Successful</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Your account has been created successfully. Let&apos;s get started.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-72 py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    );
  }

  // ── Main layout ─────────────────────────────────────────────
  return (
    <main className="flex min-h-screen bg-white font-sans text-black">
      {/* LEFT PANEL */}
      <div className="relative w-[40%] min-h-screen flex-shrink-0 overflow-hidden rounded-[16px]">
        <Image
          src={slide.img}
          alt={slide.title}
          fill
          className="object-cover"
          priority
          key={slide.img}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          {/* Slide dots */}
          <div className="flex gap-1.5 mb-4">
            {slides.map((_, i) => (
              <div
                key={i}
                className="h-[5px] rounded-full bg-white transition-all duration-300"
                style={{
                  width: i === slideIndex ? 28 : 12,
                  opacity: i === slideIndex ? 1 : 0.4,
                }}
              />
            ))}
          </div>
          <h2 className="text-xl font-bold leading-snug mb-2">{slide.title}</h2>
          <p className="text-sm leading-relaxed text-white/80">{slide.desc}</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 flex-col px-14 py-7">
        {/* Top bar */}
        <div className="flex justify-end text-sm text-gray-500">
          Already have an account?&nbsp;
          <Link href="/login" className="font-bold text-black">
            Log in
          </Link>
        </div>

        {/* Form area */}
        <div className="flex flex-1 flex-col justify-center max-w-sm pt-12 pb-12">
          {/* Back button */}
          {step > 1 && (
            <button
              onClick={goBack}
              aria-label="Go back"
              className="mb-4 self-start text-xl leading-none text-black hover:opacity-60 transition-opacity"
            >
              ←
            </button>
          )}

          {/* Progress */}
          {step <= TOTAL_STEPS && (
            <>
              <p className="text-right text-xs text-gray-400 mb-2">
                {step} of {TOTAL_STEPS}
              </p>
              <div className="h-[3px] w-full rounded-full bg-gray-100 mb-7 overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </>
          )}

          <h1 className="text-3xl font-bold mb-7 leading-tight">
            {step === 5 ? "Verification" : "Create An Account"}
          </h1>

          {/* ── Step 1: Full Name ── */}
          {step === 1 && (
            <>
              <label className="text-xs text-gray-600 mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your First and Last name"
                value={formData.fullName}
                onChange={handleFormChange("fullName")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors mb-5"
              />
              <button
                onClick={goNext}
                className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors mb-4"
              >
                Continue
              </button>
              <TermsText />
            </>
          )}

          {/* ── Step 2: Business Name ── */}
          {step === 2 && (
            <>
              <label className="text-xs text-gray-600 mb-2 block">
                Business Name
              </label>
              <input
                type="text"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={handleFormChange("businessName")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors mb-5"
              />
              <button
                onClick={goNext}
                className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors mb-4"
              >
                Continue
              </button>
              <TermsText />
            </>
          )}

          {/* ── Step 3: Email ── */}
          {step === 3 && (
            <>
              <label className="text-xs text-gray-600 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleFormChange("email")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors mb-5"
              />
              <button
                onClick={goNext}
                className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors mb-4"
              >
                Continue
              </button>
              <TermsText />
            </>
          )}

          {/* ── Step 4: Password ── */}
          {step === 4 && (
            <>
              <label className="text-xs text-gray-600 mb-2 block">
                Create Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleFormChange("password")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors mb-5"
              />
              <button
                onClick={goNext}
                className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors mb-4"
              >
                Continue
              </button>
              <TermsText />
            </>
          )}

          {/* ── Step 5: OTP ── */}
          {step === 5 && (
            <>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                Enter the 6-digit code sent to your phone:{" "}
                <strong className="text-black">+08000000000</strong> via SMS
              </p>
              <div className="flex gap-2.5 mb-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleOtpChange(e.target.value, i)
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                      handleOtpKeyDown(e, i)
                    }
                    className="w-12 h-14 border rounded-xl text-center text-xl font-semibold outline-none transition-colors"
                    style={{ borderColor: digit ? "#111" : "#ddd" }}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400 mb-6">
                Click{" "}
                <a href="#" className="text-black underline">
                  here
                </a>{" "}
                to resend OTP (58s)
              </p>
              <button
                onClick={goNext}
                className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-colors"
              >
                Verify
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function TermsText() {
  return (
    <p className="text-xs text-gray-400 leading-relaxed">
      By continuing, you agree to the{" "}
      <strong className="text-black">
        General Terms of Use &amp; Privacy Policy
      </strong>{" "}
      of Taliora
    </p>
  );
}
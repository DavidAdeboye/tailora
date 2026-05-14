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

// Using Pexels images — tailor/fashion/sewing specific
const slides: Slide[] = [
  {
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Accurate Measurement Recording",
    desc: "Organize and manage client measurements in a secure workspace built for accuracy, efficiency, and seamless collaboration.",
  },
  {
    img: "https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg?auto=compress&cs=tinysrgb&w=900",
    title: "Track Collection & Delivery Dates",
    desc: "Set clear fabric deadlines to stay organized, manage tasks efficiently, and always deliver orders on time.",
  },
  {
    img: "https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg?auto=compress&cs=tinysrgb&w=900",
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

  const handleOtpKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number): void => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const goNext = (): void => {
    if (step < 5) setStep((s) => s + 1);
    else setDone(true);
  };

  const goBack = (): void => {
    if (step > 1) setStep((s) => s - 1);
  };

  // ── Success ───────────────────────────────────────────────────
  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="flex flex-col items-center text-center w-full max-w-sm">
          <div className="w-[72px] h-[72px] rounded-full bg-green-500 flex items-center justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18L15 25L28 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign Up Successful</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            Your account has been created successfully. Let&apos;s get started.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen bg-white text-black font-sans">

      {/* ── DESKTOP LEFT PANEL ── */}
      <div className="hidden md:block relative w-[40%] min-h-screen flex-shrink-0 overflow-hidden">
        <Image
          src={slide.img}
          alt={slide.title}
          fill
          className="object-cover"
          priority
          key={slide.img}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex gap-1.5 mb-4">
            {slides.map((_, i) => (
              <div
                key={i}
                className="h-[5px] rounded-full bg-white transition-all duration-300"
                style={{ width: i === slideIndex ? 28 : 12, opacity: i === slideIndex ? 1 : 0.4 }}
              />
            ))}
          </div>
          <h2 className="text-xl font-bold leading-snug mb-2">{slide.title}</h2>
          <p className="text-sm leading-relaxed text-white/80">{slide.desc}</p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex flex-1 flex-col">

        {/* ── MOBILE LAYOUT ── */}
        <div className="md:hidden flex flex-col min-h-screen">

          {/* Full-screen image with form overlaid at bottom */}
          <div className="relative flex flex-col min-h-screen">

            {/* Background image — full screen */}
            <div className="absolute inset-0">
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority
                key={slide.img + "-m"}
              />
              {/* Strong bottom-heavy gradient so form is readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent" style={{ background: "linear-gradient(to top, #ffffff 55%, rgba(255,255,255,0.5) 72%, transparent 100%)" }} />
            </div>

            {/* Login — floated over image */}
            <div className="relative z-10 flex justify-end px-5 pt-5">
              <span className="text-xs text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                Have an account?{" "}
                <Link href="/login" className="font-bold text-white underline underline-offset-2">
                  Log in
                </Link>
              </span>
            </div>

            {/* Slide caption — overlaid on image */}
            <div className="relative z-10 mt-auto px-5 pb-2 pt-32">
              <div className="flex gap-1.5 mb-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className="h-[4px] rounded-full bg-black/30 transition-all duration-300"
                    style={{ width: i === slideIndex ? 22 : 8, backgroundColor: i === slideIndex ? "#111" : "#d1d5db" }}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-500 mb-0">{slide.title}</p>
            </div>

            {/* Form card — sits at the bottom over the white gradient */}
            <div className="relative z-10 bg-white px-5 pt-6 pb-10">

              {step > 1 && (
                <button
                  onClick={goBack}
                  aria-label="Go back"
                  className="mb-4 text-lg leading-none text-black hover:opacity-60 active:opacity-40 transition-opacity block"
                >
                  ←
                </button>
              )}

              {step <= TOTAL_STEPS && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-[3px] flex-1 rounded-full bg-gray-100 overflow-hidden mr-3">
                      <div
                        className="h-full bg-black rounded-full transition-all duration-500"
                        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{step} of {TOTAL_STEPS}</span>
                  </div>
                </>
              )}

              <h1 className="text-2xl font-bold mt-4 mb-6 leading-tight">
                {step === 5 ? "Verification" : "Create An Account"}
              </h1>

              <StepFields
                step={step}
                formData={formData}
                otp={otp}
                otpRefs={otpRefs}
                handleFormChange={handleFormChange}
                handleOtpChange={handleOtpChange}
                handleOtpKeyDown={handleOtpKeyDown}
                goNext={goNext}
              />
            </div>
          </div>
        </div>

        {/* ── DESKTOP RIGHT CONTENT ── */}
        <div className="hidden md:flex flex-col flex-1">
          <div className="flex justify-end px-14 py-7 text-sm text-gray-500">
            Already have an account?&nbsp;
            <Link href="/login" className="font-bold text-black">Log in</Link>
          </div>
          <div className="flex flex-1 flex-col justify-center px-14 pb-12">
            <div className="w-full max-w-sm">
              {step > 1 && (
                <button
                  onClick={goBack}
                  aria-label="Go back"
                  className="mb-4 text-xl leading-none text-black hover:opacity-60 transition-opacity block"
                >
                  ←
                </button>
              )}
              {step <= TOTAL_STEPS && (
                <>
                  <p className="text-right text-xs text-gray-400 mb-2">{step} of {TOTAL_STEPS}</p>
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
              <StepFields
                step={step}
                formData={formData}
                otp={otp}
                otpRefs={otpRefs}
                handleFormChange={handleFormChange}
                handleOtpChange={handleOtpChange}
                handleOtpKeyDown={handleOtpKeyDown}
                goNext={goNext}
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

// ── Step fields — shared between mobile & desktop ─────────────

interface StepFieldsProps {
  step: number;
  formData: FormData;
  otp: string[];
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleFormChange: (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleOtpChange: (val: string, i: number) => void;
  handleOtpKeyDown: (e: KeyboardEvent<HTMLInputElement>, i: number) => void;
  goNext: () => void;
}

function StepFields({
  step, formData, otp, otpRefs,
  handleFormChange, handleOtpChange, handleOtpKeyDown, goNext,
}: StepFieldsProps) {
  return (
    <>
      {step === 1 && (
        <>
          <FieldLabel>Full Name</FieldLabel>
          <input type="text" placeholder="Your First and Last name" value={formData.fullName} onChange={handleFormChange("fullName")} className={inputCls} />
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 2 && (
        <>
          <FieldLabel>Business Name</FieldLabel>
          <input type="text" placeholder="Your Business Name" value={formData.businessName} onChange={handleFormChange("businessName")} className={inputCls} />
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 3 && (
        <>
          <FieldLabel>Email Address</FieldLabel>
          <input type="email" placeholder="Your Email Address" value={formData.email} onChange={handleFormChange("email")} className={inputCls} />
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 4 && (
        <>
          <FieldLabel>Create Password</FieldLabel>
          <input type="password" placeholder="Enter Password" value={formData.password} onChange={handleFormChange("password")} className={inputCls} />
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 5 && (
        <>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            Enter the 6-digit code sent to your phone: <strong className="text-black">+08000000000</strong> via SMS
          </p>
          <div className="flex gap-2 mb-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { otpRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleOtpKeyDown(e, i)}
                className="flex-1 min-w-0 h-14 border rounded-xl text-center text-xl font-semibold outline-none transition-colors focus:border-black"
                style={{ borderColor: digit ? "#111" : "#e5e7eb" }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-6">
            Click <a href="#" className="text-black underline underline-offset-2">here</a> to resend OTP (58s)
          </p>
          <PrimaryButton onClick={goNext}>Verify</PrimaryButton>
        </>
      )}
    </>
  );
}

// ── Micro-components ──────────────────────────────────────────

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors mb-5 bg-white";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-xs text-gray-600 mb-2 block">{children}</label>;
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-neutral-800 active:scale-[0.98] transition-all mb-4"
    >
      {children}
    </button>
  );
}

function TermsText() {
  return (
    <p className="text-xs text-gray-400 leading-relaxed">
      By continuing, you agree to the{" "}
      <strong className="text-black">General Terms of Use &amp; Privacy Policy</strong> of Taliora
    </p>
  );
}
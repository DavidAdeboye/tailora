"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent, useEffect } from "react";
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
  const [countdown, setCountdown] = useState(58);

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const slideIndex = slideMap[step] ?? 0;
  const slide = slides[slideIndex];

  // Auto-play slideshow
  useEffect(() => {
    if (!isPaused) {
      slideshowIntervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    };
  }, [isPaused]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

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
    if (val && i === 5 && otp.every(d => d !== "")) {
      setDone(true);
    }
  };

  const handleOtpKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number): void => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
    if (e.key === "Enter" && otp.every(d => d !== "")) {
      setDone(true);
    }
  };

  const goNext = (): void => {
    if (step < 5) setStep((s) => s + 1);
    else setDone(true);
  };

  const goBack = (): void => {
    if (step > 1) setStep((s) => s - 1);
  };

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDFDFD] px-6">
        <div className="flex flex-col items-center text-center w-full max-w-sm">
          <div className="w-[72px] h-[72px] rounded-full bg-green-500 flex items-center justify-center mb-6">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 18L15 25L28 11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="text-[32px] font-['Sora'] font-bold mb-2 text-[#121212]">Sign Up Successful</h2>
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

  return (
    <main className="flex min-h-screen bg-[#FDFDFD] font-['Satoshi'] text-[#121212] relative">

      {/* ── CAROUSEL PANEL (Background on Mobile, Left Panel on Desktop) ── */}
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
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentSlide ? "w-[43px] bg-[#121212]" : "w-4 bg-[#FDF6EC]"
                  }`}
                  onClick={() => goToSlide(i)}
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

      {/* ── RIGHT PANEL (FORM CONTAINER) ── */}
      <div className="flex flex-1 flex-col relative min-h-screen z-10 pointer-events-none">

        {/* ── "Already have an account?" ──
             Mobile: centered pill at top of panel
             Desktop: absolute top-right text link
        */}
        <div className="flex justify-center pt-[calc(env(safe-area-inset-top)+64px)] lg:absolute lg:top-[60px] lg:right-[100px] lg:pt-0 pointer-events-auto">
          {/* Mobile pill */}
          <div className="flex lg:hidden items-center gap-2 bg-white/40 border border-white/60 backdrop-blur-[50px] rounded-full px-4 py-2.5">
            <span className="font-['Satoshi'] font-normal text-[14px] text-white tracking-[-0.006em]">
              Already have an account?
            </span>
            <Link
              href="/login"
              className="font-['Satoshi'] font-bold text-[14px] text-white tracking-[-0.006em]"
            >
              Log in
            </Link>
          </div>
          {/* Desktop text link */}
          <div className="hidden lg:flex gap-1.5 items-center">
            <span className="font-['Satoshi'] font-normal text-[16px] text-[#6C717D]">
              Already have an account ?
            </span>
            <Link
              href="/login"
              className="font-['Satoshi'] font-medium text-[14px] text-[#121212] tracking-[-0.006em] hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Form Wrapper */}
        <div className="flex flex-1 flex-col justify-start pt-6 pb-10 lg:justify-center lg:pt-0 lg:pb-0 px-5 lg:px-0 lg:items-start lg:pl-16 xl:pl-24">
          {/* Mobile: solid white card | Desktop: transparent */}
          <div className="w-full max-w-[440px] mx-auto lg:mx-0 flex flex-col pointer-events-auto bg-white lg:bg-transparent py-6 px-4 lg:p-0 rounded-[24px] lg:rounded-none shadow-[0px_0px_4px_rgba(0,0,0,0.08)] lg:shadow-none border-0">

            {step > 1 && (
              <button
                onClick={goBack}
                aria-label="Go back"
                className="mb-4 text-2xl leading-none text-black hover:opacity-60 transition-opacity self-start"
              >
                ←
              </button>
            )}

            {step <= TOTAL_STEPS && (
              <div className="flex flex-col gap-3 mb-6 w-full">
                <span className="font-['Satoshi'] font-medium text-[14px] text-[#595653] text-right w-full">
                  {step} of {TOTAL_STEPS}
                </span>
                {/* Progress bar */}
                <div className="w-full h-1 bg-[#FDF6EC] rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-[#090909] rounded-full transition-all duration-300"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <h1 className="font-['Sora'] font-bold text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] text-[#121212] mb-6">
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
              countdown={countdown}
              onResend={() => setCountdown(58)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Step fields ─────────────

interface StepFieldsProps {
  step: number;
  formData: FormData;
  otp: string[];
  otpRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleFormChange: (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => void;
  handleOtpChange: (val: string, i: number) => void;
  handleOtpKeyDown: (e: KeyboardEvent<HTMLInputElement>, i: number) => void;
  goNext: () => void;
  countdown: number;
  onResend: () => void;
}

function StepFields({
  step, formData, otp, otpRefs,
  handleFormChange, handleOtpChange, handleOtpKeyDown, goNext, countdown, onResend,
}: StepFieldsProps) {
  return (
    <div className="flex flex-col gap-6">
      {step === 1 && (
        <>
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <input type="text" placeholder="Your First and Last name" value={formData.fullName} onChange={handleFormChange("fullName")} onKeyDown={(e) => { if (e.key === "Enter") goNext(); }} className={inputCls} />
          </div>
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 2 && (
        <>
          <div>
            <FieldLabel>Business Name</FieldLabel>
            <input type="text" placeholder="Your Business Name" value={formData.businessName} onChange={handleFormChange("businessName")} onKeyDown={(e) => { if (e.key === "Enter") goNext(); }} className={inputCls} />
          </div>
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 3 && (
        <>
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <input type="email" placeholder="Your Email Address" value={formData.email} onChange={handleFormChange("email")} onKeyDown={(e) => { if (e.key === "Enter") goNext(); }} className={inputCls} />
          </div>
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 4 && (
        <>
          <div>
            <FieldLabel>Create Password</FieldLabel>
            <input type="password" placeholder="Enter Password" value={formData.password} onChange={handleFormChange("password")} onKeyDown={(e) => { if (e.key === "Enter") goNext(); }} className={inputCls} />
          </div>
          <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
          <TermsText />
        </>
      )}
      {step === 5 && (
        <div className="flex flex-col">
          <p className="font-['Satoshi'] text-[15px] text-[#595653] leading-relaxed mb-5">
            Enter the 6-digit code sent to your email address: <br className="hidden sm:block" />
            <strong className="text-[#121212] font-semibold tracking-wide">{formData.email}</strong> via Email
          </p>

          <div className="grid grid-cols-6 gap-2 mb-5">
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
                className="w-full h-[48px] border rounded-[10px] text-center text-xl font-semibold outline-none transition-all focus:border-[#121212] bg-white"
                style={{ borderColor: digit ? "#121212" : "#E2E4E9" }}
              />
            ))}
          </div>

          <p className="font-['Satoshi'] text-[14px] text-[#595653] mb-2">
            Didn't receive it?{" "}
            <button
              onClick={onResend}
              disabled={countdown > 0}
              className={`text-[#121212] font-semibold underline underline-offset-2 transition-opacity ${countdown > 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-70'}`}
            >
              Resend
            </button>
            {" "}{countdown > 0 ? `(${countdown}s)` : ''}
          </p>

          <PrimaryButton onClick={goNext}>Verify</PrimaryButton>
        </div>
      )}
    </div>
  );
}

// ── Micro-components ──────────────────────────────────────────

const inputCls =
  "w-full h-[40px] bg-[#FFFFFF] border border-[#E2E4E9] rounded-[10px] px-3 font-['Inter'] font-normal text-[14px] text-[#525866] tracking-[-0.006em] outline-none shadow-[0px_1px_2px_rgba(228,229,231,0.24)] focus:border-[#121212] transition-colors mt-1";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="font-['Satoshi'] font-medium text-[14px] text-[#283145] leading-[20px] block">{children}</label>;
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[46px] bg-[#121212] text-[#FFFFFF] rounded-full font-['Satoshi'] font-medium text-[14px] leading-[20px] hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center mt-2"
    >
      {children}
    </button>
  );
}

function TermsText() {
  return (
    <p className="font-['Satoshi'] font-medium text-[14px] leading-[20px] text-[#595653]">
      By continuing, you agree to the{" "}
      <strong className="text-[#121212] font-medium">General Terms of Use &amp; Privacy Policy</strong> of Taliora
    </p>
  );
}
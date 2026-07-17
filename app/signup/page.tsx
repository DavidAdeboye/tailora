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

  // OTP verification added — now 5 steps
  const TOTAL_STEPS = 5;

  export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
      fullName: "",
      businessName: "",
      email: "",
      password: "",
    });
    const [otpVals, setOtpVals] = useState<string[]>(Array(6).fill(""));
    const [cooldown, setCooldown] = useState<number>(0);
    const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const [done, setDone] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    // Invitation states
    const [invitationToken, setInvitationToken] = useState<string | null>(null);
    const [invitationData, setInvitationData] = useState<{ invited_by: string; email: string; role: string } | null>(null);
    const [inviteError, setInviteError] = useState<string | null>(null);

    // Slideshow state
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const slideshowIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Validate invite token on mount
    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");
      if (token) {
        setInvitationToken(token);
        
        const fetchInvitation = async () => {
          try {
            const { data, error } = await supabase
              .from('invitations')
              .select('*')
              .eq('token', token)
              .single();
              
            if (error || !data) {
              setInviteError("Invalid or expired invitation link.");
              return;
            }
            
            // Fetch inviter's business name
            const { data: inviterProfile } = await supabase
              .from('profiles')
              .select('business_name')
              .eq('id', data.invited_by)
              .single();
            
            setInvitationData({
              invited_by: data.invited_by,
              email: data.email,
              role: data.role
            });
            
            setFormData(p => ({
              ...p,
              email: data.email,
              businessName: inviterProfile?.business_name || "Workspace Member"
            }));
          } catch (err) {
            console.error("Failed to load invitation:", err);
            setInviteError("Failed to load invitation details.");
          }
        };
        fetchInvitation();
      }
    }, []);

    // Auto-play slideshow
    useEffect(() => {
      if (!isPaused) {
        slideshowIntervalRef.current = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
      }
      return () => {
        if (slideshowIntervalRef.current) clearInterval(slideshowIntervalRef.current);
      };
    }, [isPaused]);

    // OTP cooldown timer
    useEffect(() => {
      if (cooldown > 0) {
        const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
        return () => clearTimeout(timer);
      }
    }, [cooldown]);

    const handleFormChange =
      (field: keyof FormData) =>
      (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      };

    const goNext = async (): Promise<void> => {
      if (step === 1) {
        if (!formData.fullName.trim()) {
          setAuthError("Full name is required.");
          return;
        }
        setAuthError(null);
        setStep(2);
      } else if (step === 2) {
        if (!formData.businessName.trim()) {
          setAuthError("Business name is required.");
          return;
        }
        setAuthError(null);
        setStep(3);
      } else if (step === 3) {
        if (!formData.email.trim() || !formData.email.includes("@")) {
          setAuthError("A valid email address is required.");
          return;
        }
        setAuthError(null);
        setStep(4);
      } else if (step === 4) {
        if (!formData.password || formData.password.length < 6) {
          setAuthError("Password must be at least 6 characters.");
          return;
        }
        setAuthError(null);
        await handleSendOtp();
      } else if (step === 5) {
        await handleVerifyAndSignUp();
      }
    };

    const goBack = (): void => {
      if (step > 1) {
        setAuthError(null);
        setStep((s) => s - 1);
      }
    };

    const handleSendOtp = async (isResend = false) => {
      setIsLoading(true);
      setAuthError(null);
      try {
        const response = await fetch('/api/otp/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email.trim() })
        });
        
        const resData = await response.json();
        if (!response.ok) {
          throw new Error(resData.error || "Failed to send verification code.");
        }
        
        setCooldown(60);
        if (!isResend) {
          setStep(5);
          setOtpVals(Array(6).fill(""));
        } else {
          alert("Verification code resent to your email.");
        }
      } catch (err: any) {
        console.error("Failed to send OTP:", err);
        setAuthError(err.message || "Failed to send verification code.");
      } finally {
        setIsLoading(false);
      }
    };

    const handleVerifyAndSignUp = async () => {
      const enteredOtp = otpVals.join("");
      if (enteredOtp.length < 6) {
        setAuthError("Please enter the complete 6-digit verification code.");
        return;
      }
      
      setIsLoading(true);
      setAuthError(null);
      try {
        // 1. Verify OTP
        const verifyResponse = await fetch('/api/otp/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email.trim(),
            otp: enteredOtp
          })
        });

        const verifyData = await verifyResponse.json();
        if (!verifyResponse.ok) {
          throw new Error(verifyData.error || "Invalid or expired verification code.");
        }

        // 2. Perform actual sign up
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: {
              full_name: formData.fullName,
              business_name: formData.businessName,
            },
          },
        });

        if (error) throw error;

        let activeSession = data.session;
        if (!activeSession) {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });
          if (signInError) throw signInError;
          activeSession = signInData.session;
        }

        const sessionUser = data.user || activeSession?.user;
        if (!sessionUser) {
          throw new Error("Failed to retrieve user session after signup.");
        }

        // 3. Create Profile
        const { error: profileErr } = await supabase
          .from('profiles')
          .insert({
            id: sessionUser.id,
            full_name: formData.fullName,
            business_name: formData.businessName
          });
          
        if (profileErr) {
          console.error("Profile creation error on signup:", profileErr);
        }

        // 4. Link team member
        if (invitationToken) {
          const { error: teamUpdateErr } = await supabase.rpc('link_team_member', {
            invite_token: invitationToken,
            new_user_id: sessionUser.id
          });
            
          if (teamUpdateErr) {
            console.error("Failed to link team member record:", teamUpdateErr);
          }

          if (invitationData?.role) {
            try { localStorage.setItem('tailora_role', invitationData.role); } catch {}
          }
        }

        if (activeSession) {
          document.cookie = `sb-access-token=${activeSession.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }

        setDone(true);
        setIsLoading(false);
      } catch (error: any) {
        setAuthError(error.message || "Failed to sign up");
        setIsLoading(false);
      }
    };

    const handleGoogleSignUp = async () => {
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
      } catch (error: any) {
        setAuthError(error.message || "Failed to sign up with Google");
        setIsGoogleLoading(false);
      }
    };

    const handleOtpChange = (index: number, val: string) => {
      const numOnly = val.replace(/[^0-9]/g, "");
      const newVals = [...otpVals];
      
      if (numOnly.length > 0) {
        const char = numOnly[numOnly.length - 1];
        newVals[index] = char;
        setOtpVals(newVals);
        
        if (index < 5) {
          otpInputsRef.current[index + 1]?.focus();
        }
      } else {
        newVals[index] = "";
        setOtpVals(newVals);
      }
    };

    const handleOtpKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (!otpVals[index] && index > 0) {
          const newVals = [...otpVals];
          newVals[index - 1] = "";
          setOtpVals(newVals);
          otpInputsRef.current[index - 1]?.focus();
        } else {
          const newVals = [...otpVals];
          newVals[index] = "";
          setOtpVals(newVals);
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < 5) {
        otpInputsRef.current[index + 1]?.focus();
      }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").trim().replace(/[^0-9]/g, "");
      if (pasteData.length === 6) {
        const newVals = pasteData.split("");
        setOtpVals(newVals);
        otpInputsRef.current[5]?.focus();
      }
    };

    if (inviteError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#FDFDFD] px-6">
          <div className="flex flex-col items-center text-center w-full max-w-sm">
            <div className="w-[72px] h-[72px] rounded-full bg-[#E03137] flex items-center justify-center mb-6">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M12 12L24 24M24 12L12 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-[28px] font-['Sora'] font-bold mb-2 text-[#121212]">Invalid Invite Link</h2>
            <p className="font-['Satoshi'] font-normal text-[15px] text-[#6C717D] mb-6">{inviteError}</p>
            <button
              onClick={() => { setInviteError(null); setInvitationToken(null); router.push("/signup"); }}
              className="w-full h-[46px] bg-[#121212] text-white rounded-full text-[14px] font-['Satoshi'] font-medium hover:bg-black active:scale-[0.98] transition-all"
            >
              Sign Up Directly
            </button>
          </div>
        </main>
      );
    }

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

        {/* ── CAROUSEL PANEL ── */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent lg:hidden" />
            <div className="absolute inset-0 hidden lg:block bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent h-[652px] mt-auto" />
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 lg:px-10 lg:pb-10 lg:pt-16 flex flex-col gap-4 text-white z-10">
              <div className="bg-white/80 backdrop-blur-md shadow-[0px_0px_2px_rgba(0,0,0,0.04)] rounded-[4px] px-1.5 py-1 inline-flex gap-1 w-max mb-2 self-center lg:self-start">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === currentSlide ? "w-[43px] bg-[#121212]" : "w-4 bg-[#FDF6EC]"
                    }`}
                    onClick={() => setCurrentSlide(i)}
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

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-1 flex-col relative min-h-screen z-10 pointer-events-none">

          <div className="flex justify-center pt-[calc(env(safe-area-inset-top)+64px)] lg:absolute lg:top-[60px] lg:right-[100px] lg:pt-0 pointer-events-auto">
            <div className="flex lg:hidden items-center gap-2 bg-white/40 border border-white/60 backdrop-blur-[50px] rounded-full px-4 py-2.5">
              <span className="font-['Satoshi'] font-normal text-[14px] text-white tracking-[-0.006em]">
                Already have an account?
              </span>
              <Link href="/login" className="font-['Satoshi'] font-bold text-[14px] text-white tracking-[-0.006em]">Log in</Link>
            </div>
            <div className="hidden lg:flex gap-1.5 items-center">
              <span className="font-['Satoshi'] font-normal text-[16px] text-[#6C717D]">Already have an account?</span>
              <Link href="/login" className="font-['Satoshi'] font-medium text-[14px] text-[#121212] tracking-[-0.006em] hover:underline">Log in</Link>
            </div>
          </div>

          {/* Form Wrapper */}
          <div className="flex flex-1 flex-col justify-start pt-6 pb-10 lg:justify-center lg:pt-0 lg:pb-0 px-5 lg:px-0 lg:items-start lg:pl-16 xl:pl-24">
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

              {/* Progress bar */}
              <div className="flex flex-col gap-3 mb-6 w-full">
                <span className="font-['Satoshi'] font-medium text-[14px] text-[#595653] text-right w-full">
                  {step} of {TOTAL_STEPS}
                </span>
                <div className="w-full h-1 bg-[#FDF6EC] rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-[#090909] rounded-full transition-all duration-300"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>

              <h1 className="font-['Sora'] font-bold text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] text-[#121212] mb-6">
                Create An Account
              </h1>

              <div className="flex flex-col gap-6">
                {step === 1 && (
                  <>
                    <GoogleButton onClick={handleGoogleSignUp} disabled={isGoogleLoading}>
                      {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                    </GoogleButton>

                    <OrDivider />

                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {authError}
                      </div>
                    )}

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
                      <input type="text" placeholder="Your Business Name" value={formData.businessName} onChange={handleFormChange("businessName")} disabled={!!invitationData} onKeyDown={(e) => { if (e.key === "Enter") goNext(); }} className={`${inputCls} ${invitationData ? 'opacity-70 cursor-not-allowed bg-gray-100' : ''}`} />
                    </div>
                    <PrimaryButton onClick={goNext}>Continue</PrimaryButton>
                    <TermsText />
                  </>
                )}
                {step === 3 && (
                  <>
                    <div>
                      <FieldLabel>Email Address</FieldLabel>
                      <input type="email" placeholder="Your Email Address" value={formData.email} onChange={handleFormChange("email")} disabled={!!invitationData} onKeyDown={(e) => { if (e.key === "Enter") goNext(); }} className={`${inputCls} ${invitationData ? 'opacity-70 cursor-not-allowed bg-gray-100' : ''}`} />
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
                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {authError}
                      </div>
                    )}
                    <PrimaryButton onClick={goNext} disabled={isLoading}>
                      {isLoading ? "Sending code..." : "Continue"}
                    </PrimaryButton>
                    <TermsText />
                  </>
                )}
                {step === 5 && (
                  <>
                    <div>
                      <FieldLabel>Verification Code</FieldLabel>
                      <p className="font-['Satoshi'] font-normal text-[13px] text-[#6C717D] mt-1 mb-3">
                        We sent a 6-digit code to <strong className="text-[#121212]">{formData.email}</strong>. Enter it below to verify your email.
                      </p>
                      <div className="flex gap-2 justify-between mt-3 mb-1">
                        {otpVals.map((val, idx) => (
                          <input
                            key={idx}
                            ref={el => { otpInputsRef.current[idx] = el; }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={val}
                            onChange={e => handleOtpChange(idx, e.target.value)}
                            onKeyDown={e => handleOtpKeyDown(idx, e)}
                            onPaste={handleOtpPaste}
                            className="w-[48px] h-[52px] border border-[#E2E4E9] rounded-[10px] text-center font-['Satoshi'] font-bold text-[18px] text-[#121212] focus:border-[#121212] outline-none shadow-[0px_1px_2px_rgba(228,229,231,0.12)] transition-colors"
                          />
                        ))}
                      </div>
                    </div>
                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {authError}
                      </div>
                    )}
                    <PrimaryButton onClick={goNext} disabled={isLoading}>
                      {isLoading ? "Verifying..." : "Verify & Create Account"}
                    </PrimaryButton>
                    
                    <div className="text-center mt-2">
                      {cooldown > 0 ? (
                        <span className="font-['Satoshi'] text-[13px] text-[#9CA3AF]">
                          Resend code in {cooldown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp(true)}
                          className="font-['Satoshi'] font-bold text-[13px] text-[#121212] hover:underline bg-none border-none p-0 cursor-pointer"
                        >
                          Resend verification code
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Micro-components ──

  const inputCls =
    "w-full h-[40px] bg-[#FFFFFF] border border-[#E2E4E9] rounded-[10px] px-3 font-['Inter'] font-normal text-[14px] text-[#525866] tracking-[-0.006em] outline-none shadow-[0px_1px_2px_rgba(228,229,231,0.24)] focus:border-[#121212] transition-colors mt-1";

  function FieldLabel({ children }: { children: React.ReactNode }) {
    return <label className="font-['Satoshi'] font-medium text-[14px] text-[#283145] leading-[20px] block">{children}</label>;
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

  function TermsText() {
    return (
      <p className="font-['Satoshi'] font-medium text-[14px] leading-[20px] text-[#595653]">
        By continuing, you agree to the{" "}
        <strong className="text-[#121212] font-medium">General Terms of Use &amp; Privacy Policy</strong> of Taliora
      </p>
    );
  }
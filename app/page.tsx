"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { supabase } from "../lib/supabase";

// Button Component
const Button = ({
  className = "",
  property1 = "Default",
  buttonBackgroundColor,
  createAccountColor,
  text = "Get Started",
  href = "/signup",
}: {
  className?: string;
  property1?: string;
  buttonBackgroundColor?: CSSProperties["backgroundColor"];
  createAccountColor?: CSSProperties["color"];
  text?: string;
  href?: string;
}) => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: buttonBackgroundColor,
    };
  }, [buttonBackgroundColor]);

  const createAccountStyle: CSSProperties = useMemo(() => {
    return {
      color: createAccountColor,
    };
  }, [createAccountColor]);

  return (
    <button
      className={`tailora-landing-btn cursor-pointer [border:none] py-[13px] px-6 bg-foundation-primary-normal h-[46px] w-[175px] rounded-[999px] overflow-hidden shrink-0 flex items-center justify-center box-border ${className}`}
      style={buttonStyle}
    >
      <a href={href}>
        <div
          className="relative text-sm leading-5 font-medium font-[Satoshi] text-[#fff] text-left"
          style={createAccountStyle}
        >
          {text}
        </div>
      </a>
    </button>
  );
};

// Frame Component
const FrameComponent = ({
  className = "",
  productFeatures,
  heading,
  headingHighlight,
  everythingYouNeedToMoveFrom,
}: {
  className?: string;
  productFeatures?: string;
  heading?: string;
  headingHighlight?: string;
  everythingYouNeedToMoveFrom?: string;
}) => {
  const baseHeading = heading ?? "Why Tailora Is ";
  const highlight = headingHighlight ?? "Right for You";

  return (
    <div
      className={`w-[648px] max-w-full flex flex-col items-center gap-4 text-center text-xs text-foundation-primary-normal font-[Satoshi] ${className}`}
    >
      <div className="rounded-[10px] bg-foundation-secondary-normal border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px]">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 relative rounded-[50%] bg-[#ffa82b]" />
          <div className="relative leading-5 font-medium">{productFeatures}</div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-center text-[40px] font-[Sora]">
        <div className="w-full flex flex-col items-center gap-2 max-w-full">
          <h2 className="m-0 self-stretch relative text-[length:inherit] leading-[48px] font-bold font-[inherit] mq800:text-[32px] mq800:leading-[38px] mq450:text-2xl mq450:leading-[30px]">
            <span>{baseHeading}</span>
            {highlight && <span className="text-[#E57301]">{highlight}</span>}
          </h2>
          <div className="self-stretch relative text-base leading-6 font-[Satoshi] text-[#696969] flex items-center justify-center mq450:text-sm">
            {everythingYouNeedToMoveFrom}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tier Columns Component
const TierColumns = ({
  className = "",
  sTARTER,
}: {
  className?: string;
  sTARTER?: string;
}) => {
  return (
    <div
      className={`self-stretch rounded-t-3xl rounded-b-none [background:linear-gradient(244.53deg,_rgba(253,_246,_236,_0),_#fdf6ec)] border-foundation-primary-normal border-solid border-[1px] flex flex-col items-start py-[22px] px-[23px] text-left text-base text-foundation-primary-normal font-[Sora] ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-1">
        <div className="self-stretch relative leading-6">{sTARTER}</div>
        <div className="self-stretch flex flex-col items-start gap-1 text-[32px]">
          <div className="self-stretch relative leading-[48px]">
            <b>
              <span>₦1,500</span>
              <span className="text-[40px]">{` `}</span>
            </b>
            <span className="text-base">/month</span>
          </div>
          <div className="self-stretch h-[23px] relative text-xs leading-5 font-medium font-[Satoshi] text-[#696969] flex items-center">
            Basic features for everyone
          </div>
        </div>
      </div>
    </div>
  );
};

// Measurement Rows Component
const MeasurementRows = ({
  className = "",
  scheduleContainers,
  measurementManagement,
  storeUnlimitedClientMeasurements,
}: {
  className?: string;
  scheduleContainers: string;
  measurementManagement?: string;
  storeUnlimitedClientMeasurements?: string;
}) => {
  return (
    <div
      className={`tailora-landing-card relative overflow-hidden rounded-[24px] bg-[#FEFCF9] border border-[rgba(229,115,1,0.4)] shadow-[0px_0px_4.7px_rgba(0,0,0,0.08)] box-border text-left text-foundation-primary-normal font-[Sora] ${className}`}
      style={{ height: "349px", flexShrink: 0 }}
    >
      {/* Gradient header */}
      <div
        className="absolute inset-x-0 top-0 h-[159px]"
        style={{
          background: "linear-gradient(180deg, #FFDFB3 -214.78%, rgba(255,223,179,0) 100%)",
        }}
      />

      {/* Text block */}
      <div
        className="absolute z-10 flex flex-col"
        style={{ left: 24, top: 24, right: 24, gap: 7 }}
      >
        <h3 style={{ margin: 0, fontFamily: "Sora", fontWeight: 600, fontSize: 18, lineHeight: "26px", color: "#121212" }}>
          {measurementManagement}
        </h3>
        <div style={{ fontFamily: "Satoshi", fontWeight: 400, fontSize: 14, lineHeight: "24px", color: "#696969" }}>
          {storeUnlimitedClientMeasurements}
        </div>
      </div>

      {/* Illustration */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: 0, right: -20, width: 299, height: 299, opacity: 0.85 }}
      >
        <Image
          src={scheduleContainers}
          alt={measurementManagement || "Feature illustration"}
          width={299}
          height={299}
          style={{ width: 299, height: 299, objectFit: "contain", objectPosition: "right bottom" }}
        />
      </div>
    </div>
  );
};



// Desktop4 - Hero/Navbar Section
const Desktop4 = ({ className = "" }: { className?: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session) {
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        if (typeof window !== "undefined") {
          const hash = window.location.hash;
          const search = window.location.search;
          if (hash.includes("type=recovery") || search.includes("type=recovery")) {
            window.location.href = "/reset-password";
          } else if (hash.includes("access_token") || search.includes("code=")) {
            window.location.href = "/dashboard";
          }
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session) {
        document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        if (typeof window !== "undefined") {
          const hash = window.location.hash;
          const search = window.location.search;
          if (event === "PASSWORD_RECOVERY" || hash.includes("type=recovery") || search.includes("type=recovery")) {
            window.location.href = "/reset-password";
          } else if (event === "SIGNED_IN" && (hash.includes("access_token") || search.includes("code="))) {
            window.location.href = "/dashboard";
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const heroCards = [
    { name: "Ajoke Sandra", role: "Tailor", img: "/Slide1.png" },
    { name: "Olabisi & Ella", role: "CEO & Assistant", img: "/Slide2.png" },
    { name: "Joshua Neo", role: "Tailor", img: "/slide3.png" },
    { name: "Folashade Babs", role: "CEO", img: "/slide4.jpg" },
  ];

  // Duplicate cards for seamless infinite loop.
  // Each card uses marginRight:24 instead of gap so that -50% translateX
  // lands exactly on the boundary between the two identical sets.
  const loopCards = [...heroCards, ...heroCards];

  return (
    <section
      className={`tailora-landing-hero w-full rounded-t-none rounded-b-[100px] mq800:rounded-b-[60px] mq450:rounded-b-[40px] bg-[#ffedd4] flex flex-col items-center pt-6 px-0 pb-20 mq800:pb-14 mq450:pb-10 box-border relative isolate gap-0 max-w-full overflow-hidden ${className}`}
    >
      {/* Keyframes injected inline — keeps animation self-contained */}
      <style>{`
        @keyframes tailora-hero-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .tailora-hero-ticker {
          animation: tailora-hero-scroll 22s linear infinite;
        }
        .tailora-hero-ticker:hover {
          animation-play-state: paused;
        }
        .tailora-hero-heading {
          font-size: 64px;
          line-height: 72px;
          font-weight: 700;
        }
        .tailora-landing-hero-image {
          overflow: hidden;
          width: 100%;
          max-width: calc(4 * 310px);
          margin: 64px auto 0;
          position: relative;
        }
        @media (max-width: 800px) {
          .tailora-hero-heading {
            font-size: 32px;
            line-height: 40px;
            font-weight: 800;
            letter-spacing: 0.01em;
          }
          .tailora-landing-hero {
            padding-bottom: 2.5rem;
          }
          .tailora-landing-hero-image {
            width: 100vw;
            max-width: 100vw;
            margin-left: calc(50% - 50vw);
            margin-right: 0;
            margin-top: 1.5rem;
            margin-bottom: 0;
            align-self: stretch;
            animation: none;
            opacity: 1;
            transform: none;
          }
          .tailora-landing-hero-image::before,
          .tailora-landing-hero-image::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 28px;
            z-index: 3;
            pointer-events: none;
          }
          .tailora-landing-hero-image::before {
            left: 0;
            background: linear-gradient(to right, #ffedd4, transparent);
          }
          .tailora-landing-hero-image::after {
            right: 0;
            background: linear-gradient(to left, #ffedd4, transparent);
          }
          .tailora-hero-card {
            width: 220px !important;
            height: 260px !important;
            margin-right: 12px !important;
          }
          .tailora-hero-card-chip {
            width: calc(100% - 20px) !important;
            left: 10px !important;
          }
        }
      `}</style>

      {/* Background pattern */}
      <div className="w-[510.1px] h-[510.1px] absolute top-[50px] left-[50%] -translate-x-1/2 overflow-hidden flex items-center justify-center z-[0] pointer-events-none mq800:w-[320px] mq800:h-[320px] mq450:w-[260px] mq450:h-[260px] mq450:opacity-50">
        <Image
          className="w-full h-full object-cover"
          width={510}
          height={510}
          sizes="100vw"
          alt=""
          src="/Pattern@2x.png"
        />
      </div>

      {/* ── Navbar ── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[98] backdrop-blur-sm bg-black/20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className="w-full px-[121px] mq1125:px-[60px] mq960:px-[40px] mq800:px-10 mq450:px-4">
        <header className="tailora-landing-nav overflow-vivible shadow-[0px_0px_4px_rgba(0,_0,_0,_0.04)] rounded-[60px] bg-[#fff] flex flex-col items-start justify-center py-3 pl-6 pr-3 top-6 z-[99] sticky w-full max-w-[1197px] mx-auto shrink-0">
          <nav className="m-0 w-full flex items-center justify-between gap-4 text-center text-sm text-foundation-gray-darker font-[Satoshi]">
            {/* Logo */}
            <div className="h-[24.5px] flex items-center gap-[1.8px] text-left text-xl text-foundation-primary-normal font-[Sora] shrink-0">
              <Image
                className="h-[22px] w-6 relative"
                width={24}
                height={22}
                sizes="100vw"
                alt=""
                src="/ChatGPT-Image-May-11-2026-02-50-40-PM-1-Traced.svg"
              />
              <h3 className="m-0 h-6 w-[85px] relative text-[length:inherit] leading-6 font-bold font-[inherit] flex items-center shrink-0">
                Tailora
              </h3>
            </div>

            {/* Nav links */}
            <div className="flex items-center gap-6 mq960:hidden mq800:hidden">
              {["Home", "Features", "Pricing", "How It Works"].map((item) => (
                <div key={item} className="flex items-center justify-center py-0 px-2 cursor-pointer">
                  <div className="relative leading-[22px] font-medium">{item}</div>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 shrink-0">
              {user ? (
                <Button
                  property1="Default"
                  buttonBackgroundColor="#121212"
                  createAccountColor="#fff"
                  text="Dashboard"
                  href="/dashboard"
                  className="mq960:hidden mq800:hidden"
                />
              ) : (
                <>
                  <div className="flex items-center justify-center py-0 px-2 cursor-pointer mq960:hidden mq800:hidden">
                    <div className="relative leading-[22px] font-medium"><a href="/login">Sign in </a></div>
                  </div>
                  <Button property1="Default" className="mq960:hidden mq800:hidden" />
                </>
              )}
              {/* Hamburger */}
              <button
                className="mq960:flex mq800:flex hidden flex-col items-center justify-center w-[38px] h-[38px] gap-[5px] border border-foundation-gray-light rounded-full cursor-pointer transition-colors hover:bg-foundation-gray-lightest"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className={`block w-4 h-[1.5px] bg-foundation-primary-normal rounded-full transition-transform duration-300 origin-center ${isMobileMenuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
                <span className={`block w-4 h-[1.5px] bg-foundation-primary-normal rounded-full transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-4 h-[1.5px] bg-foundation-primary-normal rounded-full transition-transform duration-300 origin-center ${isMobileMenuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
              </button>
            </div>
          </nav>
          {/* Mobile menu dropdown */}
          <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out hidden mq960:block ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="pt-3 pb-2 px-1 flex flex-col gap-1">
              {["Home", "Features", "Pricing", "How It Works"].map((item) => (
                <a key={item} href="#" className="flex items-center px-4 py-3 rounded-xl text-sm font-medium font-[Satoshi] text-foundation-gray-darker hover:bg-foundation-gray-lightest transition-colors">
                  {item}
                </a>
              ))}
              <div className="h-px bg-foundation-gray-light mx-2 my-1" />
              {user ? (
                <div className="px-2 pb-1 pt-1">
                  <Button property1="Default" text="Dashboard" href="/dashboard" className="w-full" />
                </div>
              ) : (
                <>
                  <a href="/login" className="flex items-center px-4 py-3 rounded-xl text-sm font-medium font-[Satoshi] text-foundation-gray-dark hover:bg-foundation-gray-lightest transition-colors">
                    Sign in
                  </a>
                  <div className="px-2 pb-1 pt-1">
                    <Button property1="Default" className="w-full" />
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Floating decorative icons — desktop */}
      <Image className="absolute top-[219px] left-[207px] w-[60px] h-[60px] object-contain z-[1] opacity-20 pointer-events-none mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-14@2x.png" style={{ transform: "rotate(30.11deg)" }} />
      <Image className="absolute top-[334px] left-[179px] w-[60px] h-[60px] object-contain z-[1] opacity-20 pointer-events-none mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-15@2x.png" style={{ transform: "rotate(-42.28deg)" }} />
      <Image className="absolute top-[445px] left-[257px] w-[60px] h-[60px] object-contain z-[1] opacity-20 pointer-events-none mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-24@2x.png" style={{ transform: "rotate(-27.72deg)" }} />
      <Image className="absolute top-[219px] right-[207px] w-[60px] h-[60px] object-contain z-[1] opacity-20 pointer-events-none mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-12@2x.png" />
      <Image className="absolute top-[333px] right-[167px] w-[60px] h-[60px] object-contain z-[1] opacity-20 pointer-events-none mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-18@2x.png" style={{ transform: "rotate(-26.51deg)" }} />
      <Image className="absolute top-[445px] right-[256px] w-[60px] h-[60px] object-contain z-[1] opacity-20 pointer-events-none mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-21@2x.png" />

      {/* Floating decorative icons — mobile / tablet hero */}
      <div
        className="hidden mq1125:block absolute left-0 right-0 top-[68px] h-[340px] mq800:top-[60px] mq800:h-[300px] mq450:top-[52px] mq450:h-[280px] pointer-events-none z-[1]"
        aria-hidden
      >
        <Image className="absolute top-2 left-3 w-12 h-12 object-contain opacity-30 mq450:w-11 mq450:h-11 mq450:left-2" loading="lazy" width={48} height={48} sizes="48px" alt="" src="/image-14@2x.png" style={{ transform: "rotate(30.11deg)" }} />
        <Image className="absolute top-[92px] left-5 w-11 h-11 object-contain opacity-30 mq450:top-[80px] mq450:left-3" loading="lazy" width={44} height={44} sizes="44px" alt="" src="/image-15@2x.png" style={{ transform: "rotate(-42.28deg)" }} />
        <Image className="absolute top-[172px] left-2 w-10 h-10 object-contain opacity-30 mq450:top-[156px]" loading="lazy" width={40} height={40} sizes="40px" alt="" src="/image-24@2x.png" style={{ transform: "rotate(-27.72deg)" }} />
        <Image className="absolute top-2 right-3 w-12 h-12 object-contain opacity-30 mq450:w-11 mq450:h-11 mq450:right-2" loading="lazy" width={48} height={48} sizes="48px" alt="" src="/image-12@2x.png" />
        <Image className="absolute top-[92px] right-5 w-11 h-11 object-contain opacity-30 mq450:top-[80px] mq450:right-3" loading="lazy" width={44} height={44} sizes="44px" alt="" src="/image-18@2x.png" style={{ transform: "rotate(-26.51deg)" }} />
        <Image className="absolute top-[172px] right-2 w-10 h-10 object-contain opacity-30 mq450:top-[156px]" loading="lazy" width={40} height={40} sizes="40px" alt="" src="/image-21@2x.png" />
      </div>

      {/* ── Hero content ── */}
      <div className="tailora-landing-hero-content relative z-[2] flex flex-col items-center gap-4 mt-[90px] mq800:mt-14 mq450:mt-10 max-w-[700px] w-full text-center mq450:px-4">
        {/* Badge */}
        <div className="rounded-[10px] bg-[#fdf6ec] border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px]">
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-[50%] bg-[#ffa82b]" />
            <div className="relative text-xs leading-5 font-medium font-[Satoshi] text-foundation-primary-normal">{`FASHION CRM`}</div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="m-0 font-bold font-[Sora] text-foundation-primary-normal w-full text-[64px] leading-[72px] mq800:text-[32px] mq800:leading-[40px] mq450:font-extrabold mq450:tracking-[0.01em]">
          Track measurements and orders easily
        </h1>


        {/* Subtext */}
        <p className="m-0 text-base leading-6 font-[Satoshi] text-[#696969] max-w-[600px] mq800:text-sm mq450:leading-[22px] mq450:tracking-[0.01em] mq450:opacity-85">
          Tailora helps fashion designers organize client measurements, manage
          deliveries, and collaborate with their team — all in one smart
          workspace.
        </p>

        {/* CTA */}
        {user ? (
          <Button
            property1="Default"
            buttonBackgroundColor="#121212"
            createAccountColor="#fff"
            text="Go to Dashboard"
            href="/dashboard"
          />
        ) : (
          <Button
            property1="Default"
            buttonBackgroundColor="#121212"
            createAccountColor="#fff"
          />
        )}
      </div>

      {/* ── Infinite-scroll carousel ── */}
      <div className="tailora-landing-hero-image relative z-[2]">
        <div
          className="tailora-hero-ticker"
          style={{
            display: "flex",
            width: "max-content",
          }}
        >
          {loopCards.map((person, i) => (
            <div
              key={i}
              className="tailora-landing-card tailora-hero-card"
              style={{
                position: "relative",
                width: 286,
                height: 339,
                borderRadius: 16,
                overflow: "hidden",
                flexShrink: 0,
                marginRight: 24,
                boxShadow: "0px 0px 4px rgba(0,0,0,0.08)",
              }}
            >
              {/* Photo */}
              <Image
                fill
                alt={person.name}
                src={person.img}
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />

              {/* Dark overlay — Figma rgba(0,0,0,0.3) */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.30)" }} />

              {/* Top name chip — Figma: 266×48, left:10, top:10, #FDF6EC */}
              <div
                className="tailora-hero-card-chip"
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  width: 266,
                  background: "#FDF6EC",
                  borderRadius: 10,
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {/* Gold star icon — Figma: 32×32, #FFE1B7 circle */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 20,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#FFE1B7" />
                    <path d="M18.1057 8C14.8009 8 12.2117 9.81544 12.2117 12.1324H12.195V15.5912C9.91985 14.8871 8.354 13.5857 8.354 12.1324C8.354 11.9971 8.27498 11.8868 8.17714 11.8868C8.07929 11.8868 8 11.9967 8 12.1324L8 19.4985C8 22.0232 11.5138 24 16 24C20.3759 24 23.8253 22.1184 23.9923 19.6831H24V12.1324C24 9.81544 21.4111 8 18.1057 8Z" fill="#F5B500" />
                    <path d="M8.84722 18.5804C8.84722 18.7616 8.80055 18.8719 8.7438 18.826C8.68679 18.7797 8.64038 18.5936 8.64038 18.4124C8.64038 16.6495 8.64038 15.7683 8.64038 14.0058C8.64038 13.8245 8.68679 13.7161 8.7438 13.762C8.80055 13.8083 8.84722 13.9925 8.84722 14.1741C8.84722 15.9363 8.84722 16.8179 8.84722 18.5804Z" fill="#333333" />
                    <path d="M9.36917 16.8727C9.36917 17.0543 9.3225 17.1671 9.26443 17.1249C9.20636 17.0822 9.15942 16.8991 9.15942 16.7179C9.15942 15.7969 9.15942 15.3366 9.15942 14.416C9.15942 14.2348 9.20636 14.123 9.26443 14.1653C9.3225 14.2083 9.36917 14.3896 9.36917 14.5712C9.36917 15.4914 9.36917 15.9521 9.36917 16.8727Z" fill="#666666" />
                    <path d="M9.9007 17.238C9.9007 17.4192 9.8527 17.5354 9.79383 17.4964C9.73523 17.4567 9.6875 17.2769 9.6875 17.0953C9.6875 16.1751 9.6875 15.7144 9.6875 14.7939C9.6875 14.6126 9.7355 14.4972 9.79383 14.5369C9.85297 14.5762 9.9007 14.7545 9.9007 14.9361C9.9007 15.8564 9.9007 16.317 9.9007 17.238Z" fill="#666666" />
                    <path d="M10.4403 17.5702C10.4403 17.7518 10.3912 17.871 10.3318 17.8353C10.2719 17.7996 10.2236 17.6224 10.2236 17.4408C10.2236 16.5206 10.2236 16.0599 10.2236 15.1393C10.2236 14.9581 10.2722 14.8401 10.3318 14.8757C10.3915 14.9114 10.4403 15.0871 10.4403 15.2684C10.4403 16.1893 10.4403 16.6496 10.4403 17.5702Z" fill="#666666" />
                    <path d="M10.9871 19.976C10.9871 20.1572 10.9378 20.2789 10.8773 20.2466C10.8168 20.2146 10.7678 20.0407 10.7678 19.8595C10.7675 18.0966 10.7675 17.215 10.7678 15.4528C10.7678 15.2716 10.8171 15.1506 10.8773 15.1826C10.9378 15.2146 10.9871 15.3881 10.9871 15.5694C10.9871 17.3315 10.9871 18.2128 10.9871 19.976Z" fill="#333333" />
                    <path d="M11.5396 18.1393C11.5396 18.3209 11.4895 18.4455 11.4282 18.4172C11.3672 18.3889 11.3176 18.2172 11.3176 18.0356C11.3176 17.115 11.3176 16.6547 11.3176 15.7338C11.3176 15.5525 11.3669 15.429 11.4282 15.4573C11.4895 15.486 11.5396 15.6562 11.5396 15.8374C11.5396 16.7577 11.5396 17.2187 11.5396 18.1393Z" fill="#666666" />
                    <path d="M12.0981 18.3751C12.0981 18.5567 12.0475 18.6843 11.9857 18.6593C11.9239 18.6343 11.8738 18.467 11.8738 18.285C11.8738 17.3644 11.8743 16.9034 11.8743 15.9832C11.8743 15.8019 11.9236 15.6751 11.9857 15.6997C12.0475 15.7247 12.0981 15.8916 12.0981 16.0729C12.0981 16.9938 12.0981 17.4549 12.0981 18.3751Z" fill="#666666" />
                    <path d="M12.6607 18.5786C12.6607 18.7598 12.6098 18.89 12.5475 18.8687C12.4855 18.8473 12.4348 18.6826 12.4348 18.501C12.4348 17.5804 12.4348 17.1194 12.4348 16.1988C12.4348 16.0176 12.4852 15.8885 12.5475 15.9102C12.6096 15.9315 12.6607 16.0955 12.6607 16.2768C12.6607 17.197 12.6607 17.658 12.6607 18.5786Z" fill="#666666" />
                    <path d="M13.23 20.8558C13.23 21.037 13.1788 21.1697 13.116 21.1521C13.0531 21.1344 13.002 20.9723 13.002 20.7911C13.002 19.0282 13.002 18.1469 13.002 16.3848C13.002 16.2036 13.0529 16.0705 13.116 16.0881C13.1786 16.1058 13.23 16.2679 13.23 16.4491C13.2297 18.2116 13.2297 19.0933 13.23 20.8558Z" fill="#333333" />
                    <path d="M13.8008 18.8899C13.8008 19.0715 13.7499 19.2072 13.6865 19.1932C13.6234 19.1789 13.5722 19.0201 13.5722 18.8384C13.572 17.9178 13.572 17.4572 13.5722 16.5366C13.5722 16.3553 13.6231 16.2201 13.6865 16.234C13.7496 16.2484 13.8008 16.4065 13.8008 16.5877C13.8008 17.5087 13.8008 17.9693 13.8008 18.8899Z" fill="#666666" />
                    <path d="M14.3737 18.995C14.3737 19.1766 14.3225 19.3156 14.2589 19.3045C14.1955 19.2935 14.1438 19.1373 14.1438 18.9556C14.1438 18.035 14.1438 17.5744 14.1438 16.6538C14.1438 16.4725 14.1952 16.3347 14.2589 16.3457C14.3223 16.3564 14.3737 16.5119 14.3737 16.6928C14.3737 17.6137 14.3737 18.074 14.3737 18.995Z" fill="#666666" />
                    <path d="M14.9512 19.0698C14.9512 19.2514 14.8995 19.3933 14.8356 19.3863C14.7722 19.379 14.7202 19.2257 14.7202 19.0441C14.7202 18.1235 14.7202 17.6628 14.7202 16.7422C14.7202 16.561 14.7719 16.4198 14.8356 16.4272C14.8992 16.4345 14.9512 16.5867 14.9512 16.768C14.9512 17.6886 14.9512 18.1492 14.9512 19.0698Z" fill="#666666" />
                    <path d="M15.5279 21.2156C15.5279 21.3969 15.4764 21.5424 15.4122 21.5388C15.3486 21.5355 15.2966 21.3836 15.2966 21.2024C15.2966 19.4399 15.2966 18.5586 15.2966 16.7961C15.2966 16.6149 15.3486 16.4708 15.4122 16.4744C15.4762 16.4777 15.5279 16.6277 15.5279 16.809C15.5276 18.5715 15.5276 19.4527 15.5279 21.2156Z" fill="#333333" />
                    <path d="M16.106 19.1225C16.106 19.3037 16.054 19.4522 15.9901 19.4522C15.9262 19.4522 15.8745 19.3037 15.8745 19.1225C15.8745 18.2015 15.8745 17.7412 15.8745 16.8203C15.8745 16.639 15.926 16.4916 15.9901 16.4916C16.0538 16.4916 16.106 16.639 16.106 16.8203C16.106 17.7412 16.106 18.2015 16.106 19.1225Z" fill="#666666" />
                    <path d="M16.6843 19.0972C16.6843 19.2785 16.6329 19.4303 16.569 19.434C16.5053 19.4373 16.4528 19.2924 16.4528 19.1108C16.4526 18.1902 16.4526 17.7296 16.4528 16.809C16.4528 16.6277 16.5051 16.4777 16.569 16.4744C16.6326 16.4708 16.6843 16.6141 16.6843 16.7958C16.6843 17.7163 16.6843 18.1766 16.6843 19.0972Z" fill="#666666" />
                    <path d="M17.2617 19.0444C17.2617 19.2261 17.21 19.3797 17.1463 19.3871C17.0827 19.3944 17.0307 19.2518 17.0307 19.0702C17.0305 18.1496 17.0305 17.6893 17.0307 16.7683C17.0307 16.5871 17.0824 16.4341 17.1463 16.4272C17.2097 16.4198 17.2617 16.5613 17.2617 16.7426C17.2614 17.6636 17.2614 18.1238 17.2617 19.0444Z" fill="#666666" />
                    <path d="M17.8364 21.0608C17.8364 21.242 17.7845 21.3986 17.7208 21.4097C17.6574 21.4207 17.6055 21.2803 17.6055 21.099C17.6055 19.3365 17.6055 18.4556 17.6055 16.6928C17.6055 16.5115 17.6572 16.3564 17.7208 16.3457C17.7842 16.3347 17.8364 16.4729 17.8364 16.6542C17.8362 18.417 17.8362 19.2983 17.8364 21.0608Z" fill="#333333" />
                    <path d="M18.4092 18.8381C18.4092 19.0197 18.3583 19.18 18.2949 19.194C18.2318 19.2079 18.1806 19.0715 18.1806 18.8895C18.1804 17.969 18.1804 17.5087 18.1806 16.5877C18.1806 16.4065 18.2315 16.2484 18.2949 16.234C18.358 16.2201 18.4092 16.355 18.4092 16.5362C18.4089 17.4568 18.4089 17.9171 18.4092 18.8381Z" fill="#666666" />
                    <path d="M18.98 18.6852C18.98 18.8668 18.9291 19.0293 18.866 19.047C18.8034 19.0642 18.7522 18.9311 18.7522 18.7499C18.7522 17.8293 18.7522 17.369 18.7522 16.4481C18.7522 16.2668 18.8031 16.1058 18.866 16.0881C18.9288 16.0705 18.98 16.2021 18.98 16.3834C18.9797 17.3047 18.9797 17.7646 18.98 18.6852Z" fill="#666666" />
                    <path d="M19.5472 18.501C19.5472 18.6826 19.4966 18.848 19.4343 18.8693C19.372 18.8907 19.321 18.7601 19.321 18.5785C19.321 17.6576 19.321 17.1973 19.321 16.2767C19.321 16.0954 19.3717 15.9315 19.4343 15.9101C19.4963 15.8888 19.5472 16.0175 19.5472 16.1988C19.5472 17.1197 19.5472 17.5807 19.5472 18.501Z" fill="#666666" />
                    <path d="M20.1081 20.3891C20.1081 20.5704 20.0577 20.7391 19.9959 20.7641C19.9342 20.7891 19.8835 20.6608 19.8835 20.48C19.8832 18.7175 19.8832 17.8362 19.8835 16.0737C19.8835 15.8925 19.9339 15.7252 19.9959 15.6998C20.0577 15.6748 20.1081 15.8013 20.1081 15.9825C20.1078 17.7454 20.1078 18.6266 20.1081 20.3891Z" fill="#333333" />
                    <path d="M20.6643 18.0353C20.6643 18.2169 20.615 18.3879 20.5535 18.4166C20.4925 18.4449 20.4426 18.3199 20.4426 18.1383C20.4426 17.218 20.4426 16.7574 20.4426 15.8368C20.4426 15.6555 20.4925 15.486 20.5535 15.4574C20.615 15.4287 20.6643 15.5526 20.6643 15.7338C20.6643 16.6544 20.6643 17.1147 20.6643 18.0353Z" fill="#666666" />
                    <path d="M21.2154 17.7543C21.2154 17.9359 21.1661 18.1098 21.1054 18.1422C21.0452 18.1742 20.9958 18.0525 20.9958 17.8709C20.9958 16.9503 20.9958 16.49 20.9958 15.569C20.9958 15.3878 21.0452 15.2146 21.1054 15.1826C21.1664 15.1506 21.2154 15.2712 21.2154 15.4525C21.2154 16.3734 21.2154 16.8334 21.2154 17.7543Z" fill="#666666" />
                    <path d="M21.7577 17.4406C21.7577 17.6222 21.7091 17.7994 21.6495 17.8354C21.5898 17.8711 21.541 17.7516 21.541 17.57C21.541 16.6494 21.541 16.1887 21.541 15.2678C21.541 15.0865 21.5901 14.9112 21.6495 14.8759C21.7094 14.8398 21.7577 14.9578 21.7577 15.1391C21.7577 16.0597 21.7577 16.5203 21.7577 17.4406Z" fill="#666666" />
                    <path d="M22.2935 19.1983C22.2935 19.3795 22.2458 19.5597 22.1869 19.599C22.1281 19.638 22.0803 19.5218 22.0803 19.3406C22.0803 17.5781 22.0803 16.6968 22.0803 14.9336C22.0803 14.7527 22.1283 14.574 22.1869 14.5347C22.2461 14.4953 22.2935 14.6104 22.2935 14.7917C22.2935 16.5545 22.2935 17.4358 22.2935 19.1983Z" fill="#333333" />
                    <path d="M22.8218 16.7179C22.8218 16.8992 22.7746 17.0819 22.7168 17.1245C22.6588 17.1672 22.6118 17.0547 22.6118 16.873C22.6118 15.9525 22.6118 15.4914 22.6118 14.5708C22.6118 14.3896 22.659 14.2087 22.7168 14.1653C22.7746 14.123 22.8218 14.2344 22.8218 14.4161C22.8218 15.3366 22.8218 15.7969 22.8218 16.7179Z" fill="#666666" />
                    <path d="M23.3401 16.3077C23.3401 16.4894 23.2939 16.675 23.2372 16.7213C23.1799 16.7677 23.1338 16.6574 23.1338 16.4761C23.1338 15.5552 23.1338 15.0952 23.1338 14.1743C23.1338 13.993 23.1799 13.8085 23.2372 13.7622C23.2939 13.7158 23.3401 13.8243 23.3401 14.0059C23.3401 14.9265 23.3401 15.3868 23.3401 16.3077Z" fill="#666666" />
                    <path d="M23.8488 15.8637C23.8488 16.0453 23.8037 16.2336 23.7478 16.2836C23.6921 16.3336 23.6465 16.2266 23.6465 16.045C23.6465 15.1244 23.6465 14.6637 23.6465 13.7431C23.6465 13.5619 23.6921 13.3744 23.7478 13.3244C23.8037 13.2744 23.8488 13.3803 23.8488 13.5619C23.8488 14.4825 23.8488 14.9428 23.8488 15.8637Z" fill="#666666" />
                    <path d="M18.106 8C14.8012 8 12.212 9.81544 12.212 12.1324C12.212 13.7048 14.3345 14.9364 17.0443 14.9364C19.6891 14.9364 21.7736 13.7629 21.8723 12.2449C21.885 12.2107 21.8943 12.1739 21.8943 12.1324C21.8943 10.5724 20.229 9.35074 18.1031 9.35074C15.5521 9.35074 14.3122 10.0195 14.3122 11.396C14.3122 12.3386 16.0671 12.7676 17.6979 12.7676C17.7958 12.7676 17.8748 12.6577 17.8748 12.5217C17.8748 12.386 17.7958 12.2765 17.6979 12.2765C15.7362 12.2765 14.6659 11.6949 14.6659 11.396C14.6659 10.3647 15.8223 9.84154 18.1028 9.84154C19.9267 9.84154 21.4695 10.8474 21.5336 12.0555C21.5278 12.0801 21.5225 12.1055 21.5225 12.1324C21.5225 13.2496 19.723 14.4452 17.044 14.4452C14.3652 14.4452 12.5658 13.2493 12.5658 12.1324C12.5658 10.1246 15.0512 8.49118 18.1057 8.49118C21.1605 8.49118 23.646 10.1246 23.646 12.1324C23.646 14.3066 20.1444 16.143 16 16.143C11.8553 16.143 8.35401 14.3066 8.35401 12.1324C8.35401 11.9971 8.27498 11.8868 8.17714 11.8868C8.07929 11.8868 8 11.9967 8 12.1324C8 14.657 11.5138 16.6338 16 16.6338C20.4859 16.6338 24 14.657 24 12.1324C24.0003 9.81544 21.4114 8 18.106 8Z" fill="white" />
                    <path d="M17.3892 14.9303C17.3136 14.9332 17.2375 14.9351 17.1609 14.9365C17.1609 15.3957 17.1609 15.7435 17.1609 16.0957C17.2375 16.0895 17.3134 16.0814 17.3892 16.074C17.3892 15.727 17.3892 15.3821 17.3892 14.9303Z" fill="#666666" />
                    <path d="M15.6807 14.8267C15.6046 14.8142 15.5296 14.8006 15.4551 14.7859C15.4551 15.2914 15.4551 15.7263 15.4551 16.1311C15.5299 16.1337 15.6052 16.1366 15.6807 16.1385C15.6807 15.7432 15.6807 15.319 15.6807 14.8267Z" fill="#333333" />
                    <path d="M16.8206 14.9351C16.7437 14.9333 16.6679 14.9299 16.5923 14.9259C16.5923 15.4046 16.5923 15.7623 16.5923 16.1303C16.6687 16.1274 16.745 16.1241 16.8206 16.1197C16.8206 15.759 16.8206 15.4049 16.8206 14.9351Z" fill="#666666" />
                    <path d="M17.9599 14.8893C17.8849 14.897 17.809 14.9044 17.7327 14.9106C17.7327 15.3257 17.7327 15.6933 17.7327 16.0345C17.8088 16.0249 17.8846 16.015 17.9599 16.004C17.9599 15.6654 17.9599 15.3007 17.9599 14.8893Z" fill="#333333" />
                    <path d="M16.2495 14.9007C16.1731 14.8934 16.0973 14.8857 16.0222 14.8765C16.0222 15.3809 16.0222 15.7515 16.0222 16.1437C16.0983 16.1434 16.1739 16.1419 16.2495 16.1404C16.2495 15.7592 16.2495 15.3941 16.2495 14.9007Z" fill="#666666" />
                    <path d="M19.6408 14.5103C19.5687 14.5367 19.495 14.5617 19.4199 14.5856C19.4199 15.0169 19.4199 15.3544 19.4199 15.7033C19.4942 15.6834 19.5684 15.6636 19.6408 15.6419C19.6408 15.286 19.6408 14.9459 19.6408 14.5103Z" fill="#666666" />
                    <path d="M20.1851 14.2797C20.1146 14.3139 20.0425 14.3473 19.9688 14.3797C19.9688 14.8083 19.9688 15.1863 19.9688 15.5407C20.0417 15.5168 20.1138 15.4922 20.1851 15.4668C20.1851 15.105 20.1851 14.7186 20.1851 14.2797Z" fill="#333333" />
                    <path d="M18.5255 14.8075C18.4512 14.8211 18.3759 14.8332 18.2998 14.845C18.2998 15.2773 18.2998 15.6126 18.2998 15.9501C18.3754 15.9369 18.4507 15.9229 18.5255 15.909C18.5255 15.5722 18.5255 15.2369 18.5255 14.8075Z" fill="#666666" />
                    <path d="M19.0878 14.6847C19.0146 14.7042 18.9396 14.7222 18.864 14.7395C18.864 15.167 18.864 15.5016 18.864 15.8406C18.9391 15.824 19.0136 15.8068 19.0878 15.7887C19.0878 15.4476 19.0878 15.1126 19.0878 14.6847Z" fill="#666666" />
                    <path d="M13.7971 14.2258C13.7971 14.8972 13.7971 15.3347 13.7971 15.9655C13.8692 15.9773 13.9414 15.988 14.0138 15.9986C14.0138 15.4093 14.0138 14.978 14.0138 14.3313C13.9398 14.2975 13.8677 14.2622 13.7971 14.2258Z" fill="#666666" />
                    <path d="M15.1196 14.7134C15.044 14.695 14.9695 14.6751 14.8958 14.6545C14.8958 15.2251 14.8958 15.6266 14.8958 16.0994C14.97 16.1053 15.0448 16.1104 15.1196 16.1145C15.1196 15.663 15.1196 15.2678 15.1196 14.7134Z" fill="#666666" />
                    <path d="M20.718 13.9739C20.6501 14.0198 20.579 14.0636 20.5061 14.1066C20.5061 14.5816 20.5061 14.943 20.5061 15.3485C20.578 15.3206 20.648 15.2912 20.718 15.2617C20.718 14.8367 20.718 14.4665 20.718 13.9739Z" fill="#666666" />
                    <path d="M14.5629 14.5508C14.4884 14.5255 14.4147 14.499 14.3425 14.4714C14.3425 15.0861 14.3425 15.5053 14.3425 16.0435C14.4157 16.0523 14.4892 16.0604 14.5629 16.0685C14.5629 15.5582 14.5629 15.1475 14.5629 14.5508Z" fill="#666666" />
                    <path d="M12.95 13.6402C12.876 13.5715 12.8073 13.5016 12.7437 13.4288C12.7437 14.2866 12.7437 14.7509 12.7437 15.6391C12.7437 15.6755 12.7466 15.7119 12.7498 15.7472C12.8158 15.7641 12.8831 15.7799 12.95 15.7954C12.95 14.9266 12.95 14.4627 12.95 13.6402Z" fill="#666666" />
                    <path d="M13.4763 14.0422C13.4029 13.9959 13.3323 13.9477 13.2642 13.8984C13.2642 14.6665 13.2642 15.2698 13.2642 15.8668C13.3344 15.8819 13.405 15.8962 13.4763 15.9095C13.4763 15.3448 13.4763 14.7668 13.4763 14.0422Z" fill="#333333" />
                    <path d="M12.4376 15.3913C12.4376 14.4707 12.4376 14.01 12.4376 13.0894C12.4376 13.0552 12.4347 13.0214 12.4318 12.988C12.3761 12.8835 12.3315 12.7762 12.2963 12.6663C12.2618 12.6868 12.2371 12.7791 12.2371 12.9126C12.2371 13.8335 12.2371 14.2935 12.2371 15.2144C12.2371 15.3957 12.2819 15.5843 12.3368 15.6332C12.3421 15.638 12.3472 15.6394 12.352 15.6416C12.3549 15.642 12.3575 15.6431 12.3602 15.6442C12.4045 15.6482 12.4376 15.5468 12.4376 15.3913Z" fill="#666666" />
                    <path d="M21.239 13.5452C21.1749 13.6102 21.1054 13.6731 21.0327 13.7349C21.0327 14.268 21.0327 14.6566 21.0327 15.1224C21.103 15.0897 21.1711 15.0562 21.239 15.0227C21.239 14.5205 21.239 14.1176 21.239 13.5452Z" fill="#666666" />
                    <path d="M21.743 12.9124C21.743 12.8752 21.7408 12.8429 21.7374 12.8127C21.6859 12.937 21.6207 13.0583 21.5425 13.1749C21.5425 13.8488 21.5425 14.2837 21.5425 14.8631C21.6109 14.8252 21.6777 14.7866 21.743 14.7473C21.743 14.1102 21.743 13.6624 21.743 12.9124Z" fill="#666666" />
                    <path d="M14.694 12.1797C14.694 12.1433 14.6908 12.1084 14.6873 12.0742C14.616 12.0179 14.5547 11.9584 14.5022 11.8951C14.4895 11.9429 14.4818 12.0058 14.4818 12.0779C14.4818 12.8709 14.4818 13.3238 14.4818 14.022C14.551 14.0477 14.6218 14.0727 14.6942 14.0962C14.694 13.4139 14.694 12.9613 14.694 12.1797Z" fill="#333333" />
                    <path d="M15.2281 12.3744C15.1541 12.3443 15.0833 12.3123 15.0162 12.2784C15.0157 12.2924 15.0149 12.3064 15.0149 12.3207C15.0149 13.0854 15.0149 13.5354 15.0149 14.1924C15.0854 14.2115 15.157 14.2295 15.2302 14.2465C15.2302 13.6064 15.2302 13.1579 15.2302 12.406C15.2302 12.3946 15.2284 12.3851 15.2281 12.3744Z" fill="#666666" />
                    <path d="M15.7736 12.5888C15.7736 12.5748 15.7713 12.563 15.7707 12.5494C15.6978 12.5307 15.6262 12.5108 15.5567 12.4895C15.5565 12.4998 15.5557 12.5097 15.5557 12.5204C15.5557 13.2208 15.5557 13.7814 15.5557 14.3138C15.6273 14.327 15.6997 14.3395 15.7731 14.3513C15.7734 13.8277 15.7736 13.2752 15.7736 12.5888Z" fill="#666666" />
                    <path d="M16.3207 14.4158C16.3207 13.8526 16.3207 13.4202 16.3207 12.7279C16.3207 12.7048 16.3177 12.6838 16.3162 12.6614C16.2443 12.6496 16.1732 12.6368 16.1027 12.6232C16.1019 12.6408 16.1008 12.6588 16.1008 12.6772C16.1008 13.3809 16.1008 13.8169 16.1008 14.3938C16.1732 14.4022 16.2467 14.4096 16.3207 14.4158Z" fill="#666666" />
                    <path d="M16.6514 12.7931C16.6511 13.4666 16.6511 13.8953 16.6511 14.4368C16.724 14.4401 16.798 14.4427 16.8723 14.4442C16.8723 13.9155 16.8723 13.4897 16.8723 12.8272C16.8723 12.7934 16.8691 12.7622 16.8662 12.7309C16.7959 12.7243 16.7267 12.7173 16.6575 12.7092C16.6548 12.7364 16.6514 12.7629 16.6514 12.7931Z" fill="#333333" />
                    <path d="M20.4395 8.83142V9.93069C21.3283 10.4355 21.8934 11.2259 21.8934 12.1325C21.8934 12.1678 21.886 12.1991 21.8762 12.2285V14.6649C22.9761 13.9686 23.6454 13.0829 23.6454 12.1322C23.6454 10.6726 22.3307 9.41157 20.4395 8.83142Z" fill="#FFD766" />
                    <path d="M18.8638 9.9043V14.2418C20.5049 13.8543 21.5237 12.9734 21.5237 12.1337C21.5237 12.1069 21.529 12.0815 21.5349 12.0569C21.4802 11.0219 20.3373 10.1363 18.8638 9.9043Z" fill="#FFD766" />
                  </svg>

                </div>

                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      lineHeight: "15px",
                      color: "#121212",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {person.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "14px",
                      color: "#121212",
                    }}
                  >
                    {person.role}
                  </div>
                </div>
              </div>

              {/* Bottom Tailora logo badge — Figma: 48×48, left:10, bottom:10 */}
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src="/lgog2.png" alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Desktop3 - Features Section
const Desktop3 = ({ className = "" }: { className?: string }) => {
  const cards = [
    {
      img: "/Group1.svg",
      title: "Measurement Management",
      body: "Store unlimited client measurements with high precision. Add photos, posture notes, and custom fields for every garment type.",
    },
    {
      img: "/Group2.svg",
      title: "Order Tracking",
      body: "Track garment status from cutting table to final fitting. Real-time production visibility for you and your team.",
    },
    {
      img: "/Group3.svg",
      title: "Smart Scheduling",
      body: "Automated fitting reminders and production deadlines. Sync your calendar to manage boutique appointments seamlessly.",
    },
    {
      img: "/Group4.svg",
      title: "Team Collaboration",
      body: "Assign tasks to tailors, cutters, and finishers. Share measurement sheets instantly across your workshop.",
    },
  ];

  return (
    <section
      className={`bg-foundation-secondary-light-active overflow-hidden flex flex-col items-center py-[100px] px-[184px] box-border max-w-full text-center text-xs text-foundation-primary-normal font-[Satoshi] mq1125:px-[80px] mq1125:pt-[65px] mq1125:pb-[65px] mq960:px-10 mq800:py-[60px] mq450:px-4 mq450:py-[48px] ${className}`}
    >
      <div className="w-full max-w-[1072px] flex flex-col items-center gap-10 mq800:gap-6 mq450:gap-5">
        <FrameComponent
          productFeatures="Product Features"
          heading="Why Tailora Is "
          headingHighlight="Right for You"
          everythingYouNeedToMoveFrom="Everything you need to move from messy paper notebooks to a digital-first tailoring atelier."
        />

        {/* CSS grid — fluid, no breakpoint hacks needed */}
        <style>{`
          .tailora-features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
            width: 100%;
          }
          @media (max-width: 680px) {
            .tailora-features-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        `}</style>

        <div className="tailora-features-grid">
          {cards.map((card) => (
            <MeasurementRows
              key={card.title}
              scheduleContainers={card.img}
              measurementManagement={card.title}
              storeUnlimitedClientMeasurements={card.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Desktop2 - How It Works Section
const Desktop2 = ({ className = "" }: { className?: string }) => {
  return (
    <main
      className={`w-full bg-foundation-secondary-light-active overflow-hidden flex flex-col items-start py-[100px] px-[113px] box-border max-w-full text-center text-xs text-foundation-primary-normal font-[Satoshi] mq800:py-[60px] mq800:px-10 mq450:px-4 mq450:py-[48px] mq1350:pt-[65px] mq1350:pb-[65px] mq1350:box-border ${className}`}
    >
      <div className="self-stretch flex flex-col items-center gap-[62px] max-w-full mq800:gap-8 mq450:gap-6">

        {/* ── Section header ── */}
        <div className="w-[700px] max-w-full flex flex-col items-center gap-4">
          <div className="rounded-[10px] bg-foundation-secondary-normal border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px]">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-[50%] bg-[#E57301]" />
              <div className="relative leading-5 font-medium">How It Works</div>
            </div>
          </div>
          <h2 className="m-0 self-stretch text-[40px] leading-[48px] font-bold font-[Sora] mq800:text-[32px] mq800:leading-[38px] mq450:text-2xl mq450:leading-[29px]">
            <span>Your Workflow, </span>
            <span className="text-[#E57301]">Reimagined</span>
          </h2>
        </div>

        <div className="w-full max-w-[1214px] mx-auto flex flex-col gap-10 mq800:gap-5 items-stretch">

          {/* ════════════════════════════════════════════
              STEP 1 — orange card
              Desktop  : flex-row, image right, full width
              Tablet   : flex-row, image right, full width (just smaller)
              Mobile   : flex-col, image bottom
          ════════════════════════════════════════════ */}
          <section
            className="
              w-full rounded-[40px] bg-[#e57301] overflow-hidden
              flex flex-row items-center
              gap-[109px] pt-7 px-10 pb-7
              text-left text-[#fff] font-[Sora]
              mq1350:gap-[54px]
              mq800:flex-col mq800:items-start
              mq800:gap-6 mq800:pt-8 mq800:px-6 mq800:pb-0
            "
          >
            {/* Text */}
            <div className="flex flex-col items-start gap-6 shrink-0 mq800:gap-3 mq800:shrink-unset mq800:w-full">
              <h2
                className="
                  m-0 text-[32px] leading-8 font-bold font-[Sora]
                  w-[489px] max-w-full
                  mq800:w-full mq800:text-xl mq800:leading-7
                "
              >
                Add Clients &amp; Measurements
              </h2>
              <p
                className="
                  m-0 text-lg leading-6 font-[Satoshi] text-[#fffefd]
                  w-[540px] max-w-full
                  mq800:w-full mq800:text-sm mq800:leading-[22px]
                "
              >
                Create digital profiles for your clients. Record over 30+ body
                points with visual guides ensuring your team gets the
                measurements right every single time.
              </p>
            </div>

            {/* Image — on desktop/tablet it sits right; on mobile it sits below */}
            <div
              className="
                relative shrink-0 self-end
                h-[292px] w-[463px] max-w-full
                mq800:w-full mq800:h-[240px] mq800:self-center
                mq450:h-[200px]
              "
            >
              {/* Desktop image */}
              <img
                src="/image32.png"
                alt=""
                className="h-full w-full object-contain object-bottom mq800:hidden"
              />
              {/* Mobile image — full-width crop, sits flush at bottom */}
              <img
                src="/mobile-image32.png"
                alt=""
                className="hidden h-full w-full object-contain object-left-bottom mq800:block"
              />
            </div>
          </section>

          {/* ════════════════════════════════════════════
              STEPS 2 & 3 row
              Desktop (≥960px) : side by side, equal flex, fixed 636px height
              Tablet  (<960px) : STILL side by side but fluid height
              Mobile  (<600px) : stack vertically
          ════════════════════════════════════════════ */}
          <div
            className="
              flex w-full flex-row gap-[38px]
              mq960:gap-6
              mq450:flex-col mq450:items-stretch mq450:gap-5
            "
          >

            {/* ── STEP 2 — purple card ── */}
            <section
              className="
                relative overflow-hidden rounded-3xl bg-[#7e015c]
                text-left text-[#fff] font-[Sora]
                flex-1 min-w-0
                flex flex-col
                mq450:w-full
              "
            >
              {/* Decorative star SVGs — only shown when card is wide enough */}
              <Image
                className="absolute left-[-86px] top-[506px] h-[200px] w-[200px] rounded-lg mq960:hidden"
                loading="lazy"
                width={200}
                height={200}
                alt=""
                src="/First-Star-Pair.svg"
              />
              <Image
                className="absolute right-[-96px] top-[-84px] h-[200px] w-[200px] rounded-lg mq960:hidden"
                width={200}
                height={200}
                alt=""
                src="/First-Star-Pair.svg"
              />

              {/* Image block */}
              <div
                className="
                  relative z-[1] mx-10 mt-[41px]
                  h-[377px] overflow-hidden rounded-2xl
                  mq960:mx-6 mq960:mt-6 mq960:h-[240px]
                  mq450:h-[200px]
                "
              >
                <img
                  src="/image30.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Text block */}
              <div className="relative z-[1] px-10 pt-[34px] pb-10 mq960:px-6 mq960:pt-5 mq960:pb-8">
                <h2
                  className="
                    m-0 mb-2 text-[32px] leading-8 font-bold
                    mq960:text-xl mq960:leading-7
                  "
                >
                  Create &amp; Track Orders
                </h2>
                <p
                  className="
                    m-0 text-lg leading-6 font-[Satoshi] text-[#fffefd]
                    mq960:text-sm mq960:leading-[22px]
                  "
                >
                  Convert measurements into orders instantly. Monitor fabric
                  procurement, cutting progress, and embroidery stages through a
                  visual Kanban board.
                </p>
              </div>
            </section>

            {/* ── STEP 3 — green card ── */}
            <section
              className="
                relative overflow-hidden rounded-3xl bg-[#007f61]
                text-left text-[#fff] font-[Sora]
                flex-1 min-w-0
                flex flex-col
                mq450:w-full
              "
            >
              {/* Image block */}
              <div
                className="
                  relative z-[1] mx-10 mt-[41px]
                  h-[377px] overflow-hidden rounded-2xl
                  mq960:mx-6 mq960:mt-6 mq960:h-[240px]
                  mq450:h-[200px]
                "
              >
                <img
                  src="/image31.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Text block */}
              <div className="relative z-[1] px-10 pt-[34px] pb-10 mq960:px-6 mq960:pt-5 mq960:pb-8">
                <h2
                  className="
                    m-0 mb-2 text-[32px] leading-8 font-bold
                    mq960:text-xl mq960:leading-7
                  "
                >
                  Deliver On Time
                </h2>
                <p
                  className="
                    m-0 text-lg leading-6 font-[Satoshi] text-[#fffefd]
                    mq960:text-sm mq960:leading-[22px]
                  "
                >
                  Automated notifications alert clients for final fittings.
                  Secure their satisfaction with consistent fit quality and
                  professional documentation.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
};


// Desktop - Pricing Section
const Desktop = ({ className = "" }: { className?: string }) => {
  return (
    <section
      className={`self-stretch bg-foundation-secondary-light-active overflow-hidden flex flex-col items-center justify-center pt-[100px] px-5 pb-[60px] mq800:pt-[60px] mq800:pb-10 mq450:pt-[48px] mq450:pb-8 ${className}`}
    >
      <div className="w-[914px] max-w-full flex flex-col items-center gap-10 mq450:gap-6">
        <FrameComponent
          productFeatures="Pricing"
          heading="Atelier-Ready "
          headingHighlight="Pricing"
          everythingYouNeedToMoveFrom="Simple, transparent plans for every scale of fashion business."
        />
        <section className="self-stretch flex items-start justify-center gap-10 text-left text-base text-foundation-primary-normal font-[Sora] mq960:flex-wrap mq960:gap-6 mq450:gap-5 mq800:flex-col mq800:items-center mq450:px-2">
          {/* Starter */}
          <div className="w-[276px] mq960:w-full mq960:max-w-[400px] mq800:w-full mq800:max-w-[340px] flex flex-col items-start">
            <TierColumns sTARTER="STARTER" />
            <div className="self-stretch rounded-t-none rounded-b-3xl bg-foundation-secondary-light-active border-foundation-primary-normal border-solid border-r-[1px] border-b-[1px] border-l-[1px] flex flex-col items-start pt-6 px-[23px] pb-[22px] gap-[60px] text-sm mq450:gap-[30px]">
              <div className="self-stretch flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <div className="self-stretch relative leading-[22px]">Features</div>
                  <div className="self-stretch h-[23px] relative text-xs leading-6 text-foundation-gray-dark flex items-center font-[Satoshi]">
                    <span><span>{`Everything in `}</span><b>Free plan</b></span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-3 text-xs font-[Satoshi]">
                  <div className="self-stretch flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212" />
                      <path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212" />
                    </svg>
                    <div className="h-[23px] w-[123px] relative leading-6 flex items-center">Up to 50 Clients</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212" />
                      <path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212" />
                    </svg>
                    <div className="relative leading-5">Core Measurement Tools</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212" />
                      <path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212" />
                    </svg>
                    <div className="relative leading-5">1 User</div>
                  </div>
                </div>
              </div>
              <button className="cursor-pointer border-foundation-primary-normal border-solid border-[1px] py-1.5 px-2.5 bg-[transparent] w-full rounded-[40px] box-border flex items-center justify-center hover:bg-[rgba(69,69,69,0.09)]">
                <div className="relative text-sm leading-5 font-[Satoshi] text-foundation-primary-normal text-left">Chooser Starters</div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

// Desktop1 - CTA Section
const Desktop1 = ({ className = "" }: { className?: string }) => {
  return (
    <section
      className={`self-stretch bg-foundation-secondary-light-active overflow-hidden flex flex-col items-center justify-center py-[100px] px-5 box-border max-w-full text-center text-[40px] text-[#fff] font-[Sora] mq800:py-[60px] mq450:py-[48px] ${className}`}
    >
      <div className="w-full max-w-[913px] shadow-[0px_0px_4.7px_rgba(0,_0,_0,_0.08)] rounded-[40px] bg-foundation-primary-normal overflow-hidden flex flex-col items-center justify-center pt-[60px] px-8 pb-[60px] box-border relative mq450:rounded-[28px] mq450:pt-10 mq450:pb-10 mq450:px-5">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
          <Image
            className="w-full h-full object-cover"
            width={362}
            height={362}
            sizes="100vw"
            alt=""
            src="/Promo-Shape.svg"
          />
        </div>
        <div className="absolute inset-0 [background:radial-gradient(91.31%_42.05%_at_50%_39.23%,_rgba(18,_18,_18,_0),_#121212_65.03%)] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[617px] flex flex-col items-center gap-4">
          <h1 className="m-0 w-full relative text-[length:inherit] leading-[48px] font-semibold font-[inherit] mq800:text-[32px] mq800:leading-[38px] mq450:text-2xl mq450:leading-[30px]">
            Still undecided? Let us help you
          </h1>
          <div className="w-full relative text-base leading-6 font-[Satoshi] text-foundation-secondary-dark flex items-center justify-center mq450:text-sm">
            Join 1,200+ fashion houses that use Tailora to power their ateliers every day.
          </div>
          <div className="mt-4">
            <button className="cursor-pointer [border:none] py-[13px] px-6 bg-[#fdf6ec] h-[46px] w-[175px] rounded-[999px] overflow-hidden shrink-0 flex items-center justify-center box-border">
              <div className="relative text-sm leading-5 font-medium font-[Satoshi] text-[#121212] text-left">
                <a href="/contact">Talk to us</a>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Desktop5 - Footer Section
const Desktop5 = ({ className = "" }: { className?: string }) => {
  return (
    <footer
      className={`self-stretch rounded-t-[100px] mq800:rounded-t-[60px] mq450:rounded-t-[40px] rounded-b-none bg-foundation-primary-normal overflow-hidden flex flex-col items-start pt-[106px] px-[113px] pb-6 box-border gap-[127px] max-w-full text-left text-lg text-[#fff] font-[Sora] mq800:gap-16 mq800:pl-10 mq800:pr-10 mq800:pt-16 mq450:gap-10 mq450:pl-5 mq450:pr-5 mq450:pt-12 mq1125:pt-[69px] mq1125:pb-5 mq1125:box-border ${className}`}
    >
      {/* Top section: tagline + links */}
      <div className="flex items-start gap-[238px] max-w-full w-full mq800:gap-10 mq800:flex-col mq1350:gap-[80px] mq450:gap-6">
        {/* Left: tagline + socials */}
        <div className="w-[498px] max-w-full flex flex-col items-start gap-8 mq800:w-full mq800:gap-5 mq450:w-full">
          <div className="self-stretch relative leading-8 font-semibold mq450:text-base mq450:leading-6">
            Empowering fashion designers and master tailors with precision digital tools.
          </div>
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {[
              { src: "/facebook-circle-fill.svg", alt: "Facebook" },
              { src: "/tiktok-fill.svg", alt: "TikTok" },
              { src: "/instagram-line.svg", alt: "Instagram" },
              { src: "/youtube-fill.svg", alt: "YouTube" },
            ].map(({ src, alt }) => (
              <button
                key={alt}
                className="cursor-pointer border-[rgba(255,255,255,0.25)] border-solid border-[1px] p-0 bg-[transparent] h-[50px] w-[50px] rounded-[50px] box-border flex items-center justify-center"
              >
                <Image className="h-6 w-full relative" width={24} height={24} sizes="100vw" alt={alt} src={src} />
              </button>
            ))}
          </div>
        </div>

        {/* Right: nav links */}
        <div className="w-[478px] max-w-full flex items-start justify-between gap-5 text-base text-foundation-secondary-normal font-[Satoshi] mq800:w-full mq450:gap-8 mq450:flex-col mq450:items-start">
          <div className="flex flex-col items-start gap-3.5">
            <h3 className="m-0 self-stretch relative text-lg leading-8 font-semibold font-[Sora] text-[#fff]">Company</h3>
            <div className="self-stretch h-6 relative leading-6 flex items-center cursor-pointer hover:text-white transition-colors">Contact Support</div>
            <div className="self-stretch h-6 relative leading-6 flex items-center cursor-pointer hover:text-white transition-colors">Privacy Policy</div>
          </div>
          <div className="flex flex-col items-start gap-3.5">
            <h3 className="m-0 self-stretch relative text-lg leading-8 font-semibold font-[Sora] text-[#fff]">Product</h3>
            <div className="self-stretch h-6 relative leading-6 flex items-center cursor-pointer hover:text-white transition-colors">Features</div>
            <div className="self-stretch h-6 relative leading-6 flex items-center cursor-pointer hover:text-white transition-colors">Pricing</div>
          </div>
        </div>
      </div>

      {/* Bottom: large brand name + copyright */}
      <div className="flex flex-col items-start gap-[9px] text-center w-full overflow-hidden">
        <div className="flex items-start py-0 pl-[9px] pr-0 w-full">
          <h1 className="m-0 w-full relative text-[340px] leading-[388px] font-bold font-[inherit] text-[rgba(241,241,242,0.2)] mq1125:text-[200px] mq960:text-[140px] mq960:leading-[160px] mq800:text-[120px] mq800:leading-[140px] mq450:text-[72px] mq450:leading-[86px]">
            Tailora
          </h1>
        </div>
        <div className="w-[221px] h-6 relative text-xs leading-[22px] font-[Satoshi] text-foundation-secondary-normal text-left flex items-center">
          © 2024 Tailora. Precision in every stitch.
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Page() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".tailora-landing-reveal");
    if (!reveals.length) return;

    const show = (el: Element) => el.classList.add("is-visible");

    if (typeof IntersectionObserver === "undefined") {
      reveals.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tailora-landing relative bg-foundation-secondary-light-active w-full overflow-hidden flex flex-col items-stretch leading-[normal] tracking-[normal]">
      <Desktop4 />
      <Desktop3 className="tailora-landing-reveal" />
      <Desktop2 className="tailora-landing-reveal" />
      <Desktop className="tailora-landing-reveal" />
      <Desktop1 className="tailora-landing-reveal" />
      <Desktop5 className="tailora-landing-reveal" />
    </div>
  );
}

"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";

// Button Component
const Button = ({
  className = "",
  property1 = "Default",
  buttonBackgroundColor,
  createAccountColor,
}: {
  className?: string;
  property1?: string;
  buttonBackgroundColor?: CSSProperties["backgroundColor"];
  createAccountColor?: CSSProperties["color"];
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
      className={`cursor-pointer [border:none] py-[13px] px-6 bg-foundation-primary-normal h-[46px] w-[175px] rounded-[999px] overflow-hidden shrink-0 flex items-center justify-center box-border ${className}`}
      style={buttonStyle}
    >
      <div
        className="relative text-sm leading-5 font-medium font-[Satoshi] text-[#fff] text-left"
        style={createAccountStyle}
      >
        <a href="/signup">Get Started</a>
      </div>
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
            {highlight && <span className="text-[#ffa82b]">{highlight}</span>}
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
      className={`h-[349px] w-[516px] mq960:w-full mq800:w-full mq800:max-w-full mq450:h-auto mq450:min-h-[320px] shadow-[0px_0px_4.7px_rgba(0,_0,_0,_0.08)] rounded-3xl bg-foundation-secondary-light-active border-[#ffa82b] border-solid border-[1px] box-border overflow-hidden flex flex-col items-start relative isolate max-w-full text-left text-lg text-foundation-primary-normal font-[Sora] ${className}`}
    >
      <div className="w-full h-[480.8px] mq450:h-[320px] absolute m-0 top-[99.6px] left-[50%] -translate-x-1/2 rounded-[200px] overflow-hidden flex items-center justify-center z-[0]">
        <Image
          className="w-full h-full object-cover"
          width={480}
          height={480}
          sizes="100vw"
          alt=""
          src={scheduleContainers}
        />
      </div>
      <div className="w-full [backdrop-filter:blur(167.9px)] [background:linear-gradient(180deg,_#ffdfb3,_rgba(255,_223,_179,_0))] overflow-hidden shrink-0 flex items-start p-6 box-border max-w-full z-[1]">
        <div className="w-full flex flex-col items-start gap-[7px]">
          <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[26px] font-semibold font-[inherit] mq450:text-base">
            {measurementManagement}
          </h3>
          <div className="self-stretch relative text-base leading-6 font-[Satoshi] text-[#696969] mq450:text-sm">
            {storeUnlimitedClientMeasurements}
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop4 - Hero/Navbar Section
const Desktop4 = ({ className = "" }: { className?: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section
      className={`w-full rounded-t-none rounded-b-[100px] mq800:rounded-b-[60px] mq450:rounded-b-[40px] bg-[#ffedd4] flex flex-col items-center pt-6 px-[121px] mq1125:px-[60px] mq960:px-[40px] pb-0 box-border relative isolate gap-0 max-w-full overflow-hidden mq800:px-10 mq450:px-4 ${className}`}
    >
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

      {/* Navbar */}
      <header className="shadow-[0px_0px_4px_rgba(0,_0,_0,_0.04)] rounded-[60px] bg-[#fff] flex flex-col items-start justify-center py-3 pl-6 pr-3 top-6 z-[99] sticky w-full max-w-[1197px] shrink-0">
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

          {/* Nav links — hidden on tablet/mobile */}
          <div className="flex items-center gap-6 mq960:hidden mq800:hidden">
            {["Home", "Features", "Pricing", "How It Works"].map((item) => (
              <div key={item} className="flex items-center justify-center py-0 px-2 cursor-pointer">
                <div className="relative leading-[22px] font-medium">{item}</div>
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center justify-center py-0 px-2 cursor-pointer mq960:hidden mq800:hidden">
              <div className="relative leading-[22px] font-medium">Sign in</div>
            </div>
            <Button property1="Default" className="mq960:hidden mq800:hidden" />
            {/* Hamburger menu for mobile */}
            <button 
              className="mq960:flex mq800:flex hidden flex-col items-center justify-center gap-1.5 p-2 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-foundation-primary-normal rounded-full"></div>
              <div className="w-6 h-0.5 bg-foundation-primary-normal rounded-full"></div>
              <div className="w-6 h-0.5 bg-foundation-primary-normal rounded-full"></div>
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white rounded-b-[60px] shadow-[0px_4px_20px_rgba(0,_0,_0,_0.1)] z-[98] flex flex-col items-center gap-4 py-6 px-4 mq960:flex mq800:flex hidden">
            {["Home", "Features", "Pricing", "How It Works"].map((item) => (
              <div key={item} className="flex items-center justify-center py-2 px-4 cursor-pointer w-full">
                <div className="relative text-base leading-6 font-medium">{item}</div>
              </div>
            ))}
            <div className="flex items-center justify-center py-2 px-4 cursor-pointer w-full">
              <div className="relative text-base leading-6 font-medium">Sign in</div>
            </div>
            <Button property1="Default" />
          </div>
        )}
      </header>

      {/* Floating decorations — hidden on smaller screens */}
      <Image className="absolute top-[219px] left-[207px] w-[60px] h-[60px] object-contain z-[2] opacity-20 mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-14@2x.png" style={{ transform: "rotate(30.11deg)" }} />
      <Image className="absolute top-[334px] left-[179px] w-[60px] h-[60px] object-contain z-[2] opacity-20 mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-15@2x.png" style={{ transform: "rotate(-42.28deg)" }} />
      <Image className="absolute top-[445px] left-[257px] w-[60px] h-[60px] object-contain z-[2] opacity-20 mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-24@2x.png" style={{ transform: "rotate(-27.72deg)" }} />
      <Image className="absolute top-[219px] right-[207px] w-[60px] h-[60px] object-contain z-[2] opacity-20 mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-12@2x.png" />
      <Image className="absolute top-[333px] right-[167px] w-[60px] h-[60px] object-contain z-[2] opacity-20 mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-18@2x.png" style={{ transform: "rotate(-26.51deg)" }} />
      <Image className="absolute top-[445px] right-[256px] w-[60px] h-[60px] object-contain z-[2] opacity-20 mq1125:hidden" loading="lazy" width={60} height={60} sizes="100vw" alt="" src="/image-21@2x.png" />

      {/* Hero content */}
      <div className="relative z-[2] flex flex-col items-center gap-4 mt-[50px] mq800:mt-8 mq450:mt-6 max-w-[700px] w-full text-center">
        {/* Badge */}
        <div className="rounded-[10px] bg-[#fdf6ec] border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px]">
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-[50%] bg-[#ffa82b]" />
            <div className="relative text-xs leading-5 font-medium font-[Satoshi] text-foundation-primary-normal">{`FASHION CRM & ERP`}</div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="m-0 font-bold font-[Sora] text-foundation-primary-normal w-full"
          style={{ fontSize: "clamp(28px, 5.5vw, 64px)", lineHeight: "1.15" }}
        >
          Track measurements and orders easily
        </h1>

        {/* Subtext */}
        <p className="m-0 text-base leading-6 font-[Satoshi] text-[#696969] max-w-[600px] mq800:text-sm">
          Tailora helps fashion designers organize client measurements, manage
          deliveries, and collaborate with their team — all in one smart
          workspace.
        </p>

        {/* CTA */}
        <Button
          property1="Default"
          buttonBackgroundColor="#121212"
          createAccountColor="#fff"
        />
      </div>

      {/* Hero Image */}
      <div className="relative z-[2] mt-10 mq450:mt-6 w-full flex justify-center">
        <Image
          className="w-full max-w-[800px] h-auto object-cover rounded-2xl mq450:rounded-xl"
          loading="lazy"
          width={800}
          height={533}
          sizes="100vw"
          alt="Tailora fashion designers"
          src="/ChatGPT-Image-Apr-26-2026-01-43-19-AM-1@2x.png"
        />
      </div>
    </section>
  );
};

// Desktop3 - Features Section
const Desktop3 = ({ className = "" }: { className?: string }) => {
  return (
    <section
      className={`bg-foundation-secondary-light-active overflow-hidden flex flex-col items-center py-[100px] px-[184px] box-border max-w-full text-center text-xs text-foundation-primary-normal font-[Satoshi] mq800:py-[60px] mq800:px-[40px] mq450:px-4 mq450:py-[48px] mq1125:pt-[65px] mq1125:pb-[65px] mq1125:box-border ${className}`}
    >
      <div className="w-[1072px] max-w-full flex flex-col items-center gap-10 mq800:gap-6 mq450:gap-5">
        <FrameComponent
          productFeatures="Product Features"
          heading="Why Tailora Is "
          headingHighlight="Right for You"
          everythingYouNeedToMoveFrom="Everything you need to move from messy paper notebooks to a digital-first tailoring atelier."
        />
        <div className="self-stretch flex flex-col items-center gap-10 max-w-full mq800:gap-5">
          {/* Row 1 */}
          <section className="self-stretch flex items-center gap-10 max-w-full text-left text-lg text-foundation-primary-normal font-[Sora] mq960:flex-col mq960:gap-4 mq800:gap-5 mq800:flex-col mq450:gap-4">
            <MeasurementRows
              scheduleContainers="/Schedule-Containers@2x.png"
              measurementManagement="Measurement Management"
              storeUnlimitedClientMeasurements="Store unlimited client measurements with high precision. Add photos, posture notes, and custom fields for every garment type."
            />
            <MeasurementRows
              scheduleContainers="/Frame-2147224771@2x.png"
              measurementManagement="Order Tracking"
              storeUnlimitedClientMeasurements="Track garment status from cutting table to final fitting. Real-time production visibility for you and your team."
            />
          </section>
          {/* Row 2 */}
          <section className="self-stretch flex items-center gap-10 max-w-full mq960:flex-col mq960:gap-4 mq800:gap-5 mq800:flex-col mq450:gap-4">
            <MeasurementRows
              scheduleContainers="/Frame-21472247712@2x.png"
              measurementManagement="Smart Scheduling"
              storeUnlimitedClientMeasurements="Automated fitting reminders and production deadlines. Sync your calendar to manage boutique appointments seamlessly."
            />
            <MeasurementRows
              scheduleContainers="/Frame-21472247711@2x.png"
              measurementManagement="Team Collaboration"
              storeUnlimitedClientMeasurements="Assign tasks to tailors, cutters, and finishers. Share measurement sheets instantly across your workshop."
            />
          </section>
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
        {/* Section header */}
        <div className="w-[700px] max-w-full flex flex-col items-center gap-4">
          <div className="rounded-[10px] bg-foundation-secondary-normal border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px]">
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 relative rounded-[50%] bg-[#ffa82b]" />
              <div className="relative leading-5 font-medium">How It Works</div>
            </div>
          </div>
          <h2 className="m-0 self-stretch relative text-[40px] leading-[48px] font-bold font-[Sora] mq800:text-[32px] mq800:leading-[38px] mq450:text-2xl mq450:leading-[29px]">
            <span>{`Your Workflow, `}</span>
            <span className="text-[#ffa82b]">Reimagined</span>
          </h2>
        </div>

        <div className="self-stretch flex flex-col items-center gap-10 max-w-full mq800:gap-5">
          {/* Step 1 — orange card */}
          <section className="w-full max-w-[1214px] rounded-[40px] bg-[#e57301] overflow-hidden shrink-0 flex items-center pt-7 px-10 pb-7 box-border relative gap-[109px] text-left text-[32px] text-[#fff] font-[Sora] mq800:flex-col mq800:gap-6 mq800:px-6 mq800:pt-8 mq800:pb-8 mq1350:gap-[54px] mq450:rounded-[28px] mq450:px-4 mq450:pt-6 mq450:pb-6">
            <div className="flex flex-col items-start gap-6 shrink-0 mq800:w-full">
              <h2 className="m-0 w-[489px] max-w-full relative text-[length:inherit] leading-8 font-bold font-[inherit] mq800:text-2xl mq800:leading-[30px] mq450:text-xl mq450:leading-7">{`Add Clients & Measurements`}</h2>
              <div className="w-[540px] max-w-full relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light mq450:text-base">
                Create digital profiles for your clients. Record over 30+ body
                points with visual guides ensuring your team gets the
                measurements right every single time.
              </div>
            </div>
            <div className="h-[292px] w-[463px] max-w-full relative shrink-0 mq800:w-full mq800:h-[240px] mq450:h-[200px]">
              <div className="absolute top-[20px] left-[19px] rounded-2xl bg-[#fedcb3] w-[444px] max-w-[calc(100%-19px)] h-[272px] mq800:h-[220px] mq450:h-[180px] overflow-hidden" />
              <Image
                className="absolute top-[0px] left-[0px] rounded-2xl w-[447px] max-w-full h-[276px] mq800:h-[240px] mq450:h-[200px] object-cover z-[1]"
                loading="lazy"
                width={447}
                height={276}
                sizes="100vw"
                alt=""
                src="/Metrics-Container@2x.png"
              />
            </div>
          </section>

          {/* Steps 2 & 3 */}
          <div className="self-stretch flex items-center gap-10 max-w-full mq960:flex-col mq960:gap-5 mq800:gap-5 mq800:flex-col mq450:gap-4">
            {/* Step 2 — purple card */}
            <section className="h-[636px] w-[588px] mq960:w-full mq960:h-auto max-w-full rounded-3xl bg-[#7e015c] overflow-hidden shrink-0 flex flex-col items-end pt-[57px] px-10 pb-[41px] box-border relative isolate gap-10 text-left text-[32px] text-[#fff] font-[Sora] mq800:w-full mq800:h-auto mq800:pt-10 mq800:pb-10 mq800:gap-6 mq800:items-start mq450:rounded-[28px] mq450:px-4 mq450:pt-6 mq450:pb-6">
              <Image
                className="w-[200px] h-[200px] absolute top-[506px] left-[-86px] rounded-lg shrink-0 mq800:hidden"
                loading="lazy"
                width={200}
                height={200}
                sizes="100vw"
                alt=""
                src="/First-Star-Pair.svg"
              />
              <Image
                className="w-[200px] h-[200px] absolute top-[-84px] left-[504px] rounded-lg shrink-0 mq800:hidden"
                width={200}
                height={200}
                sizes="100vw"
                alt=""
                src="/First-Star-Pair.svg"
              />
              <div className="w-full relative rounded-2xl bg-[#d4aedf] overflow-hidden shrink-0 z-[1] h-[300px] mq800:h-[240px] mq450:h-[200px]" />
              <div className="flex flex-col items-start gap-6 z-[1] shrink-0 w-full">
                <h2 className="m-0 w-full relative text-[length:inherit] leading-8 font-bold font-[inherit] mq800:text-2xl mq800:leading-[30px] mq450:text-xl mq450:leading-7">{`Create & Track Orders`}</h2>
                <div className="w-full relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light mq450:text-base">
                  Convert measurements into orders instantly. Monitor fabric
                  procurement, cutting progress, and embroidery stages through a
                  visual Kanban board.
                </div>
              </div>
              <Image
                className="w-[492px] max-w-[calc(100%-80px)] h-[300px] mq800:h-[240px] mq450:h-[200px] absolute top-[41px] left-[40px] mq450:left-[16px] rounded-2xl object-cover z-[2] shrink-0"
                width={492}
                height={377}
                sizes="100vw"
                alt=""
                src="/Info-Segments@2x.png"
              />
            </section>

            {/* Step 3 — green card */}
            <section className="h-[636px] w-[588px] mq960:w-full mq960:h-auto max-w-full rounded-3xl bg-[#007f61] overflow-hidden shrink-0 flex flex-col items-end pt-[41px] px-10 pb-[41px] box-border relative isolate gap-10 text-left text-[32px] text-[#fff] font-[Sora] mq800:w-full mq800:h-auto mq800:pt-10 mq800:pb-10 mq800:gap-6 mq800:items-start mq800:flex-col-reverse mq450:rounded-[28px] mq450:px-4 mq450:pt-6 mq450:pb-6">
              <Image
                className="w-[200px] h-[200px] absolute top-[401px] left-[-100px] shrink-0 mq800:hidden"
                width={200}
                height={200}
                sizes="100vw"
                alt=""
                src="/Star-5.svg"
              />
              <div className="flex flex-col items-start gap-6 z-[1] shrink-0 w-full">
                <h2 className="m-0 w-full relative text-[length:inherit] leading-8 font-bold font-[inherit] mq800:text-2xl mq800:leading-[30px] mq450:text-xl mq450:leading-7">
                  Deliver On Time
                </h2>
                <div className="w-full relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light mq450:text-base">
                  Automated notifications alert clients for final fittings.
                  Secure their satisfaction with consistent fit quality and
                  professional documentation.
                </div>
              </div>
              <div className="w-full h-[300px] mq800:h-[240px] mq450:h-[200px] rounded-2xl bg-[#66b39f] overflow-hidden shrink-0 z-[1]" />
              <Image
                className="w-[492px] max-w-[calc(100%-80px)] h-[300px] mq800:h-[240px] mq450:h-[200px] absolute top-[41px] left-[40px] mq450:left-[16px] rounded-3xl object-cover z-[2] shrink-0"
                width={492}
                height={377}
                sizes="100vw"
                alt=""
                src="/Frame-2147224779@2x.png"
              />
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
<path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212"/>
<path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212"/>
</svg>
                    <div className="h-[23px] w-[123px] relative leading-6 flex items-center">Up to 50 Clients</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212"/>
<path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212"/>
</svg>
                    <div className="relative leading-5">Core Measurement Tools</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212"/>
<path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212"/>
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

          {/* Pro */}
          <div className="w-[276px] mq960:w-full mq960:max-w-[400px] mq800:w-full mq800:max-w-[340px] flex flex-col items-start">
            <div className="self-stretch rounded-t-3xl rounded-b-none [background:linear-gradient(244.53deg,_rgba(253,_246,_236,_0),_#ffe5c1)] border-foundation-primary-normal border-solid border-[1px] flex flex-col items-start py-[22px] px-[23px]">
              <div className="self-stretch flex flex-col items-start gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-9 relative leading-6 flex items-center shrink-0">PRO</div>
                  <div className="rounded-[10px] bg-foundation-secondary-normal border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px] text-center text-[10px] font-[Satoshi]">
                    <div className="flex items-center">
                      <div className="relative leading-[18px] font-medium">MOST POPULAR</div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-1 text-[32px]">
                  <div className="self-stretch relative leading-[48px]">
                    <b><span>₦0</span><span className="text-[40px]">{` `}</span></b>
                    <span className="text-base">Coming Soon</span>
                  </div>
                  <div className="self-stretch h-[23px] relative text-xs leading-5 font-medium font-[Satoshi] text-[#696969] flex items-center">Basic features for everyone</div>
                </div>
              </div>
            </div>
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
<path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212"/>
<path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212"/>
</svg>
                    <div className="h-[23px] w-[123px] relative leading-6 flex items-center">Unlimited Clients</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212"/>
<path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212"/>
</svg>
                    <div className="relative leading-5">Advanced Order Tracking</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#121212"/>
<path d="M10.58 15.5801C10.38 15.5801 10.19 15.5001 10.05 15.3601L7.22 12.5301C6.93 12.2401 6.93 11.7601 7.22 11.4701C7.51 11.1801 7.99 11.1801 8.28 11.4701L10.58 13.7701L15.72 8.6301C16.01 8.3401 16.49 8.3401 16.78 8.6301C17.07 8.9201 17.07 9.4001 16.78 9.6901L11.11 15.3601C10.97 15.5001 10.78 15.5801 10.58 15.5801Z" fill="#121212"/>
</svg>
                    <div className="relative leading-5">Client SMS Notifications</div>
                  </div>
                </div>
              </div>
              <button className="cursor-pointer border-foundation-primary-normal border-solid border-[1px] py-1.5 px-2.5 bg-foundation-primary-normal w-full rounded-[40px] box-border flex items-center justify-center hover:bg-[#454545]">
                <div className="relative text-sm leading-5 font-[Satoshi] text-foundation-primary-light text-left">Chooser Pro</div>
              </button>
            </div>
          </div>

          {/* Team */}
          <div className="w-[276px] mq960:w-full mq960:max-w-[400px] mq800:w-full mq800:max-w-[340px] flex flex-col items-start text-sm">
            <TierColumns sTARTER="TEAM" />
            <div className="self-stretch rounded-t-none rounded-b-3xl bg-foundation-secondary-light-active border-foundation-primary-normal border-solid border-r-[1px] border-b-[1px] border-l-[1px] flex flex-col items-start pt-6 px-[23px] pb-[22px] gap-[60px] mq450:gap-[30px]">
              <div className="self-stretch flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <div className="self-stretch relative leading-[22px]">Features</div>
                  <div className="self-stretch h-[23px] relative text-xs leading-6 text-foundation-gray-dark flex items-center font-[Satoshi]">
                    <span><span>{`Everything in `}</span><b>Free plan</b></span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-3 text-xs font-[Satoshi]">
                  <div className="self-stretch flex items-center gap-3">
                    <Image className="h-6 w-6 relative" loading="lazy" width={24} height={24} sizes="100vw" alt="" src="/vuesax-bulk-tick-circle.svg" />
                    <div className="h-[23px] w-[123px] relative leading-6 flex items-center">Multi-Location Support</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <Image className="h-6 w-6 relative" loading="lazy" width={24} height={24} sizes="100vw" alt="" src="/vuesax-bulk-tick-circle.svg" />
                    <div className="relative leading-5">White-label Reports</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <Image className="h-6 w-6 relative" loading="lazy" width={24} height={24} sizes="100vw" alt="" src="/vuesax-bulk-tick-circle.svg" />
                    <div className="relative leading-5">Unlimited Users</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <Image className="h-6 w-6 relative" width={24} height={24} sizes="100vw" alt="" src="/vuesax-bulk-tick-circle.svg" />
                    <div className="relative leading-5">Dedicated Account Manager</div>
                  </div>
                </div>
              </div>
              <button className="cursor-pointer border-foundation-primary-normal border-solid border-[1px] py-1.5 px-2.5 bg-[transparent] w-full rounded-[40px] box-border flex items-center justify-center hover:bg-[rgba(69,69,69,0.09)]">
                <div className="relative text-sm leading-5 font-[Satoshi] text-foundation-primary-normal text-left">Chooser Team</div>
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
  return (
    <div className="relative bg-foundation-secondary-light-active w-full overflow-hidden flex flex-col items-stretch leading-[normal] tracking-[normal]">
      <Desktop4 />
      <Desktop3 />
      <Desktop2 />
      <Desktop />
      <Desktop1 />
      <Desktop5 />
    </div>
  );
}

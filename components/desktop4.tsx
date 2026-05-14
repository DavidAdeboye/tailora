import type { NextPage } from "next";

import Image from "next/image";

import Button from "./button";



export type Desktop4Type = {

  className?: string;

};



const Desktop4: NextPage<Desktop4Type> = ({ className = "" }) => {

  return (

    <section

      className={`w-full rounded-t-none rounded-b-[100px] mq800:rounded-b-[60px] mq450:rounded-b-[40px] bg-[#ffedd4] flex flex-col items-center pt-6 px-[121px] pb-0 box-border relative isolate gap-0 max-w-full overflow-hidden mq800:px-10 mq450:px-4 ${className}`}

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

          <div className="flex items-center gap-6 mq800:hidden">

            {["Home", "Features", "Pricing", "How It Works"].map((item) => (

              <div key={item} className="flex items-center justify-center py-0 px-2 cursor-pointer">

                <div className="relative leading-[22px] font-medium">{item}</div>

              </div>

            ))}

          </div>



          {/* Right side */}

          <div className="flex items-center gap-4 shrink-0">

            <div className="flex items-center justify-center py-0 px-2 cursor-pointer mq800:hidden">

              <div className="relative leading-[22px] font-medium">Sign in</div>

            </div>

            <Button property1="Default" />

          </div>

        </nav>

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



        {/* Heading — uses clamp() so it scales fluidly with viewport width */}

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



export default Desktop4;
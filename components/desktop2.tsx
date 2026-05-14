"use client";
import type { NextPage } from "next";
import Image from "next/image";

export type Desktop2Type = {
  className?: string;
};

const Desktop2: NextPage<Desktop2Type> = ({ className = "" }) => {
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
          <section className="w-full max-w-[1214px] rounded-[40px] bg-[#e57301] overflow-hidden shrink-0 flex items-center pt-7 px-10 pb-7 box-border relative gap-[109px] text-left text-[32px] text-[#fff] font-[Sora] mq800:flex-col mq800:gap-6 mq800:px-6 mq800:pt-8 mq800:pb-8 mq1350:gap-[54px]">
            <div className="flex flex-col items-start gap-6 shrink-0 mq800:w-full">
              <h2 className="m-0 w-[489px] max-w-full relative text-[length:inherit] leading-8 font-bold font-[inherit] mq800:text-2xl mq800:leading-[30px] mq450:text-xl mq450:leading-7">{`Add Clients & Measurements`}</h2>
              <div className="w-[540px] max-w-full relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light">
                Create digital profiles for your clients. Record over 30+ body
                points with visual guides ensuring your team gets the
                measurements right every single time.
              </div>
            </div>
            <div className="h-[292px] w-[463px] max-w-full relative shrink-0 mq800:w-full mq800:h-[240px]">
              <div className="absolute top-[20px] left-[19px] rounded-2xl bg-[#fedcb3] w-[444px] max-w-[calc(100%-19px)] h-[272px] mq800:h-[220px] overflow-hidden" />
              <Image
                className="absolute top-[0px] left-[0px] rounded-2xl w-[447px] max-w-full h-[276px] mq800:h-[240px] object-cover z-[1]"
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
          <div className="self-stretch flex items-center gap-10 max-w-full mq800:gap-5 mq800:flex-col">
            {/* Step 2 — purple card */}
            <section className="h-[636px] w-[588px] max-w-full rounded-3xl bg-[#7e015c] overflow-hidden shrink-0 flex flex-col items-end pt-[57px] px-10 pb-[41px] box-border relative isolate gap-10 text-left text-[32px] text-[#fff] font-[Sora] mq800:w-full mq800:h-auto mq800:pt-10 mq800:pb-10 mq800:gap-6 mq800:items-start">
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
              <div className="w-full relative rounded-2xl bg-[#d4aedf] overflow-hidden shrink-0 z-[1] h-[300px] mq800:h-[240px]" />
              <div className="flex flex-col items-start gap-6 z-[1] shrink-0 w-full">
                <h2 className="m-0 w-full relative text-[length:inherit] leading-8 font-bold font-[inherit] mq800:text-2xl mq800:leading-[30px] mq450:text-xl mq450:leading-7">{`Create & Track Orders`}</h2>
                <div className="w-full relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light">
                  Convert measurements into orders instantly. Monitor fabric
                  procurement, cutting progress, and embroidery stages through a
                  visual Kanban board.
                </div>
              </div>
              <Image
                className="w-[492px] max-w-[calc(100%-80px)] h-[300px] mq800:h-[240px] absolute top-[41px] left-[40px] rounded-2xl object-cover z-[2] shrink-0"
                width={492}
                height={377}
                sizes="100vw"
                alt=""
                src="/Info-Segments@2x.png"
              />
            </section>

            {/* Step 3 — green card */}
            <section className="h-[636px] w-[588px] max-w-full rounded-3xl bg-[#007f61] overflow-hidden shrink-0 flex flex-col items-end pt-[41px] px-10 pb-[41px] box-border relative isolate gap-10 text-left text-[32px] text-[#fff] font-[Sora] mq800:w-full mq800:h-auto mq800:pt-10 mq800:pb-10 mq800:gap-6 mq800:items-start mq800:flex-col-reverse">
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
                <div className="w-full relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light">
                  Automated notifications alert clients for final fittings.
                  Secure their satisfaction with consistent fit quality and
                  professional documentation.
                </div>
              </div>
              <div className="w-full h-[300px] mq800:h-[240px] rounded-2xl bg-[#66b39f] overflow-hidden shrink-0 z-[1]" />
              <Image
                className="w-[492px] max-w-[calc(100%-80px)] h-[300px] mq800:h-[240px] absolute top-[41px] left-[40px] rounded-3xl object-cover z-[2] shrink-0"
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

export default Desktop2;
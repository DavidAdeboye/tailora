"use client";
import type { NextPage } from "next";
import Image from "next/image";

export type Desktop2Type = {
  className?: string;
};

const Desktop2: NextPage<Desktop2Type> = ({ className = "" }) => {
  return (
    <main
      className={`w-full bg-foundation-secondary-light-active overflow-hidden flex flex-col items-start py-[100px] px-[113px] box-border max-w-full text-center text-xs text-foundation-primary-normal font-[Satoshi] mq800:py-[42px] mq800:px-14 mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq1350:pt-[65px] mq1350:pb-[65px] mq1350:box-border ${className}`}
    >
      <div className="self-stretch flex flex-col items-center gap-[62px] max-w-full mq800:gap-[31px] mq450:gap-[15px]">
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
          <section className="w-full max-w-[1214px] h-[347px] rounded-[40px] bg-[#e57301] overflow-hidden shrink-0 flex items-start pt-7 px-10 pb-[27px] box-border relative isolate gap-[109px] text-left text-[32px] text-[#fff] font-[Sora] mq800:gap-[27px] mq1350:gap-[54px]">
            <div className="flex flex-col items-start pt-[22px] px-0 pb-0 shrink-0">
              <div className="flex flex-col items-start gap-6">
                <h2 className="m-0 w-[489px] h-8 relative text-[length:inherit] leading-8 font-bold font-[inherit] flex items-center mq800:text-[26px] mq800:leading-[26px] mq450:text-[19px] mq450:leading-[19px]">{`Add Clients & Measurements`}</h2>
                <div className="w-[540px] h-[65px] relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light flex items-center">
                  Create digital profiles for your clients. Record over 30+ body
                  points with visual guides ensuring your team gets the
                  measurements right every single time.
                </div>
              </div>
            </div>
            <div className="h-[292px] w-[463px] relative z-[3] shrink-0">
              <div className="absolute top-[20px] left-[19px] rounded-2xl bg-[#fedcb3] w-[444px] h-[272px] overflow-hidden" />
              <Image
                className="absolute top-[0px] left-[0px] rounded-2xl w-[447px] h-[276px] object-cover z-[1]"
                loading="lazy"
                width={447}
                height={276}
                sizes="100vw"
                alt=""
                src="/Metrics-Container@2x.png"
              />
            </div>
          </section>
          <div className="self-stretch flex items-center gap-10 max-w-full mq800:gap-5 mq1350:flex-wrap justify-center">
            <section className="h-[636px] w-[588px] rounded-3xl bg-[#7e015c] overflow-hidden shrink-0 flex flex-col items-end pt-[57px] px-10 pb-[41px] box-border relative isolate gap-10 max-w-full text-left text-[32px] text-[#fff] font-[Sora] mq800:gap-5 mq800:pt-[37px] mq800:pb-[27px] mq800:box-border">
              <Image
                className="w-[200px] h-[200px] absolute top-[506px] left-[-86px] rounded-lg shrink-0"
                loading="lazy"
                width={200}
                height={200}
                sizes="100vw"
                alt=""
                src="/First-Star-Pair.svg"
              />
              <Image
                className="w-[200px] h-[200px] absolute top-[-84px] left-[504px] rounded-lg shrink-0"
                width={200}
                height={200}
                sizes="100vw"
                alt=""
                src="/First-Star-Pair.svg"
              />
              <div className="w-[488px] h-[377px] relative rounded-2xl bg-[#d4aedf] overflow-hidden shrink-0 z-[1]" />
              <div className="flex flex-col items-start gap-6 z-[1] shrink-0">
                <h2 className="m-0 w-[508px] h-8 relative text-[length:inherit] leading-8 font-bold font-[inherit] flex items-center mq800:text-[26px] mq800:leading-[26px] mq450:text-[19px] mq450:leading-[19px]">{`Create & Track Orders`}</h2>
                <div className="w-[508px] h-[65px] relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light flex items-center">
                  Convert measurements into orders instantly. Monitor fabric
                  procurement, cutting progress, and embroidery stages through a
                  visual Kanban board.
                </div>
              </div>
              <Image
                className="w-[492px] h-[377px] absolute top-[41px] left-[40px] rounded-2xl object-cover z-[2] shrink-0"
                width={492}
                height={377}
                sizes="100vw"
                alt=""
                src="/Info-Segments@2x.png"
              />
            </section>
            <section className="h-[636px] w-[588px] rounded-3xl bg-[#007f61] overflow-hidden shrink-0 flex flex-col items-end pt-[474px] px-10 pb-[41px] box-border relative isolate gap-[348px] max-w-full text-left text-[32px] text-[#fff] font-[Sora] mq800:gap-[174px] mq800:pt-[200px] mq800:pb-5 mq800:box-border mq450:gap-[87px] mq1350:pt-[308px] mq1350:pb-[27px] mq1350:box-border">
              <Image
                className="mt-[-548px] mr-[-146px] w-[200px] h-[200px] relative shrink-0"
                loading="lazy"
                width={200}
                height={200}
                sizes="100vw"
                alt=""
                src="/Star-5.svg"
              />
              <Image
                className="w-[200px] h-[200px] absolute top-[401px] left-[-100px] shrink-0"
                width={200}
                height={200}
                sizes="100vw"
                alt=""
                src="/Star-5.svg"
              />
              <div className="flex flex-col items-start gap-6 z-[1] shrink-0">
                <h2 className="m-0 w-[508px] h-8 relative text-[length:inherit] leading-8 font-bold font-[inherit] flex items-center mq800:text-[26px] mq800:leading-[26px] mq450:text-[19px] mq450:leading-[19px]">
                  Deliver On Time
                </h2>
                <div className="w-[508px] h-[65px] relative text-lg leading-6 font-[Satoshi] text-foundation-secondary-light flex items-center">
                  Automated notifications alert clients for final fittings.
                  Secure their satisfaction with consistent fit quality and
                  professional documentation.
                </div>
              </div>
              <div className="w-[488px] h-[377px] absolute top-[57px] left-[60px] rounded-2xl bg-[#66b39f] overflow-hidden shrink-0 z-[1]" />
              <Image
                className="w-[492px] h-[377px] absolute top-[41px] left-[40px] rounded-3xl object-cover z-[2] shrink-0"
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
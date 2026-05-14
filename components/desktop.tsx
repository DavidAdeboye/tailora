import type { NextPage } from "next";
import Image from "next/image";
import FrameComponent from "./frame-component";
import TierColumns from "./tier-columns";

export type DesktopType = {
  className?: string;
};

const Desktop: NextPage<DesktopType> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-foundation-secondary-light-active overflow-hidden flex flex-col items-center justify-center pt-[100px] px-5 pb-[60px] mq800:pt-[65px] mq800:pb-[39px] mq800:box-border mq450:pt-[42px] mq450:pb-[25px] mq450:box-border ${className}`}
    >
      <div className="w-[914px] flex flex-col items-center gap-10 mq450:gap-5">
        <FrameComponent
          productFeatures="Pricing"
          everythingYouNeedToMoveFrom="Simple, transparent plans for every scale of fashion business."
        />
        <section className="self-stretch flex items-start justify-center gap-10 text-left text-base text-foundation-primary-normal font-[Sora] mq450:gap-5 mq1125:flex-wrap">
          <div className="w-[276px] flex flex-col items-start">
            <TierColumns sTARTER="STARTER" />
            <div className="self-stretch rounded-t-none rounded-b-3xl bg-foundation-secondary-light-active border-foundation-primary-normal border-solid border-r-[1px] border-b-[1px] border-l-[1px] flex flex-col items-start pt-6 px-[23px] pb-[22px] gap-[60px] text-sm mq450:gap-[30px]">
              <div className="self-stretch flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <div className="self-stretch relative leading-[22px]">
                    Features
                  </div>
                  <div className="self-stretch h-[23px] relative text-xs leading-6 text-foundation-gray-dark flex items-center font-[Satoshi]">
                    <span>
                      <span>{`Everything in `}</span>
                      <b>Free plan</b>
                    </span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-3 text-xs font-[Satoshi]">
                  <div className="self-stretch flex items-center gap-3">
                    <input className="m-0 h-6 w-6 relative" type="checkbox" />
                    <div className="h-[23px] w-[123px] relative leading-6 flex items-center">
                      Up to 50 Clients
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <input className="m-0 h-6 w-6 relative" type="checkbox" />
                    <div className="relative leading-5">
                      Core Measurement Tools
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <input className="m-0 h-6 w-6 relative" type="checkbox" />
                    <div className="relative leading-5">1 User</div>
                  </div>
                </div>
              </div>
              <button className="cursor-pointer border-foundation-primary-normal border-solid border-[1px] py-1.5 px-2.5 bg-[transparent] w-[217px] rounded-[40px] box-border flex items-center justify-center hover:bg-[rgba(69,69,69,0.09)] hover:border-[#454545] hover:border-solid hover:hover:border-[1px] hover:box-border">
                <div className="relative text-sm leading-5 font-[Satoshi] text-foundation-primary-normal text-left">
                  Chooser Starters
                </div>
              </button>
            </div>
          </div>
          <div className="w-[276px] flex flex-col items-start">
            <div className="self-stretch rounded-t-3xl rounded-b-none [background:linear-gradient(244.53deg,_rgba(253,_246,_236,_0),_#ffe5c1)] border-foundation-primary-normal border-solid border-[1px] flex flex-col items-start py-[22px] px-[23px]">
              <div className="self-stretch flex flex-col items-start gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-9 relative leading-6 flex items-center shrink-0">
                    PRO
                  </div>
                  <div className="rounded-[10px] bg-foundation-secondary-normal border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px] text-center text-[10px] font-[Satoshi]">
                    <div className="flex items-center">
                      <div className="relative leading-[18px] font-medium">
                        MOST POPULAR
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-1 text-[32px]">
                  <div className="self-stretch relative leading-[48px]">
                    <b>
                      <span>₦0</span>
                      <span className="text-[40px]">{` `}</span>
                    </b>
                    <span className="text-base">Coming Soon</span>
                  </div>
                  <div className="self-stretch h-[23px] relative text-xs leading-5 font-medium font-[Satoshi] text-[#696969] flex items-center">
                    Basic features for everyone
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch rounded-t-none rounded-b-3xl bg-foundation-secondary-light-active border-foundation-primary-normal border-solid border-r-[1px] border-b-[1px] border-l-[1px] flex flex-col items-start pt-6 px-[23px] pb-[22px] gap-[60px] text-sm mq450:gap-[30px]">
              <div className="self-stretch flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <div className="self-stretch relative leading-[22px]">
                    Features
                  </div>
                  <div className="self-stretch h-[23px] relative text-xs leading-6 text-foundation-gray-dark flex items-center font-[Satoshi]">
                    <span>
                      <span>{`Everything in `}</span>
                      <b>Free plan</b>
                    </span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-3 text-xs font-[Satoshi]">
                  <div className="self-stretch flex items-center gap-3">
                    <input className="m-0 h-6 w-6 relative" type="checkbox" />
                    <div className="h-[23px] w-[123px] relative leading-6 flex items-center">
                      Unlimited Clients
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <input className="m-0 h-6 w-6 relative" type="checkbox" />
                    <div className="relative leading-5">
                      Advanced Order Tracking
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <input className="m-0 h-6 w-6 relative" type="checkbox" />
                    <div className="relative leading-5">
                      Client SMS Notifications
                    </div>
                  </div>
                </div>
              </div>
              <button className="cursor-pointer border-foundation-primary-normal border-solid border-[1px] py-1.5 px-2.5 bg-foundation-primary-normal w-[217px] rounded-[40px] box-border flex items-center justify-center hover:bg-[#454545] hover:border-[#454545] hover:border-solid hover:hover:border-[1px] hover:box-border">
                <div className="relative text-sm leading-5 font-[Satoshi] text-foundation-primary-light text-left">
                  Chooser Pro
                </div>
              </button>
            </div>
          </div>
          <div className="w-[276px] flex flex-col items-start text-sm">
            <TierColumns sTARTER="TEAM" />
            <div className="self-stretch rounded-t-none rounded-b-3xl bg-foundation-secondary-light-active border-foundation-primary-normal border-solid border-r-[1px] border-b-[1px] border-l-[1px] flex flex-col items-start pt-6 px-[23px] pb-[22px] gap-[60px] mq450:gap-[30px]">
              <div className="self-stretch flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <div className="self-stretch relative leading-[22px]">
                    Features
                  </div>
                  <div className="self-stretch h-[23px] relative text-xs leading-6 text-foundation-gray-dark flex items-center font-[Satoshi]">
                    <span>
                      <span>{`Everything in `}</span>
                      <b>Free plan</b>
                    </span>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-3 text-xs font-[Satoshi]">
                  <div className="self-stretch flex items-center gap-3">
                    <Image
                      className="h-6 w-6 relative"
                      loading="lazy"
                      width={24}
                      height={24}
                      sizes="100vw"
                      alt=""
                      src="/vuesax-bulk-tick-circle.svg"
                    />
                    <div className="h-[23px] w-[123px] relative leading-6 flex items-center">
                      Multi-Location Support
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <Image
                      className="h-6 w-6 relative"
                      loading="lazy"
                      width={24}
                      height={24}
                      sizes="100vw"
                      alt=""
                      src="/vuesax-bulk-tick-circle.svg"
                    />
                    <div className="relative leading-5">
                      White-label Reports
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <Image
                      className="h-6 w-6 relative"
                      loading="lazy"
                      width={24}
                      height={24}
                      sizes="100vw"
                      alt=""
                      src="/vuesax-bulk-tick-circle.svg"
                    />
                    <div className="relative leading-5">Unlimited Users</div>
                  </div>
                  <div className="self-stretch flex items-center gap-3">
                    <Image
                      className="h-6 w-6 relative"
                      width={24}
                      height={24}
                      sizes="100vw"
                      alt=""
                      src="/vuesax-bulk-tick-circle.svg"
                    />
                    <div className="relative leading-5">
                      Dedicated Account Manager
                    </div>
                  </div>
                </div>
              </div>
              <button className="cursor-pointer border-foundation-primary-normal border-solid border-[1px] py-1.5 px-2.5 bg-[transparent] w-[217px] rounded-[40px] box-border flex items-center justify-center hover:bg-[rgba(69,69,69,0.09)] hover:border-[#454545] hover:border-solid hover:hover:border-[1px] hover:box-border">
                <div className="relative text-sm leading-5 font-[Satoshi] text-foundation-primary-normal text-left">
                  Chooser Team
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Desktop;

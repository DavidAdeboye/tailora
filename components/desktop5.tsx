import type { NextPage } from "next";
import Image from "next/image";

export type Desktop5Type = {
  className?: string;
};

const Desktop5: NextPage<Desktop5Type> = ({ className = "" }) => {
  return (
    <footer
      className={`self-stretch rounded-t-[100px] rounded-b-none bg-foundation-primary-normal overflow-hidden flex flex-col items-start pt-[106px] px-[113px] pb-6 box-border gap-[127px] max-w-full text-left text-lg text-[#fff] font-[Sora] mq800:gap-[63px] mq800:pl-14 mq800:pr-14 mq800:box-border mq450:gap-8 mq450:pl-5 mq450:pt-[45px] mq450:pr-5 mq450:box-border mq1125:pt-[69px] mq1125:pb-5 mq1125:box-border mq1350:h-auto ${className}`}
    >
      <div className="flex items-start gap-[238px] max-w-full mq800:gap-[59px] mq450:gap-[30px] mq1350:gap-[119px] mq1350:flex-wrap">
        <div className="w-[498px] flex flex-col items-start gap-8 max-w-full mq800:gap-4 mq800:min-w-full mq1350:flex-1">
          <div className="self-stretch relative leading-8 font-semibold">
            Empowering fashion designers and master tailors with precision
            digital tools.
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <button className="cursor-pointer border-[rgba(255,255,255,0.25)] border-solid border-[1px] p-0 bg-[transparent] h-[50px] w-[50px] rounded-[50px] box-border flex items-center justify-center">
              <Image
                className="h-6 w-full relative"
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="/facebook-circle-fill.svg"
              />
            </button>
            <button className="cursor-pointer border-[rgba(255,255,255,0.25)] border-solid border-[1px] p-0 bg-[transparent] h-[50px] w-[50px] rounded-[50px] box-border flex items-center justify-center">
              <Image
                className="h-6 w-full relative"
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="/tiktok-fill.svg"
              />
            </button>
            <button className="cursor-pointer border-[rgba(255,255,255,0.25)] border-solid border-[1px] p-0 bg-[transparent] h-[50px] w-[50px] rounded-[50px] box-border flex items-center justify-center">
              <Image
                className="h-6 w-full relative"
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="/instagram-line.svg"
              />
            </button>
            <button className="cursor-pointer border-[rgba(255,255,255,0.25)] border-solid border-[1px] p-0 bg-[transparent] h-[50px] w-[50px] rounded-[50px] box-border flex items-center justify-center">
              <Image
                className="h-6 w-full relative"
                width={24}
                height={24}
                sizes="100vw"
                alt=""
                src="/youtube-fill.svg"
              />
            </button>
          </div>
        </div>
        <div className="w-[478px] flex items-center justify-between gap-5 max-w-full text-base text-foundation-secondary-normal font-[Satoshi] mq800:gap-5 mq800:min-w-full mq1350:flex-1 mq1350:gap-5">
          <div className="w-[120px] flex flex-col items-start gap-3.5">
            <h3 className="m-0 self-stretch relative text-lg leading-8 font-semibold font-[Sora] text-[#fff]">
              Company
            </h3>
            <div className="self-stretch h-6 relative leading-6 flex items-center">
              Contact Support
            </div>
            <div className="self-stretch h-6 relative leading-6 flex items-center">
              Privacy Policy
            </div>
          </div>
          <div className="w-[120px] flex flex-col items-start gap-3.5">
            <h3 className="m-0 self-stretch relative text-lg leading-8 font-semibold font-[Sora] text-[#fff]">
              Product
            </h3>
            <div className="self-stretch h-6 relative leading-6 flex items-center">
              Features
            </div>
            <div className="self-stretch h-6 relative leading-6 flex items-center">
              Pricing
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-[9px] text-center text-[340px] text-[rgba(241,241,242,0.2)]">
        <div className="flex items-start py-0 pl-[9px] pr-0">
          <h1 className="m-0 h-[388px] w-[1196px] relative text-[length:inherit] leading-[388px] font-bold font-[inherit] inline-block mq800:text-[136px] mq800:leading-[233px] mq450:text-[85px] mq450:leading-[155px]">
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

export default Desktop5;

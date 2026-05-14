import type { NextPage } from "next";
import Image from "next/image";
import Button from "./button";

export type Desktop1Type = {
  className?: string;
};

const Desktop1: NextPage<Desktop1Type> = ({ className = "" }) => {
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
            Start Managing Your Tailoring Business Smarter
          </h1>
          <div className="w-full relative text-base leading-6 font-[Satoshi] text-foundation-secondary-dark flex items-center justify-center mq450:text-sm">
            Join 1,200+ fashion houses that use Tailora to power their ateliers every day.
          </div>
          <div className="mt-4">
            <Button
              property1="Default"
              buttonBackgroundColor="#fdf6ec"
              createAccountColor="#121212"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Desktop1;
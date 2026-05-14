import type { NextPage } from "next";
import Image from "next/image";
import Button from "./button";

export type Desktop1Type = {
  className?: string;
};

const Desktop1: NextPage<Desktop1Type> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-foundation-secondary-light-active overflow-hidden flex flex-col items-center justify-center py-[100px] px-[263px] box-border max-w-full text-center text-[40px] text-[#fff] font-[Sora] mq800:py-[65px] mq800:px-[131px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border ${className}`}
    >
      <div className="w-[913px] h-[349px] shadow-[0px_0px_4.7px_rgba(0,_0,_0,_0.08)] rounded-[40px] bg-foundation-primary-normal overflow-hidden shrink-0 flex flex-col items-end pt-[69px] px-[148px] pb-[63px] box-border max-w-full mq450:pl-[37px] mq450:pr-[37px] mq450:box-border mq1125:pl-[74px] mq1125:pr-[74px] mq1125:box-border">
        <section className="mt-[-145px] w-[617px] flex items-start justify-center py-0 pl-px pr-0 box-border max-w-full shrink-0">
          <div className="overflow-hidden flex items-start opacity-[0.4] shrink-0">
            <div className="flex flex-col items-start justify-end pt-[306px] px-[93px] pb-2.5 relative isolate mq450:pl-5 mq450:pr-5 mq450:box-border">
              <Image
                className="w-full h-full absolute !!m-[0 important] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full shrink-0"
                width={362}
                height={362}
                sizes="100vw"
                alt=""
                src="/Promo-Shape.svg"
              />
              <div className="w-full h-full absolute !!m-[0 important] top-[0px] right-[0px] bottom-[0px] left-[0px] [background:radial-gradient(91.31%_42.05%_at_50%_39.23%,_rgba(18,_18,_18,_0),_#121212_65.03%)] z-[1] shrink-0" />
              <Button
                property1="Default"
                buttonBackgroundColor="#fdf6ec"
                createAccountColor="#121212"
              />
            </div>
          </div>
        </section>
        <div className="w-[617px] flex flex-col items-center gap-2 shrink-0 max-w-full z-[2] mt-[-217px] relative">
          <h1 className="m-0 self-stretch relative text-[length:inherit] leading-[48px] font-semibold font-[inherit] mq800:text-[32px] mq800:leading-[38px] mq450:text-2xl mq450:leading-[29px]">
            Start Managing Your Tailoring Business Smarter
          </h1>
          <div className="self-stretch h-6 relative text-base leading-6 font-[Satoshi] text-foundation-secondary-dark flex items-center justify-center">
            Join 1,200+ fashion houses that use Tailora to power their ateliers
            every day.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Desktop1;

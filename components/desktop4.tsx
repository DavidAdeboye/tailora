import type { NextPage } from "next";
import Image from "next/image";
import Button from "./button";

export type Desktop4Type = {
  className?: string;
};

const Desktop4: NextPage<Desktop4Type> = ({ className = "" }) => {
  return (
    <section
      className={`w-[1440px] h-[997px] rounded-t-none rounded-b-[100px] bg-[#ffedd4] flex flex-col items-end pt-6 px-[121px] pb-[903px] box-border relative isolate gap-[100px] max-w-full mq800:gap-[50px] mq800:pl-[60px] mq800:pr-[60px] mq800:pb-[248px] mq800:box-border mq450:gap-[25px] mq450:pl-5 mq450:pr-5 mq450:box-border mq1125:h-auto mq1125:pb-[382px] mq1125:box-border mq1350:pt-5 mq1350:pb-[587px] mq1350:box-border ${className}`}
    >
      <div className="w-[510.1px] h-[510.1px] absolute !!m-[0 important] top-[calc(50%_-_540.5px)] left-[calc(50%_-_216px)] overflow-hidden flex items-center justify-center z-[0] shrink-0">
        <Image
          className="w-full h-full object-cover absolute left-[0px] top-[21px] [transform:scale(1)]"
          width={510.1}
          height={510.1}
          sizes="100vw"
          alt=""
          src="/Pattern@2x.png"
        />
      </div>
      <div className="w-[1598px] h-[2840px] absolute !!m-[0 important] top-[-778px] left-[calc(50%_-_799px)] z-[1] shrink-0" />
      <header className="shadow-[0px_0px_4px_rgba(0,_0,_0,_0.04)] rounded-[60px] bg-[#fff] flex flex-col items-start justify-center py-3 pl-6 pr-3 top-[0] z-[99] sticky shrink-0">
        <nav className="m-0 flex items-center gap-[221px] text-center text-sm text-foundation-gray-darker font-[Satoshi] mq800:gap-[55px] mq450:gap-7 mq1350:gap-[110px]">
          <div className="h-[24.5px] w-[110.8px] flex items-start pt-0 px-0 pb-[0.1px] box-border gap-[1.8px] text-left text-xl text-foundation-primary-normal font-[Sora]">
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
          <div className="flex items-center gap-6 mq800:hidden">
            <div className="flex items-center justify-center py-0 px-2">
              <div className="relative leading-[22px] font-medium">Home</div>
            </div>
            <div className="flex items-center justify-center py-0 px-2">
              <div className="relative leading-[22px] font-medium">
                Features
              </div>
            </div>
            <div className="flex items-center justify-center py-0 px-2">
              <div className="relative leading-[22px] font-medium">Pricing</div>
            </div>
            <div className="flex items-center justify-center py-0 px-2">
              <div className="relative leading-[22px] font-medium">
                How It Works
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center py-0 px-2">
              <div className="relative leading-[22px] font-medium">Sign in</div>
            </div>
            <Button property1="Default" />
          </div>
        </nav>
      </header>
      <Image
        className="w-[82px] absolute !!m-[0 important] top-[219px] left-[207px] max-h-full object-contain z-[2] shrink-0"
        loading="lazy"
        width={82}
        height={82}
        sizes="100vw"
        alt=""
        src="/image-14@2x.png"
      />
      <Image
        className="w-[84.8px] absolute !!m-[0 important] top-[334px] left-[179px] max-h-full object-contain z-[2] shrink-0"
        loading="lazy"
        width={84.8}
        height={84.8}
        sizes="100vw"
        alt=""
        src="/image-15@2x.png"
      />
      <Image
        className="w-[81px] absolute !!m-[0 important] top-[445px] left-[257px] max-h-full object-contain z-[2] shrink-0"
        loading="lazy"
        width={81}
        height={81}
        sizes="100vw"
        alt=""
        src="/image-24@2x.png"
      />
      <Image
        className="w-[80.5px] absolute !!m-[0 important] top-[333px] left-[1185px] max-h-full object-contain z-[2] shrink-0"
        loading="lazy"
        width={80.5}
        height={80.5}
        sizes="100vw"
        alt=""
        src="/image-18@2x.png"
      />
      <div className="w-[1121.9px] flex items-start justify-center max-w-full shrink-0">
        <div className="flex flex-col items-start gap-8 max-w-full mq450:gap-4">
          <section className="w-[895px] flex items-start justify-end max-w-full text-center text-xs text-foundation-primary-normal font-[Satoshi]">
            <div className="flex items-end gap-[26px] max-w-full mq1125:flex-wrap">
              <div className="flex flex-col items-start justify-end pt-0 px-0 pb-1.5 box-border max-w-full">
                <div className="w-[700px] flex flex-col items-center gap-4 max-w-full">
                  <div className="rounded-[10px] bg-foundation-secondary-normal border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px]">
                    <div className="flex items-center gap-[3px]">
                      <div className="h-1.5 w-1.5 relative rounded-[50%] bg-[#ffa82b]" />
                      <div className="relative leading-5 font-medium">{`FASHION CRM & ERP`}</div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-center gap-6 text-[64px] font-[Sora]">
                    <div className="self-stretch flex flex-col items-center gap-4">
                      <h1 className="m-0 self-stretch relative text-[length:inherit] leading-[72px] font-bold font-[inherit] mq800:text-[51px] mq800:leading-[58px] mq450:text-[38px] mq450:leading-[43px]">
                        Track measurements and orders easily
                      </h1>
                      <div className="self-stretch h-[39px] relative text-base leading-6 font-[Satoshi] text-[#696969] flex items-center justify-center">
                        Tailora helps fashion designers organize client
                        measurements, manage deliveries, and collaborate with
                        their team — all in one smart workspace.”
                      </div>
                    </div>
                    <Button
                      property1="Default"
                      buttonBackgroundColor="#121212"
                      createAccountColor="#fff"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-[166px]">
                <div className="w-[109px] flex items-start justify-end">
                  <Image
                    className="w-full relative max-h-full h-auto object-cover z-[2]"
                    loading="lazy"
                    width={60}
                    height={60}
                    sizes="100vw"
                    alt=""
                    src="/image-12@2x.png"
                  />
                </div>
                <Image
                  className="w-[60px] relative max-h-full object-cover z-[2]"
                  loading="lazy"
                  width={60}
                  height={60}
                  sizes="100vw"
                  alt=""
                  src="/image-21@2x.png"
                />
              </div>
            </div>
          </section>
          <Image
            className="w-[800px] relative max-h-full object-cover z-[2]"
            loading="lazy"
            width={800}
            height={533}
            sizes="100vw"
            alt=""
            src="/ChatGPT-Image-Apr-26-2026-01-43-19-AM-1@2x.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Desktop4;

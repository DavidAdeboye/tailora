import type { NextPage } from "next";
import Image from "next/image";

export type Desktop5Type = {
  className?: string;
};

const Desktop5: NextPage<Desktop5Type> = ({ className = "" }) => {
  return (
    <footer
      className={`self-stretch rounded-t-[100px] mq800:rounded-t-[60px] mq450:rounded-t-[40px] rounded-b-none bg-foundation-primary-normal overflow-hidden flex flex-col items-start pt-[106px] px-[113px] pb-6 box-border gap-[127px] max-w-full text-left text-lg text-[#fff] font-[Sora] mq800:gap-16 mq800:pl-10 mq800:pr-10 mq800:pt-16 mq450:gap-10 mq450:pl-5 mq450:pr-5 mq450:pt-12 mq1125:pt-[69px] mq1125:pb-5 mq1125:box-border ${className}`}
    >
      {/* Top section: tagline + links */}
      <div className="flex items-start gap-[238px] max-w-full w-full mq800:gap-10 mq800:flex-col mq1350:gap-[80px]">
        {/* Left: tagline + socials */}
        <div className="w-[498px] max-w-full flex flex-col items-start gap-8 mq800:w-full mq800:gap-5">
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
        <div className="w-[478px] max-w-full flex items-start justify-between gap-5 text-base text-foundation-secondary-normal font-[Satoshi] mq800:w-full mq450:gap-8">
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
          <h1 className="m-0 w-full relative text-[340px] leading-[388px] font-bold font-[inherit] text-[rgba(241,241,242,0.2)] mq800:text-[120px] mq800:leading-[140px] mq450:text-[72px] mq450:leading-[86px]">
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
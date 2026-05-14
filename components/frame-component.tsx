import type { NextPage } from "next";

export type FrameComponentType = {
  className?: string;
  productFeatures?: string;
  /** The large section heading. Defaults to "Why Tailora Is Right for You" */
  heading?: string;
  /** Orange highlighted portion of the heading. If omitted the whole heading renders in one color. */
  headingHighlight?: string;
  everythingYouNeedToMoveFrom?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({
  className = "",
  productFeatures,
  heading,
  headingHighlight,
  everythingYouNeedToMoveFrom,
}) => {
  // Split heading into base + highlight parts
  const baseHeading = heading ?? "Why Tailora Is ";
  const highlight = headingHighlight ?? "Right for You";

  return (
    <div
      className={`w-[648px] max-w-full flex flex-col items-center gap-4 text-center text-xs text-foundation-primary-normal font-[Satoshi] ${className}`}
    >
      <div className="rounded-[10px] bg-foundation-secondary-normal border-[#ffa82b] border-solid border-[0.5px] flex items-center justify-center py-0 px-[7px]">
        <div className="flex items-center gap-1">
          <div className="h-1.5 w-1.5 relative rounded-[50%] bg-[#ffa82b]" />
          <div className="relative leading-5 font-medium">
            {productFeatures}
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-center text-[40px] font-[Sora]">
        <div className="w-full flex flex-col items-center gap-2 max-w-full">
          <h2 className="m-0 self-stretch relative text-[length:inherit] leading-[48px] font-bold font-[inherit] mq800:text-[32px] mq800:leading-[38px] mq450:text-2xl mq450:leading-[29px]">
            <span>{baseHeading}</span>
            {highlight && <span className="text-[#ffa82b]">{highlight}</span>}
          </h2>
          <div className="self-stretch h-[23px] relative text-base leading-6 font-[Satoshi] text-[#696969] flex items-center justify-center">
            {everythingYouNeedToMoveFrom}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
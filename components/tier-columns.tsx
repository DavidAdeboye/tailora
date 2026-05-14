import type { NextPage } from "next";

export type TierColumnsType = {
  className?: string;
  sTARTER?: string;
};

const TierColumns: NextPage<TierColumnsType> = ({
  className = "",
  sTARTER,
}) => {
  return (
    <div
      className={`self-stretch rounded-t-3xl rounded-b-none [background:linear-gradient(244.53deg,_rgba(253,_246,_236,_0),_#fdf6ec)] border-foundation-primary-normal border-solid border-[1px] flex flex-col items-start py-[22px] px-[23px] text-left text-base text-foundation-primary-normal font-[Sora] ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-1">
        <div className="self-stretch relative leading-6">{sTARTER}</div>
        <div className="self-stretch flex flex-col items-start gap-1 text-[32px]">
          <div className="self-stretch relative leading-[48px]">
            <b>
              <span>₦1,500</span>
              <span className="text-[40px]">{` `}</span>
            </b>
            <span className="text-base">/month</span>
          </div>
          <div className="self-stretch h-[23px] relative text-xs leading-5 font-medium font-[Satoshi] text-[#696969] flex items-center">
            Basic features for everyone
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierColumns;

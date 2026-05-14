import type { NextPage } from "next";
import Image from "next/image";

export type MeasurementRowsType = {
  className?: string;
  scheduleContainers: string;
  measurementManagement?: string;
  storeUnlimitedClientMeasurements?: string;
};

const MeasurementRows: NextPage<MeasurementRowsType> = ({
  className = "",
  scheduleContainers,
  measurementManagement,
  storeUnlimitedClientMeasurements,
}) => {
  return (
    <div
      className={`h-[349px] w-[516px] mq800:w-full mq800:max-w-full mq450:h-auto mq450:min-h-[320px] shadow-[0px_0px_4.7px_rgba(0,_0,_0,_0.08)] rounded-3xl bg-foundation-secondary-light-active border-[#ffa82b] border-solid border-[1px] box-border overflow-hidden flex flex-col items-start relative isolate max-w-full text-left text-lg text-foundation-primary-normal font-[Sora] ${className}`}
    >
      <div className="w-full h-[480.8px] mq450:h-[320px] absolute m-0 top-[99.6px] left-[50%] -translate-x-1/2 rounded-[200px] overflow-hidden flex items-center justify-center z-[0]">
        <Image
          className="w-full h-full object-cover"
          width={480}
          height={480}
          sizes="100vw"
          alt=""
          src={scheduleContainers}
        />
      </div>
      <div className="w-full [backdrop-filter:blur(167.9px)] [background:linear-gradient(180deg,_#ffdfb3,_rgba(255,_223,_179,_0))] overflow-hidden shrink-0 flex items-start p-6 box-border max-w-full z-[1]">
        <div className="w-full flex flex-col items-start gap-[7px]">
          <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[26px] font-semibold font-[inherit] mq450:text-base">
            {measurementManagement}
          </h3>
          <div className="self-stretch relative text-base leading-6 font-[Satoshi] text-[#696969] mq450:text-sm">
            {storeUnlimitedClientMeasurements}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementRows;
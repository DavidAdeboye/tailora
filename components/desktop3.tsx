import type { NextPage } from "next";
import FrameComponent from "./frame-component";
import MeasurementRows from "./measurement-rows";

export type Desktop3Type = {
  className?: string;
};

const Desktop3: NextPage<Desktop3Type> = ({ className = "" }) => {
  return (
    <section
      className={`bg-foundation-secondary-light-active overflow-hidden flex flex-col items-center py-[100px] px-[184px] box-border max-w-full text-center text-xs text-foundation-primary-normal font-[Satoshi] mq800:py-[60px] mq800:px-[40px] mq450:px-4 mq450:py-[48px] mq1125:pt-[65px] mq1125:pb-[65px] mq1125:box-border ${className}`}
    >
      <div className="w-[1072px] max-w-full flex flex-col items-center gap-10 mq800:gap-6 mq450:gap-5">
        <FrameComponent
          productFeatures="Product Features"
          heading="Why Tailora Is "
          headingHighlight="Right for You"
          everythingYouNeedToMoveFrom="Everything you need to move from messy paper notebooks to a digital-first tailoring atelier."
        />
        <div className="self-stretch flex flex-col items-center gap-10 max-w-full mq800:gap-5">
          {/* Row 1 */}
          <section className="self-stretch flex items-center gap-10 max-w-full text-left text-lg text-foundation-primary-normal font-[Sora] mq800:gap-5 mq800:flex-col">
            <MeasurementRows
              scheduleContainers="/Schedule-Containers@2x.png"
              measurementManagement="Measurement Management"
              storeUnlimitedClientMeasurements="Store unlimited client measurements with high precision. Add photos, posture notes, and custom fields for every garment type."
            />
            <MeasurementRows
              scheduleContainers="/Frame-2147224771@2x.png"
              measurementManagement="Order Tracking"
              storeUnlimitedClientMeasurements="Track garment status from cutting table to final fitting. Real-time production visibility for you and your team."
            />
          </section>
          {/* Row 2 */}
          <section className="self-stretch flex items-center gap-10 max-w-full mq800:gap-5 mq800:flex-col">
            <MeasurementRows
              scheduleContainers="/Frame-21472247712@2x.png"
              measurementManagement="Smart Scheduling"
              storeUnlimitedClientMeasurements="Automated fitting reminders and production deadlines. Sync your calendar to manage boutique appointments seamlessly."
            />
            <MeasurementRows
              scheduleContainers="/Frame-21472247711@2x.png"
              measurementManagement="Team Collaboration"
              storeUnlimitedClientMeasurements="Assign tasks to tailors, cutters, and finishers. Share measurement sheets instantly across your workshop."
            />
          </section>
        </div>
      </div>
    </section>
  );
};

export default Desktop3;
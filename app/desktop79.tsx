import type { NextPage } from "next";
import Desktop4 from "../components/desktop4";
import Desktop3 from "../components/desktop3";
import Desktop2 from "../components/desktop2";
import Desktop from "../components/desktop";
import Desktop1 from "../components/desktop1";
import Desktop5 from "../components/desktop5";

const Desktop79: NextPage = () => {
  return (
    <div className="relative bg-foundation-secondary-light-active w-full overflow-hidden flex items-start leading-[normal] tracking-[normal]">
      <main className="h-[5635px] flex-1 flex flex-col items-end max-w-full">
        <Desktop4 />
        <Desktop3 />
        <Desktop2 />
        <Desktop />
        <Desktop1 />
        <Desktop5 />
      </main>
    </div>
  );
};

export default Desktop79;

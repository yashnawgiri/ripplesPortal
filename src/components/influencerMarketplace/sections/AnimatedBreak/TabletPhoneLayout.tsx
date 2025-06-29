import PhoneRow from "./PhoneRow";
import type { PhoneContent } from "./types";

interface TabletPhoneLayoutProps {
  mobileContent: PhoneContent[];
}

export default function TabletPhoneLayout({
  mobileContent,
}: TabletPhoneLayoutProps) {
  return (
    <div className="hidden md:block lg:hidden absolute w-full top-10">
      {/* Cycle 1 - 3 phones with staggered continuous animation */}
      <PhoneRow
        contents={mobileContent.slice(0, 3)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="tablet-1"
        className="space-x-6"
        animationClass="animate-float-stagger-1"
      />

      {/* Cycle 2 - 3 phones with staggered continuous animation */}
      <PhoneRow
        contents={mobileContent.slice(3, 6)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="tablet-2"
        className="space-x-6"
        animationClass="animate-float-stagger-2"
      />

      {/* Cycle 3 - 3 phones with staggered continuous animation */}
      <PhoneRow
        contents={mobileContent.slice(6, 9)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="tablet-3"
        className="space-x-6"
        animationClass="animate-float-stagger-3"
      />

      {/* Additional overlapping set for seamless coverage */}
      <PhoneRow
        contents={mobileContent.slice(0, 3)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="tablet-4"
        className="space-x-6"
        animationClass="animate-float-stagger-2"
      />
    </div>
  );
}

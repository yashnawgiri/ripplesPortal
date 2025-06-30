import PhoneRow from "./PhoneRow";
import type { PhoneContent } from "./types";

interface MobilePhoneLayoutProps {
  mobileContent: PhoneContent[];
}

export default function MobilePhoneLayout({
  mobileContent,
}: MobilePhoneLayoutProps) {
  return (
    <div className="md:hidden absolute flex justify-center items-center space-x-4 w-full top-10">
      {/* Cycle 1 - 3 phones with mobile-optimized staggered animation */}
      <PhoneRow
        contents={mobileContent.slice(0, 3)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="mobile-1"
        className=""
        animationClass="animate-float-mobile-stagger-1"
      />

      {/* Cycle 2 - 3 phones with mobile-optimized staggered animation */}
      <PhoneRow
        contents={mobileContent.slice(3, 6)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="mobile-2"
        className=""
        animationClass="animate-float-mobile-stagger-2"
      />

      {/* Cycle 3 - 3 phones with mobile-optimized staggered animation */}
      <PhoneRow
        contents={mobileContent.slice(6, 9)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="mobile-3"
        className=""
        animationClass="animate-float-mobile-stagger-3"
      />

      {/* Additional overlapping set for seamless coverage */}
      <PhoneRow
        contents={mobileContent.slice(0, 3)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="mobile-4"
        className=""
        animationClass="animate-float-mobile-stagger-1"
      />
    </div>
  );
}

import PhoneRow from "./PhoneRow";
import type { PhoneRows } from "./types";

interface DesktopPhoneLayoutProps {
  phoneRows: PhoneRows;
}

export default function DesktopPhoneLayout({
  phoneRows,
}: DesktopPhoneLayoutProps) {
  return (
    <div className="hidden lg:block">
      {/* Row 1 - Top (4 phones with staggered continuous animation) */}
      <PhoneRow
        contents={phoneRows.row1.slice(0, 4)}
        size="small"
        delayStart={0}
        rowKeyPrefix="row1"
        className="items-end"
        opacity={0.6}
        animationClass="animate-float-stagger-1"
      />

      {/* Row 2 - Middle (4 phones with staggered continuous animation) */}
      <PhoneRow
        contents={phoneRows.row2.slice(0, 4)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="row2"
        className="items-center top-20"
        animationClass="animate-float-stagger-2"
      />

      {/* Row 3 - Bottom (4 phones with staggered continuous animation) */}
      <PhoneRow
        contents={phoneRows.row3.slice(0, 4)}
        size="small"
        delayStart={0}
        rowKeyPrefix="row3"
        className="items-start top-40"
        opacity={0.7}
        animationClass="animate-float-stagger-3"
      />

      {/* Additional overlapping rows for seamless coverage */}
      {/* Row 1 - Second set (4 phones) */}
      <PhoneRow
        contents={phoneRows.row1.slice(4, 8)}
        size="small"
        delayStart={0}
        rowKeyPrefix="row1-2"
        className="items-end"
        opacity={0.6}
        animationClass="animate-float-stagger-2"
      />

      {/* Row 2 - Second set (4 phones) */}
      <PhoneRow
        contents={phoneRows.row2.slice(4, 8)}
        size="medium"
        delayStart={0}
        rowKeyPrefix="row2-2"
        className="items-center top-20"
        animationClass="animate-float-stagger-3"
      />

      {/* Row 3 - Second set (4 phones) */}
      <PhoneRow
        contents={phoneRows.row3.slice(4, 8)}
        size="small"
        delayStart={0}
        rowKeyPrefix="row3-2"
        className="items-start top-40"
        opacity={0.7}
        animationClass="animate-float-stagger-1"
      />
    </div>
  );
}

import * as React from "react";

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
  className?: string;
}

export const Spacer: React.FC<SpacerProps> = ({
  size = 1,
  horizontal = false,
  className = "",
}) => {
  const baseSize = 4; // Base size in pixels
  const spacing = size * baseSize;

  const style = {
    width: horizontal ? `${spacing}px` : "100%",
    height: horizontal ? "100%" : `${spacing}px`,
    display: "block",
  };

  return <div className={className} style={style} />;
};

export default Spacer;

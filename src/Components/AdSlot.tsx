import { FC } from "react";
import Ad from "../Modules/Ad";

type AdSlotProps = {
  placementName: string;
  alias?: string;
  // Reserved height so the layout doesn't jump when the ad loads
  minHeight?: number;
  variant?: "mpu" | "billboard" | "video";
};

const AdSlot: FC<AdSlotProps> = ({
  placementName,
  alias,
  minHeight = 90,
  variant,
}) => (
  <div className={`ad-slot${variant ? ` ad-slot--${variant}` : ""}`}>
    <span className="ad-slot__label">Advertisement</span>
    <div className="ad-slot__body" style={{ minHeight }}>
      <Ad placementName={placementName} alias={alias} />
    </div>
  </div>
);

export default AdSlot;

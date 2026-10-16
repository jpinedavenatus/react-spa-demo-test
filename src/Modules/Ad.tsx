import React, { FC, useEffect, useRef } from "react";

type AdProps = {
  placementName: string;
  alias?: string;
};

const Ad: FC<AdProps> = ({ placementName, alias }) => {
  const elRef = useRef<HTMLDivElement>(null);

  const isHSorVideoSlider = () => {
    const validPlacements = [
      "horizontal_sticky",
      "mobile_horizontal_sticky",
      "video_slider",
    ];
    return validPlacements.includes(placementName);
  };

  useEffect(() => {
    let placement: any;
    console.log("[PROSPER] add", placementName);

    const handleAdManagerPush = (admanager: any, scope: any) => {
      if (placementName.includes(",")) {
        //simple responsive tag, supports 2 placements ONLY
        const [desktopPlacement, mobilePlacement] = placementName.split(",");
        placement = scope.Config.buildPlacement((configBuilder: any) => {
          configBuilder.add(desktopPlacement);
          configBuilder
            .addDefaultOrUnique(mobilePlacement)
            .setBreakPoint("mobile");
        }, alias).display(elRef.current);
      } else if (placementName === "vertical_sticky") {
        scope.Config.verticalSticky().display(alias);
      } else {
        placement = scope.Config.get(placementName, alias).display(
          isHSorVideoSlider() ? { body: true } : elRef.current
        );
      }

      if (placementName.includes("desktop_takeover")) {
        elRef.current!.id = "desktop-takeover";
      }
      if (placementName === "mobile_takeover") {
        elRef.current!.id = "mobile-takeover";
      }
    };

    const handleUnmount = (admanager: any, scope: any) => {
      console.log("[PROSPER] removed", placementName);

      if (placementName === "vertical_sticky") {
        scope.Config.verticalSticky().destroy();
      } else {
        admanager.removePlacement(placement.instance());
      }
    };

    self.__VM ??= [];
    self.__VM.push(handleAdManagerPush);

    return () => {
      self.__VM ??= [];
      self.__VM.push(handleUnmount);
    };
  }, [placementName]);
  return <div ref={elRef}></div>;
};

export default Ad;

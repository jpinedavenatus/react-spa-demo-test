import { FC, Fragment } from "react";
import AdSlot from "./AdSlot";
import { ContentCard, PageBody, PageHeader } from "./PageLayout";

const Page03: FC<{}> = () => {
  return (
    <Fragment>
      <PageHeader
        eyebrow="Demo 3"
        title="Video player"
        description="An in-content video placement in the main column, with an MPU in the sidebar."
        placements={["video", "mpu"]}
      />
      <div id="top-banner" className="hb-demo-2"></div>
      <PageBody
        main={
          <Fragment>
            <AdSlot placementName="video" variant="video" minHeight={360} />
            <ContentCard lines={5} />
            <div className="card-grid">
              <ContentCard lines={3} />
              <ContentCard lines={3} />
            </div>
          </Fragment>
        }
        sidebar={<AdSlot placementName="mpu" variant="mpu" minHeight={250} />}
      />
    </Fragment>
  );
};
export default Page03;

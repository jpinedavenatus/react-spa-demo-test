import { FC, Fragment } from "react";
import AdSlot from "./AdSlot";
import { ContentCard, PageBody, PageHeader } from "./PageLayout";

const Page01: FC<{}> = () => {
  return (
    <Fragment>
      <PageHeader
        eyebrow="Demo 1"
        title="Rewarded video"
        description="Click Watch video in the header to play a rewarded ad. Each completed view adds 100 coins. The reward reloads every time you change page."
        placements={["gpt_rewarded", "mpu"]}
      />
      <div id="top-banner" className="hb-demo-2"></div>
      <PageBody
        main={
          <Fragment>
            <ContentCard media lines={5} />
            <div className="card-grid">
              <ContentCard lines={3} />
              <ContentCard lines={3} />
            </div>
            <ContentCard lines={6} />
          </Fragment>
        }
        sidebar={<AdSlot placementName="mpu" variant="mpu" minHeight={250} />}
      />
    </Fragment>
  );
};
export default Page01;

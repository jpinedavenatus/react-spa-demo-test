import { FC, Fragment } from "react";
import Ad from "../Modules/Ad";
import AdSlot from "./AdSlot";
import { ContentCard, PageBody, PageHeader } from "./PageLayout";

const Page02: FC<{}> = () => {
  return (
    <Fragment>
      <PageHeader
        eyebrow="Demo 2"
        title="Billboard and vertical sticky"
        description="A billboard placement above the content, plus a vertical sticky that stays in view at the side of the page while you scroll."
        placements={["billboard", "vertical_sticky"]}
      />
      <div id="top-banner" className="hb-demo-2"></div>
      <div className="shell">
        <AdSlot placementName="billboard" variant="billboard" minHeight={250} />
      </div>
      <PageBody
        main={
          <Fragment>
            <ContentCard media lines={5} />
            <div className="card-grid">
              <ContentCard lines={3} />
              <ContentCard lines={3} />
              <ContentCard lines={3} />
            </div>
            <ContentCard lines={6} />
          </Fragment>
        }
      />
      <Ad placementName="vertical_sticky" />
    </Fragment>
  );
};
export default Page02;

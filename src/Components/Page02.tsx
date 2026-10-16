import React, { FC, Fragment, useState, useEffect, useRef } from "react";
import Ad from "../Modules/Ad";

const Page02: FC<{}> = () => {

  

  return (
    <Fragment>
      <h3>Page 2</h3>
      <div id="top-banner" className="ad-container hb-demo-2"></div>
      <div id="content-container">
        <div className="grid-container">
          <div className="grid-item a">
            <div className="ad-container"><Ad placementName="billboard" /></div>
          </div>
          <div className="grid-item b">B</div>
          <div className="grid-item c">
            C
          </div>
          <div className="grid-item">D</div>
          <div className="grid-item">E</div>
          <div className="grid-item e">F</div>
        </div>
      </div>
      <Ad placementName="vertical_sticky" />
    </Fragment>
  );
};
export default Page02;

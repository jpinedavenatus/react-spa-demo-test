import React, { FC, Fragment, useState, useEffect, useRef } from "react";
import Ad from "../Modules/Ad";

const Page01: FC<{}> = () => {

  

  return (
    <Fragment>
      <h3>Rewarded Video Demo</h3>
      <div id="top-banner" className="ad-container hb-demo-2"></div>
      <div id="content-container">
        <div className="grid-container">
          <div className="grid-item a">
            A
          </div>
          <div className="grid-item b">B</div>
          <div className="grid-item c">
            <div className="ad-container"><Ad placementName="mpu" /></div>
          </div>
          <div className="grid-item">D</div>
          <div className="grid-item">C</div>
          <div className="grid-item e">E</div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page01;

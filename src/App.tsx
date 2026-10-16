import { Fragment, useEffect, useRef, useState } from "react";
import "./styles/style.scss";

// Tabs Components
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";

import Page01 from "./Components/Page01";
import Page02 from "./Components/Page02";
import Page03 from "./Components/Page03";
import ProsperNewSession from "./Modules/ProsperNewSession";
import { RewardVideo, RewardVideoHandle } from "./Modules/RewardVideo";

export default function App() {
  //const currentFolderBase = window.location.pathname.slice(0, -1);

    const rewardRef = useRef<RewardVideoHandle>(null);
    const [coins, setCoins] = useState(0);
    const [status, setStatus] = useState("idle");
    const [rewardReady, setRReady] = useState(false);//disable reward button if ad is not ready
  
    // Reload the reward whenever the user navigates to a different page.
    const { pathname } = useLocation();
    const prevPathname = useRef(pathname);
    useEffect(() => {
      if (prevPathname.current === pathname) return;
      prevPathname.current = pathname;
      rewardRef.current?.reloadReward();
    }, [pathname]);


  return (
    <Fragment>
      <ProsperNewSession />
      <RewardVideo
        ref={rewardRef}
        delay={300}
        onLoading={() => { 
          setStatus("loading"); 
          setRReady(false); 
          console.log("[PROSPER] Reward is loading"); 
        }}
        onReady={() => { 
          setStatus("ready"); 
          setRReady(true); 
          console.log("[PROSPER] Reward is ready"); 
        }}
        onEmpty={() => { 
          setStatus("no video available"); 
          console.log("[PROSPER] Reward is not available"); 
        }}
        onRewarded={() => {
          setStatus("rewarded");
          setCoins((c) => c + 100);
          console.log("[PROSPER] Reward is granted!");
        }}
        onClosed={() => { 
          setStatus("closed / skipped"); 
          console.log("[PROSPER] Reward skipped"); 
        }}
      />
      <div className="wrapper">
        <div className="desk-navbar">
          <div className="container navbar">
            <a href="https://venatus.com/" className="brand w-nav-brand">
              <img
                src="https://uploads-ssl.webflow.com/625ecf3842ad2419f8758d34/625fef1a502b2e5532c582d2_venus-logo.svg"
                loading="lazy"
                className="logo"
              ></img>
            </a>
          
            <nav role="navigation">
              <button
                id="watchReward"
                className="btn btn-lg btn-primary"
                onClick={() => rewardRef.current?.playRewardVideo()}
                disabled={!rewardReady}
              >
                Watch Reward video to get coins!
              </button>
              <button
                id="reloadReward"
                className="btn btn-lg btn-warning"
                onClick={() => rewardRef.current?.reloadReward()}
              >
                Reload
              </button>
              <p className="navbar-link w-nav-link">Coins: <b>{coins}</b></p>
              <p className="navbar-link w-nav-link">Status: <b>{status}</b></p>
              {/* <a
                href="https://showcase.venatusmedia.com/"
                className="navbar-link w-nav-link"
              >
                Home
              </a>
              <a
                href="https://www.venatus.com/contact"
                className="navbar-link w-nav-link"
              >
                Contact
              </a>
              <a
                href="https://docs.google.com/presentation/d/1Agilje40iN6MZVAtq6t-9yEyoAxRsTiYZDPwdhm6UwA/edit#slide=id.gb77e77b0e4_0_41"
                className="navbar-link w-nav-link"
              >
                Specs
              </a> */}
            </nav>
          </div>
        </div>

        <Navigation />

        <Routes>
          <Route path="/" element={<Page01 />} />
          <Route path="Page01" element={<Page01 />} />
          <Route path="Page02" element={<Page02 />} />
          <Route path="Page03" element={<Page03 />} />
        </Routes>

        <Footer></Footer>
      </div>
    </Fragment>
  );
}

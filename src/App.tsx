import { Fragment, useEffect, useRef, useState } from "react";
import "./styles/style.scss";

// Tabs Components
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./Components/Footer";
import Header from "./Components/Header";

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
        <Header
          coins={coins}
          status={status}
          rewardReady={rewardReady}
          onWatch={() => rewardRef.current?.playRewardVideo()}
          onReload={() => rewardRef.current?.reloadReward()}
        />

        <main className="site-main">
          <Routes>
            <Route path="/" element={<Page01 />} />
            <Route path="Page01" element={<Page01 />} />
            <Route path="Page02" element={<Page02 />} />
            <Route path="Page03" element={<Page03 />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
}

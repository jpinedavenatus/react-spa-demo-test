import { FC } from "react";
import Navigation from "./Navigation";

type HeaderProps = {
  coins: number;
  status: string;
  rewardReady: boolean;
  onWatch: () => void;
  onReload: () => void;
};

// Maps the raw status from RewardVideo to a readable label and colour tone.
const STATUS_DISPLAY: Record<string, { label: string; tone: string }> = {
  idle: { label: "Waiting for ad", tone: "neutral" },
  loading: { label: "Loading ad", tone: "pending" },
  ready: { label: "Ready to watch", tone: "success" },
  "no video available": { label: "No video available", tone: "muted" },
  rewarded: { label: "Reward granted", tone: "success" },
  "closed / skipped": { label: "Closed early", tone: "muted" },
};

const Header: FC<HeaderProps> = ({
  coins,
  status,
  rewardReady,
  onWatch,
  onReload,
}) => {
  const display = STATUS_DISPLAY[status] ?? { label: status, tone: "neutral" };

  return (
    <header className="site-header">
      <div className="shell site-header__bar">
        <a href="https://venatus.com/" className="site-header__brand">
          <img
            src="https://uploads-ssl.webflow.com/625ecf3842ad2419f8758d34/625fef1a502b2e5532c582d2_venus-logo.svg"
            alt="Venatus"
            className="site-header__logo"
          />
          <span className="site-header__title">Prosper SPA Demo</span>
        </a>

        <div className="reward-panel" aria-label="Rewarded video">
          <span
            className={`status-pill status-pill--${display.tone}`}
            role="status"
            aria-live="polite"
          >
            <span className="status-pill__dot" aria-hidden="true" />
            {display.label}
          </span>

          <span className="coin-count" title="Coins earned">
            <span className="coin-count__icon" aria-hidden="true">
              C
            </span>
            <b key={coins} className="coin-count__value">
              {coins}
            </b>
            <span className="visually-hidden"> coins</span>
          </span>

          <button
            id="watchReward"
            type="button"
            className="ui-btn ui-btn--primary"
            onClick={onWatch}
            disabled={!rewardReady}
            title={rewardReady ? undefined : "The rewarded video is not ready yet"}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
            </svg>
            <span>
              Watch video<span className="ui-btn__extra"> for 100 coins</span>
            </span>
          </button>

          <button
            id="reloadReward"
            type="button"
            className="ui-btn ui-btn--ghost"
            onClick={onReload}
            aria-label="Reload rewarded video"
            title="Reload rewarded video"
          >
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
              <path
                d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2v3h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <Navigation />
    </header>
  );
};

export default Header;

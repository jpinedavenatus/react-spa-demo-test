import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    __VM: any;
  }
}

export type RewardVideoHandle = {
  playRewardVideo: () => void;
  reloadReward: () => void;
};

type RewardVideoProps = {
  configName?: string;
  knownName?: string;
  delay?: number;
  onLoading?: () => void;
  onReady?: () => void;
  onEmpty?: () => void;
  onRewarded?: () => void;
  onClosed?: () => void;
};

export const RewardVideo = forwardRef<RewardVideoHandle, RewardVideoProps>(
  function RewardVideo(
    {
      configName = "gpt_rewarded",
      knownName = "gptRewarded",
      delay = 300,
      onLoading,
      onReady,
      onEmpty,
      onRewarded,
      onClosed,
    },
    ref
  ) {
    // Ready-to-play flag as a ref so handlers always read the latest value.
    const isReadyRef = useRef(false);

    // Controls the "Reload reward" button: shown once a round ends
    // (empty / rewarded / closed).
    const [isEnded, setIsEnded] = useState(false);

    // Latest props in a ref so the init effect runs once at mount without
    // re-pushing config when the parent re-renders.
    const optsRef = useRef({
      configName, knownName, delay,
      onLoading, onReady, onEmpty, onRewarded, onClosed,
    });
    optsRef.current = {
      configName, knownName, delay,
      onLoading, onReady, onEmpty, onRewarded, onClosed,
    };

    // Load once at page load: wait for __VM.loaded, then wait out the delay.
    useEffect(() => {
      self.__VM ??= [];

      let cancelled = false;
      let delayTimer: ReturnType<typeof setTimeout>;
      let pollTimer: ReturnType<typeof setInterval>;

      const init = () => {
        const { configName, knownName } = optsRef.current;

        self.__VM.push(function (admanager: any, scope: any) {
          /* Workaround for Google autoscanning issue */
          // @ts-ignore
          window.googletag = window.googletag || { cmd: [] };
          // @ts-ignore
          googletag.cmd.push(() => {
            // @ts-ignore
            googletag.setConfig({ disableInitialLoad: true });
            // @ts-ignore
            googletag.enableServices();
          });

          console.log("[PROSPER] Reward initiating...");
          scope.Config.get(configName).display({ body: true }).setKnown(knownName);
          scope.Config.getKnown(knownName).rewardedApi((api: any) => {
            api.on("loading", () => {
              isReadyRef.current = false;
              setIsEnded(false);
              optsRef.current.onLoading?.();
            });

            api.on("empty", () => {
              isReadyRef.current = false;
              setIsEnded(true);
              optsRef.current.onEmpty?.();
            });

            api.on("ready", () => {
              isReadyRef.current = true;
              setIsEnded(false);
              optsRef.current.onReady?.();
            });

            api.on("rewarded", () => {
              isReadyRef.current = false;
              api.clear();
              setIsEnded(true);
              optsRef.current.onRewarded?.();
            });

            api.on("closed", () => {
              isReadyRef.current = false;
              api.clear();
              setIsEnded(true);
              optsRef.current.onClosed?.();
            });
          });

          // @ts-ignore
          googletag.cmd.push(() => {
            // @ts-ignore
            googletag.pubads().refresh();
          });

        });
      };

      const startAfterDelay = () => {
        if (cancelled) return;
        delayTimer = setTimeout(reloadReward, optsRef.current.delay);
      };

      if (self.__VM.loaded === true) {
        init();
        startAfterDelay();
      } else {
        pollTimer = setInterval(() => {
          if (self.__VM?.loaded === true) {
            clearInterval(pollTimer);
            init();
            startAfterDelay();
          }
        }, 100);
      }

      return () => {
        cancelled = true;
        clearTimeout(delayTimer);
        clearInterval(pollTimer);
      };
    }, []);

    const playRewardVideo = useCallback(() => {
      if (isReadyRef.current) {
        self.__VM.push(function (admanager: any, scope: any) {
          scope.Config.getKnown(optsRef.current.knownName).rewardedApi((api: any) =>
            api.show()
          );
        });
      } else {
        isReadyRef.current = false;
        setIsEnded(true);
        //Apply fallback direct to content or attempt reloading again
        //alert("reward video not ready; proceed your content instead.");
        reloadReward();
      }
    }, []);

    const reloadReward = useCallback(() => {
      self.__VM.push(function (admanager: any, scope: any) {
        scope.Config.getKnown(optsRef.current.knownName).reload();
      });
      setIsEnded(false);
    }, []);

    // Expose the two actions so a parent can drive them (e.g. on navigation).
    useImperativeHandle(ref, () => ({ playRewardVideo, reloadReward }), [
      playRewardVideo,
      reloadReward,
    ]);

    return (
      <></>
    );
  }
);
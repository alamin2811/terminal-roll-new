import React, { useEffect, useRef, useState } from "react";
import BitFlipStyle from "../BitFlip/BitFlip.style";
import RollIcon from "../../../../assets/images/icon/roll.png";
import InfoIcon from "../../../../assets/images/icon/info_icon.png";
import DipositDrawer from "../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer";
import Terminal from "../../../Core/Terminal/Terminal";
import { useAppPlayer } from "../../../../context/AppPlayerContext";
import RangeSlider from "../BitFlip/RangeSlider/RangeSlider";
import {
  startBeatBomb,
  openBeatBombStream,
  cashoutBeatBomb,
} from "../../../../services/beatBomb.api";

const BeatBomb = () => {
  const [showInfo, setShowInfo] = useState(false);
  const terminalRef = useRef(null);
  const drawerRef = useRef(null);
  const streamRef = useRef(null);

  const [betSol, setBetSol] = useState(0.0525);
  const [isBusy, setIsBusy] = useState(false);
  const [activeRoundId, setActiveRoundId] = useState(null);
  const [liveMultiplier, setLiveMultiplier] = useState(1.00);

  const [lines, setLines] = useState([
    "booting beat_the_bomb.exe",
    "single click starts the run",
    "second click locks payout",
    "wait too long and the bomb takes everything",
    "click to start the bomb",
  ]);

  const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer();

  const pushLines = (incoming) => {
    if (!Array.isArray(incoming) || !incoming.length) return;
    setLines((prev) => [...prev, ...incoming]);
  };

  const closeStream = () => {
    if (streamRef.current) {
      streamRef.current.close();
      streamRef.current = null;
    }
  };

  useEffect(() => {
    return () => closeStream();
  }, []);

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  const attachStream = (roundId) => {
    closeStream();

    const es = openBeatBombStream({
      roundId,
      walletAddress: userWalletAddress,
    });

    streamRef.current = es;

    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (typeof payload.multiplier === "number") {
          setLiveMultiplier(payload.multiplier);
        }

        if (Array.isArray(payload.lines)) {
          pushLines(payload.lines);
        }

        if (payload.type === "crash") {
          setActiveRoundId(null);
          setIsBusy(false);
          setLiveMultiplier(1.00);
          refreshTerminalWallet();
          closeStream();
        }

        if (payload.type === "cashout") {
          setActiveRoundId(null);
          setIsBusy(false);
          setLiveMultiplier(1.00);
          refreshTerminalWallet();
          closeStream();
        }

        if (payload.type === "error") {
          setActiveRoundId(null);
          setIsBusy(false);
          pushLines([`round failed: ${payload.message || "unknown error"}`]);
          closeStream();
        }
      } catch (e) {
        pushLines([`stream parse failed: ${e.message || "unknown error"}`]);
      }
    };

    es.onerror = () => {
      closeStream();

      pushLines(["connection lost - reconnecting round stream"]);

      setTimeout(() => {
        if (!streamRef.current) {
          attachStream(roundId);
        }
      }, 1000);
    };
  };

  const handlePrimaryClick = async () => {
    if (!userWalletAddress) {
      pushLines(["wallet not connected"]);
      return;
    }

    if (isBusy) return;

    try {
      setIsBusy(true);

      if (!activeRoundId) {
        const betLamports = Math.round(betSol * 1_000_000_000);

        pushLines([          
          "server arming bomb detonation point",
        ]);

        const out = await startBeatBomb({
          walletAddress: userWalletAddress,
          betLamports,
        });

        setActiveRoundId(out.roundId);
        setLiveMultiplier(1.00);
        pushLines(out.lines || []);
        attachStream(out.roundId);
        setIsBusy(false);
        return;
      }

      pushLines([`cashout request sent at ${liveMultiplier.toFixed(2)}x`]);

      await cashoutBeatBomb({
        walletAddress: userWalletAddress,
        roundId: activeRoundId,
      });

      /*const out = await cashoutBeatBomb({
        walletAddress: userWalletAddress,
        roundId: activeRoundId,
      });

      pushLines(out.lines || []);
      setActiveRoundId(null);
      setLiveMultiplier(1.00);
      refreshTerminalWallet();*/

    } catch (e) {
      pushLines([`round failed: ${e.message || "unknown error"}`]);
      setActiveRoundId(null);
      setLiveMultiplier(1.00);
      closeStream();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <BitFlipStyle>
        <div className="bit-flip-top">
          <div className="custom-container">
            <div className="bit-flip-inner">
              <div className="row">
                <div className="col-md-6">
                  <div className="bit-flip-left">
                    <h2>
                      Beat The Bomb
                      <button
                        className="btn p-0 border-0 bg-transparent"
                        onClick={() => setShowInfo(true)}
                      >
                        <img src={InfoIcon} alt="info" />
                      </button>
                    </h2>
                    <p>Live Cashout Detonation Engine</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="bit-flip-right">
                    <div className="balance">
                      <button
                        className="secondary-btn sm hover-btn"
                        onClick={() => drawerRef.current.openDrawer()}
                      >
                        <span className="btn-text">
                          <span>Deposit</span>
                          <span>Deposit</span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                      </button>
                      <h3>{terminalWallet ? `${terminalWallet.solTotal} SOL` : "—"}</h3>
                    </div>
                    <p>Terminal Wallet Balance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bit-flip-bottom">
          <div className="custom-container">
            <div className="bit-flip-content">
              <div ref={terminalRef}>
                <Terminal
                  lines={
                    activeRoundId
                      ? [...lines, `live multiplier: ${liveMultiplier.toFixed(2)}x`]
                      : lines
                  }
                />
              </div>

              <RangeSlider value={betSol} onChange={setBetSol} />

              <div className="terminal-btn">
                <button
                  className="primary-btn lg roll-button hover-btn"
                  onClick={handlePrimaryClick}
                  disabled={isBusy}
                >
                  <span className="btn-text">
                    <span>
                      <img src={RollIcon} alt="icon" />
                      {activeRoundId ? `Cash Out ${liveMultiplier.toFixed(2)}x` : "Start Run"}
                    </span>
                    <span>
                      <img src={RollIcon} alt="icon" />
                      {activeRoundId ? `Cash Out ${liveMultiplier.toFixed(2)}x` : "Start Run"}
                    </span>
                  </span>
                  <span className="btn-shape btn-shape1"></span>
                  <span className="btn-shape btn-shape2"></span>
                  <span className="btn-shape btn-shape3"></span>
                  <span className="btn-shape btn-shape4"></span>
                </button>
              </div>

              {showInfo && (
                <div style={{ marginTop: "20px" }}>
                  <Terminal
                    lines={[
                      "Beat The Bomb",
                      "Click once to start",
                      "Multiplier rises live",
                      "Click again before detonation to lock payout",
                      "If the bomb explodes first, payout is lost",
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </BitFlipStyle>

      <DipositDrawer ref={drawerRef} />
    </>
  );
};

export default BeatBomb;
import React, { useEffect, useRef, useState, useCallback } from "react";
import BitFlipStyle from "../BitFlip/BitFlip.style";
import InfoIcon from "../../../../assets/images/icon/info_icon.png";
import beatbombRedShape from "../../../../assets/images/bg/red-shape.png";
import DipositDrawer from "../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer";
import Terminal from "../../../Core/Terminal/Terminal";
import { useAppPlayer } from "../../../../context/AppPlayerContext";
import RangeSlider from "../BitFlip/RangeSlider/RangeSlider";
import {
  startBeatBomb,
  openBeatBombStream,
  cashoutBeatBomb,
} from "../../../../services/beatBomb.api";
import FuseStatus from "./FuseStatus/FuseStatus";

// ── Match this to your server-side fuse duration ──────────────────────────────
const FUSE_DURATION = 30; // seconds

const BeatBomb = () => {
  const drawerRef  = useRef(null);
  const terminalRef = useRef(null);
  const streamRef  = useRef(null);

  // Countdown refs — we drive smooth CSS transitions with a float elapsed value
  // updated every animation frame, keeping React re-renders to ~10 fps.
  const rafRef      = useRef(null);
  const startTsRef  = useRef(null);  // performance.now() when countdown started
  const renderTick  = useRef(0);     // frame counter for throttling setState

  const [betSol,          setBetSol]          = useState(0.0525);
  const [isBusy,          setIsBusy]          = useState(false);
  const [activeRoundId,   setActiveRoundId]   = useState(null);
  const [liveMultiplier,  setLiveMultiplier]  = useState(1.00);
  const [showInfo,        setShowInfo]        = useState(false);

  // secondsLeft drives the FuseStatus number display (integer, ~10fps update)
  const [secondsLeft,     setSecondsLeft]     = useState(FUSE_DURATION);
  // smoothPct is the CSS width value — updated every rAF for butter-smooth bars
  const [smoothPct,       setSmoothPct]       = useState(100); // TIME LEFT bar width

  const [lines, setLines] = useState([
    "arming beatbomb.exe",
    "fuse system initialised",
    "fetching server seed",
    "ready — arm the bomb, beat it before it explodes",
  ]);

  const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer();

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const pushLines = useCallback((incoming) => {
    if (!Array.isArray(incoming) || !incoming.length) return;
    setLines((prev) => [...prev, ...incoming]);
  }, []);

  const closeStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.close();
      streamRef.current = null;
    }
  }, []);

  // ── rAF-based countdown ──────────────────────────────────────────────────────

  const stopCountdown = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTsRef.current = null;
  }, []);

  const resetCountdown = useCallback(() => {
    stopCountdown();
    setSecondsLeft(FUSE_DURATION);
    setSmoothPct(100);
    renderTick.current = 0;
  }, [stopCountdown]);

  const startCountdown = useCallback(() => {
    stopCountdown();
    renderTick.current = 0;
    startTsRef.current = performance.now();

    const tick = (now) => {
      const elapsed = (now - startTsRef.current) / 1000; // seconds elapsed
      const remaining = Math.max(0, FUSE_DURATION - elapsed);
      const pct = (remaining / FUSE_DURATION) * 100;

      // Smooth pct — every frame (60fps visual update)
      setSmoothPct(pct);

      // Integer seconds — throttled to ~10fps to avoid React churn
      renderTick.current += 1;
      if (renderTick.current % 6 === 0) {
        setSecondsLeft(Math.ceil(remaining));
      }

      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Fuse burnt out — snap both to final state
        setSmoothPct(0);
        setSecondsLeft(0);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [stopCountdown]);

  // ── Stream ───────────────────────────────────────────────────────────────────

  const attachStream = useCallback((roundId) => {
    closeStream();

    const es = openBeatBombStream({ roundId, walletAddress: userWalletAddress });
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

        if (payload.type === "crash" || payload.type === "cashout") {
          setActiveRoundId(null);
          setIsBusy(false);
          setLiveMultiplier(1.00);
          resetCountdown();
          refreshTerminalWallet();
          closeStream();
        }

        if (payload.type === "error") {
          setActiveRoundId(null);
          setIsBusy(false);
          resetCountdown();
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
        if (!streamRef.current) attachStream(roundId);
      }, 1000);
    };
  }, [closeStream, pushLines, resetCountdown, refreshTerminalWallet, userWalletAddress]);

  // ── Button handler ───────────────────────────────────────────────────────────

  const handlePrimaryClick = async () => {
    if (!userWalletAddress) { pushLines(["wallet not connected"]); return; }
    if (isBusy) return;

    try {
      setIsBusy(true);

      // ── First click: START a new round ──
      if (!activeRoundId) {
        const betLamports = Math.round(betSol * 1_000_000_000);
        pushLines(["server arming bomb detonation point"]);

        const out = await startBeatBomb({ walletAddress: userWalletAddress, betLamports });

        setActiveRoundId(out.roundId);
        setLiveMultiplier(1.00);
        pushLines(out.lines || []);
        attachStream(out.roundId);

        // ── Kick the countdown the moment the round is confirmed ──
        startCountdown();

        setIsBusy(false);
        return;
      }

      // ── Second click: CASH OUT ──
      pushLines([`cashout request sent at ${liveMultiplier.toFixed(2)}x`]);
      await cashoutBeatBomb({ walletAddress: userWalletAddress, roundId: activeRoundId });

    } catch (e) {
      pushLines([`round failed: ${e.message || "unknown error"}`]);
      setActiveRoundId(null);
      setLiveMultiplier(1.00);
      resetCountdown();
      closeStream();
    } finally {
      setIsBusy(false);
    }
  };

  // ── Scroll terminal ──────────────────────────────────────────────────────────

  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // ── Cleanup on unmount ───────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      closeStream();
      stopCountdown();
    };
  }, [closeStream, stopCountdown]);

  // ── Derived values ───────────────────────────────────────────────────────────

  // TIME LEFT bar:  100% → 0%  (drains away)
  const timeLeftPct   = smoothPct;
  // FUSE PROGRESS bar: 0% → 100%  (burns toward detonation)
  const fuseProgressPct = 100 - smoothPct;
  const nukeNowSol    = (betSol * liveMultiplier).toFixed(3);

  return (
    <>
      <BitFlipStyle>
        <div className="custom-container">
          <div className="page-links">
            <a href="/play-bit-flip"       className="bitflip">Bitflip</a>
            <a href="/play-cache-hunt"     className="cacheundt">CACHEHUNT</a>
            <a href="/play-pump-loop"      className="pumploop">PUMPLOOP</a>
            <a href="/play-beat-the-bomb"  className="active beatbomb">BEATBOMB</a>
          </div>
        </div>

        {/* ── Header ── */}
        <div className="bit-flip-top beatbomb-top">
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

        {/* ── Main body ── */}
        <div className="bit-flip-bottom">
          <div className="custom-container">
            <div className="bit-flip-content">
              <div className="bit-flip-main-content beatbomb-main-content">

                {/* LEFT — terminal + fuse widget */}
                <div className="left">
                  <img src={beatbombRedShape} alt="img" className="beatflip-shape shape-left" />
                  <img src={beatbombRedShape} alt="img" className="beatflip-shape shape-right" />
                  <div className="terminal">
                    <div ref={terminalRef}>
                      <Terminal
                        lines={
                          activeRoundId
                            ? [...lines, `live multiplier: ${liveMultiplier.toFixed(2)}x`]
                            : lines
                        }
                      />
                    </div>
                  </div>

                  <FuseStatus
                    secondsLeft={secondsLeft}
                    maxSeconds={FUSE_DURATION}
                    liveMultiplier={liveMultiplier}
                    betSol={betSol}
                  />
                </div>

                {/* RIGHT — round info + progress bars */}
                <div className="right">
                  <div className="top">
                    <h6>Round Info</h6>
                    <ul>
                      <li><span>CURRENT WIN</span> <h4>{liveMultiplier.toFixed(2)}x</h4></li>
                      <li><span>MAX WIN</span>     <strong>100x</strong></li>
                      <li><span>YOUR BET</span>    <strong>{betSol.toFixed(4)} SOL</strong></li>
                      <li><span>NUKE NOW</span>    <strong>{nukeNowSol} SOL</strong></li>
                    </ul>
                  </div>

                  <div className="bottom">
                    {/* FUSE PROGRESS — 0 % → 100 % (burns toward boom) */}
                    <div className="catch-hunt-progress-content">
                      <h6>FUSE PROGRESS</h6>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${fuseProgressPct}%` }}
                        />
                      </div>
                      <div className="progress-value">
                        <span>{Math.round(fuseProgressPct)}%</span>
                        <span>💥 DETONATES</span>
                      </div>
                    </div>

                    {/* TIME LEFT — 100 % → 0 % (drains away) */}
                    <div className="catch-hunt-progress-content">
                      <h6>TIME LEFT</h6>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${timeLeftPct}%` }}
                        />
                      </div>
                      <div className="progress-value">
                        <span>{Math.max(0, Math.ceil(secondsLeft))}s</span>
                        <span>0s BOOM</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Range slider */}
              <div className="beatbomb-range-slider">
                <RangeSlider value={betSol} onChange={setBetSol} />
              </div>

              {/* CTA button */}
              <div className="terminal-btn">
                <button
                  className="primary-btn beatbomb-btn lg roll-button hover-btn"
                  onClick={handlePrimaryClick}
                  disabled={isBusy}
                >
                  <span className="btn-text">
                    <span>
                      {activeRoundId
                        ? `Cash Out ${liveMultiplier.toFixed(2)}x`
                        : `💣  NUKE IT — ${liveMultiplier.toFixed(2)}x`}
                    </span>
                    <span>
                      {activeRoundId
                        ? `Cash Out ${liveMultiplier.toFixed(2)}x`
                        : `💣  NUKE IT — ${liveMultiplier.toFixed(2)}x`}
                    </span>
                  </span>
                  <span className="btn-shape btn-shape1"></span>
                  <span className="btn-shape btn-shape2"></span>
                  <span className="btn-shape btn-shape3"></span>
                  <span className="btn-shape btn-shape4"></span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </BitFlipStyle>

      <DipositDrawer ref={drawerRef} />
    </>
  );
};

export default BeatBomb;
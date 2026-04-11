import React, { useEffect, useRef, useState, useCallback } from "react";
import BitFlipStyle from "../BitFlip/BitFlip.style";
import InfoIcon from "../../../../assets/images/icon/info_icon.png";
import beatbombRedShape from "../../../../assets/images/bg/red-shape.png";
import DipositDrawer from "../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer";
import Terminal from "../../../Core/Terminal/Terminal";
import { useAppPlayer } from "../../../../context/AppPlayerContext";
import RangeSlider from "../BitFlip/RangeSlider/RangeSlider";
// import {
//   startBeatBomb,
//   openBeatBombStream,
//   cashoutBeatBomb,
// } from "../../../../services/beatBomb.api";
// ↑ API calls commented out — running in pure HTML-simulation mode
import FuseStatus from "./FuseStatus/FuseStatus";

const FUSE_DURATION = 30; // seconds — matches HTML maxSec

const BeatBomb = () => {
  const drawerRef = useRef(null);
  const terminalRef = useRef(null);

  // ── Simulation timer ref (matches HTML BOMB.timer) ────────────────────────
  const bombTimerRef = useRef(null);
  // ── rAF ref for smooth progress bar ──────────────────────────────────────
  const rafRef = useRef(null);
  const startTsRef = useRef(null);
  const renderTickRef = useRef(0);

  // ── Phase: idle | running | nuked | boom (matches HTML exactly) ───────────
  const [phase, setPhase] = useState("idle");
  const [betSol, setBetSol] = useState(0.0525);
  const [liveMultiplier, setLiveMultiplier] = useState(1.00);
  const [secondsLeft, setSecondsLeft] = useState(FUSE_DURATION);
  const [smoothPct, setSmoothPct] = useState(0); // fuse progress 0→100
  const [showInfo, setShowInfo] = useState(false);

  const [lines, setLines] = useState([
    "arming beatbomb.exe",
    "fuse system initialised",
    "fetching server seed",
    "ready — arm the bomb, beat it before it explodes",
  ]);

  const { terminalWallet } = useAppPlayer();

  // ── Push terminal lines ───────────────────────────────────────────────────
  const pushLines = useCallback((incoming) => {
    if (!Array.isArray(incoming) || !incoming.length) return;
    setLines((prev) => [...prev, ...incoming]);
  }, []);

  // ── Stop rAF smooth bar ───────────────────────────────────────────────────
  const stopRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTsRef.current = null;
  }, []);

  // ── Stop interval timer (matches HTML clearInterval(BOMB.timer)) ──────────
  const stopBombTimer = useCallback(() => {
    if (bombTimerRef.current) {
      clearInterval(bombTimerRef.current);
      bombTimerRef.current = null;
    }
  }, []);

  // ── Start rAF for smooth CSS progress bar ─────────────────────────────────
  const startRaf = useCallback((durationSec) => {
    stopRaf();
    renderTickRef.current = 0;
    startTsRef.current = performance.now();

    const tick = (now) => {
      const elapsed = (now - startTsRef.current) / 1000;
      const remaining = Math.max(0, durationSec - elapsed);
      // fuse progress: 0% → 100% as fuse burns (matches HTML fusePct)
      const fusePct = ((durationSec - remaining) / durationSec) * 100;
      setSmoothPct(fusePct);

      if (remaining > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setSmoothPct(100);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [stopRaf]);

  // ── HTML bombTick equivalent — runs every 500ms ───────────────────────────
  // matches: s.seconds--, s.mult = 1 + (maxSec - seconds) * 0.32, boom check
  const startBombInterval = useCallback((durationSec) => {
    stopBombTimer();

    let seconds = durationSec;
    const maxSec = durationSec;

    bombTimerRef.current = setInterval(() => {
      seconds = Math.max(0, seconds - 1);
      // same formula as HTML: 1 + (maxSec - seconds) * 0.32, capped at 10
      const mult = parseFloat(Math.min(10, 1 + (maxSec - seconds) * 0.32).toFixed(2));

      setSecondsLeft(seconds);
      setLiveMultiplier(mult);

      if (seconds <= 0) {
        // ── BOOM — matches HTML: s.phase='boom', auto-reset after 3000ms ───
        stopBombTimer();
        stopRaf();
        setSmoothPct(100);
        setPhase("boom");
        pushLines(["BOOM — bomb exploded. bet lost."]);
        setTimeout(() => {
          setPhase("idle");
          setLiveMultiplier(1.00);
          setSecondsLeft(FUSE_DURATION);
          setSmoothPct(0);
        }, 3000);
      }
    }, 500);
  }, [stopBombTimer, stopRaf, pushLines]);

  // ── ARM BOMB — matches HTML startBomb() ──────────────────────────────────
  const startBomb = useCallback(() => {
    setPhase("running");
    setLiveMultiplier(1.00);
    setSecondsLeft(FUSE_DURATION);
    setSmoothPct(0);
    pushLines(["bomb armed — fuse burning"]);
    startRaf(FUSE_DURATION);
    startBombInterval(FUSE_DURATION);
  }, [pushLines, startRaf, startBombInterval]);

  // ── NUKE IT — matches HTML nukeBomb() ────────────────────────────────────
  const nukeBomb = useCallback(() => {
    stopBombTimer();
    stopRaf();
    setPhase("nuked");
    setLiveMultiplier((prev) => {
      pushLines([`nuked at ${prev.toFixed(2)}x — cashing out`]);
      return prev;
    });
    // auto-reset after 3500ms (matches HTML setTimeout 3500)
    setTimeout(() => {
      setPhase("idle");
      setLiveMultiplier(1.00);
      setSecondsLeft(FUSE_DURATION);
      setSmoothPct(0);
    }, 3500);
  }, [stopBombTimer, stopRaf, pushLines]);

  // ── Primary button — matches HTML handleBombBtn() exactly ─────────────────
  //   idle    → startBomb()
  //   running → nukeBomb()
  //   nuked / boom → reset to idle
  const handlePrimaryClick = () => {
    if (phase === "idle") {
      startBomb();
    } else if (phase === "running") {
      nukeBomb();
    } else {
      // nuked or boom — reset (matches HTML else branch)
      setPhase("idle");
      setLiveMultiplier(1.00);
      setSecondsLeft(FUSE_DURATION);
      setSmoothPct(0);
    }
  };

  // ── Scroll terminal ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = terminalRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopBombTimer();
      stopRaf();
    };
  }, [stopBombTimer, stopRaf]);

  // ── Derived values ────────────────────────────────────────────────────────
  const fuseProgressPct = smoothPct;           // 0 → 100 (fuse burns up)
  const timeLeftPct = 100 - smoothPct;     // 100 → 0 (time drains away)
  const nukeNowSol = (betSol * liveMultiplier).toFixed(3);

  // ── Dynamic button label — matches HTML exactly ───────────────────────────
  //   idle    → "💣 ARM BOMB"
  //   running → "💣 NUKE IT — 1.00x"
  //   nuked / boom → "💣 ARM AGAIN"
  const btnLabel = (() => {
    if (phase === "idle") return "💣  ARM BOMB";
    if (phase === "running") return `💣  NUKE IT — ${liveMultiplier.toFixed(2)}x`;
    return "💣  ARM AGAIN";
  })();

  // ── Terminal lines with live multiplier appended while running ────────────
  const liveLines = phase === "running"
    ? [...lines, `fuse burning — ${secondsLeft}s left — nuke now at ${liveMultiplier.toFixed(2)}x or hold!`]
    : lines;

  return (
    <>
      <BitFlipStyle>
        <div className="custom-container">
          <div className="page-links">
            <a href="/play-bit-flip" className="bitflip">Bitflip</a>
            <a href="/play-cache-hunt" className="cacheundt">CACHEHUNT</a>
            <a href="/play-pump-loop" className="pumploop">PUMPLOOP</a>
            <a href="/play-beat-the-bomb" className="active beatbomb">BEATBOMB</a>
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
                      <Terminal lines={liveLines} />
                    </div>
                  </div>

                  <FuseStatus
                    phase={phase}
                    secondsLeft={secondsLeft}
                    maxSeconds={FUSE_DURATION}
                    liveMultiplier={liveMultiplier}
                    betSol={betSol}
                  />
                </div>

                {/* RIGHT — round info + progress bars */}
                <div className="right for-desktop">
                  <div className="top">
                    <h6>Round Info</h6>
                    <ul>
                      <li>
                        <span>CURRENT WIN</span>
                        <h4 style={{ color: phase === "boom" ? "#ff2244" : undefined }}>
                          {phase === "boom" ? "BOOM" : `${liveMultiplier.toFixed(2)}x`}
                        </h4>
                      </li>
                      <li><span>MAX WIN</span>  <strong>10x</strong></li>
                      <li><span>YOUR BET</span> <strong>{betSol.toFixed(4)} SOL</strong></li>
                      <li>
                        <span>NUKE NOW</span>
                        <strong>{phase === "boom" ? "0.000 SOL" : `${nukeNowSol} SOL`}</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="bottom">
                    {/* FUSE PROGRESS — 0% → 100% (burns toward boom) */}
                    <div className="beatbomb-progress-content">
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

                    {/* TIME LEFT — 100% → 0% (drains away) */}
                    <div className="beatbomb-progress-content">
                      <h6>TIME LEFT</h6>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${timeLeftPct}%` }}
                        />
                      </div>
                      <div className="progress-value">
                        <span>{Math.max(0, secondsLeft)}s</span>
                        <span>0s BOOM</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Range slider — disabled while running */}
              <div className="beatbomb-range-slider">
                <RangeSlider
                  value={betSol}
                  onChange={setBetSol}
                  disabled={phase === "running"}
                />
              </div>

              {/* CTA button */}
              <div className="terminal-btn">
                <button
                  className="primary-btn beatbomb-btn lg roll-button hover-btn"
                  onClick={handlePrimaryClick}
                >
                  <span className="btn-text">
                    <span>{btnLabel}</span>
                    <span>{btnLabel}</span>
                  </span>
                  <span className="btn-shape btn-shape1"></span>
                  <span className="btn-shape btn-shape2"></span>
                  <span className="btn-shape btn-shape3"></span>
                  <span className="btn-shape btn-shape4"></span>
                </button>
              </div>

              <div className="bit-flip-main-content beatbomb-main-content for-mobile">
                {/* RIGHT — round info + progress bars */}
                <div className="right for-mobile">
                  <div className="top">
                    <h6>Round Info</h6>
                    <ul>
                      <li>
                        <span>CURRENT WIN</span>
                        <h4 style={{ color: phase === "boom" ? "#ff2244" : undefined }}>
                          {phase === "boom" ? "BOOM" : `${liveMultiplier.toFixed(2)}x`}
                        </h4>
                      </li>
                      <li><span>MAX WIN</span>  <strong>10x</strong></li>
                      <li><span>YOUR BET</span> <strong>{betSol.toFixed(4)} SOL</strong></li>
                      <li>
                        <span>NUKE NOW</span>
                        <strong>{phase === "boom" ? "0.000 SOL" : `${nukeNowSol} SOL`}</strong>
                      </li>
                    </ul>
                  </div>

                  <div className="bottom">
                    {/* FUSE PROGRESS — 0% → 100% (burns toward boom) */}
                    <div className="beatbomb-progress-content">
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

                    {/* TIME LEFT — 100% → 0% (drains away) */}
                    <div className="beatbomb-progress-content">
                      <h6>TIME LEFT</h6>
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${timeLeftPct}%` }}
                        />
                      </div>
                      <div className="progress-value">
                        <span>{Math.max(0, secondsLeft)}s</span>
                        <span>0s BOOM</span>
                      </div>
                    </div>
                  </div>
                </div>
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
import React from "react";
import FuseStatusStyle from "./FuseStatus.style";

// phase: "idle" | "running" | "nuked" | "boom"
const FuseStatus = ({
  phase          = "idle",
  secondsLeft,
  maxSeconds     = 30,
  liveMultiplier = 1.00,
  betSol         = 0.0525,
}) => {
  // ── Timer display — matches HTML bomb-sec padStart(2,'0') ─────────────────
  //   idle    → "30" (full duration)
  //   running → live countdown
  //   nuked   → frozen at cashout moment
  //   boom    → "00"
  const displaySeconds = (() => {
    if (phase === "idle")  return String(maxSeconds).padStart(2, "0");
    if (phase === "boom")  return "00";
    return String(Math.max(0, Math.ceil(secondsLeft ?? maxSeconds))).padStart(2, "0");
  })();

  // ── Label below timer — matches HTML bomb-lbl ─────────────────────────────
  const timerLabel = (() => {
    if (phase === "boom")  return "EXPLODED";
    if (phase === "nuked") return "NUKED";
    return "SECONDS";
  })();

  // ── Ring/text colour — red on boom, normal otherwise ─────────────────────
  const isBoom    = phase === "boom";
  const bombColor = isBoom ? "#ff2244" : undefined;

  const nukeNow = (betSol * liveMultiplier).toFixed(3);

  return (
    <FuseStatusStyle>
      <h6>FUSE STATUS</h6>

      <div className="fuse-status-content">
        {/* Bomb ring timer — matches HTML .bomb-ring */}
        <div
          className="fuse-timer"
          style={bombColor ? { borderColor: bombColor } : undefined}
        >
          <h5 style={bombColor ? { color: bombColor } : undefined}>
            {displaySeconds}
          </h5>
          <p style={bombColor ? { color: bombColor } : undefined}>
            {timerLabel}
          </p>
        </div>

        {/* Stats list — matches HTML .bomb-stats */}
        <div className="fuse-list">
          <ul>
            <li>
              <span>CURRENT WIN</span>
              <h4 style={{ color: isBoom ? "#ff2244" : undefined }}>
                {isBoom ? "BOOM" : `${liveMultiplier.toFixed(2)}x`}
              </h4>
            </li>
            <li>
              <span>YOUR BET</span>
              <strong>{betSol.toFixed(4)} SOL</strong>
            </li>
            <li>
              <span>NUKE NOW</span>
              <strong>{isBoom ? "0.000 SOL" : `${nukeNow} SOL`}</strong>
            </li>
          </ul>
        </div>
      </div>
    </FuseStatusStyle>
  );
};

export default FuseStatus;
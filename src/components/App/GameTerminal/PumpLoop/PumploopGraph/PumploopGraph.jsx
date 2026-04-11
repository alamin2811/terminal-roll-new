import React, { useEffect, useRef, useState } from "react";
import PumploopGraphStyle from "./PumploopGraph.style";

const ACCENT     = "#FFE600";
const DANGER     = "#ff2244";
const GRID_COLOR = "#FFE60033";
const TEXT_DIM   = "#819E77";

const SVG_W     = 500;
const BASELINE  = 140;
const TOP_PAD   = 10;
const LEFT_PAD  = 38;
const RIGHT_PAD = 10;

// Grid shows 1x, 5x, 10x, 15x
const MAX_VISUAL = 15;

const GRID_LEVELS = [
  { label: "1x",  y: BASELINE },
  { label: "5x",  y: BASELINE - ((5  - 1) / (MAX_VISUAL - 1)) * (BASELINE - TOP_PAD) },
  { label: "10x", y: BASELINE - ((10 - 1) / (MAX_VISUAL - 1)) * (BASELINE - TOP_PAD) },
  { label: "15x", y: BASELINE - ((15 - 1) / (MAX_VISUAL - 1)) * (BASELINE - TOP_PAD) },
];

function multToY(mult) {
  // Clamp so anything above 15x just hits the top
  const clamped = Math.min(mult, MAX_VISUAL);
  return BASELINE - ((clamped - 1) / (MAX_VISUAL - 1)) * (BASELINE - TOP_PAD);
}
function stepToX(step) {
  return LEFT_PAD + Math.min(step / 120, 1) * (SVG_W - LEFT_PAD - RIGHT_PAD);
}
function buildLinePath(pts) {
  if (pts.length < 2) return "";
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}
function buildAreaPath(pts) {
  if (pts.length < 2) return "";
  const last = pts[pts.length - 1];
  return `${buildLinePath(pts)} L${last.x.toFixed(2)},${BASELINE} L${pts[0].x.toFixed(2)},${BASELINE} Z`;
}

const PumploopGraph = ({ phase = "idle", bet = 0.058, onDump, onProgressUpdate, onMultUpdate }) => {
  const timerRef  = useRef(null);
  const pointsRef = useRef([]);
  const stepRef   = useRef(0);
  const dumpAtRef = useRef(0);
  const multRef   = useRef(1.0);
  const onDumpRef = useRef(onDump);
  const onProgressUpdateRef = useRef(onProgressUpdate);
  const onMultUpdateRef = useRef(onMultUpdate);

  useEffect(() => { onDumpRef.current = onDump; }, [onDump]);
  useEffect(() => { onProgressUpdateRef.current = onProgressUpdate; }, [onProgressUpdate]);
  useEffect(() => { onMultUpdateRef.current = onMultUpdate; }, [onMultUpdate]);

  const [linePath,   setLinePath]   = useState("");
  const [areaPath,   setAreaPath]   = useState("");
  const [dotPos,     setDotPos]     = useState({ x: LEFT_PAD, y: BASELINE });
  const [multiplier, setMultiplier] = useState("1.00");
  const [footerMult, setFooterMult] = useState("waiting...");
  const [isDumped,   setIsDumped]   = useState(false);
  const [dumpDotPos, setDumpDotPos] = useState({ x: LEFT_PAD, y: BASELINE });

  const clearTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const resetAllRef = useRef(null);
  resetAllRef.current = () => {
    clearTimer();
    pointsRef.current = [];
    stepRef.current   = 0;
    multRef.current   = 1.0;
    setLinePath("");
    setAreaPath("");
    setDotPos({ x: LEFT_PAD, y: BASELINE });
    setDumpDotPos({ x: LEFT_PAD, y: BASELINE });
    setMultiplier("1.00");
    setFooterMult("waiting...");
    setIsDumped(false);
    if (onProgressUpdateRef.current) onProgressUpdateRef.current(1.0);
    if (onMultUpdateRef.current) onMultUpdateRef.current(1.0);
  };

  const showDumpRef = useRef(null);
  showDumpRef.current = () => {
    clearTimer();
    const lastPt = pointsRef.current[pointsRef.current.length - 1];
    if (lastPt) setDumpDotPos({ x: lastPt.x, y: lastPt.y });
    setIsDumped(true);
    setMultiplier("DUMP");
    setFooterMult("DUMPED");
    if (onDumpRef.current) onDumpRef.current(multRef.current);
  };

  const tickRef = useRef(null);
  tickRef.current = () => {
    stepRef.current += 1;
    const noise = (Math.random() - 0.35) * 0.18;
    multRef.current = Math.max(1.0, multRef.current + 0.09 + noise);

    const x = stepToX(stepRef.current);
    const y = multToY(multRef.current);
    pointsRef.current.push({ x, y });

    const pts = pointsRef.current;
    if (pts.length > 1) {
      setLinePath(buildLinePath(pts));
      setAreaPath(buildAreaPath(pts));
    }
    setDotPos({ x, y });

    const mStr = multRef.current.toFixed(2);
    setMultiplier(mStr);
    setFooterMult(mStr + "x");

    if (onProgressUpdateRef.current) onProgressUpdateRef.current(multRef.current);
    if (onMultUpdateRef.current) onMultUpdateRef.current(multRef.current);

    if (multRef.current >= dumpAtRef.current || stepRef.current > 140) {
      showDumpRef.current();
    }
  };

  const startChartRef = useRef(null);
  startChartRef.current = () => {
    resetAllRef.current();
    // Balanced distribution: roughly equal chance of low, mid, high dumps
    // ~30% chance below 3x, ~40% chance 3x–8x, ~30% chance 8x–20x
    const r = Math.random();
    let dumpAt;
    if (r < 0.30) {
      // Low: 1.1x – 3x
      dumpAt = 1.1 + Math.random() * 1.9;
    } else if (r < 0.70) {
      // Mid: 3x – 8x
      dumpAt = 3 + Math.random() * 5;
    } else {
      // High: 8x – 20x
      dumpAt = 8 + Math.random() * 12;
    }
    dumpAtRef.current = dumpAt;
    timerRef.current  = setInterval(() => tickRef.current(), 80);
  };

  useEffect(() => {
    if (phase === "running") startChartRef.current();
    else if (phase === "idle" || phase === "sold") resetAllRef.current();
    else if (phase === "dumped") showDumpRef.current();
  }, [phase]);

  useEffect(() => () => clearTimer(), []);

  const lineColor = isDumped ? DANGER : ACCENT;
  const areaId    = isDumped ? "pl-dangerfill" : "pl-areafill";

  return (
    <PumploopGraphStyle>
      <div className="graph-header">
        <span className="graph-label">MULTIPLIER</span>
        <span className={`multiplier${isDumped ? " dumped" : ""}`}>
          {isDumped ? "DUMPED" : multiplier}<span>x</span>
        </span>
      </div>

      <div className="canvas-wrapper">
        <svg viewBox={`0 0 ${SVG_W} 160`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pl-areafill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.22" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="pl-dangerfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={DANGER} stopOpacity="0.22" />
              <stop offset="100%" stopColor={DANGER} stopOpacity="0.00" />
            </linearGradient>
            <filter id="pl-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {GRID_LEVELS.map(({ label, y }) => (
            <g key={label}>
              <line
                x1={LEFT_PAD} y1={y} x2={SVG_W - RIGHT_PAD} y2={y}
                stroke={GRID_COLOR}
                strokeWidth={y === BASELINE ? "0.8" : "0.5"}
                strokeDasharray={y === BASELINE ? undefined : "4 4"}
              />
              <text x="2" y={y + 4} fontFamily="'Share Tech Mono', monospace" fontSize="10" fill={TEXT_DIM}>
                {label}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill={`url(#${areaId})`} />

          {/* Main line */}
          <path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#pl-glow)"
          />

          {/* Dump overlay */}
          {isDumped && (
            <>
              <line
                x1={dumpDotPos.x} y1={dumpDotPos.y}
                x2={dumpDotPos.x} y2={BASELINE}
                stroke={DANGER}
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={Math.min(dumpDotPos.x + 5, SVG_W - 55)}
                y={14}
                fontFamily="'Share Tech Mono', monospace"
                fontSize="10"
                fill={DANGER}
                letterSpacing="1"
              >
                DUMPED
              </text>
            </>
          )}

          {/* Moving dot */}
          <circle
            cx={isDumped ? dumpDotPos.x : dotPos.x}
            cy={isDumped ? BASELINE     : dotPos.y}
            r="5"
            fill={lineColor}
            filter="url(#pl-glow)"
          />
        </svg>
      </div>

      <div className="chart-footer">
        <span>LAUNCH</span>
        <span className="footer-right" style={{ color: isDumped ? DANGER : ACCENT }}>
          {footerMult}
        </span>
      </div>

      <h6 className="pump-graph-bottom">
        &gt; payout now: {(bet * parseFloat(multiplier === "DUMP" ? "0" : multiplier || "1")).toFixed(4)} SOL ({multiplier === "DUMP" ? "0.00" : multiplier}x)
      </h6>
    </PumploopGraphStyle>
  );
};

export default PumploopGraph;
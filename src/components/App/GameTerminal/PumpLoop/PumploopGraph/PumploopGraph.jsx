import React, { useEffect, useRef, useState } from "react";
import PumploopGraphStyle from "./PumploopGraph.style";

const ACCENT     = "#14f195";
const DANGER     = "#ff2244";
const GRID_COLOR = "#2a4a3a";
const TEXT_DIM   = "#2a6a4a";

const SVG_W     = 500;
const BASELINE  = 140;
const TOP_PAD   = 10;
const LEFT_PAD  = 38;
const RIGHT_PAD = 10;

const GRID_LEVELS = [
  { label: "1x",  y: BASELINE },
  { label: "4x",  y: BASELINE - ((4  - 1) / 12) * (BASELINE - TOP_PAD) },
  { label: "7x",  y: BASELINE - ((7  - 1) / 12) * (BASELINE - TOP_PAD) },
  { label: "10x", y: BASELINE - ((10 - 1) / 12) * (BASELINE - TOP_PAD) },
];

function multToY(mult) {
  return BASELINE - ((mult - 1) / 12) * (BASELINE - TOP_PAD);
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

const PumploopGraph = ({ phase = "idle", onDump }) => {
  const timerRef  = useRef(null);
  const pointsRef = useRef([]);
  const stepRef   = useRef(0);
  const dumpAtRef = useRef(0);
  const multRef   = useRef(1.0);
  const onDumpRef = useRef(onDump);
  useEffect(() => { onDumpRef.current = onDump; }, [onDump]);

  const [linePath,   setLinePath]   = useState("");
  const [areaPath,   setAreaPath]   = useState("");
  const [dotPos,     setDotPos]     = useState({ x: LEFT_PAD, y: BASELINE });
  const [multiplier, setMultiplier] = useState("1.00");
  const [footerMult, setFooterMult] = useState("waiting...");
  const [isDumped,   setIsDumped]   = useState(false);

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
    setMultiplier("1.00");
    setFooterMult("waiting...");
    setIsDumped(false);
  };

  const showDumpRef = useRef(null);
  showDumpRef.current = () => {
    clearTimer();
    // Line and area stay as-is — just switch color to red via isDumped state
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

    if (multRef.current >= dumpAtRef.current || stepRef.current > 140) {
      showDumpRef.current();
    }
  };

  const startChartRef = useRef(null);
  startChartRef.current = () => {
    resetAllRef.current();
    dumpAtRef.current = 1.1 + Math.pow(Math.random(), 0.45) * 14;
    timerRef.current  = setInterval(() => tickRef.current(), 80);
  };

  useEffect(() => {
    if (phase === "running") startChartRef.current();
    else if (phase === "idle" || phase === "sold") resetAllRef.current();
    else if (phase === "dumped") showDumpRef.current();
  }, [phase]);

  useEffect(() => () => clearTimer(), []);

  // Line color flips green → red on dump
  const lineColor = isDumped ? DANGER : ACCENT;
  const areaId    = isDumped ? "pl-dangerfill" : "pl-areafill";

  return (
    <PumploopGraphStyle>
      <div className="graph-header">
        <span className="graph-label">MULTIPLIER</span>
        <span className={`multiplier${isDumped ? " dumped" : ""}`}>
          {isDumped ? "DUMPED" : `${multiplier}x`}
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

          {/* Grid */}
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

          {/* Area fill — switches to red gradient on dump */}
          <path d={areaPath} fill={`url(#${areaId})`} />

          {/* Main line — switches to red on dump */}
          <path
            d={linePath}
            fill="none"
            stroke={lineColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#pl-glow)"
          />

          {/* DUMPED label — only shown when dumped */}
          {isDumped && (
            <text
              x={Math.min(dotPos.x + 6, SVG_W - 60)}
              y={Math.max(dotPos.y - 8, TOP_PAD + 10)}
              fontFamily="'Share Tech Mono', monospace"
              fontSize="11"
              fontWeight="bold"
              fill={DANGER}
            >
              DUMPED
            </text>
          )}

          {/* Moving dot — turns red on dump */}
          <circle
            cx={dotPos.x}
            cy={dotPos.y}
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
    </PumploopGraphStyle>
  );
};

export default PumploopGraph;
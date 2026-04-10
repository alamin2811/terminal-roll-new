import React, { useState, useRef, useEffect } from 'react'
import BitFlipStyle from '../BitFlip/BitFlip.style'
import RollIcon from '../../../../assets/images/icon/roll.png'
import InfoIcon from '../../../../assets/images/icon/info_icon.png'
import pumploopYellowShape from "../../../../assets/images/bg/yellow-shape.png";
import DipositDrawer from '../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer'
import Terminal from '../../../Core/Terminal/Terminal'
import { rollPumpLoop } from "../../../../services/roll.api";
import { useAppPlayer } from "../../../../context/AppPlayerContext";
import RangeSlider from './RangeSlider/RangeSlider'
import PumpLoopInfo from './PumpLoopInfo/PumpLoopInfo'
import PumploopGraph from './PumploopGraph/PumploopGraph'

const SPINNER_FRAMES = ["-", "\\", "|", "/"];
const MAX_MULT = 100; // maximum multiplier for progress bar calculation

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getDelay = (line) => {
    const text = typeof line === "string" ? line : line.text;

    const SPEED = 10; // 1 = normal, <1 faster, >1 slower

    // --- STARTUP ---
    if (text === "booting pump_loop.exe") return 30 * SPEED;

    if (text.includes("launch corridor") || text.includes("launch engine")) return 60 * SPEED;

    if (text === "launch token deployed") return 120 * SPEED;
    if (text === "monitoring curve response") return 250 * SPEED;

    // --- CURVE BUILD (LOW/MID/HIGH) ---
    if (
        text.includes("bids") ||
        text.includes("retail") ||
        text.includes("momentum") ||
        text.includes("pressure") ||
        text.includes("breakout") ||
        text.includes("whale") ||
        text.includes("parabolic") ||
        text.includes("expansion")
    ) {
        return (120 + Math.random() * 60) * SPEED;
    }

    // --- MULTIPLIER (CORE LOOP) ---
    if (text.startsWith("current multiple")) {
        return (120 + Math.random() * 40) * SPEED;
    }

    // --- LOSS SNAP ---
    if (
        text.includes("failed") ||
        text.includes("collapsed") ||
        text.includes("rug") ||
        text.includes("drained") ||
        text.includes("overwhelmed")
    ) {
        return 40 * SPEED;
    }

    if (text === "collapse event confirmed") return 20 * SPEED;

    // --- WIN CLOSE ---
    if (text === "dump cascade detected") return 120 * SPEED;

    if (
        text.includes("position closed") ||
        text.includes("profit captured") ||
        text.includes("curve exited") ||
        text.includes("terminal released") ||
        text.includes("closing into realised")
    ) {
        return 100 * SPEED;
    }

    // --- FINAL REVEAL ---
    if (text.startsWith("final multiple")) return 200 * SPEED;

    if (text.startsWith("payout")) return 0;

    // --- DEFAULT ---
    return (80 + Math.random() * 80) * SPEED;
};

const PumpLoop = () => {
    const terminalRef = useRef(null)
    const drawerRef = useRef(null)
    const [showInfo, setShowInfo] = useState(false)
    const [isRolling, setIsRolling] = useState(false)
    const spinnerRef = useRef(null)
    const [betSol, setBetSol] = useState(1.0025);

    // Controls the graph animation: 'idle' | 'running' | 'sold' | 'dumped'
    const [graphPhase, setGraphPhase] = useState("idle");

    // Dynamic progress values driven by graph multiplier
    // pumpProgress: 0–100 based on current mult vs MAX_MULT
    // riskLevel: increases faster (more aggressive curve)
    const [pumpProgress, setPumpProgress] = useState(0);
    const [riskLevel, setRiskLevel] = useState(0);
    const [currentMult, setCurrentMult] = useState(1.0);

    const [lines, setLines] = useState([
        `initiating pumploop.exe`,
        `loading entropy modules`,
        `fetching server seed`,
        `ready — set bet and launch token`,
    ])

    const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer();

    // Called every tick by PumploopGraph with the current multiplier
    const handleProgressUpdate = (mult) => {
        setCurrentMult(mult);
        // Pump progress: linear scale 1x → 100x mapped to 0% → 100%
        const pump = Math.min(((mult - 1) / (MAX_MULT - 1)) * 100, 100);
        setPumpProgress(pump);
        // Risk level: grows faster — square root curve makes it feel more dangerous early
        const risk = Math.min(Math.sqrt((mult - 1) / (MAX_MULT - 1)) * 100, 100);
        setRiskLevel(risk);
    };

    const handleRoll = async () => {
        if (isRolling) return;
        setIsRolling(true);
        // Start the graph when the roll begins
        setGraphPhase("running");

        try {
            setLines(l => [
                ...l,
                "launching token -"
            ]);

            startSpinner();

            const betLamports = Math.round(betSol * 1_000_000_000);

            const result = await rollPumpLoop({
                walletAddress: userWalletAddress,
                betLamports
            });

            stopSpinner();

            const cleanedLines = (result.terminalLines || []).map(line =>
                line.startsWith(">") ? line.slice(1).trim() : line
            );

            for (const line of cleanedLines) {
                setLines(l => [...l, line]);
                await sleep(getDelay(line));
            }

            // Update graph phase based on result
            if (result.result === "win") {
                setGraphPhase("sold");
            } else {
                setGraphPhase("dumped");
            }

            setLines(l => [
                ...l,
                `launch result: ${result.result === "win"
                    ? `!!! WIN - ${result.payoutAmountSol} SOL paid !!!`
                    : `MISS - token launch collapsed`
                }`,
                `click to launch token`,
            ]);

            refreshTerminalWallet();
        } catch (e) {
            stopSpinner();
            setGraphPhase("idle");
            setLines(l => [...l, `roll failed: ${e.message || "unknown error"}`]);
        } finally {
            setIsRolling(false);
        }
    };

    const startSpinner = () => {
        let i = 0;
        spinnerRef.current = setInterval(() => {
            setLines(l => {
                const copy = [...l];
                copy[copy.length - 1] = `launching token ${SPINNER_FRAMES[i % SPINNER_FRAMES.length]}`;
                return copy;
            });
            i++;
        }, 120);
    };

    const stopSpinner = () => {
        if (spinnerRef.current) {
            clearInterval(spinnerRef.current);
            spinnerRef.current = null;
        }
    };

    useEffect(() => {
        const el = terminalRef.current
        if (!el) return
        el.scrollTop = el.scrollHeight
    }, [])

    const [isPumpRolling, setIsPumpRolling] = useState(false);

    // handleSellNow — starts the graph on click, stops it after 3s
    const handleSellNow = () => {
        setIsRolling(true);
        setGraphPhase("running"); // ← start chart animation

        setTimeout(() => {
            setIsRolling(false);
            setGraphPhase("sold"); // ← freeze chart
            setTimeout(() => {
                setGraphPhase("idle"); // ← reset after brief pause
                setPumpProgress(0);
                setRiskLevel(0);
                setCurrentMult(1.0);
            }, 1500);
        }, 3000);
    };

    // Get risk label text based on level
    const getRiskLabel = (level) => {
        if (level < 25) return "LOW";
        if (level < 50) return "MEDIUM";
        if (level < 75) return "HIGH";
        return "EXTREME";
    };

    return (
        <>
            <BitFlipStyle>
                <div className="custom-container">
                    <div className="page-links">
                        <a href="/play-bit-flip" className='bitflip'>Bitflip</a>
                        <a href="/play-cache-hunt" className='cacheundt'>CACHEHUNT</a>
                        <a href="/play-pump-loop" className='active pumploop'>PUMPLOOP</a>
                        <a href="/play-beat-the-bomb" className='beatbomb'>BEATBOMB</a>
                    </div>
                </div>
                <div className="bit-flip-top pump-loop-top">
                    <div className="custom-container">
                        <div className="bit-flip-inner">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="bit-flip-left">
                                        <h2>
                                            Pump Loop
                                            <button
                                                className="btn p-0 border-0 bg-transparent"
                                                onClick={() => setShowInfo(s => !s)}
                                            >
                                                <img src={InfoIcon} alt="info" />
                                            </button>
                                        </h2>
                                        <p>Launch Curve Engine</p>
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
                            <div className="bit-flip-main-content pump-loop-main-content">
                                <div className="left">
                                    <img src={pumploopYellowShape} alt="img" className="beatflip-shape shape-left" />
                                    <img src={pumploopYellowShape} alt="img" className="beatflip-shape shape-right" />
                                    <div className="terminal">
                                        <Terminal lines={lines} />
                                    </div>

                                    {/* Graph starts when button is clicked (graphPhase = 'running') */}
                                    <PumploopGraph
                                        phase={graphPhase}
                                        onDump={() => setGraphPhase("dumped")}
                                        onProgressUpdate={handleProgressUpdate}
                                    />

                                </div>
                                <div className="right">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            <li><span>CURRENT WIN</span> <h4>{currentMult.toFixed(2)}x</h4></li>
                                            <li><span>MAX WIN</span> <strong>100x</strong></li>
                                            <li><span>YOUR BET</span> <strong>0.058 SOL</strong></li>
                                            <li><span>SELL NOW</span> <strong>0.815 SOL</strong></li>
                                        </ul>
                                    </div>
                                    <div className="bottom">
                                        <div className="pump-loop-progress-content">
                                            <h6>PUMP PROGRESS</h6>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress progress-warning"
                                                    style={{ width: `${pumpProgress}%`, transition: 'width 0.1s ease' }}
                                                ></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{currentMult.toFixed(2)}x</span>
                                                <span>MAX 100x</span>
                                            </div>
                                        </div>
                                        <div className="pump-loop-progress-content danger">
                                            <h6>RISK LEVEL</h6>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress progress-danger"
                                                    style={{ width: `${riskLevel}%`, transition: 'width 0.1s ease' }}
                                                ></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{getRiskLabel(riskLevel)}</span>
                                                <span>EXTREME</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pump-loop-range-slider">
                                <RangeSlider value={betSol} onChange={setBetSol} />
                            </div>

                            <div className="terminal-btn">
                                <button
                                    className="primary-btn pump-loop-main-btn lg roll-button hover-btn"
                                    onClick={handleSellNow}
                                    disabled={isPumpRolling}
                                >
                                    <span className="btn-text">
                                        <span>
                                            {isPumpRolling
                                                ? "Launching Token..."
                                                : `▼ SELL NOW — ${currentMult.toFixed(2)}x`}
                                        </span>
                                        <span>
                                            {isPumpRolling
                                                ? "Launching Token..."
                                                : `▼ SELL NOW — ${currentMult.toFixed(2)}x`}
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

            {/* INFO POPUP */}
            <PumpLoopInfo
                show={showInfo}
                onClose={() => setShowInfo(false)}
            />

            <DipositDrawer ref={drawerRef} />
        </>
    )
}

export default PumpLoop
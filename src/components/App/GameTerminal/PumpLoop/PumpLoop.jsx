import React, { useState, useRef, useEffect } from 'react'
import BitFlipStyle from '../BitFlip/BitFlip.style'
import RollIcon from '../../../../assets/images/icon/roll.png'
import InfoIcon from '../../../../assets/images/icon/info_icon.png'
import DipositDrawer from '../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer'
import Terminal from '../../../Core/Terminal/Terminal'
import { rollPumpLoop } from "../../../../services/roll.api";
import { useAppPlayer } from "../../../../context/AppPlayerContext";
import RangeSlider from './RangeSlider/RangeSlider'
import PumpLoopInfo from './PumpLoopInfo/PumpLoopInfo'

const SPINNER_FRAMES = ["-", "\\", "|", "/"];

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

    const [lines, setLines] = useState([
        `initiating pump_loop.exe`,
        `mounting Pump.Fun launch engine`,
        `wild 100x upside mode armed`,
        `click to launch token`
    ])

    const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer();

    const handleRoll = async () => {
        if (isRolling) return;
        setIsRolling(true);

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

            setLines(l => [
                ...l,
                `launch result: ${
                    result.result === "win"
                        ? `!!! WIN - ${result.payoutAmountSol} SOL paid !!!`
                        : `MISS - token launch collapsed`
                }`,
                `click to launch token`,
            ]);

            /*setLines(l => [
                ...l,
                ...(result.terminalLines || []).map(line => line.startsWith(">") ? line.slice(1).trim() : line),
                `resolution: ${
                    result.result === "win"
                        ? `WIN - ${result.payoutAmountSol} SOL paid out`
                        : `MISS - launch collapsed`
                }`,
            ]);*/

            refreshTerminalWallet();
        } catch (e) {
            stopSpinner();
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

                            <Terminal lines={lines}/>

                            <RangeSlider value={betSol} onChange={setBetSol}/>

                            <div className="terminal-btn">
                                <button className="primary-btn lg roll-button hover-btn" onClick={handleRoll} disabled={isRolling}>
                                    <span className="btn-text">
                                        <span><img src={RollIcon} alt="icon" />{isRolling ? "Launching Token..." : "Launch Token"}</span>
                                        <span><img src={RollIcon} alt="icon" />{isRolling ? "Launching Token..." : "Launch Token"}</span>
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
//src/components/App/GameTerminal/BitFlip/BitFlip.jsx
import React, { useState, useRef, useEffect } from 'react'
import BitFlipStyle from './BitFlip.style'
import RollIcon from '../../../../assets/images/icon/roll.png'
import InfoIcon from '../../../../assets/images/icon/info_icon.png'
import bitflipGreenShape from "../../../../assets/images/bg/green-shape.png";
import BitFlipInfo from './BitFlipInfo/BitFlipInfo'
import DipositDrawer from '../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer'
import Terminal from '../../../Core/Terminal/Terminal'
import { rollBitFlip } from "../../../../services/roll.api";
import { useAppPlayer } from "../../../../context/AppPlayerContext";
import RangeSlider from './RangeSlider/RangeSlider'


const SPINNER_FRAMES = ["-", "\\", "|", "/"];


const BitFlip = () => {
    const [showInfo, setShowInfo] = useState(false)
    const terminalRef = useRef(null)
    const drawerRef = useRef(null)

    const [isRolling, setIsRolling] = useState(false)
    const spinnerRef = useRef(null)
    const [betSol, setBetSol] = useState(0.0525);
    const [loadBps, setLoadBps] = useState(0);

    const [active, setActive] = useState(null);

    const loadRef = useRef(0);

    const getLoadState = (bps) => {
        if (bps < 3000) return { label: "stable", win: "high" };
        if (bps < 7000) return { label: "elevated", win: "common" };
        if (bps < 9500) return { label: "volatile", win: "uncommon" };
        return { label: "critical", win: "legendary" };
    };

    const start_state = getLoadState(loadRef.current);

    const start_state_label =
        start_state.label === "stable" ? `system stable - payouts normal` :
            start_state.label === "elevated" ? `load building - payouts improving` :
                start_state.label === "volatile" ? `system volatile - high payout window` :
                    start_state.label === "critical" ? `CRITICAL LOAD - MAX PAYOUT ZONE` :
                        "";

    const [lines, setLines] = useState([
        `initiating bitflip.exe`,
        `loading entropy modules`,
        // `win probability: ${start_state.win.toString().toUpperCase()}`,
        // `${start_state_label}`,
        `fetching server seed`,
        `ready — select 0 or 1`
    ])

    const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer();

    const handleRoll = async () => {
        if (isRolling) return;
        setIsRolling(true);

        try {
            //setLines(l => [
            //...l,
            //"mounting payouts from terminal cache",
            //"executing roll opcode",
            //"resolving cache outcome -"
            //]);

            const state_before = getLoadState(loadRef.current);

            setLines(l => [
                ...l,
                //`system pressure: ${state_before.label}`,
                //`win probability: ${state_before.win}`,
                //`pressure rising increases payout likelihood`,
                "executing roll opcode",
                "resolving -"
            ]);

            startSpinner();

            const betLamports = Math.round(betSol * 1_000_000_000);

            const result = await rollBitFlip({
                walletAddress: userWalletAddress,
                betLamports
            });

            const newLoad = result.loadAfterBps ?? 0;
            setLoadBps(newLoad);
            loadRef.current = newLoad;

            stopSpinner();

            const RESULT_LABELS = {
                win: "win - SOL paid out",
                loss: [
                    "miss - next streak now closer",
                    "miss - system load building",
                    "miss - odds improving",
                    "miss - streak building",
                    "miss - charge increasing",
                    "miss - probability rising",
                    "miss - next hit closer",
                    "miss - building momentum",
                    "miss - payout potential rising",
                    "miss - system primed",
                    "miss - advantage increasing",
                    "miss - system load stacking",
                    "miss - probability shifting",
                    "miss - tension rising",
                    "miss - edge improving",
                    "miss - next roll stronger",
                    "miss - energy building",
                    "miss - system charging",
                    "miss - payout closer",
                    "miss - win likelihood rising"
                ],
                fail: "process failed, retry",
            };

            const getLossLabel = () => {
                const lossLabels = RESULT_LABELS.loss;
                return lossLabels[Math.floor(Math.random() * lossLabels.length)];
            };

            const state_after = getLoadState(result.loadAfterBps ?? 0);

            const state_after_label =
                state_after.label === "stable" ? `system stable - payouts normal` :
                    state_after.label === "elevated" ? `load building - payouts improving` :
                        state_after.label === "volatile" ? `system volatile - high payout window` :
                            state_after.label === "critical" ? `CRITICAL LOAD - MAX PAYOUT ZONE` :
                                "";

            setLines(l => [
                ...l,
                `resolution: ${result.result === "win"
                    ? `WIN - ${result.payoutAmountSol} SOL paid out`
                    : result.result === "loss"
                        ? getLossLabel()
                        : (RESULT_LABELS[result.result] || result.result)
                }`,
                `current system load: ${((result.loadAfterBps ?? 0) / 100).toFixed(0)}% - ${result.loadAfterBps > result.loadBeforeBps
                    ? `pressure building`
                    : `pressure dissipating`
                }`,
                `${state_after_label}`,
                `win probability: ${state_after.win.toString().toUpperCase()}`,
                `pressure shift detected`,
            ]);

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
                copy[copy.length - 1] = `resolving ${SPINNER_FRAMES[i % SPINNER_FRAMES.length]}`;
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


    /* Always keep terminal scrolled to last line */
    useEffect(() => {
        const el = terminalRef.current
        if (!el) return
        el.scrollTop = el.scrollHeight
    }, [])

    return (
        <>
            <BitFlipStyle>
                <div className="custom-container">
                    <div className="page-links">
                        <a href="/play-bit-flip" className='active bitflip'>Bitflip</a>
                        <a href="/play-cache-hunt" className='cacheundt'>CACHEHUNT</a>
                        <a href="/play-pump-loop" className='pumploop'>PUMPLOOP</a>
                        <a href="/play-beat-the-bomb" className='beatbomb'>BEATBOMB</a>
                    </div>
                </div>
                {/* ================= TOP ================= */}
                <div className="bit-flip-top">
                    <div className="custom-container">
                        <div className="bit-flip-inner">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="bit-flip-left">
                                        <h2>
                                            Bit Flip &gt;_
                                            <button
                                                className="btn p-0 border-0 bg-transparent"
                                                onClick={() => setShowInfo(true)}
                                            >
                                                <img src={InfoIcon} alt="info" />
                                            </button>
                                        </h2>
                                        <p>Binary state resolution protocol</p>
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

                {/* ================= TERMINAL ================= */}
                <div className="bit-flip-bottom">
                    <div className="custom-container">
                        <div className="bit-flip-content">
                            <div className="bit-flip-main-content">
                                <div className="left">
                                    <img src={bitflipGreenShape} alt="img" className="beatflip-shape shape-left" />
                                    <img src={bitflipGreenShape} alt="img" className="beatflip-shape shape-right" />
                                    <div className="terminal">
                                        <Terminal lines={lines} />
                                    </div>
                                    <div className="bit-flip-content-bottom">
                                        <div className="row">
                                            {[0, 1].map((num, i) => (
                                                <div className="col-6" key={i}>
                                                    <div
                                                        className={`chose-btn ${active === num ? "active" : ""}`}
                                                        onClick={() => setActive(num)}
                                                    >
                                                        <h6>CHOOSE</h6>
                                                        <h3>[ {num} ]</h3>
                                                        <p>49.5% — 2x</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="right for-desktop">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            <li><span>Your Pick</span> <h4>[ 0 ]</h4></li>
                                            <li><span>MULTIPLIER</span> <strong>2x</strong></li>
                                            <li><span>YOUR BET</span> <strong>0.058 SOL</strong></li>
                                            <li><span>WIN AMOUNT</span> <strong>0.116 SOL</strong></li>
                                        </ul>
                                    </div>
                                    <div className="bottom">
                                        <h6>LAST 10 FLIPS</h6>
                                        <ul>
                                            <li><div className="number active">1</div></li>
                                            <li><div className="number active">0</div></li>
                                            <li><div className="number">1</div></li>
                                            <li><div className="number active">0</div></li>
                                            <li><div className="number">0</div></li>
                                            <li><div className="number active">1</div></li>
                                            <li><div className="number">0</div></li>
                                            <li><div className="number">1</div></li>
                                            <li><div className="number active">1</div></li>
                                            <li><div className="number">0</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* <Terminal lines={lines} /> */}

                            <RangeSlider value={betSol} onChange={setBetSol} />
                            {/* ================= BUTTON ================= */}
                            <div className="terminal-btn">
                                <button className="primary-btn lg roll-button hover-btn" onClick={handleRoll} disabled={isRolling}>
                                    <span className="btn-text">
                                        <span>{isRolling ? "Rolling..." : "✦ ROLL Now"}</span>
                                        <span>{isRolling ? "Rolling..." : "✦ ROLL Now"}</span>
                                    </span>
                                    <span className="btn-shape btn-shape1"></span>
                                    <span className="btn-shape btn-shape2"></span>
                                    <span className="btn-shape btn-shape3"></span>
                                    <span className="btn-shape btn-shape4"></span>
                                </button>
                            </div>
                            <div className="bit-flip-main-content for-mobile">
                                <div className="right for-mobile">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            <li><span>Your Pick</span> <h4>[ 0 ]</h4></li>
                                            <li><span>MULTIPLIER</span> <strong>2x</strong></li>
                                            <li><span>YOUR BET</span> <strong>0.058 SOL</strong></li>
                                            <li><span>WIN AMOUNT</span> <strong>0.116 SOL</strong></li>
                                        </ul>
                                    </div>
                                    <div className="bottom">
                                        <h6>LAST 10 FLIPS</h6>
                                        <ul>
                                            <li><div className="number active">1</div></li>
                                            <li><div className="number active">0</div></li>
                                            <li><div className="number">1</div></li>
                                            <li><div className="number active">0</div></li>
                                            <li><div className="number">0</div></li>
                                            <li><div className="number active">1</div></li>
                                            <li><div className="number">0</div></li>
                                            <li><div className="number">1</div></li>
                                            <li><div className="number active">1</div></li>
                                            <li><div className="number">0</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </BitFlipStyle>

            {/* INFO POPUP */}
            <BitFlipInfo
                show={showInfo}
                onClose={() => setShowInfo(false)}
            />

            <DipositDrawer ref={drawerRef} />
        </>
    )
}

export default BitFlip

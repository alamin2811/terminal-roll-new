import React, { useState, useRef, useCallback } from 'react'
// ── keep all your original imports exactly as they were ──────────────────────
import BitFlipStyle from '../BitFlip/BitFlip.style'
import InfoIcon from '../../../../assets/images/icon/info_icon.png'
import pumploopYellowShape from "../../../../assets/images/bg/yellow-shape.png";
import DipositDrawer from '../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer'
import Terminal from '../../../Core/Terminal/Terminal'
import { rollPumpLoop } from "../../../../services/roll.api" 
import { useAppPlayer } from "../../../../context/AppPlayerContext"
import RangeSlider from '../BitFlip/RangeSlider/RangeSlider'
import PumploopGraph from './PumploopGraph/PumploopGraph'
import PumpLoopInfo from './PumpLoopInfo/PumpLoopInfo';

const PumpLoop = () => {
    const drawerRef = useRef(null)
    const [betSol, setBetSol] = useState(0.058)
    const [showInfo, setShowInfo] = useState(false)

    // ── NEW: game phase — 'idle' | 'running' | 'sold' | 'dumped' ─────────────
    const [phase, setPhase] = useState('idle')

    // ── NEW: live multiplier received from graph tick ──────────────────────────
    const [liveMult, setLiveMult] = useState(1.0)

    // ── NEW: saved mult at moment of sell / dump ──────────────────────────────
    const [finalMult, setFinalMult] = useState(null)

    const [lines, setLines] = useState([
        `initiating pumploop.exe`,
        `loading entropy modules`,
        `fetching server seed`,
        `ready — set bet and launch token`,
    ])

    const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer()

    // ── EXISTING API roll — untouched, kept for when you wire it up ───────────
    const handleRoll = async () => {
        try {
            const betLamports = Math.round(betSol * 1_000_000_000)
            const result = await rollPumpLoop({ walletAddress: userWalletAddress, betLamports })
            refreshTerminalWallet()
            return result
        } catch (e) {
            setLines(l => [...l, `pump roll failed: ${e.message || "unknown error"}`])
        }
    }

    // ── NEW: called every tick by the graph with current multiplier ───────────
    const handleMultUpdate = useCallback((mult) => {
        setLiveMult(mult)
    }, [])

    // ── NEW: called by graph when it auto-dumps ───────────────────────────────
    const handleDump = useCallback((multAtDump) => {
        setFinalMult(multAtDump)
        setPhase('dumped')
        setLines(l => [
            ...l,
            `token dumped at ${multAtDump.toFixed(2)}x`,
            `round over — bet lost`,
        ])
    }, [])

    // ── NEW: START PUMP button ────────────────────────────────────────────────
    const handleStartPump = () => {
        setLiveMult(1.0)
        setFinalMult(null)
        setPhase('running')
        setLines([
            `initiating pumploop.exe`,
            `loading entropy modules`,
            `fetching server seed`,
            `$TRML launching — pump started`,
        ])
    }

    // ── NEW: SELL NOW button — callable from both sell btn and main btn ────────
    const handleSell = () => {
        if (phase !== 'running') return
        const soldAt = liveMult
        setFinalMult(soldAt)
        setPhase('sold')
        setLines(l => [
            ...l,
            `sold at ${soldAt.toFixed(2)}x`,
            `payout: ${(betSol * soldAt).toFixed(4)} SOL`,
            `breach successful`,
        ])
    }

    // ── NEW: PUMP AGAIN reset ─────────────────────────────────────────────────
    const handleReset = () => {
        setPhase('idle')
        setLiveMult(1.0)
        setFinalMult(null)
        setLines([
            `initiating pumploop.exe`,
            `loading entropy modules`,
            `fetching server seed`,
            `ready — set bet and launch token`,
        ])
    }

    // ── NEW: main button handler — same logic as HTML handlePumpBtn ───────────
    const handleMainBtn = () => {
        if (phase === 'idle')    handleStartPump()
        else if (phase === 'running') handleSell()
        else handleReset()
    }

    // ── NEW: derived display values ───────────────────────────────────────────
    const displayMult     = phase === 'running' ? liveMult : (finalMult ?? 1.0)
    const currentPayout   = (betSol * (phase === 'dumped' ? 0 : displayMult)).toFixed(4)
    const riskPct         = getRiskPct(liveMult)
    const riskLabel       = getRiskLabel(liveMult)
    const pumpProgressPct = Math.min((displayMult - 1) / 99 * 100, 100)

    // ── NEW: main button label — matches HTML exactly ─────────────────────────
    const mainBtnLabel = phase === 'idle'
        ? '▲ START PUMP'
        : phase === 'running'
            ? `▼ SELL NOW — ${liveMult.toFixed(2)}x`
            : '▲ PUMP AGAIN'

    // ── NEW: main button background — red while running, accent otherwise ─────
    const mainBtnBg = phase === 'running' ? '#ff2244' : '#FFE600'
    const mainBtnColor = '#0a0f0a'

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
                                            Pump Loop &gt;_
                                            <button className="btn p-0 border-0 bg-transparent" onClick={() => setShowInfo(true)}>
                                                <img src={InfoIcon} alt="info" />
                                            </button>
                                        </h2>
                                        <p>Token launch simulation protocol</p>
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

                                    {/* ── Graph — phase + callbacks wired in ── */}
                                    <PumploopGraph
                                        phase={phase}
                                        bet={betSol}
                                        onDump={handleDump}
                                        onMultUpdate={handleMultUpdate}
                                        // ── ORIGINAL: onProgressUpdate kept ──
                                        onProgressUpdate={handleMultUpdate}
                                    />

                                </div>

                                <div className="right for-desktop">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            {/* ── NEW: all values dynamic ── */}
                                            <li>
                                                <span>CURRENT</span>
                                                {/* ORIGINAL: static value */}
                                                <h4 style={{ color: phase === 'dumped' ? '#ff2244' : '#FFE600' }}>
                                                    {phase === 'dumped' ? 'DUMP' : `${displayMult.toFixed(2)}x`}
                                                </h4>
                                            </li>
                                            <li><span>MAX WIN</span> <strong>100x</strong></li>
                                            <li><span>YOUR BET</span> <strong>{betSol.toFixed(3)} SOL</strong></li>
                                            <li>
                                                <span>SELL NOW</span>
                                                {/* ORIGINAL: static 0.000 SOL */}
                                                <strong style={{ color: phase === 'dumped' ? '#555' : '#FFE600' }}>
                                                    {phase === 'dumped' ? '—' : `${currentPayout} SOL`}
                                                </strong>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bottom">
                                        {/* PUMP PROGRESS */}
                                        <div className="pump-loop-progress-content">
                                            <h6>PUMP PROGRESS</h6>
                                            <div className="progress-bar">
                                                {/* ── NEW: dynamic width — ORIGINAL was static ── */}
                                                <div
                                                    className="progress"
                                                    style={{ width: `${pumpProgressPct}%` }}
                                                ></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{displayMult.toFixed(2)}x</span>
                                                <span>MAX 100x</span>
                                            </div>
                                        </div>

                                        {/* RISK LEVEL */}
                                        <div className="pump-loop-progress-content">
                                            <h6 style={{ color: '#ff2244' }}>RISK LEVEL</h6>
                                            <div className="progress-bar" style={{ background: '#200a0a' }}>
                                                {/* ── NEW: dynamic risk bar — ORIGINAL was static ── */}
                                                <div
                                                    className="progress"
                                                    style={{ width: `${riskPct}%`, background: '#ff2244' }}
                                                ></div>
                                            </div>
                                            <div className="progress-value" style={{ color: '#7a3a3a' }}>
                                                <span>{riskLabel}</span>
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
                                {/* ── NEW: fully dynamic button — label, color, onClick all live ── */}
                                {/* ORIGINAL: static "➤ START PUMP" with onClick={handleRoll} */}
                                <button
                                    className="primary-btn pump-loop-main-btn lg roll-button hover-btn"
                                    onClick={handleMainBtn}
                                    style={{
                                        background: mainBtnBg,
                                        color: mainBtnColor,
                                        // transition matches HTML .main-btn
                                        transition: 'opacity .15s, transform .1s',
                                    }}
                                >
                                    <span className="btn-text">
                                        <span>{mainBtnLabel}</span>
                                        <span>{mainBtnLabel}</span>
                                    </span>
                                    <span className="btn-shape btn-shape1"></span>
                                    <span className="btn-shape btn-shape2"></span>
                                    <span className="btn-shape btn-shape3"></span>
                                    <span className="btn-shape btn-shape4"></span>
                                </button>
                            </div>
                            
                            <div className="bit-flip-main-content pump-loop-main-content for-mobile">
                                <div className="right for-mobile">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            {/* ── NEW: all values dynamic ── */}
                                            <li>
                                                <span>CURRENT</span>
                                                {/* ORIGINAL: static value */}
                                                <h4 style={{ color: phase === 'dumped' ? '#ff2244' : '#FFE600' }}>
                                                    {phase === 'dumped' ? 'DUMP' : `${displayMult.toFixed(2)}x`}
                                                </h4>
                                            </li>
                                            <li><span>MAX WIN</span> <strong>100x</strong></li>
                                            <li><span>YOUR BET</span> <strong>{betSol.toFixed(3)} SOL</strong></li>
                                            <li>
                                                <span>SELL NOW</span>
                                                {/* ORIGINAL: static 0.000 SOL */}
                                                <strong style={{ color: phase === 'dumped' ? '#555' : '#FFE600' }}>
                                                    {phase === 'dumped' ? '—' : `${currentPayout} SOL`}
                                                </strong>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bottom">
                                        {/* PUMP PROGRESS */}
                                        <div className="pump-loop-progress-content">
                                            <h6>PUMP PROGRESS</h6>
                                            <div className="progress-bar">
                                                {/* ── NEW: dynamic width — ORIGINAL was static ── */}
                                                <div
                                                    className="progress"
                                                    style={{ width: `${pumpProgressPct}%` }}
                                                ></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{displayMult.toFixed(2)}x</span>
                                                <span>MAX 100x</span>
                                            </div>
                                        </div>

                                        {/* RISK LEVEL */}
                                        <div className="pump-loop-progress-content">
                                            <h6 style={{ color: '#ff2244' }}>RISK LEVEL</h6>
                                            <div className="progress-bar" style={{ background: '#200a0a' }}>
                                                {/* ── NEW: dynamic risk bar — ORIGINAL was static ── */}
                                                <div
                                                    className="progress"
                                                    style={{ width: `${riskPct}%`, background: '#ff2244' }}
                                                ></div>
                                            </div>
                                            <div className="progress-value" style={{ color: '#7a3a3a' }}>
                                                <span>{riskLabel}</span>
                                                <span>EXTREME</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BitFlipStyle>
            
            <PumpLoopInfo
                show={showInfo}
                onClose={() => setShowInfo(false)}
            />

            <DipositDrawer ref={drawerRef} />
        </>
    )
}

// ── EXISTING helpers — copied from HTML, kept identical ──────────────────────
function getRiskPct(m) {
    if (m < 2)  return 5
    if (m < 4)  return 20
    if (m < 6)  return 40
    if (m < 8)  return 60
    if (m < 10) return 80
    return 95
}
function getRiskLabel(m) {
    if (m < 2)  return 'LOW'
    if (m < 4)  return 'LOW'
    if (m < 6)  return 'MEDIUM'
    if (m < 8)  return 'HIGH'
    if (m < 10) return 'VERY HIGH'
    return 'EXTREME'
}

export default PumpLoop
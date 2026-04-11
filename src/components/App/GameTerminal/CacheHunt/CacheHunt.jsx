import React, { useState, useRef } from 'react'
import BitFlipStyle from '../BitFlip/BitFlip.style'
import RollIcon from '../../../../assets/images/icon/roll.png'
import InfoIcon from '../../../../assets/images/icon/info_icon.png'
import cacheHuntTealShape from "../../../../assets/images/bg/teal-shape.png";
import DipositDrawer from '../../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer'
import Terminal from '../../../Core/Terminal/Terminal'
import { rollCacheHunt } from "../../../../services/roll.api"
import { useAppPlayer } from "../../../../context/AppPlayerContext"
import RangeSlider from '../BitFlip/RangeSlider/RangeSlider'
import CacheHuntInfo from './CacheHuntInfo/CacheHuntInfo'

const SPINNER_FRAMES = ["-", "\\", "|", "/"]

const INITIAL_NODES = Array(10).fill('locked')

const CacheHunt = () => {
    const [showInfo, setShowInfo] = useState(false)
    const drawerRef = useRef(null)

    const [isRolling, setIsRolling] = useState(false)
    const spinnerRef = useRef(null)
    const [betSol, setBetSol] = useState(0.0525)

    const [phase, setPhase] = useState('idle')          // 'idle' | 'running' | 'found' | 'lost'
    const [nodes, setNodes] = useState(INITIAL_NODES)   // 'locked' | 'opened' | 'miss'
    const [openedCount, setOpenedCount] = useState(0)
    const [currentMult, setCurrentMult] = useState(1)
    const cacheAtRef = useRef(null)

    // ── refs to always have latest nodes/openedCount inside async callbacks ──
    const nodesRef = useRef(INITIAL_NODES)
    const openedCountRef = useRef(0)
    const phaseRef = useRef('idle')

    const [lines, setLines] = useState([
        `initiating cachehunt.exe`,
        `loading entropy modules`,
        `fetching server seed`,
        `seeding cache grid...`,
    ])

    const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer()

    // ── EXISTING helpers (untouched) ─────────────────────────────────────────
    const getTierLabel = (tier) => {
        if (tier === "void") return "VOID CACHE"
        if (tier === "dust") return "DUST CACHE"
        if (tier === "salvage") return "SALVAGE CACHE"
        if (tier === "boost") return "BOOST CACHE"
        if (tier === "rare") return "RARE CACHE"
        if (tier === "epic") return "EPIC CACHE"
        if (tier === "legendary") return "LEGENDARY CACHE"
        return "UNKNOWN CACHE"
    }

    const getTierNarrative = (tier, payoutAmountSol) => {
        if (tier === "void") return "cache empty"
        if (tier === "dust") return `dust cache cracked - ${payoutAmountSol} SOL recovered`
        if (tier === "salvage") return `salvage cache secured - ${payoutAmountSol} SOL released`
        if (tier === "boost") return `boost cache breached - ${payoutAmountSol} SOL paid out`
        if (tier === "rare") return `rare cache captured - ${payoutAmountSol} SOL paid out`
        if (tier === "epic") return `epic cache extracted - ${payoutAmountSol} SOL paid out`
        if (tier === "legendary") return `LEGENDARY CACHE DETONATED - ${payoutAmountSol} SOL paid out`
        return `${payoutAmountSol} SOL paid out`
    }

    const startSpinner = () => {
        let i = 0
        spinnerRef.current = setInterval(() => {
            setLines(l => {
                const copy = [...l]
                copy[copy.length - 1] = `scanning sectors ${SPINNER_FRAMES[i % SPINNER_FRAMES.length]}`
                return copy
            })
            i++
        }, 120)
    }

    const stopSpinner = () => {
        if (spinnerRef.current) {
            clearInterval(spinnerRef.current)
            spinnerRef.current = null
        }
    }

    // ── EXISTING API roll (untouched) ────────────────────────────────────────
    const handleRoll = async () => {
        if (isRolling) return
        setIsRolling(true)

        try {
            setLines(l => [
                ...l,
                "executing cache breach",
                "routing entropy to sector map",
                "scanning sectors -"
            ])

            startSpinner()

            const betLamports = Math.round(betSol * 1_000_000_000)

            const result = await rollCacheHunt({
                walletAddress: userWalletAddress,
                betLamports
            })

            stopSpinner()

            const tierLabel = getTierLabel(result.cacheTierLabel)
            const multiplierX = ((result.multiplierBps ?? 0) / 10000).toFixed(2)

            setLines(l => [
                ...l,
                `cache class: ${tierLabel}`,
                `multiplier class: ${multiplierX}x`,
                `resolution: ${result.result === "win"
                    ? getTierNarrative(result.cacheTierLabel, result.payoutAmountSol)
                    : "void cache hit - no payout"
                }`,
                result.result === "win"
                    ? `terminal release: ${result.payoutAmountSol} SOL`
                    : "terminal release: 0 SOL",
                result.result === "win"
                    ? "breach successful"
                    : "breach missed",
            ])

            refreshTerminalWallet()
        } catch (e) {
            stopSpinner()
            setLines(l => [...l, `cache breach failed: ${e.message || "unknown error"}`])
        } finally {
            setIsRolling(false)
        }
    }

    // ── reset everything back to idle ────────────────────────────────────────
    const resetHunt = () => {
        const fresh = Array(10).fill('locked')
        nodesRef.current = fresh
        openedCountRef.current = 0
        phaseRef.current = 'idle'
        cacheAtRef.current = null
        setPhase('idle')
        setNodes(fresh)
        setOpenedCount(0)
        setCurrentMult(1)
        setLines([
            `initiating cachehunt.exe`,
            `loading entropy modules`,
            `fetching server seed`,
            `seeding cache grid...`,
        ])
    }

    // ── open a specific node by index ────────────────────────────────────────
    const openSpecificNode = (index) => {
        if (phaseRef.current !== 'running') return
        if (nodesRef.current[index] !== 'locked') return

        const newNodes = [...nodesRef.current]
        const newOpened = openedCountRef.current + 1
        const newMult = parseFloat((1 + newOpened * 0.9).toFixed(1))

        // sync refs immediately so rapid clicks are safe
        openedCountRef.current = newOpened

        if (index === cacheAtRef.current) {
            // ✅ Cache found!
            newNodes[index] = 'opened'
            nodesRef.current = newNodes
            phaseRef.current = 'found'

            setNodes([...newNodes])
            setOpenedCount(newOpened)
            setCurrentMult(newMult)
            setPhase('found')
            setLines(l => [
                ...l,
                `> CACHE FOUND at Node_${String(index + 1).padStart(2, '0')}!`,
                `> payout: ${(betSol * newMult).toFixed(4)} SOL (${newMult}x)`,
                `> breach successful`,
            ])
            setTimeout(resetHunt, 3500)
        } else {
            // ❌ Miss
            newNodes[index] = 'miss'
            nodesRef.current = newNodes

            if (newOpened >= 10) {
                // All nodes exhausted — lost
                phaseRef.current = 'lost'
                setNodes([...newNodes])
                setOpenedCount(newOpened)
                setCurrentMult(newMult)
                setPhase('lost')
                setLines(l => [...l, `> all nodes swept — cache not found. bet lost.`])
                setTimeout(resetHunt, 3000)
            } else {
                setNodes([...newNodes])
                setOpenedCount(newOpened)
                setCurrentMult(newMult)
                setLines(l => [
                    ...l,
                    `> Node_${String(index + 1).padStart(2, '0')} — MISS. ${newOpened}/10 swept. current: ${newMult}x`,
                ])
            }
        }
    }

    // ── open a random locked node ─────────────────────────────────────────────
    const openRandomNode = () => {
        const locked = nodesRef.current
            .map((n, i) => n === 'locked' ? i : -1)
            .filter(i => i >= 0)
        if (!locked.length) return
        const pick = locked[Math.floor(Math.random() * locked.length)]
        openSpecificNode(pick)
    }

    // ── main button handler ───────────────────────────────────────────────────
    const handleStartHunt = () => {
        if (phase === 'idle') {
            // Start a new hunt — pick hidden cache node
            const fresh = Array(10).fill('locked')
            cacheAtRef.current = Math.floor(Math.random() * 10)
            nodesRef.current = fresh
            openedCountRef.current = 0
            phaseRef.current = 'running'
            setNodes(fresh)
            setOpenedCount(0)
            setCurrentMult(1)
            setPhase('running')
            setLines(l => [...l, `> hunt started — opening nodes to find the cache`])
        } else if (phase === 'running') {
            // Each click = open one random locked node
            openRandomNode()
        } else {
            // 'found' or 'lost' → reset for next round
            resetHunt()
        }
    }

    // ── derived progress values ───────────────────────────────────────────────
    const sweepPct = (openedCount / 10) * 100
    const multPct = ((currentMult - 1) / 9) * 100
    const cashoutNow = (betSol * currentMult).toFixed(4)

    // ── main button label ─────────────────────────────────────────────────────
    const mainBtnLabel = phase === 'idle'
        ? '➤ START HUNT'
        : phase === 'running'
            ? '➤ OPEN NODE'
            : phase === 'found'
                ? '✔ HUNT AGAIN'
                : '✖ HUNT AGAIN'

    return (
        <>
            <BitFlipStyle>
                <div className="custom-container">
                    <div className="page-links">
                        <a href="/play-bit-flip" className='bitflip'>Bitflip</a>
                        <a href="/play-cache-hunt" className='active cacheundt'>CACHEHUNT</a>
                        <a href="/play-pump-loop" className='pumploop'>PUMPLOOP</a>
                        <a href="/play-beat-the-bomb" className='beatbomb'>BEATBOMB</a>
                    </div>
                </div>
                <div className="bit-flip-top cache-hunt-top">
                    <div className="custom-container">
                        <div className="bit-flip-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-7">
                                    <div className="bit-flip-left">
                                        <h2>
                                            Cache Hunt &gt;_
                                            <button
                                                className="btn p-0 border-0 bg-transparent"
                                                onClick={() => setShowInfo(true)}
                                            >
                                                <img src={InfoIcon} alt="info" />
                                            </button>
                                        </h2>
                                        <p>Distributed cache resolution protocol</p>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-5">
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
                            {/* <Terminal lines={lines} /> */}
                            <div className="bit-flip-main-content cache-hunt-main-content">
                                <div className="left">
                                    <img src={cacheHuntTealShape} alt="img" className="beatflip-shape shape-left" />
                                    <img src={cacheHuntTealShape} alt="img" className="beatflip-shape shape-right" />

                                    <div className="terminal">
                                        <Terminal lines={lines} />
                                    </div>

                                    <div className="catch-nodes">
                                        <h5>CACHE NODES</h5>
                                        <ul>
                                            {nodes.map((nodeState, i) => (
                                                <li key={i}>
                                                    <button
                                                        className={`catch-nods-btn${nodeState === 'opened' ? ' found' : nodeState === 'miss' ? ' miss' : ''}`}
                                                        onClick={() => openSpecificNode(i)}
                                                        disabled={phase !== 'running' || nodeState !== 'locked'}
                                                        style={{
                                                            cursor: phase === 'running' && nodeState === 'locked' ? 'pointer' : 'default',
                                                            opacity: nodeState !== 'locked' ? 0.6 : 1,
                                                        }}
                                                    >
                                                        <h6>Node_{String(i + 1).padStart(2, '0')}</h6>
                                                        <p>
                                                            {nodeState === 'locked' ? 'Locked'
                                                                : nodeState === 'opened' ? 'Found!'
                                                                    : 'Miss'}
                                                        </p>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="right for-desktop">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            <li><span>CURRENT WIN</span> <h4>{currentMult.toFixed(1)}x</h4></li>
                                            <li><span>MAX WIN</span> <strong>10x</strong></li>
                                            <li><span>YOUR BET</span> <strong>{betSol.toFixed(3)} SOL</strong></li>
                                            <li><span>IF CASH OUT NOW</span> <strong>{cashoutNow} SOL</strong></li>
                                        </ul>
                                    </div>
                                    <div className="bottom">
                                        <div className="catch-hunt-progress-content">
                                            <h6>SWEEP PROGRESS</h6>
                                            <div className="progress-bar">
                                                <div className="progress" style={{ width: `${sweepPct}%` }}></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{openedCount}/10 NODES</span>
                                                <span>{sweepPct.toFixed(0)}%</span>
                                            </div>
                                        </div>
                                        <div className="catch-hunt-progress-content">
                                            <h6>MULTIPLIER PROGRESS</h6>
                                            <div className="progress-bar">
                                                <div className="progress" style={{ width: `${multPct}%` }}></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{currentMult.toFixed(1)}x</span>
                                                <span>MAX 10x</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="catch-hunt-range-slider">
                                <RangeSlider value={betSol} onChange={setBetSol} />
                            </div>

                            <div className="terminal-btn">
                                <button
                                    className="primary-btn catch-hunt-main-btn lg roll-button hover-btn"
                                    onClick={handleStartHunt}
                                    disabled={isRolling || phase === 'found' || phase === 'lost'}
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


                            <div className="bit-flip-main-content cache-hunt-main-content for-mobile">
                                <div className="right for-mobile">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            <li><span>CURRENT WIN</span> <h4>{currentMult.toFixed(1)}x</h4></li>
                                            <li><span>MAX WIN</span> <strong>10x</strong></li>
                                            <li><span>YOUR BET</span> <strong>{betSol.toFixed(3)} SOL</strong></li>
                                            <li><span>IF CASH OUT NOW</span> <strong>{cashoutNow} SOL</strong></li>
                                        </ul>
                                    </div>
                                    <div className="bottom">
                                        <div className="catch-hunt-progress-content">
                                            <h6>SWEEP PROGRESS</h6>
                                            <div className="progress-bar">
                                                <div className="progress" style={{ width: `${sweepPct}%` }}></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{openedCount}/10 NODES</span>
                                                <span>{sweepPct.toFixed(0)}%</span>
                                            </div>
                                        </div>
                                        <div className="catch-hunt-progress-content">
                                            <h6>MULTIPLIER PROGRESS</h6>
                                            <div className="progress-bar">
                                                <div className="progress" style={{ width: `${multPct}%` }}></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>{currentMult.toFixed(1)}x</span>
                                                <span>MAX 10x</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BitFlipStyle>

            {/* INFO POPUP */}
            <CacheHuntInfo
                show={showInfo}
                onClose={() => setShowInfo(false)}
            />

            <DipositDrawer ref={drawerRef} />
        </>
    )
}

export default CacheHunt
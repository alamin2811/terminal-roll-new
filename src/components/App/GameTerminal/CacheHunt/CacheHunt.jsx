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

const CacheHunt = () => {
    const [showInfo, setShowInfo] = useState(false)
    const drawerRef = useRef(null)

    const [isRolling, setIsRolling] = useState(false)
    const spinnerRef = useRef(null)
    const [betSol, setBetSol] = useState(0.0525)

    const [lines, setLines] = useState([
        `initiating cachehunt.exe`,
        `loading entropy modules`,
        `fetching server seed`,
        `seeding cache grid...`,
        // `mounting terminal treasury`,
        // `cache map linked`,
        // `reward classes loaded`,
        // `legendary breach chance active`,
        // `awaiting user input`
    ])

    const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer()

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
                                <div className="col-md-6">
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
                                            <li><button className="catch-nods-btn"><h6>Node_01</h6> <p>Miss</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_02</h6> <p>Miss</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_03</h6> <p>Locked</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_04</h6> <p>Locked</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_05</h6> <p>Locked</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_06</h6> <p>Locked</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_07</h6> <p>Locked</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_08</h6> <p>Locked</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_09</h6> <p>Locked</p></button></li>
                                            <li><button className="catch-nods-btn"><h6>Node_10</h6> <p>Locked</p></button></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="top">
                                        <h6>Round Info</h6>
                                        <ul>
                                            <li><span>CURRENT WIN</span> <h4>2.4x</h4></li>
                                            <li><span>MAX WIN</span> <strong>10x</strong></li>
                                            <li><span>YOUR BET</span> <strong>0.058 SOL</strong></li>
                                            <li><span>IF CASH OUT NOW</span> <strong>0.319 SOL</strong></li>
                                        </ul>
                                    </div>
                                    <div className="bottom">
                                        <div className="catch-hunt-progress-content">
                                            <h6>SWEEP PROGRESS</h6>
                                            <div className="progress-bar">
                                                <div className="progress w-25"></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>2/10 NODES</span>
                                                <span>25%</span>
                                            </div>
                                        </div>
                                        <div className="catch-hunt-progress-content">
                                            <h6>MULTIPLIER PROGRESS</h6>
                                            <div className="progress-bar">
                                                <div className="progress w-30"></div>
                                            </div>
                                            <div className="progress-value">
                                                <span>2.4x</span>
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
                                <button className="primary-btn catch-hunt-main-btn lg roll-button hover-btn" onClick={handleRoll} disabled={isRolling}>
                                    <span className="btn-text">
                                        <span>{isRolling ? "Scanning..." : "➤ START HUNT"}</span>
                                        <span>{isRolling ? "Scanning..." : "➤ START HUNT"}</span>
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
            <CacheHuntInfo
                show={showInfo}
                onClose={() => setShowInfo(false)}
            />

            <DipositDrawer ref={drawerRef} />
        </>
    )
}

export default CacheHunt
import React, { useState, useRef } from 'react'
import BitFlipStyle from '../BitFlip/BitFlip.style'
import RollIcon from '../../../../assets/images/icon/roll.png'
import InfoIcon from '../../../../assets/images/icon/info_icon.png'
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
        `mounting terminal treasury`,
        `cache map linked`,
        `reward classes loaded`,
        `legendary breach chance active`,
        `awaiting user input`
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
                `resolution: ${
                    result.result === "win"
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
                <div className="bit-flip-top">
                    <div className="custom-container">
                        <div className="bit-flip-inner">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="bit-flip-left">
                                        <h2>
                                            Cache Hunt
                                            <button
                                                className="btn p-0 border-0 bg-transparent"
                                                onClick={() => setShowInfo(true)}
                                            >
                                                <img src={InfoIcon} alt="info" />
                                            </button>
                                        </h2>
                                        <p>Terminal Reward Cache Engine</p>
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
                            <Terminal lines={lines} />

                            <RangeSlider value={betSol} onChange={setBetSol} />

                            <div className="terminal-btn">
                                <button className="primary-btn lg roll-button hover-btn" onClick={handleRoll} disabled={isRolling}>
                                    <span className="btn-text">
                                        <span><img src={RollIcon} alt="icon" />{isRolling ? "Scanning..." : "Breach Cache"}</span>
                                        <span><img src={RollIcon} alt="icon" />{isRolling ? "Scanning..." : "Breach Cache"}</span>
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
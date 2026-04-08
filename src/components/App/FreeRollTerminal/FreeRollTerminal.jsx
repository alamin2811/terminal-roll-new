import React, { useEffect, useRef, useState } from 'react'
import RollIcon from '../../../assets/images/icon/roll.png'
import InfoIcon from '../../../assets/images/icon/info_icon.png'
import FreeRollTerminalInfo from './FreeRollTerminalInfo/FreeRollTerminalInfo'
import FreeRollTerminalStyle from './FreeRollTerminal.style'
import DipositDrawer from '../../Core/ConnectWalletButton/DipositDrawer/DipositDrawer'
import Terminal from '../../Core/Terminal/Terminal'
import { useAppPlayer } from "../../../context/AppPlayerContext";
import { rollFreeRoll, getFreeRolls } from "../../../services/freeRoll.api";
import { syncTerminalWallet } from "../../../services/wallet.api";



const LOGS = [
    'mounting incentive engine',
    'scanning referral ledger',
    'validating reward conditions',
    'resolving executable rolls',
    'syncing wallet state',
    'awaiting free roll trigger',
    'processing entropy seed',
    'finalizing execution',

    'mounting incentive engine',
    'scanning referral ledger',
    'validating reward conditions',
    'resolving executable rolls',
    'syncing wallet state',
    'awaiting free roll trigger',
    'processing entropy seed',
    'finalizing execution',

    'mounting incentive engine',
    'scanning referral ledger',
    'validating reward conditions',
    'resolving executable rolls',
    'syncing wallet state',
    'awaiting free roll trigger',
    'processing entropy seed',
    'finalizing execution',
]

const SPINNER_FRAMES = ["-", "\\", "|", "/"];

const FreeRollTerminal = () => {
    const [showInfo, setShowInfo] = useState(false)
    const [freeRollsAvailable, setFreeRollsAvailable] = useState(null);
    const [lines, setLines] = useState([
        "mounting incentive engine",
        "scanning referral ledger",
        "validating reward conditions",
        "resolving executable rolls",
        "syncing wallet state",
        "free rolls available: —",
        "awaiting free roll trigger",
        ])    
    const terminalRef = useRef(null)
    const drawerRef = useRef(null)

    const [isRolling, setIsRolling] = useState(false)
    const spinnerRef = useRef(null)


    const { userWalletAddress, terminalWallet, refreshTerminalWallet } = useAppPlayer();

    const handleRoll = async () => {
        if (freeRollsAvailable === 0) {
            setLines(l => [
                ...l,
                "no free rolls available",
                "roll aborted"
            ]);
            return;
        }
        if (isRolling) return;
        setIsRolling(true);

        try {
            setLines(l => [
            ...l,
            "loading entropy modules",
            "executing roll opcode",
            "resolving outcome -"
            ]);

            startSpinner();

            const result = await rollFreeRoll({
                walletAddress: userWalletAddress
            });

            stopSpinner();

            setLines(l => [
            ...l,
            `finalizing state`,
            `resolution: ${result.outcome}`,
            ...(result.outcome === "win"
                ? [`payout: ${result.payoutAmountSol} SOL`]
                : []),
            `free rolls remaining: ${result.freeRolls?.available ?? "—"}`,                
            `state reset`
            ]);

            await syncTerminalWallet(userWalletAddress);
            await refreshTerminalWallet();
        } catch (e) {
            stopSpinner();
            setLines(l => [...l, "roll failed: ", e.message || "unknown error"]);
        } finally {
            setIsRolling(false);
        }
    };

    const startSpinner = () => {
        let i = 0;
        spinnerRef.current = setInterval(() => {
            setLines(l => {
            const copy = [...l];
            copy[copy.length - 1] = `resolving outcome ${SPINNER_FRAMES[i % SPINNER_FRAMES.length]}`;
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
        if (!userWalletAddress) return;

        getFreeRolls({ walletAddress: userWalletAddress })
            .then(doc => {
            if (typeof doc?.available === "number") {
                setFreeRollsAvailable(doc.available);
            }
            })
            .catch(() => {});
    }, [userWalletAddress]);

    useEffect(() => {
        if (freeRollsAvailable === null) return;

        setLines(l => {
            const next = [...l];
            const idx = next.findIndex(x => x.startsWith("free rolls available:"));
            if (idx !== -1) {
            next[idx] = `free rolls available: ${freeRollsAvailable}`;
            }
            return next;
        });
    }, [freeRollsAvailable]);

    /* ALWAYS KEEP SCROLL AT BOTTOM */
    useEffect(() => {
        const el = terminalRef.current
        if (!el) return
        el.scrollTop = el.scrollHeight
    }, [])

    return (
        <>
            <FreeRollTerminalStyle>

                {/* TOP */}
                <div className="free-roll-terminal-top">
                    <div className="custom-container">
                        <div className="free-roll-terminal-inner">
                            <div className="row">

                                <div className="col-md-7">
                                    <div className="free-roll-terminal-left">
                                        <h2>
                                            FREE ROLL TERMINAL
                                            <button
                                                className="btn p-0 border-0 bg-transparent"
                                                onClick={() => setShowInfo(true)}
                                            >
                                                <img src={InfoIcon} alt="info" />
                                            </button>
                                        </h2>
                                        <p>System level reward execution environment</p>
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <div className="free-roll-terminal-right">
                                        <div className="balance">
                                            <button className="secondary-btn sm hover-btn"
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

                {/* TERMINAL */}
                <div className="free-roll-terminal-bottom">
                    <div className="custom-container">
                        <div className="free-roll-terminal-content">

                            <Terminal lines={lines}/>

                            {/* BUTTON */}
                            <div className="terminal-btn">
                                <button className="primary-btn lg roll-button hover-btn" onClick={handleRoll} disabled={isRolling}>
                                    <span className="btn-text">
                                        <span><img src={RollIcon} alt="" />{isRolling ? "Free Rolling..." : "Free Roll"}</span>
                                        <span><img src={RollIcon} alt="" />{isRolling ? "Free Rolling..." : "Free Roll"}</span>
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

            </FreeRollTerminalStyle>

            <FreeRollTerminalInfo
                show={showInfo}
                onClose={() => setShowInfo(false)}
            />
            <DipositDrawer ref={drawerRef} />
        </>
    )
}

export default FreeRollTerminal

import React from 'react'
import FuseStatusStyle from './FuseStatus.style'

const FuseStatus = ({ secondsLeft, maxSeconds = 30, liveMultiplier = 1.00, betSol = 0.0525 }) => {
    const displaySeconds = Math.max(0, Math.ceil(secondsLeft ?? maxSeconds));
    const nukeNow = (betSol * liveMultiplier).toFixed(3);

    return (
        <FuseStatusStyle>
            <h6>FUSE STATUS</h6>
            <div className="fuse-status-content">
                <div className="fuse-timer">
                    <h5>{displaySeconds}</h5>
                    <p>SECONDS</p>
                </div>

                <div className="fuse-list">
                    <ul>
                        <li><span>CURRENT WIN</span> <h4>{liveMultiplier.toFixed(2)}x</h4></li>
                        <li><span>YOUR BET</span>  <strong>{betSol.toFixed(4)} SOL</strong></li>
                        <li><span>NUKE NOW</span>  <strong>{nukeNow} SOL</strong></li>
                    </ul>
                </div>
            </div>
        </FuseStatusStyle>
    )
}

export default FuseStatus
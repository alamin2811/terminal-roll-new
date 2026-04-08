//src/components/PlayerConsole/PlayerConsoleContent.jsx
import React, { useState } from 'react'
import PlayerConsoleStyle from './PlayerConsole.style'
import Identity from './Identity'
import checkIcon from '../../../assets/images/icon/check.png'
import { useTerminalWallet } from "../../../Hooks/useTerminalWallet";
import { usePlayerConsole } from "../../../hooks/usePlayerConsole";


const PlayerConsoleContent = () => {
  const [showToast, setShowToast] = useState(false)

  const { data: consoleData, isLoading: consoleLoading } = usePlayerConsole();
console.log("PLAYER CONSOLE DATA:", consoleData);

  const handleUsernameUpdated = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }
  const {
    isConnected,
    wallet,
    isLoading
  } = useTerminalWallet();



  return (
    <>
      <PlayerConsoleStyle>
        <Identity playerId={consoleData?.playerId} onUsernameSaved={handleUsernameUpdated} />
        <div className="custom-container p-0">
          <div className="row m-0">
            <div className="col-md-6 p-0">
              <div className="player-console-content player-console-left">
                <h3>PERFORMANCE</h3>
                <ul>
                  <li><span>Lifetime Rolls</span> <strong>{consoleData?.stats.lifetimeRolls}</strong></li>
                  <li><span>Lifetime PnL</span> <strong>{consoleData?.stats.lifetimePnlSol >= 0 ? "+ " : "- "} {Math.abs(consoleData?.stats.lifetimePnlSol) || "0"} SOL</strong></li>
                  <li><span>Current Streak</span> <strong>{consoleData?.stats.currentStreak}</strong></li>
                  <li><span>Last Roll Result</span> <strong>{consoleData?.stats.lastRollResult || "—"}</strong></li>
                </ul>

                <a href="/transaction" className="secondary-btn lg tx-btn hover-btn">
                  <span className="btn-text">
                    <span>Transaction History</span>
                    <span>Transaction History</span>
                  </span>
                  <span className="btn-shape btn-shape1"></span>
                  <span className="btn-shape btn-shape2"></span>
                  <span className="btn-shape btn-shape3"></span>
                  <span className="btn-shape btn-shape4"></span>
                </a>
              </div>
            </div>

            <div className="col-md-6 p-0">
              <div className="player-console-content player-console-right">
                <div className="console-right-content">
                  <h3>FREE ROLLS</h3>
                  <ul>
                    <li><span>Free Rolls Available</span> <strong>{consoleData?.freeRolls.available}</strong></li>
                  </ul>
                    <a href="/free-roll-terminal" className='secondary-btn lg invite-content-btn hover-btn'>
                      <span className="btn-text">
                          <span>CLAIM FREE ROLLS</span>
                          <span>CLAIM FREE ROLLS</span>
                      </span>
                      <span className='btn-shape btn-shape1'></span>
                      <span className='btn-shape btn-shape2'></span>
                      <span className='btn-shape btn-shape3'></span>
                      <span className='btn-shape btn-shape4'></span>
                  </a>
                </div>

                <div className="console-right-content">
                  <h3>REFERRALS</h3>
                  <ul>
                    <li><span>Players Referred</span> <strong>{consoleData?.referrals.total}</strong></li>
                  </ul>
                </div>

                <div className="console-right-content">
                  <h3>RANKING</h3>
                  <ul>
                    <li><span>Monthly Rank</span> <strong>  {consoleData?.rank.monthly ? `#${consoleData?.rank.monthly}` : "—"}</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PlayerConsoleStyle>

      {/* ✅ FIXED SUCCESS NOTIFICATION */}
      {showToast && (
        <div className="notification-alart">
          <div className="secondary-btn lg notification-inner">
            <span><img src={checkIcon} alt="icon" /></span>
            &nbsp; updated successfully
            <span className="btn-shape btn-shape1"></span>
            <span className="btn-shape btn-shape2"></span>
            <span className="btn-shape btn-shape3"></span>
            <span className="btn-shape btn-shape4"></span>
          </div>
        </div>
      )}
    </>
  )
}

export default PlayerConsoleContent

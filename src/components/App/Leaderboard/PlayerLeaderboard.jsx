import React, { useEffect, useState } from 'react'
import LeaderboardStyle from './Leaderboard.style'
import LeaderboardShape from '../../../assets/images/shape/leaderboard-shape.png'
import Pagination from '../../Core/Pagination/Pagination'

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com"


/*const periods = {
  "All Time": { periodType: "allTime", periodKey: "all" },
  "Last 7 Days": { periodType: "weekly" },
  "Last 30 Days": { periodType: "monthly" },
  "Last 3 Months": { periodType: "monthly" }
}*/

function utcWeekKey(d) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7)
  return `${date.getUTCFullYear()}W${String(week).padStart(2, "0")}`
}

function utcMonthKey(d) {
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}`
}

const periods = {
  "All Time": () => ({ periodType: "allTime", periodKey: "all" }),
  "Last 7 Days": () => ({ periodType: "weekly", periodKey: utcWeekKey(new Date()) }),
  "Last 30 Days": () => ({ periodType: "monthly", periodKey: utcMonthKey(new Date()) }),
  "Last 3 Months": () => ({ periodType: "monthly", periodKey: utcMonthKey(new Date()) })
}


const months = [
    'All Time',
    'Last 7 Days',
    'Last 30 Days',
    'Last 3 Months',
]





function shortWallet(w) {
  if (!w) return null
  return `${w.slice(0, 4)}…${w.slice(-4)}`
}


const PlayerLeaderboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState('All Time')
    const [selectedPeriod, setSelectedPeriod] = useState("All Time")
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)    

useEffect(() => {
  async function load() {
    setLoading(true)

    const p = periods[selectedPeriod]()

    const params = new URLSearchParams({
    metric: "grossWon",
    periodType: p.periodType,
    periodKey: p.periodKey
    })


    const res = await fetch(`${API_BASE}/leaderboards/rolls?${params.toString()}`)
    const data = await res.json()

    setRows(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  load()
}, [selectedPeriod])


    //const handleMonthSelect = (month) => {
    //    setSelectedMonth(month)
    //    setDropdownOpen(false)
    //}

    return (
        <LeaderboardStyle>
            <div className="leaderboard-top">
                <div className="custom-container">
                    <div className="leaderboard-top-inner">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="leaderboard-top-left">
                                    <h2>Leaderboard</h2>
                                    <p>Top Players with highest amount won</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="leaderboard-top-right">
                                    <img src={LeaderboardShape} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container">
                <div className="leaderboard-content">
                    {/* Dropdown */}
                    <div className={`leaderboard-dropdown ${dropdownOpen ? 'active' : ''}`}>
                        <div
                            className="dropdown-value"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedPeriod}
                        </div>

                        {dropdownOpen && (
                            <div className="droplist">
                                <ul>
                                    {Object.keys(periods).map((p, index) => (
                                        <li
                                            key={index}
                                            className={p === selectedPeriod ? "active" : ""}
                                            onClick={() => { setSelectedPeriod(p); setDropdownOpen(false) }}
                                        >
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Table */}

                    <div className="leaderboard-table">
                        <div className="table-head">
                            <ul>
                                <li>Rank</li>
                                <li>Player</li>
                                <li>Rolls</li>
                                <li>Gross Winnings</li>
                            </ul>
                        </div>

                        <div className="table-body">
                            {loading && <div>Loading</div>}

                            {!loading &&
                                rows.map((r) => (
                                    <ul className="table-row" key={r._id}>
                                        <li>
                                            <span>#{r.rank}</span>
                                        </li>
                                        <li>{r.player?.handle || shortWallet(r.player?.walletAddress) || "Anonymous"}</li>
                                        <li>{r.totalRolls}</li>
                                        <li>
                                            <span>{Number(r.value).toFixed(2)} SOL </span>
                                        </li>
                                    </ul>
                                ))}
                        </div>
                    </div>


                    {/*<div className="leaderboard-table">
                        <div className="table-head">
                            <ul>
                                <li>Rank</li>
                                <li>Player</li>
                                <li>amount won</li>
                            </ul>
                        </div>

                        <div className="table-body">
                            {leaderboardData.map((item, index) => (
                                <ul className="table-row" key={index}>
                                    <li><span>{item.rank}</span></li>
                                    <li>{item.player}</li>
                                    <li><span>{item.roll}</span></li>
                                </ul>
                            ))}
                        </div>
                    </div>*/}
                    {/*<Pagination/>*/}
                </div>
            </div>
        </LeaderboardStyle>
    )
}

export default PlayerLeaderboard

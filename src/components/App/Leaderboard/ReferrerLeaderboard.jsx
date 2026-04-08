import React, { useEffect, useMemo, useState } from "react"
import LeaderboardStyle from "./Leaderboard.style"
import LeaderboardShape from "../../../assets/images/shape/leaderboard-shape.png"

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.terminalroll.com"

function monthKeyFromUTCDate(d) {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, "0")
  return `${y}${m}`
}

function buildRecentMonths(n = 6) {
  const now = new Date()
  const out = []
  for (let i = 0; i < n; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))
    out.push({
      label: d.toLocaleString("en-AU", { month: "long", year: "numeric" }),
      key: monthKeyFromUTCDate(d)
    })
  }
  return out
}

function normaliseRows(payload) {
  if (Array.isArray(payload)) return payload
  return []
}

const ReferrerLeaderboard = () => {
  const months = useMemo(() => buildRecentMonths(6), [])

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(months[0])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError("")
      setRows([])

      try {
        const params = new URLSearchParams({ month: selectedMonth.key })
        const res = await fetch(`${API_BASE}/leaderboards/referrals/monthly?${params.toString()}`)

        const text = await res.text()

        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`)
          setLoading(false)
          return
        }

        let data
        try {
          data = JSON.parse(text)
        } catch {
          setError("Non JSON response from /leaderboards/referrals/monthly")
          setLoading(false)
          return
        }

        setRows(normaliseRows(data))
      } catch (e) {
        setError(e && e.message ? e.message : "Request failed")
      } finally {
        setLoading(false)
      }
    }

    if (selectedMonth && selectedMonth.key) load()
  }, [selectedMonth])

  return (
    <LeaderboardStyle>
      <div className="leaderboard-top">
        <div className="custom-container">
          <div className="leaderboard-top-inner">
            <div className="row">
              <div className="col-md-10">
                <div className="leaderboard-top-left">
                  <h2>Leaderboard</h2>
                  <p>Monthly Free Roll Leaderboard</p>
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
          <div className={`leaderboard-dropdown ${dropdownOpen ? "active" : ""}`}>
            <div className="dropdown-value" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {selectedMonth ? selectedMonth.label : ""}
            </div>

            {dropdownOpen && (
              <div className="droplist">
                <ul>
                  {months.map((m) => (
                    <li
                      key={m.key}
                      className={selectedMonth && m.key === selectedMonth.key ? "active" : ""}
                      onClick={() => {
                        setSelectedMonth(m)
                        setDropdownOpen(false)
                      }}
                    >
                      {m.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="leaderboard-table">
            <div className="table-head">
              <ul>
                <li>Rank</li>
                <li>Player</li>
                <li>Referrals</li>
              </ul>
            </div>

            <div className="table-body">
              {loading && <div>Loading</div>}
              {!loading && error && <div>{error}</div>}

              {!loading &&
                !error &&
                rows.map((r) => (
                  <ul className="table-row" key={r._id || `${r.month}_${r.playerId}_${r.rank}`}>
                    <li>
                      <span>#{r.rank}</span>
                    </li>
                    <li>{r.player?.handle || "Anonymous"}</li>
                    <li>
                      <span>{Number(r.referralCount || 0)}</span>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
    </LeaderboardStyle>
  )
}

export default ReferrerLeaderboard

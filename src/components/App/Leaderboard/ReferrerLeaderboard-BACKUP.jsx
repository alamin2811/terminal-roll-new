import React, { useState } from 'react'
import LeaderboardStyle from './Leaderboard.style'
import LeaderboardShape from '../../../assets/images/shape/leaderboard-shape.png'
import Pagination from '../../Core/Pagination/Pagination'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const leaderboardData = [
    { rank: '#01', player: 'R. Smith', roll: '56' },
    { rank: '#02', player: 'M. Johnson', roll: '42' },
    { rank: '#03', player: 'A. Smith', roll: '40' },
    { rank: '#04', player: 'T. Brown', roll: '39' },
    { rank: '#05', player: 'C. Davis', roll: '38' },
    { rank: '#06', player: 'L. Wilson', roll: '33' },
    { rank: '#07', player: 'E. Taylor', roll: '28' },
    { rank: '#08', player: 'R. Anderson', roll: '25' },
    { rank: '#09', player: 'K. Thomas', roll: '24' },
    { rank: '#10', player: 'S. Jackson', roll: '20' },
    { rank: '#11', player: 'M. Johnson', roll: '18' },
    { rank: '#12', player: 'A. Smith', roll: '18' },
    { rank: '#13', player: 'T. Brown', roll: '16' },
    { rank: '#14', player: 'C. Davis', roll: '15' },
    { rank: '#15', player: 'L. Wilson', roll: '13' },
]

const ReferrerLeaderboard = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState('December')

    const handleMonthSelect = (month) => {
        setSelectedMonth(month)
        setDropdownOpen(false)
    }

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
                    {/* Dropdown */}
                    <div className={`leaderboard-dropdown ${dropdownOpen ? 'active' : ''}`}>
                        <div
                            className="dropdown-value"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {selectedMonth}
                        </div>

                        {dropdownOpen && (
                            <div className="droplist">
                                <ul>
                                    {months.map((month, index) => (
                                        <li
                                            key={index}
                                            className={month === selectedMonth ? 'active' : ''}
                                            onClick={() => handleMonthSelect(month)}
                                        >
                                            {month}
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
                                <li>Free Roll</li>
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
                    </div>
                    <Pagination/>
                </div>
            </div>
        </LeaderboardStyle>
    )
}

export default ReferrerLeaderboard

import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import PlayerLeaderboard from '../components/App/Leaderboard/PlayerLeaderboard'

const PlayerLeaderboardPage = () => {
    return (
        <BodyWrapper parentClass='no-green-shape'>
            <Header />
            <PlayerLeaderboard/>
        </BodyWrapper>
    )
}

export default PlayerLeaderboardPage
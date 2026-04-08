import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import ReferrerLeaderboard from '../components/App/Leaderboard/ReferrerLeaderboard'

const ReferrerLeaderboardPage = () => {
    return (
        <BodyWrapper parentClass='no-green-shape'>
            <Header />
            <ReferrerLeaderboard/>
        </BodyWrapper>
    )
}

export default ReferrerLeaderboardPage
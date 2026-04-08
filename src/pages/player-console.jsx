import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import PlayerConsoleContent from '../components/App/PlayerConsole/PlayerConsoleContent'

const PlayerConsole = () => {
  return (
    <BodyWrapper parentClass='no-green-shape'>
        <Header/>
        <PlayerConsoleContent/>
    </BodyWrapper>
  )
}

export default PlayerConsole
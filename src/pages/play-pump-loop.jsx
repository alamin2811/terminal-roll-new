import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import PumpLoop from '../components/App/GameTerminal/PumpLoop/PumpLoop'

const PumpLoopTerminal = () => {
  return (
    <BodyWrapper parentClass="terminal no-green-shape">
        <Header/>
        <PumpLoop/>
    </BodyWrapper>
  )
}

export default PumpLoopTerminal
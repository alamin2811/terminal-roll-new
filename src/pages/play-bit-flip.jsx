import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import BitFlip from '../components/App/GameTerminal/BitFlip/BitFlip'

const GameTerminal = () => {
  return (
    <BodyWrapper parentClass="terminal no-green-shape">
        <Header/>
        <BitFlip/>
    </BodyWrapper>
  )
}

export default GameTerminal
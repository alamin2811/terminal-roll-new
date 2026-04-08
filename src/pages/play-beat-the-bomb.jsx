import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import BeatBomb from '../components/App/GameTerminal/BeatBomb/BeatBomb'

const BeatBombTerminal = () => {
  return (
    <BodyWrapper parentClass="terminal">
        <Header/>
        <BeatBomb/>
    </BodyWrapper>
  )
}

export default BeatBombTerminal
import React from 'react'
import FreeRollTerminal from '../components/App/FreeRollTerminal/FreeRollTerminal'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'

const FreeRollTerminalPage = () => {
  return (
    <>
        <BodyWrapper parentClass="terminal terminal-free-roll">
            <Header/>
            <FreeRollTerminal/>
        </BodyWrapper>
        
    </>
  )
}

export default FreeRollTerminalPage
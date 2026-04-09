import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import CacheHunt from '../components/App/GameTerminal/CacheHunt/CacheHunt'

const CacheHuntTerminal = () => {
  return (
    <BodyWrapper parentClass="terminal no-green-shape">
        <Header/>
        <CacheHunt/>
    </BodyWrapper>
  )
}

export default CacheHuntTerminal
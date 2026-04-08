import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import InviteEarn from '../components/App/InviteEarn/InviteEarn'

const InviteAndEarn = () => {
  return (
    <BodyWrapper parentClass='no-green-shape'>
        <Header/>
        <InviteEarn/>
    </BodyWrapper>
  )
}

export default InviteAndEarn
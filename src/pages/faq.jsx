import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import Faq from '../components/App/FAQ/Faq'

const FaqPage = () => {
  return (
    <BodyWrapper parentClass='no-green-shape'>
        <Header/>
        <Faq/>
        
    </BodyWrapper>
  )
}

export default FaqPage
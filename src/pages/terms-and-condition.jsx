import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import TermsConditions from '../components/App/TermsConditions/TermsConditions'

const TermsAndConditions = () => {
  return (
    <BodyWrapper parentClass='no-green-shape'>
        <Header/>
        <TermsConditions/>
    </BodyWrapper>
  )
}

export default TermsAndConditions
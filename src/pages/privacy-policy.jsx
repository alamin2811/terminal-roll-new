import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import Privacy from '../components/App/Privacy/Privacy'

const PrivacyPolicy = () => {
    return (
        <BodyWrapper parentClass='no-green-shape'>
            <Header />
            <Privacy/>
        </BodyWrapper>
    )
}

export default PrivacyPolicy
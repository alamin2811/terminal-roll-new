import React from 'react'
import BodyWrapper from '../components/Core/BodyWrapper/BodyWrapper'
import Header from '../components/Core/Header/Header'
import Transaction from '../components/App/Transaction/Transaction'

const TransactionPage = () => {
  return (
    <BodyWrapper parentClass='no-green-shape'>
        <Header/>
        <Transaction/>
    </BodyWrapper>
  )
}

export default TransactionPage
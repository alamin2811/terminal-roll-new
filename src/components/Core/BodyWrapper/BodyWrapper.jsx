import React from 'react'
import greenShape1 from '../../../assets/images/bg/shape1.png'
import greenShape2 from '../../../assets/images/bg/shape2.png'
import greenShape3 from '../../../assets/images/bg/shape3.png'
import greenShape4 from '../../../assets/images/bg/shape4.png'
import BodyWrapperStyle from './BodyWrapper.style'

const BodyWrapper = ({children, parentClass}) => {
  return (
    <BodyWrapperStyle className={`body-wrapper ${parentClass}`}>
        <div className='bg-graph fixed' />
        <img src={greenShape1} alt="bg" className='green-shape1' />
        <img src={greenShape2} alt="bg" className='green-shape2' />
        <img src={greenShape3} alt="bg" className='green-shape3' />
        <img src={greenShape4} alt="bg" className='green-shape4' />
        <div className='left-line' />
        <div className='right-line' />
        <div className="relative z-9">
          {children}
        </div>
    </BodyWrapperStyle>
  )
}

export default BodyWrapper
import React from 'react'
import PaginationStyle from './Pagination.style'
import arrowLeft from '../../../assets/images/icon/arrow-left.png'
import arrowRight from '../../../assets/images/icon/arrow-right.png'

const Pagination = () => {
    return (
        <PaginationStyle>
            <ul>
                <li>
                    <a href="#" className='hover-btn pagination-btn left'>
                        <span className="btn-text">
                            <span><img src={arrowLeft} alt="icon" /></span>
                            <span><img src={arrowLeft} alt="icon" /></span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                    </a>
                </li>
                <li>
                    <a href="#" className='hover-btn pagination-btn active'>
                        <span className="btn-text">
                            <span>1</span>
                            <span>1</span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                    </a>
                </li>
                <li>
                    <a href="#" className='hover-btn pagination-btn'>
                        <span className="btn-text">
                            <span>2</span>
                            <span>2</span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                    </a>
                </li>
                <li>
                    <a href="#" className='hover-btn pagination-btn'>
                        <span className="btn-text">
                            <span>3</span>
                            <span>3</span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                    </a>
                </li>
                <li>
                    <a href="#" className='hover-btn pagination-btn'>
                        <span className="btn-text">
                            <span>4</span>
                            <span>4</span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                    </a>
                </li>
                <li>
                   <a href="#" className='hover-btn pagination-btn right'>
                        <span className="btn-text">
                            <span><img src={arrowRight} alt="icon" /></span>
                            <span><img src={arrowRight} alt="icon" /></span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                    </a>
                </li>
            </ul>
        </PaginationStyle>
    )
}

export default Pagination
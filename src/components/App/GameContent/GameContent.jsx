import React from 'react'
import GameContentStyle from './GameContent.style'
import playIcon from '../../../assets/images/icon/play.png'
import winIcon from '../../../assets/images/icon/win.png'

const GameContent = () => {
    return (
        <GameContentStyle>
            <div className="custom-container">
                <div className="game-content-inner">
                    <a href="/play-bit-flip" className='game-btn primary-btn lg hover-btn'>
                        
                        <span className="btn-text">
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Bit Flip</span>
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Bit Flip</span>
                        </span>
                        <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                        <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                    </a>
                    <a href="/play-cache-hunt" className='game-btn primary-btn lg hover-btn'>
                        
                        <span className="btn-text">
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Cache Hunt</span>
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Cache Hunt</span>
                        </span>
                        <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                        <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                    </a>          
                    <a href="/play-pump-loop" className='game-btn primary-btn lg hover-btn'>
                        <span className="btn-text">
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Pump Loop</span>
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Pump Loop</span>
                        </span>
                        <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                        <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                    </a>   
                    <a href="/play-beat-the-bomb" className='game-btn primary-btn lg hover-btn'>
                        <span className="btn-text">
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Beat Bomb</span>
                            <span><img src={playIcon} alt="icon" />&nbsp;Play Beat Bomb</span>
                        </span>
                        <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                        <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                    </a>                                                     
                    <a href="/invite-and-earn" className='game-btn secondary-btn lg hover-btn'> 
                        <span className="btn-text">
                            <span><img src={winIcon} alt="icon" /> INVITE AND EARN</span>
                            <span><img src={winIcon} alt="icon" /> INVITE AND EARN</span>
                        </span>
                        <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                        <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                    </a>
                </div>
            </div>
        </GameContentStyle>

    )
}

export default GameContent
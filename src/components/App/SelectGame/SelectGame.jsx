import React from 'react'
import SelectGameStyle from './SelectGame.style'

const SelectGame = () => {

    const sliderItems = [
        "◆ 0xA3F1 won 8.4x on PUMPLOOP",
        "◆ 0xA3F1 won 8.4x on PUMPLOOP",
        "◆ 0xF0E9 defused BEATBOMB at 7.2x",
        "◆ 0xD441"
    ];

    const games = [
        {
            className: "bitflip",
            title: "BITFLIP",
            tag: "Live",
            desc: "Flip the bit. Call it right or watch it invert. Pure on-chain probability",
            win: "UP TO 2X",
            players: "214 playing",
            link: "/play-bit-flip",
            btn: "Play Bit Flip"
        },
        {
            className: "cachehunt",
            title: "CACHEHUNT",
            tag: "Hot",
            desc: "Hunt the cache before it resets. Win up to 10x if you find it first",
            win: "UP TO 10X",
            players: "108 playing",
            link: "/play-cache-hunt",
            btn: "Play CACHEHUNT"
        },
        {
            className: "pumploop",
            title: "PUMPLOOP",
            tag: "100X",
            desc: "Launch your token. Watch the market. See how far it pumps before the loop breaks",
            win: "UP TO 100X",
            players: "563 playing",
            link: "/play-pump-loop",
            btn: "Play PUMPLOOP"
        },
        {
            className: "beatbomb",
            title: "BEATBOMB",
            tag: "Danger",
            desc: "Start the bank. Nuke it before it explodes. Time your exit or lose it all",
            win: "UP TO 25X",
            players: "96 playing",
            link: "/play-beat-the-bomb",
            btn: "Play BEATBOMB"
        }
    ];

    return (
        <SelectGameStyle>
            <div className="custom-container">
                <div className="select-game-auto-slider">
                    {[1, 2].map((_, i) => (
                        <ul key={i}>
                            {sliderItems.map((item, index) => (
                                <li key={index}>
                                    {item} <span>•</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>

                <div className="select-game-inner">
                    <h5> &gt; SELECT YOUR GAME</h5>
                    <h2>CHOOSE A MODULE</h2>

                    <div className="select-game-content">
                        <div className="row">
                            {games.map((game, index) => (
                                <div className="col-md-6" key={index}>
                                    <div className={`select-game-card ${game.className}`}>
                                        <div className="card-top">
                                            <h3>{game.title}</h3>
                                            <span>{game.tag}</span>
                                        </div>
                                        <p>{game.desc}</p>

                                        <div className="potential">
                                            <div className="left">
                                                <h6>WIN_POTENTIAL</h6>
                                                <h4>{game.win}</h4>
                                            </div>

                                            <div className="right">
                                                <span>{game.players}</span>
                                            </div>
                                        </div>

                                        <a href={game.link} className='game-btn lg hover-btn'>
                                            <span className="btn-text">
                                                <span>{game.btn}</span>
                                                <span>{game.btn}</span>
                                            </span>
                                            <span>&gt;_</span>
                                            <span className='btn-shape btn-shape1'></span>
                                            <span className='btn-shape btn-shape2'></span>
                                            <span className='btn-shape btn-shape3'></span>
                                            <span className='btn-shape btn-shape4'></span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="select-game-bottom">
                        <h6>TOTAL VOLUME  <span>1,284.7 SOL</span></h6>
                        <h6> PLAYERS ONLINE <span>856</span></h6>
                    </div>
                </div>
            </div>
        </SelectGameStyle>
    )
}

export default SelectGame
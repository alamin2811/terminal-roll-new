import React, { useRef } from "react";
import { Offcanvas } from "bootstrap";
import menuIcon from '../../../assets/images/icon/menu.png'
import menuListIcon from '../../../assets/images/icon/menu-list-icon.svg'
import MenuClose from '../../../assets/images/icon/cross.png'
import tgIcon from '../../../assets/images/icon/tg.png'
import XIcon from '../../../assets/images/icon/x.png'
import MailIcon from '../../../assets/images/icon/email.png'
import YoutubeIcon from '../../../assets/images/icon/yt.png'

import greenShape1 from '../../../assets/images/bg/shape2.png'
import greenShape2 from '../../../assets/images/bg/shape4.png'

const MenuDrawer = () => {
    const drawerRef = useRef(null);

    const openDrawer = () => {
        const drawer = new Offcanvas(drawerRef.current);
        drawer.show();
    };

    const closeDrawer = () => {
        const drawer = Offcanvas.getInstance(drawerRef.current);
        drawer.hide();
    };

    return (
        <>
            <button className='menu-btn' onClick={openDrawer}><img src={menuIcon} alt="icon" /></button>

            <div
                ref={drawerRef}
                className="offcanvas offcanvas-end menu-bg"
                tabIndex="-1"
            >
                <div className="menu-inner">
                    <div className='menu-bg-graph' />
                    <img src={greenShape1} alt="bg" className='menu-green-shape menu-green-shape1' />
                    <img src={greenShape2} alt="bg" className='menu-green-shape menu-green-shape2' />
                    <div className="menu-close-btn">
                        <button className="secondary-btn lg" onClick={closeDrawer}>
                            <img src={MenuClose} alt="icon" />
                            <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                            <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                        </button>
                    </div>

                    <div className="offcanvas-body drawer-body">
                        <ul className="menu-list">
                            <li><a href="/play-bit-flip"><img src={menuListIcon} alt="icon" />Play Bit Flip</a></li>
                            <li><a href="/play-cache-hunt"><img src={menuListIcon} alt="icon" />Play Cache Hunt</a></li>
                            <li><a href="/play-pump-loop"><img src={menuListIcon} alt="icon" />Play Pump Loop</a></li>
                            <li><a href="/play-beat-the-bomb"><img src={menuListIcon} alt="icon" />Play Beat Bomb</a></li>
                            <li><a href="/player-console"><img src={menuListIcon} alt="icon" /> Player Console</a></li>
                            <li><a href="/player-leaderboard"><img src={menuListIcon} alt="icon" />Leaderboard</a></li>
                            <li><a href="/free-roll-terminal"><img src={menuListIcon} alt="icon" />Free Roll Terminal</a></li>
                            <li><a href="/invite-and-earn"><img src={menuListIcon} alt="icon" />Invite and earn</a></li>
                            <li><a href="/contact-support"><img src={menuListIcon} alt="icon" />Contact Support</a></li>
                            <li><a href="/faq"><img src={menuListIcon} alt="icon" />FAQs</a></li>
                            {/* <li><a href="#"><img src={menuListIcon} alt="icon" />Whitepaper</a></li>
                            <li><a href="#"><img src={menuListIcon} alt="icon" />Articles</a></li> */}
                        </ul>

                        <div className="menu-footer">
                            <h6><a href="/terms-and-condition" className="uppercase">TERMS & CONDITIONS</a></h6>
                            <h6><a href="/privacy-policy" className="uppercase">Privacy policy</a></h6>
                            <div className="social-links">
                                <a href="https://t.me/terminalroll" className="secondary-btn lg hover-btn">
                                    <span className="btn-text">
                                        <span><img src={tgIcon} alt="icon" /></span>
                                        <span><img src={tgIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                                </a>
                                <a href="https://x.com/TerminalRoll" className="secondary-btn lg hover-btn">
                                    <span className="btn-text">
                                        <span><img src={XIcon} alt="icon" /></span>
                                        <span><img src={XIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                                </a>
                                <a href="https://www.youtube.com/@terminalroll" className="secondary-btn lg hover-btn">
                                    <span className="btn-text">
                                        <span><img src={YoutubeIcon} alt="icon" /></span>
                                        <span><img src={YoutubeIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                                </a>
                                <a href="mailto:players@terminalroll.com" className="secondary-btn lg hover-btn">
                                    <span className="btn-text">
                                        <span><img src={MailIcon} alt="icon" /></span>
                                        <span><img src={MailIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuDrawer;

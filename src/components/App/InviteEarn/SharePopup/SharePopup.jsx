import React from 'react'
import SharePopupStyle from './SharePopup.style'
import MenuClose from '../../../../assets/images/icon/cross.png'
import tgIcon from '../../../../assets/images/icon/tg.png'
import XIcon from '../../../../assets/images/icon/x.png'
import DiscordIcon from '../../../../assets/images/icon/github.png'
import emailIcon from '../../../../assets/images/icon/email.png'

const SharePopup = ({ show, onClose, inviteLink }) => {
    if (!show) return null

    const encodedUrl = encodeURIComponent(inviteLink);
    const encodedText = encodeURIComponent("Join me on Terminal Roll");

    const handleDiscordShare = async () => {
        await navigator.clipboard.writeText(inviteLink);
        window.open("https://discord.com/channels/@me", "_blank");
    };

    return (
        <SharePopupStyle>
            {/* Modal Wrapper (outside click closes) */}
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                onClick={onClose}
            >
                <div className="modal-dialog modal-dialog-centered">
                    {/* Prevent close on inside click */}
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className='modal-shape modal-shape1'></span>
                        <span className='modal-shape modal-shape2'></span>
                        <span className='modal-shape modal-shape3'></span>
                        <span className='modal-shape modal-shape4'></span>

                        <div className="modal-close-btn">
                            <button
                                type="button"
                                className="secondary-btn lg"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <img src={MenuClose} alt="icon" />
                                <span className='btn-shape btn-shape1'></span>
                                <span className='btn-shape btn-shape2'></span>
                                <span className='btn-shape btn-shape3'></span>
                                <span className='btn-shape btn-shape4'></span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <h3>Share Invite Link</h3>

                            <div className="social-links">
                                <a href={`https://t.me/share/url?text=${encodedText}&url=${encodedUrl}`} target="_blank" rel="noreferrer" className="secondary-btn lg hover-btn">
                                    <span className="btn-text">
                                        <span><img src={tgIcon} alt="icon" /></span>
                                        <span><img src={tgIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span>
                                    <span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span>
                                    <span className='btn-shape btn-shape4'></span>
                                </a>

                                <a href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`} target="_blank" rel="noreferrer" className="secondary-btn lg hover-btn" >
                                    <span className="btn-text">
                                        <span><img src={XIcon} alt="icon" /></span>
                                        <span><img src={XIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span>
                                    <span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span>
                                    <span className='btn-shape btn-shape4'></span>
                                </a>

                                <a
                                href="#"
                                className="secondary-btn lg hover-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigator.clipboard.writeText(inviteLink);
                                    window.open("https://discord.com/channels/@me", "_blank");
                                }}
                                >
                                    <span className="btn-text">
                                        <span><img src={DiscordIcon} alt="icon" /></span>
                                        <span><img src={DiscordIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span>
                                    <span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span>
                                    <span className='btn-shape btn-shape4'></span>
                                </a>

                                <a href={`mailto:?subject=Terminal Roll Invite&body=${encodedText}%0A%0A${encodedUrl}`} className="secondary-btn lg hover-btn" target="_blank">
                                    <span className="btn-text">
                                        <span><img src={emailIcon} alt="icon" /></span>
                                        <span><img src={emailIcon} alt="icon" /></span>
                                    </span>
                                    <span className='btn-shape btn-shape1'></span>
                                    <span className='btn-shape btn-shape2'></span>
                                    <span className='btn-shape btn-shape3'></span>
                                    <span className='btn-shape btn-shape4'></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
        </SharePopupStyle>
    )
}

export default SharePopup

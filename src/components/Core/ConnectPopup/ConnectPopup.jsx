import React from 'react'
import walletIcon from '../../../assets/images/icon/wallet.png'
import Phantom from '../../../assets/images/icon/phantom.png'
import Backpack from '../../../assets/images/icon/backpack.png'
import ConnectPopupStyle from './ConnectPopup.style'

const ConnectPopup = () => {
    return (
        <ConnectPopupStyle>

            {/* Trigger Button */}
            <button
                className='connect-btn primary-btn sm hover-btn'
                data-bs-toggle="modal"
                data-bs-target="#connectWalletModal"
            >
                <img src={walletIcon} alt="icon" /> 
                <span className="btn-text">
                    <span>Connect</span>
                    <span>Connect</span>
                </span>
                <span className='btn-shape btn-shape1'></span>
                <span className='btn-shape btn-shape2'></span>
                <span className='btn-shape btn-shape3'></span>
                <span className='btn-shape btn-shape4'></span>
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="connectWalletModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content connect-popup-content">
                        
                        <div className="modal-body popup-body">
                            <span className='modal-shape modal-shape1'></span><span className='modal-shape modal-shape2'></span>
                            <span className='modal-shape modal-shape3'></span><span className='modal-shape modal-shape4'></span>

                            <h2>Connect Wallet</h2>
                            <p>To continue, please connect your wallet.</p>

                            <button className="secondary-btn lg">
                                <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                                <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                                <img src={Phantom} alt="icon" /> Phantom
                            </button>

                            <button className="secondary-btn lg">
                                <span className='btn-shape btn-shape1'></span><span className='btn-shape btn-shape2'></span>
                                <span className='btn-shape btn-shape3'></span><span className='btn-shape btn-shape4'></span>
                                <img src={Backpack} alt="icon" /> Backpack
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </ConnectPopupStyle>
    )
}

export default ConnectPopup

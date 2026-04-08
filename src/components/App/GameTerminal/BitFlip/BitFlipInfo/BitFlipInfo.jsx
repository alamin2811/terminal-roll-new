import MenuClose from '../../../../../assets/images/icon/cross.png'
import BitFlipInfoStyle from './BitFlipInfo.style'

const BitFlipInfo = ({ show, onClose }) => {
    if (!show) return null

    return (
        <BitFlipInfoStyle className='bit-flip-info-popup'>
            {/* Modal Wrapper (outside click closes) */}
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                onClick={onClose}
            >
                <div className="modal-dialog modal-dialog-centered">
                    {/* Stop propagation so inside click doesn't close */}
                    <div
                        className="modal-content bit-info-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-close-btn">
                            <button
                                type="button"
                                className="secondary-btn lg"
                                onClick={onClose}
                            >
                                <img src={MenuClose} alt="icon" />
                                <span className='btn-shape btn-shape1'></span>
                                <span className='btn-shape btn-shape2'></span>
                                <span className='btn-shape btn-shape3'></span>
                                <span className='btn-shape btn-shape4'></span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <span className='modal-shape modal-shape1'></span>
                            <span className='modal-shape modal-shape2'></span>
                            <span className='modal-shape modal-shape3'></span>
                            <span className='modal-shape modal-shape4'></span>

                            <h2>BITFLIP</h2>
                            <p>
                                Binary resolution driven by load & entropy.
                                Roll fast to build advantage.
                            </p>

                            <h3>Execution</h3>
                            <ul>
                                <li>server + client entropy</li>
                                <li>system load applied</li>
                                <li>1 bit resolved</li>
                            </ul>

                            <h3>Outcomes</h3>
                            <ul>
                                <li>`1` → Win</li>
                                <li>`0` → Loss</li>
                            </ul>

                            <h3>System State</h3>
                            <p>Load increases with activity.
                                <br/>Higher load unlocks enhanced payouts. 
                                <br/>Delay resets system load.</p>

                            <h3>Fairness</h3>
                            <p>Results are deterministic & verifiable</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
        </BitFlipInfoStyle>
    )
}

export default BitFlipInfo

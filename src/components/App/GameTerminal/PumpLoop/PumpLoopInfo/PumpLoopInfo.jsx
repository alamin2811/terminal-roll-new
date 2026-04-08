import MenuClose from '../../../../../assets/images/icon/cross.png'
import PumpLoopInfoStyle from './PumpLoopInfo.style'

const PumpLoopInfo = ({ show, onClose }) => {
    if (!show) return null

    return (
        <PumpLoopInfoStyle className='bit-flip-info-popup'>
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

                            <h2>PUMP LOOP</h2>
                            <p>
                                Launch a fresh token every click.
                            </p>

                            <h3>Outcomes</h3>
                            <ul>
                                <li>100x → ultra rare breakout</li>
                                <li>50x → extreme expansion</li>
                                <li>25x → major run</li>
                                <li>10x → strong breakout</li>
                                <li>5x → solid pump</li>
                                <li>2x → quick gain</li>
                                <li>0x → launch fails</li>
                            </ul>

                            <h3>Distribution</h3>
                            <p>Most launches fail fast. But when momentum hits, it runs.</p>
                            <ul>
                                <li>high frequency → 0x</li>
                                <li>low frequency → 10x+</li>
                                <li>rare → 25x to 50x</li>
                                <li>ultra rare → 100x</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
        </PumpLoopInfoStyle>
    )
}

export default PumpLoopInfo

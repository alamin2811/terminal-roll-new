import MenuClose from '../../../../assets/images/icon/cross.png'
import FreeRollTerminalInfoStyle from './FreeRollTerminalInfo.style'

const FreeRollTerminalInfo = ({ show, onClose }) => {
    if (!show) return null

    return (
        <FreeRollTerminalInfoStyle className='free-roll-terminal-info-popup'>
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

                            <h2>FREE ROLL</h2>
                            <p>Zero-risk terminal execution</p>

                            <h3>Overview</h3>
                            <p>
                                Free Roll is a pure 50/50 binary game executed entirely at no cost.
                                It allows you to play the Free Rolls you have earned or been awarded, without risking any SOL.
                            </p>

                            <h3>How It Works</h3>
                            <ul>
                                <li>A cryptographic server seed is generated</li>
                                <li>Your client seed is combined with it</li>
                                <li>A single binary outcome is resolved</li>
                            </ul>

                            <h3>Outcomes</h3>
                            <ul>
                                <li><code>1</code> → Win</li>
                                <li><code>0</code> → Loss</li>
                            </ul>

                            <h3>Payout</h3>
                            <p>
                                A winning Free Roll pays <strong>0.1 SOL</strong> directly to your terminal balance.
                            </p>

                            <h3>Risk</h3>
                            <p>
                                There is no risk.
                                <br />
                                No SOL is deducted.
                                <br />
                                Losses cost nothing.
                            </p>

                            <h3>Fairness</h3>
                            <p>
                                All results are deterministic, cryptographically derived,
                                and verifiable from the published seeds.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
        </FreeRollTerminalInfoStyle>
    )
}

export default FreeRollTerminalInfo

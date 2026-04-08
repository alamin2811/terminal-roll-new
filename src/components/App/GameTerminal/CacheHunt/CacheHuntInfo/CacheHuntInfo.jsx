import MenuClose from '../../../../../assets/images/icon/cross.png'
import CacheHuntInfoStyle from './CacheHuntInfo.style'

const CacheHuntInfo = ({ show, onClose }) => {
    if (!show) return null

    return (
        <CacheHuntInfoStyle className='bit-flip-info-popup'>
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

                            <h2>CACHE HUNT</h2>
                            <p>
                                Deep scan execution driven by entropy routing and sector breach logic. Every trigger hunts for hidden reward caches across the grid.
                            </p>

                            <h3>Execution</h3>
                            <ul>
                                <li>sector map scanned</li>
                                <li>cache tier resolved</li>
                            </ul>

                            <h3>Outcomes</h3>
                            <ul>
                                <li>void → 0x</li>
                                <li>dust → 0.75x</li>
                                <li>salvage → 1.2x</li>
                                <li>boost → 1.8x</li>
                                <li>rare → 4.0x</li>
                                <li>epic → 5.0x</li>
                                <li>legendary → 10.0x</li>
                            </ul>

                            <p>Most scans return low tier or empty caches. Higher tiers unlock rapidly increasing payouts. Rare breaches can return up to 10x on a single hit.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div className="modal-backdrop fade show"></div>
        </CacheHuntInfoStyle>
    )
}

export default CacheHuntInfo

// src/components/Core/AuthNotice/AuthNotice.jsx

import MenuClose from '../../../assets/images/icon/cross.png'
import AuthNoticeStyle from './AuthNotice.style'

const AuthNotice = ({ show, onClose, onVerify }) => {
  if (!show) return null

  return (
    <AuthNoticeStyle className="auth-notice-popup">
      {/* Modal Wrapper (outside click closes) */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        onClick={onClose}
      >
        <div className="modal-dialog modal-dialog-centered">
          {/* Stop propagation so inside click doesn't close */}
          <div
            className="modal-content auth-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="modal-close-btn">
              <button
                type="button"
                className="secondary-btn lg"
                onClick={onClose}
              >
                <img src={MenuClose} alt="close" />
                <span className="btn-shape btn-shape1"></span>
                <span className="btn-shape btn-shape2"></span>
                <span className="btn-shape btn-shape3"></span>
                <span className="btn-shape btn-shape4"></span>
              </button>
            </div>

            <div className="modal-body">
              {/* Decorative shapes */}
              <span className="modal-shape modal-shape1"></span>
              <span className="modal-shape modal-shape2"></span>
              <span className="modal-shape modal-shape3"></span>
              <span className="modal-shape modal-shape4"></span>

              <h2>SECURITY CHECK</h2>
              <p>One login per day.</p>

              <h3>Why this is required</h3>
              <p>
                To protect balances, prevent automated abuse, and ensure
                fair play, Terminal Roll requires a wallet verification.
              </p>

              <h3>What happens</h3>
              <ul>
                <li>You sign a message</li>
                <li>No transaction or funds are sent</li>
                <li>No gas is used</li>
                <li>Valid for 24 hours</li>
              </ul>

              {/* Action button */}
              <div className="auth-action">
                <button
                  className="primary-btn lg game-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onVerify();
                  }}
                >
                  Verify Wallet
                  <span className="btn-shape btn-shape1"></span>
                  <span className="btn-shape btn-shape2"></span>
                  <span className="btn-shape btn-shape3"></span>
                  <span className="btn-shape btn-shape4"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>
    </AuthNoticeStyle>
  )
}

export default AuthNotice

import React from 'react'
import TermsConditionsStyle from './TermsConditions.style'
import termsShape from '../../../assets/images/shape/terms-shape.png'

const TermsConditions = () => {
    return (
        <TermsConditionsStyle>
            <div className="terms-top">
                <div className="custom-container">
                    <div className="terms-top-inner">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="terms-top-left">
                                    <h2>TERMS & CONDITIONS</h2>
                                    <p>Last updated: 30 December 2025</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="terms-top-right">
                                    <img src={termsShape} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="custom-container">
                <div className="terms-content">
                    <div className="terms-list">
                        <h3><span>1.</span> Introduction</h3>
                        <p>TerminalRoll (“TerminalRoll”, “we”, “our”) operates an on-chain, programmatic gaming platform (the “Platform”).
                        <br />By accessing or using the Platform, you agree to be bound by these Terms and Conditions.
                        <br />If you do not agree, you must not access or use the Platform.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>2.</span> Eligibility</h3>
                        <p>You must be legally permitted to access and use blockchain-based gaming services in your jurisdiction.
                        <br />You are solely responsible for determining whether your participation is lawful.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>3.</span> Platform Nature and Risk</h3>
                        <p>The Platform provides probabilistic, on-chain games involving financial risk.
                        <br />Participation may result in loss of funds.
                        <br />No outcomes, returns, or profits are guaranteed.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>4.</span> Wallets and Responsibility</h3>
                        <p>Use of the Platform requires a compatible blockchain wallet.
                        <br />You are solely responsible for:</p>
                        <ul>
                            <li>Safeguarding your wallet and private keys</li>
                            <li>All transactions authorised from your wallet</li>
                            <li>Any loss resulting from unauthorised access</li>
                        </ul>
                        <p>TerminalRoll cannot access, restore, or reverse wallet activity.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>5.</span> Terminal Wallet</h3>
                        <p>The Platform may provide an internal Terminal Wallet used for gameplay accounting.
                        <br />Funds deposited into the Terminal Wallet:</p>
                        <ul>
                            <li>Are allocated exclusively for Platform gameplay</li>
                            <li>May be temporarily locked during active games</li>
                            <li>Require blockchain confirmation for withdrawals</li>
                        </ul>
                        <p>Balances shown are indicative and may not reflect pending transactions.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>6.</span> Game Logic and Finality</h3>
                        <p>By initiating a game, you accept the applicable game logic and parameters.
                        <br />All on-chain outcomes and transactions are final, irreversible, and non-refundable.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>7.</span> Free Rolls and Promotions</h3>
                        <p>Free rolls, referral rewards, or promotional mechanics may be offered at our discretion.
                        <br />Such offers may be limited, modified, suspended, or revoked at any time, including to prevent misuse or exploitation.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>8.</span> Modifications and Access</h3>
                        <p>We may amend these Terms or restrict or terminate access to the Platform at any time.
                        <br />Continued use of the Platform constitutes acceptance of any updated Terms.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>9.</span> Contact</h3>
                        <p>Enquiries regarding these Terms may be submitted via <a href="/contact-support">Contact support</a> on the Platform.</p>
                    </div>
                </div>
            </div>


{/*         <div className="custom-container">
                <div className="terms-content">
                    <div className="terms-list">
                        <h3><span>1.</span> Introduction</h3>
                        <p>TerminalRoll (“TerminalRoll”, “we”, “our”) provides on-chain games and related services (the “Platform”).
                        <br />By accessing or using the Platform, you agree to these Terms.
                        <br />If you do not agree, do not use the Platform.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>2.</span> Eligibility</h3>
                        <p>You must be legally permitted to use blockchain-based gaming services in your jurisdiction.
                        <br />You are responsible for ensuring your use of the Platform complies with applicable laws.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>3.</span> Platform Use and Risk</h3>
                        <p>All games involve risk and may result in gains or losses.
                        <br />Outcomes are determined by defined game rules and programmatic mechanisms.
                        <br />No guarantees of winnings or profit are made.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>4.</span> Wallets and Assets</h3>
                        <p>Use of the Platform requires a compatible blockchain wallet.
                        <br />You are solely responsible for:</p>
                        <ul>
                            <li>Your wallet security</li>
                            <li>Your private keys</li>
                            <li>All transactions you approve</li>
                        </ul>
                        <p>TerminalRoll does not control or recover wallet access.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>5.</span> Terminal Wallet</h3>
                        <p>The Platform may provide an internal Terminal Wallet for gameplay.
                        <br />Funds deposited:</p>
                        <ul>
                            <li>Are used for gameplay only</li>
                            <li>May be temporarily locked while in use</li>
                            <li>Are subject to blockchain confirmation for withdrawals</li>
                        </ul>
                        <p>Displayed balances may be delayed.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>6.</span> Game Rules and Finality</h3>
                        <p>By participating in a game, you accept its rules and outcomes.
                        <br />All completed blockchain transactions are final and irreversible.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>7.</span> Promotions and Free Rolls</h3>
                        <p>Free rolls, referrals, or promotions may be offered at our discretion.
                        <br />We may modify, limit, or discontinue promotions at any time to prevent abuse.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>8.</span> Changes and Termination</h3>
                        <p>We may update these Terms or restrict access to the Platform at any time.
                        <br />Continued use constitutes acceptance of updated Terms.</p>
                    </div>
                    <div className="terms-list">
                        <h3><span>9.</span> Contact</h3>
                        <p>Questions about these Terms can be directed to <a href="/contact-support">Contact support</a> through the Platform.</p>
                    </div>
                </div>
            </div> */}
        </TermsConditionsStyle>
    )
}

export default TermsConditions
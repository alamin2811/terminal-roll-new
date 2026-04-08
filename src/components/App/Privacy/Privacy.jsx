import React from 'react'
import PrivacyStyle from './Privacy.style'
import termsShape from '../../../assets/images/shape/terms-shape.png'

const Privacy = () => {
    return (
        <PrivacyStyle>
            <div className="privacy-top">
                <div className="custom-container">
                    <div className="privacy-top-inner">
                        <div className="row">
                            <div className="col-md-10">
                                <div className="privacy-top-left">
                                    <h2>PRIVACY POLICY</h2>
                                    <p>Last updated: 30 December 2025</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="privacy-top-right">
                                    <img src={termsShape} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="custom-container">
                <div className="privacy-content">
                    <div className="privacy-list">
                        <h3><span>1.</span> Introduction</h3>
                        <p>This Privacy Policy explains how TerminalRoll (“TerminalRoll”, “we”, “our”) collects, uses, and handles information when you access or use the Platform.
                        <br />By using the Platform, you consent to the practices described in this Policy.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>2.</span> Information We Collect</h3>
                        <p>We collect limited information necessary to operate the Platform, including:</p>
                        <ul>
                            <li>Blockchain wallet addresses</li>
                            <li>On-chain transaction data</li>
                            <li>Gameplay activity and outcomes</li>
                        </ul>
                        <p>We do not collect names, email addresses, or traditional personal identifiers unless explicitly provided through support interactions.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>3.</span> Blockchain Transparency</h3>
                        <p>Blockchain transactions are public by design.
                        <br />Any activity conducted on-chain may be publicly visible and independently verifiable.
                        <br />TerminalRoll does not control blockchain data visibility.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>4.</span> Use of Information</h3>
                        <p>Collected information is used solely to:</p>
                        <ul>
                            <li>Operate and maintain the Platform</li>
                            <li>Process gameplay and transactions</li>
                            <li>Prevent abuse, fraud, or manipulation</li>
                        </ul>
                        <p>We do not sell or rent user information.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>5.</span> Cookies and Tracking</h3>
                        <p>The Platform may use minimal cookies or local storage for functional purposes.
                        <br />No third-party advertising or behavioural tracking is conducted.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>6.</span> Data Security</h3>
                        <p>We implement reasonable technical measures to protect Platform data.
                        <br />However, no system is completely secure, and use of the Platform is at your own risk.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>7.</span> Data Retention</h3>
                        <p>Off-chain records are retained only as long as necessary for Platform operation and compliance.
                        <br />On-chain data cannot be modified or deleted.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>8.</span> Policy Updates</h3>
                        <p>This Privacy Policy may be updated from time to time.
                        <br />Continued use of the Platform constitutes acceptance of any changes.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>9.</span> Contact</h3>
                        <p>Questions regarding this Privacy Policy may be submitted via <a href="/contact-support">Contact support</a> through the Platform.</p>
                    </div>
                </div>
            </div>


{/*            
            <div className="custom-container">
                <div className="privacy-content">
                    <div className="privacy-list">
                        <h3><span>1.</span> Overview</h3>
                        <p>TerminalRoll (“TerminalRoll”, “we”, “our”) respects your privacy.
                        <br />This Privacy Policy explains what information we collect, how it is used, and how it is protected when you use the Platform.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>2.</span> Information We Collect</h3>
                        <p>We may collect:</p>
                        <ul>
                            <li>Wallet addresses you connect to the Platform</li>
                            <li>Gameplay-related data (such as game results and usage)</li>
                            <li>Referral and free roll activity</li>
                        </ul>
                        <p>We do not collect private keys or wallet recovery phrases.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>3.</span> How We Use Information</h3>
                        <p>Information is used to:</p>
                        <ul>
                            <li>Operate and improve the Platform</li>
                            <li>Display gameplay history and statistics</li>
                            <li>Prevent abuse and maintain security</li>
                        </ul>
                        <p>We do not sell personal data.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>4.</span> Cookies and Analytics</h3>
                        <p>The Platform may use basic analytics or cookies to understand usage and improve performance.</p>
                        <p>No sensitive personal data is stored through cookies.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>5.</span> Data Sharing</h3>
                        <p>We do not share your information with third parties except:</p>
                        <ul>
                            <li>When required by law</li>
                            <li>When necessary to operate the Platform (e.g. infrastructure providers)</li>
                        </ul>
                    </div>
                    <div className="privacy-list">
                        <h3><span>6.</span> Blockchain Transparency</h3>
                        <p>Blockchain transactions are public by nature.</p>
                        <p>Activity recorded on-chain is not controlled or removable by TerminalRoll.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>7.</span> Data Security</h3>
                        <p>We take reasonable steps to protect Platform data but cannot guarantee absolute security.</p>
                        <p>Use of the Platform is at your own risk.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>8.</span> Changes to This Policy</h3>
                        <p>This Privacy Policy may be updated from time to time.</p>
                        <p>Continued use of the Platform constitutes acceptance of the updated policy.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>9.</span> Contact</h3>
                        <p>Questions about this Privacy Policy can be directed to <a href="/contact-support">support</a> through the Platform.</p>
                    </div>
                    <div className="privacy-list">
                        <h3><span>10.</span> Why this fits your product</h3>
                        <ul>
                            <li>Short and readable</li>
                            <li>Honest about blockchain reality</li>
                            <li>Doesn’t over-promise</li>
                            <li>Looks legitimate in a clean UI</li>
                            <li>Complements your Terms page nicely</li>
                        </ul>
                    </div>
                </div>
            </div>
*/}

        </PrivacyStyle>
    )
}

export default Privacy
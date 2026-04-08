import React, { useState } from 'react'
import InviteEarnStyle from './InviteEarn.style'
import InviteShape from '../../../assets/images/shape/invite-shape.png'
import copyIcon from '../../../assets/images/icon/copy-icon.png'
import CheckIcon from '../../../assets/images/icon/check.png'
import shareIcon from '../../../assets/images/icon/share.png'
import SharePopup from './SharePopup/SharePopup'
import { useInviteStats } from "../../../hooks/useInviteStats";
import { useMyMonthlyReferralRank } from "../../../hooks/useMyMonthlyReferralRank";
import { useAppPlayer } from "../../../context/AppPlayerContext";


const InviteEarn = () => {
    const { data, isLoading } = useInviteStats();
    const [copied, setCopied] = useState(false)
    const [showSharePopup, setShowSharePopup] = useState(false)
    const { rankLabel, month, referralCount } = useMyMonthlyReferralRank();
    const { userWalletAddress } = useAppPlayer();

    if (!userWalletAddress) 
    {
        return (
                    <InviteEarnStyle>
                    <div className="invite-earn-top">
                        <div className="custom-container">
                            <div className="invite-earn-top-inner">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="invite-earn-top-left">
                                            <h2>INVITE & EARN</h2>
                                            <p>Connect your wallet to continue</p>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="invite-earn-top-right">
                                            <img src={InviteShape} alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="invite-earn">
                        <div className="custom-container p-0">
                            <div className="row m-0">
                                <div className="col-md-6 p-0">
                                    <div className="invite-earn-content invite-earn-content-right no-border">
                                        <div className="invite-content no-border">
                                            <h3>How it works</h3>
                                            <p>
                                                Invite players. When they play, you earn free rolls and leaderboard points.
                                            </p>
                                            <p>
                                                A referral is successful once a new player joins using your invite code and actively plays paid games, wagering at least 0.1 SOL.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 p-0">
                                    <div className="invite-earn-content invite-earn-content-right">
                                        <div className="invite-content">
                                            <h3>Free Rolls</h3>
                                            <p>Each Free Roll is worth 0.1 SOL.</p>
                                            <p>Free Rolls are a 50/50 chance of winning.</p>
                                            <p>Each successful referral is awarded 1 Free Roll.</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </InviteEarnStyle>
        )
    }

    if (isLoading || !data) {
    return (
        <InviteEarnStyle>
                    <InviteEarnStyle>
                    <div className="invite-earn-top">
                        <div className="custom-container">
                            <div className="invite-earn-top-inner">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="invite-earn-top-left">
                                            <h2>INVITE & EARN</h2>
                                            <p>Loading Data...</p>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="invite-earn-top-right">
                                            <img src={InviteShape} alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </InviteEarnStyle>
        </InviteEarnStyle>
    );
}

    const {
        referralCode,
        freeRolls,
        referrals
    } = data;

    

    const inviteLink = `terminalroll.com?invite=${referralCode}`;
    const inviteLinkShareable = `https://terminalroll.com?invite=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // FORMAT MONTH SAFELY
    let monthLabel = "—";
    if (month) {
        const y = month.slice(0, 4);
        const m = month.slice(4, 6);
        monthLabel = new Date(`${y}-${m}-01`).toLocaleString("en-US", {
            month: "long"
        }).toUpperCase();
    }


    return (
            <>
                <InviteEarnStyle>
                    <div className="invite-earn-top">
                        <div className="custom-container">
                            <div className="invite-earn-top-inner">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="invite-earn-top-left">
                                            <h2>INVITE & EARN</h2>
                                            <p>Invite. Earn 50% of lifetime profit. Paid in SOL.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="invite-earn-top-right">
                                            <img src={InviteShape} alt="img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="invite-earn">
                        <div className="custom-container p-0">
                            <div className="row m-0">
                                <div className="col-md-6 p-0">
                                    <div className="invite-earn-content invite-earn-content-right no-border">
                                        <div className="invite-content">
                                            <h3>Referral Status</h3>
                                            <ul>
                                                <li>
                                                    <span>Total Lifetime Referrals</span>
                                                    <strong>{referrals.total}</strong>
                                                </li>                                               
                                                <li>
                                                    <span>Your Referral Code</span>
                                                    <strong>{referralCode}</strong>
                                                </li>                                           
                                            </ul>

                                            <form>
                                                <label>Invite Link</label>
                                                <div className="input-flex">
                                                    <input
                                                        type="text"
                                                        value={inviteLink}
                                                        readOnly
                                                    />

                                                    <div className="copy-share-btns">
                                                        <button
                                                            type="button"
                                                            className="secondary-btn sm hover-btn"
                                                            onClick={handleCopy}
                                                        >
                                                            <span className="btn-text">
                                                                <span><img src={copied ? CheckIcon : copyIcon} alt="icon" /></span>
                                                                <span><img src={copied ? CheckIcon : copyIcon} alt="icon" /></span>
                                                            </span>
                                                            <span className='btn-shape btn-shape1'></span>
                                                            <span className='btn-shape btn-shape2'></span>
                                                            <span className='btn-shape btn-shape3'></span>
                                                            <span className='btn-shape btn-shape4'></span>
                                                        </button>

                                                        {/* SHARE BUTTON */}
                                                        <button
                                                            type="button"
                                                            className="secondary-btn sm hover-btn"
                                                            onClick={() => setShowSharePopup(true)}
                                                            
                                                        >   
                                                            <span className="btn-text">
                                                                <span><img src={shareIcon} alt="icon" /></span>
                                                                <span><img src={shareIcon} alt="icon" /></span>
                                                            </span>
                                                            <span className='btn-shape btn-shape1'></span>
                                                            <span className='btn-shape btn-shape2'></span>
                                                            <span className='btn-shape btn-shape3'></span>
                                                            <span className='btn-shape btn-shape4'></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="invite-content no-border">
                                            <h3>How it works</h3>
                                            <p>
                                                Invite players. Earn 50% of lifetime profit from their play.
                                            </p>
                                            <p>
                                                No minimums. No restrictions. Instant payouts.
                                            </p>
                                            <p>
                                                Once a player joins with your code and completes a roll, you receive 50% of the profit generated from their winning rolls.
                                            </p>                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 p-0">
                                    <div className="invite-earn-content invite-earn-content-right">
                                        <div className="invite-content">
                                            <h3>Referral Earnings</h3>
                                            <ul>
                                                <li><span>Earnings From Players (SOL)</span> <strong>{freeRolls.totalEarned}</strong></li>
                                                <li><span>Total Referred Rolls</span> <strong>{freeRolls.available}</strong></li>
                                            </ul>
                                                <a href="/free-roll-terminal" className='secondary-btn lg invite-content-btn hover-btn'>
                                                    <span className="btn-text">
                                                        <span>VIEW PAYOUTS</span>
                                                        <span>VIEW PAYOUTS</span>
                                                    </span>
                                                    <span className='btn-shape btn-shape1'></span>
                                                    <span className='btn-shape btn-shape2'></span>
                                                    <span className='btn-shape btn-shape3'></span>
                                                    <span className='btn-shape btn-shape4'></span>
                                                </a>
                                        </div>

                                        <div className="invite-content">
                                            <h3>Competition</h3>
                                            <ul>
                                                <li><span>Your Referrals This Month</span> <strong>{referralCount}</strong></li>
                                                <li><span>Rank</span> <strong>{rankLabel}</strong></li>
                                                <li><span>Current Month</span> <strong>{monthLabel}</strong></li>
                                            </ul>

                                            <a href="/referrer-leaderboard" className='secondary-btn lg invite-content-btn leaderboard hover-btn'>
                                                <span className="btn-text">
                                                    <span>View Leaderboard</span>
                                                    <span>View Leaderboard</span>
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
                    </div>
                </InviteEarnStyle>
                {/* SHARE POPUP */}
                <SharePopup
                    show={showSharePopup}
                    onClose={() => setShowSharePopup(false)}
                    inviteLink={inviteLinkShareable}
                />
            </>
        )
}

export default InviteEarn


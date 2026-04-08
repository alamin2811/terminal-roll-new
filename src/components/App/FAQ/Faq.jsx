import React, { useState } from 'react'
import FaqStyle from './Faq.style'
import faqShape from '../../../assets/images/shape/faq-shape.png'
import plusIcon from '../../../assets/images/icon/plus.png'
import minusIcon from '../../../assets/images/icon/minus.png'

const faqData = [
    {
        question: 'What is Terminal Roll?',
        answer: 'Terminal Roll is a blockchain-based gaming platform built on Solana.'
    },
    {
        question: 'Do I need a wallet to play?',
        answer: 'Yes. You must connect a compatible Solana wallet (such as Phantom or Backpack) to play and approve transactions.'
    },
    {
        question: 'How do the games work?',
        answer: 'Each game follows a fixed set of rules. When you press ROLL, a transaction is sent and the result is resolved according to that game’s logic. Once confirmed on-chain, the result is final.'
    },
    {
        question: 'What is the Terminal Wallet?',
        answer: 'The Terminal Wallet is an in-app escrow used for gameplay. Funds deposited there are used for rolls and may be temporarily locked while a game is in progress.'
    },
    {
        question: 'How does Invite and Earn work?',
        answer: 'Invite a player. You earn 50% of system profit for each winning roll they make. Lifetime. No Limits.'
    }, 
    {
        question: 'Are the games fair?',
        answer: 'Games use deterministic logic and cryptographic mechanisms. Results are not manually altered and follow the rules defined for each game.'
    },      
    {
        question: 'Can transactions be reversed?',
        answer: 'No. Blockchain transactions are final once confirmed. Please review all actions carefully before approving them in your wallet.'
    },
    {
        question: 'Can I lose my funds?',
        answer: 'Like all games involving risk, losses are possible. Always play responsibly. Funds stored in your Terminal Wallet are owned by you and are withdrawable at will.'
    },
    {
        question: 'Are some wallets favoured over others?',
        answer: 'No. Wallet address, balance, past wins, past losses, and session history have zero effect on roll outcomes.'
    },
    {
        question: 'Can the odds change mid-roll?',
        answer: 'No. Wallet address, balance, past wins, past losses, and session history have zero effect on roll outcomes.'
    },
    {
        question: 'Is Terminal Roll “rigged”?',
        answer: 'No. If it were, streaks would not occur in both directions, losses would cluster unnaturally, and variance would be suppressed. What players see is exactly what randomness looks like.'
    },
    {
        question: 'Are roll results stored and auditable?',
        answer: 'Yes. Completed rolls are recorded with timestamps, wager, result, and settlement reference, visible on the Solana Blockchain'
    }, 
    {
        question: 'What happens if there is a technical issue mid-roll?',
        answer: 'If a roll fails validation or settlement, it is marked as failed and does not count as a loss or win.'
    },
    {
        question: 'Can Terminal Roll lose money?',
        answer: 'Yes. Individual rolls can and do result in losses for the house. Over time, the edge exists statistically, not per roll.'
    },
    {
        question: 'Can Terminal Roll freeze or block withdrawals after wins?',
        answer: 'No. Payouts are processed automatically. There is no discretionary blocking of winners. Accounts may only be blocked for cheating.'
    },
    {
        question: 'Why are there minimum and maximum bet limits?',
        answer: 'Limits exist to protect the treasury from volatility and to ensure the game remains solvent for all players.'
    },
    {
        question: 'Can martingale or ladder betting beat Terminal Roll?',
        answer: 'No. Over time, expected value remains the same regardless of betting pattern. Streak strategies do not change odds.'
    },
    {
        question: 'What stops bots from farming wins?',
        answer: 'Rate limits, wallet checks, session locks, and behavioural rules prevent automated abuse. Winning repeatedly does not increase expected value.'
    },
    {
        question: 'Can the same randomness signature be reused?',
        answer: 'No. Each roll uses a unique commitment. Reuse or replay attempts are rejected.'
    },
    {
        question: 'Is on-chain randomness being used?',
        answer: 'The system uses a hybrid approach designed to balance fairness, speed, and cost. Outcomes are protected from replay, manipulation, and timing exploits.'
    },
    {
        question: 'Can someone call the API directly and cheat?',
        answer: 'Calling the API directly does not give any advantage. All validation, limits, and randomness checks occur server-side and cannot be bypassed via custom requests.'
    },
    {
        question: 'Can I exploit free rolls to drain the treasury?',
        answer: 'No. Free rolls are isolated and capped. They do not expose the main treasury to risk.'
    },   
    {
        question: 'Are free rolls different from paid rolls?',
        answer: 'Yes. Free rolls use separate logic and pools. Paid rolls always follow the same fairness rules regardless of wager size.'
    },
    {
        question: 'Why does it feel like there are more wins than losses?',
        answer: 'Human pattern recognition is extremely poor with randomness. Wins are emotionally louder than losses and get noticed more. The underlying odds do not change.'
    },
    {
        question: 'Why do some wallets appear to “win all the time”?',
        answer: 'Short streaks happen naturally in random systems. A wallet winning several times in a row is statistically normal and does not indicate bias or manipulation.'
    }, 
    {
        question: 'Can Terminal Roll see my roll result before it happens?',
        answer: 'No. The result is not known until the roll is executed. Neither the UI nor the server can “peek” outcomes and decide whether to allow or block a roll.'
    },
    {
        question: 'Is Terminal Roll actually fair?',
        answer: 'Yes. Every roll is generated using a verifiable randomness process. Results are not manually set, adjusted per player, or influenced by wallet history, bet size, or previous outcomes.'
    },
    {
        question: 'Is the game logic fully on-chain (rolls, outcomes, payouts), or does any part run off-chain?',
        answer: 'Part on-chain, part off-chain. The main part off-chain is the RNG (the outcome) due to Solana\'s methods being unfair to players. The outcome and payouts are done on-chain and are publicly visible. '
    },
    {
        question: 'How is randomness generated and can players verify fairness themselves?',
        answer: `Random is generated using server-side javascript crypto() function with a 64 character seed. There are two reasons why this isn't done on chain in Solana. 1) Solana's native version is completely unreliable and creates massive streaks in both directions (win & loss) thus isn't fair. 2) The on-chain oracle VRF's are expensive and would cost more to run thus impacting the service delivery. The randomness for each roll is stored on chain as it's sent to the chain as part of the transaction. Thus, the randomness of every transaction AND roll history over time can be verified by users. This has already been tested as users have already queried us, then viewed the on-chain results to prove that we are correct. `
    },
    {
        question: 'Who controls the bankroll / liquidity pool that pays out wins?',
        answer: 'We do. We control the treasury and retain complete control of it. Two sets of keys is held in offline storage to prevent attacker access. Further, we also ensure the treasury is funded, thus retain control.'
    },
    {
        question: 'Is the house edge fixed and publicly visible?',
        answer: `House edge is fixed. It's publicly visible in two places. 1) when the payout is completed, and 2) in the transaction record. Again, historical analysis would show anyone that it's fixed and consistent. `
    },        
    
]

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null)

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <FaqStyle>
            {/* TOP */}
            <div className="faq-top">
                <div className="custom-container">
                    <div className="faq-top-inner">
                        <div className="row align-items-center">
                            <div className="col-md-10">
                                <div className="faq-top-left">
                                    <h2>FAQ</h2>
                                    <p>Frequently Asked Questions</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="faq-top-right">
                                    <img src={faqShape} alt="FAQ Shape" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="custom-container">
                <div className="faq-content">
                    <div className="faq-inner">
                        {faqData.map((item, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            >
                                <div
                                    className={`question ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <div className="q-left">
                                        <span>Q</span>
                                        {item.question}
                                    </div>

                                    <img
                                        src={activeIndex === index ? minusIcon : plusIcon}
                                        alt="icon"
                                        className={`faq-icon ${activeIndex === index ? 'icon-minus' : 'icon-plus'
                                            }`}
                                    />
                                </div>

                                <div className="answer-wrapper">
                                    <div className="answer">
                                        <span>A</span>
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </FaqStyle>
    )
}

export default Faq

import React from 'react'
import { useQuery } from "@tanstack/react-query"
import TransactionStyle from './Transaction.style'
import txShape from '../../../assets/images/shape/tx-shape.png'
import LinkIcon from '../../../assets/images/icon/link.png'
import Pagination from '../../Core/Pagination/Pagination'
import { fetchTransactionsByPlayer } from "../../../services/transactions.api"
import { usePlayer } from "../../../hooks/usePlayer";

/*const transactions = [
    { id: '#TX001', date: '12 DEC, 2025 14:45', type: 'DEPOSIT', amount: '+0.50 SOL', status: 'completed' },
    { id: '#TX002', date: '13 DEC, 2025 09:30', type: 'WITHDRAWAL', amount: '-0.20 SOL', status: 'pending' },
    { id: '#TX003', date: '14 DEC, 2025 16:15', type: 'BITFLIP', amount: '+1.00 SOL', status: 'completed' },
    { id: '#TX004', date: '15 DEC, 2025 11:00', type: 'DEPOSIT', amount: '+0.75 SOL', status: 'completed' },
    { id: '#TX005', date: '16 DEC, 2025 10:30', type: 'WITHDRAWAL', amount: '-0.50 SOL', status: 'failed' },
    { id: '#TX006', date: '17 DEC, 2025 15:45', type: 'BITFLIP', amount: '+2.00 SOL', status: 'completed' },
    { id: '#TX007', date: '18 DEC, 2025 08:00', type: 'DEPOSIT', amount: '+0.80 SOL', status: 'completed' },
    { id: '#TX008', date: '19 DEC, 2025 13:30', type: 'WITHDRAWAL', amount: '-0.30 SOL', status: 'pending' },
    { id: '#TX009', date: '20 DEC, 2025 17:10', type: 'BITFLIP', amount: '+1.50 SOL', status: 'completed' },
    { id: '#TX010', date: '21 DEC, 2025 09:00', type: 'DEPOSIT', amount: '+0.25 SOL', status: 'completed' },
    { id: '#TX011', date: '22 DEC, 2025 12:15', type: 'WITHDRAWAL', amount: '-0.45 SOL', status: 'failed' },
    { id: '#TX012', date: '15 DEC, 2025 11:00', type: 'DEPOSIT', amount: '+0.75 SOL', status: 'completed' },
    { id: '#TX013', date: '16 DEC, 2025 10:30', type: 'WITHDRAWAL', amount: '-0.50 SOL', status: 'failed' },
    { id: '#TX014', date: '17 DEC, 2025 15:45', type: 'BITFLIP', amount: '+2.00 SOL', status: 'completed' },
    { id: '#TX015', date: '18 DEC, 2025 08:00', type: 'DEPOSIT', amount: '+0.80 SOL', status: 'completed' },
]
*/

const Transaction = () => {
    const { data: player } = usePlayer();

    const { data: rows = [] } = useQuery({
        queryKey: ["transactions", player?._id],
        queryFn: () => fetchTransactionsByPlayer(player._id),
        enabled: !!player?._id,
    });

    const shortId = (id) => id ? `${id.slice(0, 3)}…${id.slice(-4)}` : "";

    return (
        <TransactionStyle>

            {/* ================= TOP ================= */}
            <div className="tx-top">
                <div className="custom-container">
                    <div className="tx-top-inner">
                        <div className="row">

                            <div className="col-md-10">
                                <div className="tx-top-left">
                                    <h2>Transaction</h2>
                                    <p>Transaction history and status</p>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="tx-top-right">
                                    <img src={txShape} alt="shape" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="custom-container">
                <div className="tx-content">
                    <div className="table-scrollable">
                        <div className="tx-table">

                            {/* Table Head */}
                            <div className="table-head">
                                <ul>
                                    <li>#</li>
                                    <li>Date</li>
                                    <li>Type</li>
                                    <li>Amount</li>
                                    <li>Status</li>
                                    <li>TX</li>
                                </ul>
                            </div>

                            {/* Table Body */}
                            <div className="table-body">
                                {rows.map((tx, i) => (
                                    <div className="table-row" key={tx._id}>
                                        <ul>
                                            <li>
                                                <span className='completed'>
                                                    {shortId(tx._id)}
                                                </span>
                                            </li>
                                            <li>{new Date(tx.createdAt).toLocaleString()}{/*tx.date*/}</li>
                                            <li>{tx.type.toUpperCase()}{/*tx.type*/}</li>
                                            <li>{tx.amountSol}</li>
                                            <li>
                                                <span className="completed">
                                                    Complete
                                                    {/*tx.status NOTE this should also be the className*/}
                                                </span>
                                            </li>
                                            <li>
                                                <a
                                                    href={`https://explorer.solana.com/tx/${tx.txHash}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <img src={LinkIcon} alt="tx link" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <Pagination />
                </div>
            </div>

        </TransactionStyle>
    )
}

export default Transaction

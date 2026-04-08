//DipositDrawer.jsx
import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Offcanvas } from "bootstrap";
import LinkIcon from "../../../../assets/images/icon/link.png";
import CheckIcon from "../../../../assets/images/icon/check.png";
import MenuClose from "../../../../assets/images/icon/cross.png";
import depositIcon from "../../../../assets/images/icon/deposit.png";
import withdrawIcon from "../../../../assets/images/icon/withdraw.png";
import ReloadIcon from "../../../../assets/images/icon/reload.png";
import plusIcon from "../../../../assets/images/icon/plus.png";
import minusIcon from "../../../../assets/images/icon/minus.png";
import greenShape1 from "../../../../assets/images/bg/shape2.png";
import greenShape2 from "../../../../assets/images/bg/shape4.png";
import disconnectBtn from "../../../../assets/images/icon/disconnect.png";
import DipositDrawerStyle from "./DipositDrawer.style";
import {
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";
import { getSolBalance } from "../../../../lib/solanaConnection";
import { useTerminalWallet } from "../../../../hooks/useTerminalWallet";
import { usePlayer } from "../../../../hooks/usePlayer";
import { useAppPlayer } from "../../../../context/AppPlayerContext";
import { getWalletAddress } from "../../../../lib/solanaProvider";


import { SendTransactionError } from "@solana/web3.js";





const formatAddress = (_fullAddress) => {
  return `${_fullAddress.slice(0, 4)}...${_fullAddress.slice(-3)}`;
};

const DipositDrawer = forwardRef((props, ref) => {
  //const { isConnected } = useAppKitAccount();
  const [address, setAddress] = useState(null);
  //const address = getWalletAddress();
  const { disconnect } = useDisconnect();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  



  const disconnectAction = () => {
    disconnect();
    localStorage.removeItem("sessionToken");
    closeDrawer();
  };

  const { wallet, isLoading, deposit, depositing, refetch, withdraw, withdrawing } = useTerminalWallet();
  const { refreshTerminalWallet } = useAppPlayer();
  const { data: player } = usePlayer();

  const drawerRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const isBusy = depositing || withdrawing;

  const openDrawer = () => {
    const drawer = new Offcanvas(drawerRef.current);
    setAddress(getWalletAddress()); 
    drawer.show();
  };

  const closeDrawer = () => {
    const drawer = Offcanvas.getInstance(drawerRef.current);
    drawer.hide();
  };

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDeposit = async () => {
    const amount = Number(depositAmount);
    if (!amount || amount <= 0) return;

    try {
      const sig = await deposit(amount);
      console.log("Deposit tx:", sig);
      setDepositAmount("");
      refreshTerminalWallet();
      setAddress(getWalletAddress());
    } catch (e) {
      console.error("Deposit failed:", e);
    }
  };

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0) return;

    try {
      const sig = await withdraw(amount);
      console.log("Withdraw tx:", sig);
      setWithdrawAmount("");
      refreshTerminalWallet();
      setAddress(getWalletAddress());
    } catch (e) {
      //console.error("Withdraw failed:", e);
      

        console.error("Withdraw failed");
        console.error("message:", e?.message);
        console.error("logs:", e?.logs);

        try {
          if (e?.getLogs) {
            const logs = await e.getLogs();
            console.error("on-chain logs:", logs);
          }
        } catch (logErr) {
          console.error("log fetch failed:", logErr);
        }




    }
  };




  useImperativeHandle(ref, () => ({
    openDrawer,
  }));

  const [isConnectedOpen, setIsConnectedOpen] = useState(false);
  const [solBalance, setSolBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = async () => {
    setSpinning(true);
    refreshTerminalWallet();
    setAddress(getWalletAddress()); 
    setTimeout(() => setSpinning(false), 2000);
  };

  useEffect(() => {
    const addr = getWalletAddress();
    setAddress(addr);
  }, []);

  useEffect(() => {
    if (!address) {
      setSolBalance(null);
      return;
    }

    let cancelled = false;

    const loadBalance = async () => {
      try {
        setBalanceLoading(true);
        const balance = await getSolBalance(address);
        if (!cancelled) setSolBalance(balance);
      } catch (e) {
        console.error("SOL balance error", e);
        if (!cancelled) setSolBalance(null);
      } finally {
        if (!cancelled) setBalanceLoading(false);
      }
    };

    loadBalance();

    return () => {
      cancelled = true;
    };
  }, [address]);



  

  return (
    <DipositDrawerStyle>
      <div
        ref={drawerRef}
        className="offcanvas offcanvas-end diposit-drawer-bg"
        tabIndex="-1"
        style={{ cursor: isBusy ? "progress" : "default" }}
      >
        <div className="diposit-drawer-inner">
          <div className="drawer-bg-graph" />
          <div className="diposit-drawer-graph" />
          <img
            src={greenShape1}
            alt="bg"
            className="diposit-drawer-shape diposit-drawer-shape1"
          />
          <img
            src={greenShape2}
            alt="bg"
            className="diposit-drawer-shape diposit-drawer-shape2"
          />

          <div className="diposit-drawer-close-btn">
            <button className="secondary-btn lg" onClick={closeDrawer}>
              <img src={MenuClose} alt="icon" />
              <span className="btn-shape btn-shape1"></span>
              <span className="btn-shape btn-shape2"></span>
              <span className="btn-shape btn-shape3"></span>
              <span className="btn-shape btn-shape4"></span>
            </button>
          </div>

          <div className="offcanvas-body diposit-drawer-body">
            <div className="terminal-wallet drawer-content">
              <h2 className="drawer-title">Terminal Wallet</h2>
              <div className="row">
                <div className="col-sm-6">
                  <div className="wallet-values">
                    <h6>Address</h6>
                    <h3>
                      {/*formatAddress(player?.terminalWalletAddress)} {""*/}
                      {player?.terminalWalletAddress ? formatAddress(player.terminalWalletAddress) : "—"}
                      <a href={player?.terminalWalletAddress ?`https://explorer.solana.com/address/${player.terminalWalletAddress}` : "#"} target="_blank">
                        <img
                          src={LinkIcon}
                          alt="icon"
                          className="copy"
                          onClick={handleCopy}
                          style={{ cursor: "pointer" }}
                        />
                      </a>
                    </h3>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="wallet-values">
                    <h6>Balance</h6>
                    <h3>{wallet ? `${wallet.solTotal} SOL` : "—"}</h3>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="wallet-values">
                    <h6>Available</h6>
                    <h3>{wallet ? `${wallet.solAvailable} SOL` : "—"}</h3>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="wallet-values">
                    <h6>In Use</h6>
                    <h3>{wallet ? `${wallet.solInUse} SOL` : "—"}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="actions drawer-content">
              <h2 className="drawer-title">Actions</h2>
              <form action="">
                <label htmlFor="">Deposit SOL</label>
                <div className="deposit">
                  <input type="text" placeholder="0.00" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
                  <button className="primary-btn lg hover-btn" onClick={handleDeposit} disabled={depositing} type="button">
                    <span className="btn-shape btn-shape1"></span>
                    <span className="btn-shape btn-shape2"></span>
                    <span className="btn-shape btn-shape3"></span>
                    <span className="btn-shape btn-shape4"></span>
                    <span className="btn-text">
                      <span>
                        {depositing ? "Depositing..." : "Deposit"} <img src={depositIcon} alt="icon" className={depositing ? "spin" : ""}/>
                      </span>
                      <span>
                        {depositing ? "Depositing..." : "Deposit"} <img src={depositIcon} alt="icon" className={depositing ? "spin" : ""}/>
                      </span>
                    </span>
                  </button>
                </div>

                <label htmlFor="">Withdraw SOL</label>
                <div className="withdrew">
                  <input type="text" placeholder="0.00" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)}/>
                  <button className="primary-btn lg hover-btn" onClick={handleWithdraw} disabled={withdrawing} type="button">
                    <span className="btn-shape btn-shape1">
                      <span className="secont-shape"></span>
                    </span>
                    <span className="btn-shape btn-shape2"></span>
                    <span className="btn-shape btn-shape3"></span>
                    <span className="btn-shape btn-shape4"></span>
                    <span className="btn-text">
                      <span>
                        {withdrawing ? "Withdrawing..." : "Withdraw"}{" "}
                        <img src={withdrawIcon} alt="icon"  className={withdrawing ? "spin" : ""}/>
                      </span>
                      <span>
                        {withdrawing ? "Withdrawing..." : "Withdraw"}{" "}
                        <img src={withdrawIcon} alt="icon" className={withdrawing ? "spin" : ""}/>
                      </span>
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <div className="connected-sol drawer-content">
              <div
                className="connected-sol-top"
                onClick={() => setIsConnectedOpen((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                <h2 className="drawer-title mb-0">Connected SOL Wallet</h2>
                <span>
                  <img
                    src={isConnectedOpen ? minusIcon : plusIcon}
                    alt="icon"
                  />
                </span>
              </div>

              <div
                className={`connected-sol-content ${isConnectedOpen ? "open" : ""
                  }`}
                style={{
                  maxHeight: isConnectedOpen ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s ease",
                  marginTop: isConnectedOpen ? "12px" : "0",
                }}
              >
                <div className="terminal-wallet drawer-content no-border p-0">
                  <h2 className="drawer-title">SOL Wallet</h2>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="wallet-values">
                        <h6>Address</h6>
                        <h3>
                          {address ? formatAddress(address) : "—"}{" "}
                          <a href={`https://explorer.solana.com/address/${address}`} target="_blank">
                            <img
                              src={LinkIcon}
                              alt="icon"
                              className="copy"
                              onClick={handleCopy}
                              style={{ cursor: "pointer" }}
                            />
                          </a>
                        </h3>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="wallet-values">
                        <h6>Balance</h6>
                        <h3>                          
                        {balanceLoading
                          ? "Loading..."
                          : solBalance !== null
                          ? `${solBalance.toFixed(4)} SOL`
                          : "—"}
                          </h3>
                      </div>
                    </div>

                    <div className="col-sm-12">
                      <button
                        className="disconnect-btn"
                        onClick={disconnectAction}
                      >
                        <span>
                          <img src={disconnectBtn} alt="icon" />
                        </span>
                        Disconnect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="state drawer-content">
              <h2 className="drawer-title">State</h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="left">
                    <h6>Last Action</h6>
                    <h4>Completed</h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="right">
                    <p className="uppercase">Refresh Balances</p>
                    <button onClick={handleRefresh}>
                      <img src={ReloadIcon} alt="icon" className={spinning ? "spin" : ""}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="tx-history-btn">
              <a href="/transaction" className='secondary-btn lg tx-button tx-btn hover-btn'>
                <span className="btn-text">
                  <span>Transaction History</span>
                  <span>Transaction History</span>
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
    </DipositDrawerStyle>
  );
});

export default DipositDrawer;

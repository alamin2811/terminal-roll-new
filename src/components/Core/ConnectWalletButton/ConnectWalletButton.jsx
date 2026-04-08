import { useEffect, useState, useRef } from "react";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import ConnectWalletButtonStyleWrapper from "./ConnectWalletButton.style";

import { FiChevronDown } from "react-icons/fi";
import walletIcon from "../../../assets/images/icon/wallet.png";
import DipositDrawer from "./DipositDrawer/DipositDrawer";

const ConnectWalletButton = () => {
  const { open } = useAppKit(); // controls modal

  const { isConnected } = useAppKitAccount();

  const drawerRef = useRef(null);

  return (
    <>
      <ConnectWalletButtonStyleWrapper>
        {/* Connect Wallet Button */}
        {!isConnected && (
          <button
            className="connect-btn primary-btn sm hover-btn"
            onClick={() => open({ view: "Connect" })}
          >
            <span className="btn-text">
              <span><img src={walletIcon} alt="icon" /> Connect</span>
              <span><img src={walletIcon} alt="icon" /> Connect</span>
            </span>
            <span className="btn-shape btn-shape1"></span>
            <span className="btn-shape btn-shape2"></span>
            <span className="btn-shape btn-shape3"></span>
            <span className="btn-shape btn-shape4"></span>
          </button>
        )}

        {/* Account Button */}
        {isConnected && (
          <button
            className="connected-btn primary-btn sm hover-btn"
            // onClick={() => open({ view: "Account" })}
            onClick={() => drawerRef.current.openDrawer()}
          >
            <span className="btn-text">
              <span><img src={walletIcon} alt="icon" />&nbsp;Open Wallet</span>
              <span><img src={walletIcon} alt="icon" />&nbsp;Open Wallet</span>
            </span>
            <span className="btn-shape btn-shape1"></span>
            <span className="btn-shape btn-shape2"></span>
            <span className="btn-shape btn-shape3"></span>
            <span className="btn-shape btn-shape4"></span>
          </button>
        )}
      </ConnectWalletButtonStyleWrapper>
      <DipositDrawer ref={drawerRef} />
    </>
  );
};

export default ConnectWalletButton;

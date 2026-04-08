import React from "react";
import HeaderStyle from "./Header.style";
import logoImg from "../../../assets/images/logo/logo.png";
import MenuDrawer from "./MenuDrawer";
import ConnectPopup from "../ConnectPopup/ConnectPopup";
import ConnectWalletButton from "../ConnectWalletButton/ConnectWalletButton";

const Header = () => {
  return (
    <HeaderStyle>
      <div className="custom-container">
        <div className="header-inner">
          <div className="header-left">
            <a href="/" className="logo">
              <img src={logoImg} alt="logo" />
            </a>
          </div>
          <div className="header-right">
            {/* <ConnectPopup/> */}

            <ConnectWalletButton />

            <MenuDrawer />
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;

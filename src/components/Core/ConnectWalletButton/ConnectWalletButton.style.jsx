import styled from "styled-components";

const ConnectWalletButtonStyleWrapper = styled.div`


/*-- wallet connect modal css start --*/
.open {
  background-color: #171E17;
  backdrop-filter: blur(4px);
}
/*-- wallet connect modal css end --*/


  .connect-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(68, 255, 2, 0.2);
    height: 50px;
    width: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #44ff02;
    font-size: 16px;
  }

  .connected-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.15);
    height: 50px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #ffffff;
    font-size: 16px;

    img {
      filter: brightness(0) invert(1);
    }
  }
  
  @media only screen and (max-width: 575px) {
    .connect-btn{
      height: 45px;
      font-size: 14PX;
    }
    .connected-btn{
      width: 150px;
      height: 45px;
      font-size: 14PX;
    }
  }
`;

export default ConnectWalletButtonStyleWrapper;

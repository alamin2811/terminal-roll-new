import styled from "styled-components";

const PumploopGraphStyle = styled.div`
  position: relative;
  z-index: 11;
  .graph-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .graph-label {
    font-size: 11px;
    color: #819E77;
    font-family: Source Code Pro;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;
  }

  .multiplier {
    font-family: Source Code Pro;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    text-align: right;
    text-transform: uppercase;
    color: #FFE600;
    span{
      font-size: 18px;
      margin-left: 5px;
    }

    &.dumped {
      color: #ff2244;
    }
  }

  .canvas-wrapper {
    position: relative;
    height: 180px;
    background: #FFE6000D;
    border: 1px solid #FFE6001A;
    border-radius: 4px;
    padding: 14px 14px 8px 14px;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .chart-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    font-size: 11px;
    color: #819E77;
    letter-spacing: 1px;
    font-family: Source Code Pro;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;


    .footer-right {
      color: #819E77 !important;
    }
  }
  
  .pump-graph-bottom{
    font-family: Source Code Pro;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    text-transform: uppercase;
    color: #FFE600;
    margin-top: 10px;
    margin-bottom: 0;
  }
`;

export default PumploopGraphStyle;
import styled from "styled-components";

const PumploopGraphStyle = styled.div`
  background: #0a1510;
  border: 1px solid #2a4a3a;
  border-radius: 4px;
  padding: 14px;
  position: relative;
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace;

  .graph-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .graph-label {
    font-size: 11px;
    color: #2a6a4a;
    letter-spacing: 2px;
  }

  .multiplier {
    font-size: 28px;
    letter-spacing: 3px;
    color: #14f195;
    transition: color 0.2s;

    &.dumped {
      color: #ff2244;
    }
  }

  .canvas-wrapper {
    position: relative;
    height: 180px;
    background: #0e1c14;
    border: 1px solid #2a4a3a;
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
    color: #2a6a4a;
    letter-spacing: 1px;

    .footer-right {
      color: #14f195;
    }
  }
`;

export default PumploopGraphStyle;
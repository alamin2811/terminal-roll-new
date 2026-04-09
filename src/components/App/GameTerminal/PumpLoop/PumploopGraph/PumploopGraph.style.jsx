import styled from "styled-components";

const PumploopGraphStyle = styled.div`
  background: #0b1f17;
  border: 1px solid rgba(255, 255, 0, 0.2);
  padding: 20px;
  position: relative;
  overflow: hidden;

  .graph-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: #9aa;
    font-size: 12px;
    letter-spacing: 2px;
  }

  .multiplier {
    color: #ffe600;
    font-size: 28px;
    font-weight: bold;
  }

  .canvas-wrapper {
    position: relative;
    height: 220px;
  }

  canvas {
    width: 100%;
    height: 100%;
  }

  .y-labels {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;
    color: #7a8;
  }

  .bottom-info {
    margin-top: 10px;
    color: #9aa;
    font-size: 12px;
  }

  .payout {
    color: #ffe600;
    font-weight: bold;
    margin-top: 5px;
  }
`;

export default PumploopGraphStyle;
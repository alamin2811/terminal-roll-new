import styled from "styled-components";

const TerminalStyle = styled.div`
  width: 100%;
  color: #44ff02;
  font-family: "Source Code Pro", monospace;
  position: relative;
  .terminal-inner {
    height: calc(100vh - 295px);
    overflow: hidden;
    width: 100%;
    
  }

  .terminal-body {
    height: calc(100% - 20px);
    overflow-y: auto;
    padding: 16px 20px 0px 20px;
    overflow-x: hidden;
    padding-bottom: 7vh;
    margin: 0px -10px 0px -20px;
  }

  .terminal-line {
    display: flex;
    align-items: flex-start;
    font-size: 16px;
    line-height: 1.7;
    width: 100%;
    color: #44FF0266;
    span{
      &:nth-child(1){
          color: #44FF02;
      }
    }
    &:nth-last-child(1){
        color: #44FF02;
    }
  }

  .prompt {
    margin-right: 8px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .input-wrapper {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }

  .terminal-input {
    background: transparent;
    border: none;
    outline: none;
    color: #44ff02;
    font-size: 16px;
    font-family: inherit;
    /* caret-color: transparent; */
    width: 100%;
    
  }

  /* .cursor {
    width: 8px;
    height: 16px;
    background: #44ff02;
    margin-left: 2px;
    animation: blink 1s steps(1) infinite;
  } */

  .terminal-overlay {
    position: absolute;
    top: 0;
    left: -20px;
    right: auto;
    width: calc(100% + 20px);
    height: 60px;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(9, 16, 9, 1),
      rgba(9, 16, 9, 0)
    );
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  @media (max-width: 1024px) {
    .terminal-overlay {
        left: -15px;
        width: calc(100% + 15px);
      }
    }
  @media (max-width: 768px) {
    .terminal-line {
      font-size: 14px;
    }
    .terminal-body {
        padding-bottom: 4vh;
    }
  }
`;

export default TerminalStyle;

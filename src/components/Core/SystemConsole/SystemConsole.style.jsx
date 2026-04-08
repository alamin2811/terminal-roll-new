import styled from "styled-components";

const SystemConsoleStyle = styled.div`
  height: 100%;          
  overflow: hidden;


  .free-roll-terminal-bottom {
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 111;

  }

  .free-roll-terminal-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .terminal-inner {
    height: 100%;
    overflow-y: auto;
  }

  /* Mobile: allow it to expand naturally */
  @media (max-width: 767px) {
    .free-roll-terminal-bottom {
      height: auto;
    }

    .terminal-inner {
      max-height: 60vh;
    }
  }
`;

export default SystemConsoleStyle;

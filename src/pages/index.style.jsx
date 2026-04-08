import styled from "styled-components";

const IndexStyle = styled.div`
  .home-hero {
    position: relative;
    height: calc(100vh - 83px);
    overflow: hidden;
  }

  .hero-console {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 140px;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
  }

  .hero-actions {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-console .terminal-inner {
    height: 100%;
    overflow-y: auto;
  }

`;

export default IndexStyle;


import React, { useEffect, useRef, useState } from "react";
import PumploopGraphStyle from "./PumploopGraph.style";

const PumploopGraph = () => {
  const pathRef = useRef(null);
  const [multiplier, setMultiplier] = useState(1.0);

  useEffect(() => {
    const path = pathRef.current;
    const length = path.getTotalLength();

    // hide line initially
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    let start = null;
    const duration = 4000; // animation duration

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      const percent = Math.min(progress / duration, 1);

      // draw line
      path.style.strokeDashoffset = length * (1 - percent);

      // multiplier growth (sync with progress)
      const value = (1 + percent * 13).toFixed(2);
      setMultiplier(value);

      if (percent < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <PumploopGraphStyle>
      <div className="graph-header">
        <span>MULTIPLIER</span>
        <span className="multiplier">{multiplier}x</span>
      </div>

      <div className="canvas-wrapper">
        <div className="y-labels">
          <span>15x</span>
          <span>10x</span>
          <span>5x</span>
          <span>1x</span>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 79"
          preserveAspectRatio="none"
        >
          {/* Glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            ref={pathRef}
            d="M1.50975 77.6709C1.2126 76.6528 7.74999 77.1618 9.23576 76.9073C11.613 76.6527 12.5045 76.2709 14.8817 76.2709C16.9618 76.2709 19.0419 76.2709 21.1219 76.2709C23.202 76.2709 23.202 75.7618 24.9849 75.38C26.1736 75.1255 28.2536 74.9982 29.4422 74.8709C33.8996 74.4891 38.654 74.6164 43.1113 74.6164C44.3 74.6164 45.7857 74.7437 46.9743 74.6164C48.7573 74.3618 49.9459 73.7255 51.4317 73.3437C54.9975 72.4528 58.8605 72.7073 62.7235 72.7073C68.0723 72.7073 74.6097 72.1982 79.3642 71.4346C82.3357 70.9255 86.1987 70.1618 89.1702 70.1618C92.1418 70.1618 94.8162 69.9073 97.4906 69.5255C100.462 69.2709 104.325 69.3982 107.594 69.3982C115.617 69.3982 125.423 70.1618 132.258 68.38C136.418 67.3618 140.875 68.7618 145.035 68.7618C148.007 68.7618 150.978 68.7618 154.247 68.7618C157.516 68.7618 160.784 68.8891 162.567 67.4891C163.459 66.7255 164.647 66.2164 165.539 65.58C165.836 65.4528 166.133 64.9437 166.43 64.8164C167.025 64.5618 167.916 64.4346 168.51 64.3073C169.996 63.9255 169.699 63.6709 171.482 63.5437..."
            stroke="#FFE600"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
          />
        </svg>
      </div>

      <div className="bottom-info">
        <div>LAUNCH</div>
        <div className="payout">
          &gt; PAYOUT NOW: 0.3247 SOL ({multiplier}x)
        </div>
      </div>
    </PumploopGraphStyle>
  );
};

export default PumploopGraph;
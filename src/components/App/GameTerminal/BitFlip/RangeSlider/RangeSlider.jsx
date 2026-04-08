//src/components/App/GameTermainal/RangeSlider/RangeSlider.jsx
import { useRef } from "react";
import RangeSliderStyle from "./RangeSlider.style";

const RangeSlider = ({ value, onChange }) => {
    const min = 0.005;
    const minRange = 0.05;
    const max = 0.1;
    const step = 0.001;

    const trackRef = useRef(null);

    const percent = ((value - min) / (max - min)) * 100;

    /* ---------- DRAG HANDLER ---------- */
    const updateValueFromPosition = (clientX) => {
        const track = trackRef.current;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        let newPercent = ((clientX - rect.left) / rect.width) * 100;

        newPercent = Math.max(0, Math.min(100, newPercent));

        const newValue =
            min + (newPercent / 100) * (max - min);

        onChange(Number(newValue.toFixed(3)));
    };

    const startDrag = (e) => {
        e.preventDefault();

        const move = (ev) => {
            updateValueFromPosition(ev.clientX || ev.touches[0].clientX);
        };

        const stop = () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", stop);
            window.removeEventListener("touchmove", move);
            window.removeEventListener("touchend", stop);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", stop);
        window.addEventListener("touchmove", move);
        window.addEventListener("touchend", stop);
    };

    return (
        <RangeSliderStyle>
            <div className="neon-range-wrapper">

                <div className="range-track" ref={trackRef}>
                    <div
                        className="range-fill"
                        style={{ width: `${percent}%` }}
                    />

                    <span className="range-shape range-shape1"></span>
                    <span className="range-shape range-shape2"></span>
                    <span className="range-shape range-shape3"></span>
                    <span className="range-shape range-shape4"></span>
                </div>

                {/* Native input still works */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="range-input"
                />

                {/* DRAGGABLE BUBBLE */}
                <div
                    className={`range-bubble ${value <= minRange ? "is-min" : ""}`}
                    style={{ left: `calc(${percent}% - 22px)` }}
                    onMouseDown={startDrag}
                    onTouchStart={startDrag}
                >
                    <span className="range-value">{value.toFixed(3)}</span>

                    {/* <div className="bubble-arrows">
                        {percent > 0 && (
                            <span className="left-arrow">←</span>
                        )}
                        {percent < 100 && (
                            <span className="right-arrow">→</span>
                        )}
                    </div> */}
                </div>

                {/* Labels */}
                <div className="range-labels">
                    <span>{min} SOL</span>
                    <span>{max} SOL</span>
                </div>

            </div>
        </RangeSliderStyle>
    );
};

export default RangeSlider;



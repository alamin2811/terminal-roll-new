import styled from "styled-components";
import RangeShape from '../../../../../assets/images/shape/range-shape.png'


const RangeSliderStyle = styled.div`
    width: 100%;
    padding-right: 20px;
    .neon-range-wrapper {
      position: relative;
      width: 100%;
      margin: 10px auto;
      font-family: monospace;
    }

    /* Track background */
    .range-track {
      height: 15px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      /* overflow: hidden; */
      position: relative;
      .range-shape{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0E150E;
            height: 3px;
            width: 3px;
        }
        .range-shape1{
            left: 0;
            top: 0;
        }
        .range-shape2{
            right: 0;
            top: 0;
        }
        .range-shape3{
            left: 0;
            bottom: 0;
        }
        .range-shape4{
            right: 0;
            bottom: 0;
        }
      
    }
    
    /* Green fill */
    .range-fill {
      height: 100%;
      background: #44FF02;
    }
    
    /* Native range input (invisible) */
    .range-input {
      position: absolute;
      top: 0;
      width: 100%;
      height: 12px;
      opacity: 0;
      cursor: e-resize;
    }
    
    /* Bubble */
    .range-bubble {
      position: absolute;
      top: -8px;
      color: #000;
      padding: 3px 8px;
      border-radius: 12px;
      white-space: nowrap;
      transform: translateX(-50%);
      cursor: e-resize;
      &.is-min {
        transform: translateX(10px);
      }
      .range-value{
        background: url(${RangeShape});
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1px 6px;
        border-radius: 10px;
        height: 25px;
        font-size: 15px;
        font-family: 'Source Code Pro;', sans-serif;
        font-weight: 600;
        margin-right: 0px;
      }
    }
    
    /* Arrows under value */
    /* .bubble-arrows {
      display: flex;
      justify-content: center;
      gap: 0px;
      font-size: 22px;
      margin-top: -2px;
      margin-right: -45px;
      .left-arrow{
        padding-right: 10px;
      }
      .right-arrow{
        color: #FFF;
        
      }
    } */
    
    /* Labels */
    .range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      margin-top: 8px;
      font-weight: 600;
      color: #819E77;
      font-family: 'Source Code Pro;', sans-serif;
    }

    

    
    @media only screen and (max-width: 768px) {
        padding-right: 15px;
        .range-bubble {
            .range-value{
                font-size: 15px;
            }
        }
        .range-labels{
            font-size: 15px;
            margin-top: 3px;
        }
    }
    
`;
export default RangeSliderStyle;



import styled from "styled-components";


const SelectGameStyle = styled.div`
    .select-game-auto-slider{
        border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
        overflow: hidden;
        height: 40px;
        margin: 0px -20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        ul{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            list-style: none;
            gap: 20px;
            padding: 0;
            margin: 0;
            animation: smoothSlider 15s infinite linear;
            li{
                min-width: max-content;
                font-family: Source Code Pro;
                font-weight: 500;
                font-size: 16px;
                line-height: 150%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 20px;
                color: #819E77;
            }
        }
        
    }
    .select-game-inner{
        padding-top: 25px;
        margin-bottom: -30px;
        h5{
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 20px;
            line-height: 130%;
            text-align: center;
            color: #44FF02;
            margin-bottom: 10px;
        }
        h2{
            font-family: 'screwtop-regular';
            font-weight: 400;
            font-size: 36px;
            line-height: 100%;
            text-align: center;
            color: #44FF02;
            position: relative;
            max-width: max-content;
            margin: auto;
            margin-bottom: 25px;
            &::after{
                content: '';
                height: 25px;
                width: 10px;
                background: #44FF02;
                position: absolute;
                right: -25px;
                bottom: 4px;
                animation: blink 1.5s infinite;
            }
        }
    }
    
    .select-game{
        &-content{
            max-width: 970px;
            margin: auto;
            padding-bottom: 10px;
        }
        &-card{
            padding: 23px 30px;
            position: relative;
            background: #121C12;
            margin-bottom: 20px;
            &::after{
                content: '';
                position: absolute;
                height: 5px;
                width: 5px;
                background: #091009;
                bottom: -1px;
                right: -1px;
            }
            &::before{
                content: '';
                position: absolute;
                height: 5px;
                width: 5px;
                background: #091009;
                bottom: -1px;
                left: -1px;
            }
            h3{
                font-family: 'screwtop-regular';
                font-weight: 400;
                font-size: 26px;
                line-height: 100%;
                margin-bottom: 0;
            }
            .card-top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                margin-bottom: 10px;
                span{
                    font-family: Source Code Pro;
                    font-weight: 500;
                    font-size: 13px;
                    line-height: 120%;
                    text-align: right;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 21px;
                    width: auto;
                    padding: 6px 8px 3px 8px;
                    color: #000000;
                }
            }
            p{
                font-family: Source Code Pro;
                font-weight: 500;
                font-size: 16px;
                line-height: 150%;
                color: #819E77;
                font-family: Source Code Pro;
                font-weight: 500;
                font-size: 16px;
                line-height: 150%;
                margin-bottom: 15px;

            }
            .potential{
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                gap: 20px;
                .left{
                    h6{
                        font-family: Source Code Pro;
                        font-weight: 500;
                        font-size: 13px;
                        color: #819E77;
                    }
                    h4{
                        font-family: 'screwtop-regular';
                        font-weight: 400;
                        font-size: 22px;
                        line-height: 154.54%;
                        color: #44FF02;
                    }
                }
                .right{
                    position: relative;
                    max-width: max-content;
                    padding-bottom: 10px;
                    &::after{
                        content: '';
                        height: 8px;
                        width: 8px;
                        border-radius: 50%;
                        position: absolute;
                        left: -15px;
                        top: 12px;
                        animation: blink 1.5S infinite;
                    }
                    span{
                        font-family: Source Code Pro;
                        font-weight: 500;
                        font-size: 13px;
                        text-align: right;
                        color: #819E77;
                    }

                }
            }
            
            .game-btn{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 50px;
                text-decoration: none;
                position: relative;
                padding: 12px 30px;
                font-family: 'screwtop-regular';
                font-weight: 400;
                font-size: 18px;
                margin-top: 10px;
                .btn-shape{
                    position: absolute;
                    height: 4px;
                    width: 4px;
                    position: absolute;
                    background: #121C12;
                    &1{
                        top: -1px;
                        left: -1px;
                        border-right: 1px solid;
                        border-bottom: 1px solid;
                    }
                    &2{
                        top: -1px;
                        right: -1px;
                        border-left: 1px solid;
                        border-bottom: 1px solid;
                    }
                    &3{
                        bottom: -1px;
                        left: -1px;
                        border-right: 1px solid;
                        border-top: 1px solid;
                    }
                    &4{
                        bottom: -1px;
                        right: -1px;
                        border-left: 1px solid;
                        border-top: 1px solid;
                    }
                }
            }
            &.bitflip{
                border: 1px solid #44FF0233;
                border-top: 2px solid #44FF02;
                h3{
                    color: #44FF02;
                }
                .card-top{
                    span{
                        background: #44FF02;
                    }
                }
                &::after{
                    border-top: 1px solid #44FF0233;
                    border-left: 1px solid #44FF0233;
                }
                &::before{
                    border-top: 1px solid #44FF0233;
                    border-right: 1px solid #44FF0233;
                }
                .potential{
                    .left{
                        h4{
                            color: #00FFAA;
                        }
                    }
                    .right{
                        &::after{
                            background: #00FFAA;
                            animation-delay: 1s;
                        }
                    }
                }
                .game-btn{
                    background: #44FF020D;
                    border: 1px solid #44FF02;
                    color: #44FF02;
                    .btn-shape{
                        border-color: #44FF02;
                    }
                }
            }
            &.cachehunt{
                border: 1px solid #00FFAA0D;
                border-top: 2px solid #00FFAA;
                h3{
                   color: #00FFAA; 
                }
                .card-top{
                    span{
                        background: #00FFAA;
                    }
                }
                &::after{
                    border-top: 1px solid #00FFAA0D;
                    border-left: 1px solid #00FFAA0D;
                }
                &::before{
                    border-top: 1px solid #00FFAA0D;
                    border-right: 1px solid #00FFAA0D;
                }
                .potential{
                    .left{
                        h4{
                            color: #00FFAA;
                        }
                    }
                    .right{
                        &::after{
                            background: #00FFAA;
                            animation-delay: 1.5s;
                        }
                    }
                }
                .game-btn{
                    background: #00FFAA0D;
                    border: 1px solid #00FFAA;
                    color: #00FFAA;
                    .btn-shape{
                        border-color: #00FFAA;
                    }
                }
            }
            &.pumploop{
                border: 1px solid #FFE60033;
                border-top: 2px solid #FFE600;
                h3{
                   color: #FFE600; 
                }
                .card-top{
                    span{
                        background: #FFE600;
                    }
                }
                &::after{
                    border-top: 1px solid #FFE60033;
                    border-left: 1px solid #FFE60033;
                }
                &::before{
                    border-top: 1px solid #FFE60033;
                    border-right: 1px solid #FFE60033;
                }
                .potential{
                    .left{
                        h4{
                            color: #FFE600;
                            
                        }
                    }
                    .right{
                        &::after{
                            background: #FFE600;
                            animation-delay: 2s;
                        }
                    }
                }
                .game-btn{
                    background: #F5DD000D;
                    border: 1px solid #FFE600;
                    color: #FFE600;
                    .btn-shape{
                        border-color: #FFE600;
                    }
                }
            }
            &.beatbomb{
                border: 1px solid #FF22444D;
                border-top: 2px solid #FF2244;
                h3{
                   color: #FF2244; 
                }
                .card-top{
                    span{
                        background: #FF2244;
                    }
                }
                &::after{
                    border-top: 1px solid #FF22444D;
                    border-left: 1px solid #FF22444D;
                }
                &::before{
                    border-top: 1px solid #FF22444D;
                    border-right: 1px solid #FF22444D;
                }
                .potential{
                    .left{
                        h4{
                            color: #FF2244;
                        }
                    }
                    .right{
                        &::after{
                            background: #FF2244;
                            animation-delay: 2.5s;
                        }
                    }
                }
                .game-btn{
                    background: #FF22440D;
                    border: 1px solid #FF2244;
                    color: #FF2244;
                    .btn-shape{
                        border-color: #FF2244;
                    }
                }
            }
        }
    }
    
    .select-game-bottom{
        border-top: 1px dashed rgba(255, 255, 255, 0.20);
        margin: 0px -20px;
        padding: 8px 30px;       
        
        h6{
            color: #819E77;
            text-align: center;
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 16px;
            line-height: 170%;
            text-align: center;
            margin-bottom: 0;

            span{
                color: #44FF02;
            }
        }
    }
    
    
    
    @media only screen and (max-width: 1550px) {
        .select-game-auto-slider{
            height: 36px;
        }
    }
    @media only screen and (max-width: 1300px) {
        .select-game{
            &-content{
                padding-bottom: 10px;
            }
            &-bottom{
                padding: 10px 30px;
            }
        }
    }
    @media only screen and (max-width: 1200px) {
        .select-game-auto-slider{
            height: 29px;
            gap: 12px;
            ul{
            gap: 12px;
                li{
                    gap: 15px;
                    font-size: 14px;
                }
            }
        }
        .select-game{
            &-bottom{
                padding: 6px 30px;
            }
        }
    }
    @media only screen and (max-width: 1100px) {
        .select-game{
            &-inner{
                padding-top: 30px;
                h2{
                    margin-bottom: 30px;
                }
            }
            &-content{
                padding-bottom: 10px;
            }
            &-card{
                p{
                    max-width: 360px;
                }
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        .select-game{
            &-auto-slider{
                margin: 0px -15px;
                height: 32px;
            }
            &-inner{    
                h5{
                    font-size: 18px;
                }
                h2{
                    font-size: 28px;
                    &::after{
                        bottom: 2.5px;
                        width: 9px;
                        right: -22px;
                        height: 22px;
                    }
                }
            }
            &-card{
                p{
                    max-width: 320px;
                }
            }
            &-bottom{
                margin: 0px -15px;
            }
        }
    }
    @media only screen and (max-width: 768px) {
        .select-game{
            &-card{
                p{
                    max-width: 100%;
                }
            }
            &-bottom{
                padding: 12px 20px;
            }
        }
    }
    @media only screen and (max-width: 575px) {
        .select-game{
            &-card{
                padding: 24px 20px 20px;
                h3{
                    font-size: 24px;
                }
                .potential {
                    .left {
                        h4{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 375px) {
        .select-game{
            &-inner{
                h5{
                    font-size: 16px;
                }
                h2{
                    font-size: 24px;
                    &::after{
                        bottom: 1px;
                        width: 7px;
                        right: -18px;
                        height: 18px;
                    }
                }
            }
        }
    }
    
`;
export default SelectGameStyle;

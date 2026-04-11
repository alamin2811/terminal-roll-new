import styled from "styled-components";

const BitFlipInfoStyle = styled.div`
    .modal-backdrop.show{
        z-index: 111;
    }
    .modal{
        backdrop-filter: blur(6px);
        z-index: 99999;
    }
    .modal-close-btn{
        position: absolute;
        top: -50px;
        right: 0px;
        z-index: 11;
        button{
            height: 50px;
            width: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            background: rgba(255, 255, 255,0.15);
            border: none;
            outline: none;
        }
    }
    &.bit-flip-info-popup{
        .modal.fade{
            background: rgba(0,0,0,0.4);
            opacity: 1 !important;
            backdrop-filter: blur(6px);
        }
        
        .bit-info-modal-content{
            background: #171E17;
            position: relative;
            border-radius: 0;
            border: none;
            padding: 0;
            max-width: 470px;
            margin: auto;
            
            .modal-body{
                position: relative;
                overflow: hidden;
                padding: 30px 35px 5px 35px;
                 &::after{
                    content: '';
                    height: 100px;
                    width: 100px;
                    margin: auto;
                    background: rgba(68, 255, 2, 0.4);
                    filter: blur(100px);
                    position: absolute;
                    left: 40%;
                    top: -50px;
                    z-index: 1;
                }
                .modal-shape{
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #080B08;
                    height: 4px;
                    width: 4px;
                }
                .modal-shape1{
                    left: 0;
                    top: 0;
                }
                .modal-shape2{
                    right: 0;
                    top: 0;
                }
                .modal-shape3{
                    left: 0;
                    bottom: 0;
                }
                .modal-shape4{
                    right: 0;
                    bottom: 0;
                }
            }
            h2{
                font-size: 26px;
                color: #44FF02;
                margin-bottom: 15px;
            }
            h3{
                font-size: 20px;
                color: #44FF02;
                margin-bottom: 15px;
            }
            p{
                font-size: 15px;
                color: #819E77;
                margin-bottom: 20px;
                line-height: 25px;
            }
            ul{
                list-style: none;
                padding: 0;
                margin: 0;
                margin-bottom: 20px;
                li{
                    font-size: 15px;
                    color: #819E77;
                    margin-bottom: 5px;
                    position: relative;
                    padding-left: 20px;
                    line-height: 25px;
                    font-family: "Source Code Pro", monospace;
                    &::after{
                        content: '';
                        position: absolute;
                        height: 8px;
                        width: 8px;
                        left: 0px;
                        top: 11px;
                        background: #44FF02;
                    }
                }
            }
        }
        
    }
    @media only screen and (max-width: 620px) {
        .modal-close-btn{
            position: absolute;
            top: 5px;
            right: 55px;
        }
    }
    
`;
export default BitFlipInfoStyle;
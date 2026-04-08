//DipositDrawer.style.jsx
import styled from "styled-components";


const DipositDrawerStyle = styled.div`
    .offcanvas.offcanvas-end{
        z-index: 99999999999;
    }
    .offcanvas-backdrop.show{
        z-index: 1111111111;
    }

    .spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .drawer-bg-graph{
        position: absolute;
        left: 0;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 1;
        background-image:
        /* dots */
        radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),

        /* vertical dotted lines */
        repeating-linear-gradient(90deg,
            rgba(0, 0, 0, 0.05) 0 2px,
            transparent 2px 8px),

        /* horizontal dotted lines */
        repeating-linear-gradient(rgba(255, 255, 255, 0.04) 0 2px,
            transparent 2px 8px);

        background-size:
            0px 0px,
            4px 4px,
            4px 4px;
            
            z-index: 1;
        }
    .diposit-drawer-bg{
        background: #101710;
        z-index: 99999999;
        max-width: 570px;
        width: 100%;
        
        .diposit-drawer-inner{
            position: relative;
            height: 100vh;
        }
        .diposit-drawer-close-btn{
            position: absolute;
            left: -65px;
            top: 15px;
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
        .diposit-drawer-shape{
            position: absolute;
            z-index: 0;
        }
        .diposit-drawer-shape1{
            top: 0;
            right: 0;
        }
        .diposit-drawer-shape2{
            bottom: 0;
            right: 0;
        }
        .diposit-drawer-bg-graph{
            position: absolute;
            left: 0;
            top: 0;
            height: 100vh;
            width: 100%;
            z-index: 1;
            background-image:
            /* dots */
            radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),

            /* vertical dotted lines */
            repeating-linear-gradient(90deg,
                rgba(0, 0, 0, 0.05) 0 2px,
                transparent 2px 8px),

            /* horizontal dotted lines */
            repeating-linear-gradient(rgba(255, 255, 255, 0.04) 0 2px,
                transparent 2px 8px);

            background-size:
                0px 0px,
                4px 4px,
                4px 4px;
                
                z-index: 1;
            }
            
        
    }
    .diposit-drawer-body{
        position: relative;
        z-index: 2;
        height: 100%;
        padding: 0;
        padding-bottom: 20px;
        .drawer-title{
            font-size: 26px;
            color: #FFF;
            margin-bottom: 20px;
        }
        .terminal-wallet{
            border-bottom: 1px dashed rgba(255, 255, 255,0.2);
            .wallet-values{
            margin-bottom: 25px;
                h6{
                    text-transform: uppercase;
                    font-family: "Source Code Pro", monospace;
                    font-size: 17px;
                    margin-bottom: 10px;
                    color: rgba(255, 255, 255, 0.9);
                }
                h3{
                    margin-bottom: 0px;
                    font-size: 22px;
                    color: white;
                    img{
                        cursor: pointer;
                    }
                }
            }            
        }
        .actions{
            border-bottom: 1px dashed rgba(255, 255, 255,0.2); 
            form{
                padding-bottom: 5px;
                label{
                    text-transform: uppercase;
                    font-family: "Source Code Pro", monospace;
                    font-size: 17px;
                    margin-bottom: 5px;
                    color: rgba(255, 255, 255, 0.9);
                }
                .deposit{
                    margin-bottom: 20px;   
                }
                .deposit,
                .withdrew{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                    input{
                        height: 50px;
                        border: 2px dotted rgba(255, 255, 255, 0.5) ;
                        font-size: 18px;
                        color: #FFF;
                        max-width: 360px;
                        width: 100%;
                        background: transparent;
                        outline: none;
                        padding: 5px 15px;
                    }
                    button{
                        width: 140px;
                        min-width: 140px;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    }
                }
            }
        }
        .connected-sol{
            border-bottom: 1px dashed rgba(255, 255, 255,0.2);
            &-top{
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    cursor: pointer;
                }
            }
            &-content{
                color: white;
                &.open{
                    padding-top: 25px;
                }
            }
        }
        .state{
            .left{
                h6{
                    text-transform: uppercase;
                    font-family: "Source Code Pro", monospace;
                    font-size: 17px;
                    margin-bottom: 10px;
                    color: rgba(255, 255, 255, 0.9);
                }
                h4{
                    margin-bottom: 0px;
                    font-size: 22px;
                    color: #44FF02;
                    
                }
            }
            .right{
                display: flex;
                align-items: center;
                justify-content: space-between;
                p{
                    font-size: 17px;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 0;
                }
                button{
                    border: none;
                    outline: none;
                    background: none;
                }
            }
        }
        .drawer-content{
            padding: 30px;
            .disconnect-btn{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 15px;
                background: transparent;
                border: none;
                outline: none;
                color: #FFF;
                font-family: "Source Code Pro", monospace; 
                text-transform: uppercase;
                font-size: 17px;
            }
            &.terminal-wallet{
                padding-bottom: 5px;
            }
            
        }
        
    }
    
    .tx-history-btn{
        padding: 0px 20px 0px 20px;
    }
    .tx-button{
        width: 100%;
        height: 50px;
        font-size: 16px;
    }
    
    @media only screen and (max-width: 1550px) {
        .diposit-drawer-body {
            .drawer-content{
                padding: 20px;
            }
            .drawer-title{
                font-size: 22px;
                margin-bottom: 12px;
            }
            .terminal-wallet {
                .wallet-values {
                    h3{
                        font-size: 18px;
                    }
                }
            }
            .state {
                .left {
                    h4{
                        font-size: 18px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 1200px) {
        .diposit-drawer-body {
            .drawer-title{
                font-size: 20px;
                margin-bottom: 10px;
            }
            .terminal-wallet {
                .wallet-values {
                    h3{
                        font-size: 16px;
                    }
                }
            }
            .state {
                .left {
                    h4{
                        font-size: 16px;
                    }
                }
            }
        }
        .tx-button{
            font-size: 15px;
        }
    }
    @media only screen and (max-width: 768px) {
        .diposit-drawer-bg{
            max-width: 400px;
        }
        .tx-button{
            font-size: 14px;
        }
    }
    @media only screen and (max-width: 480px) {
        .diposit-drawer-bg {
            .diposit-drawer-close-btn {
                position: absolute;
                left: 83%;
                top: 15px;
                z-index: 999;
            }
        }
    }
    
`;
export default DipositDrawerStyle;
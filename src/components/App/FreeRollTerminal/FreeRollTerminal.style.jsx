import styled from "styled-components";


const FreeRollTerminalStyle = styled.div`
    .free-roll-terminal-top{
        border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
        width: 100%;
        position: relative;
        z-index: 1111;
    }
    .free-roll-terminal-inner{
        padding: 19px 0px;
    }
    .free-roll-terminal-left{
        h2{
            font-size: 36px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 18px;
            span{
                
            }
        }
        p{
            font-size: 18px;
            margin-bottom: 0;
        }
    }
    .free-roll-terminal-right{
        text-align: right;
        .balance{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 15px;
            margin-bottom: 15px;
            h3{
                font-size: 30px;
                margin-bottom: 0;
            }
            button{
                height: 34px;
                width: 90px;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 90%;
                transition: 0.3s;
                .btn-text{
                    justify-content: flex-start;
                    span{
                        margin-top: 8px;
                        margin-bottom: 7px;
                    }
                }
                &:hover{
                    color: #000;
                    background: #44FF02;
                }
            }
        }
        p{
            font-size: 18px;
            margin-bottom: 0;
        }
    }
    .free-roll-terminal-bottom{
        height: calc(100vh - 204px);
        position: relative;
        z-index: 111;
        .custom-container{
            height: 100%;
        }
    }
    .free-roll-terminal-content{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        padding-bottom: 20px;
        margin-right: -32px;
        padding-right: 12px;
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
            margin-top: 24px;
            li{
                margin-bottom: 2px; 
                a{
                    color: #44FF02;
                    font-size: 17px;
                    font-family: "Source Code Pro", monospace;
                    text-decoration: none;
                }
                
            }
        }
        .terminal-btn{
            width: 100%;
            padding-right: 20px;
        }
        
        button{
            height: 70px;
            width: 100%;
            font-size: 24px;
            img{
                margin-right: 18px;
            }
        }
    }
    
    
    @media only screen and (max-width: 1550px) {
        .free-roll-terminal-inner{
            padding: 14px 0px 10px 0px;
        }
        .free-roll-terminal-bottom{
            height: calc(100vh - 182px);
            overflow: hidden;
        }
        .free-roll-terminal-content {
            .terminal-inner {
                height: calc(100vh - 260px);
            }
            ul{
                margin-top: 16px;
                li{
                margin-bottom: 2px;
                    a{
                        font-size: 16px;
                    }
                }
            }
            button{
                height: 60px;
                font-size: 20px;
            }
        }
        .free-roll-terminal-left{
            button{
                img{
                    max-width: 32px;
                }
            }
        }
        .free-roll-terminal-left,
        .free-roll-terminal-right{
            h2{
                margin-bottom: 10px;
            }
            .balance {
                margin-bottom: 15px;
                h3{
                    font-size: 26px;
                }
            }
            p{
                font-size: 16px;
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        .free-roll-terminal-inner{
            padding: 18px 0px 12px 0px;
        }
        .free-roll-terminal-left{
            button{
                img{
                    max-width: 28px;
                }
            }
        }
        .free-roll-terminal-left,
        .free-roll-terminal-right{
            h2{
                font-size: 24px;
                margin-bottom: 18px;
            }
            .balance {
                margin-bottom: 15px;
                h3{
                    font-size: 24px;
                }
            }
            p{
                font-size: 15px;
            }
        }
        .free-roll-terminal-bottom{
            height: calc(100vh - 183px);
        }
        .free-roll-terminal-content {
            margin-right: -27px;
            ul{
                li{
                    a{
                        font-size: 15px;
                    }
                }
            }
            .terminal-btn{
                padding-right: 15px;
            }
            button {
                height: 58px;
                width: 100%;
                font-size: 20px;
            }
        }
    }
    
    @media only screen and (max-width: 767px) {
        .free-roll-terminal-content {
            .terminal-inner {
                height: calc(100vh - 345px);
            }
        }
        .free-roll-terminal-right{
            margin-top: 20px;
            .balance {
                flex-direction: row-reverse;
            }
            p{
                text-align: left;
            }
        }
        .free-roll-terminal-bottom{
            height: calc(100vh - 272px);
        }
        .free-roll-terminal-left{
            button{
                img{
                    max-width: 24px;
                }
            }
        }
        .free-roll-terminal-left,
        .free-roll-terminal-right{
            h2{
                font-size: 22px;
            }
            .balance {
                margin-bottom: 10px;
                h3{
                    font-size: 22px;
                }
            }
            p{
                font-size: 15px;
            }
        }
    }
    
    @media only screen and (max-width: 480px) {
        .free-roll-terminal-bottom {
            height: calc(100vh - 282px);
            overflow: hidden;
        }
        .free-roll-terminal-content {
            .terminal-inner {
                height: calc(100vh - 350px);
            }
        }
        .free-roll-terminal-left,
        .free-roll-terminal-right{
            p{
                font-size: 15px;
                line-height: 150%;
                max-width: 300px;
            }
        }
    }
    
`;
export default FreeRollTerminalStyle;
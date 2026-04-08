import styled from "styled-components";


const PlayerConsoleStyle = styled.div`
    position: relative;
    z-index: 111;
    .identity{
        border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
        width: 100%;
        &-inner{
            padding: 18px 0px;
        }
        &-left{
            color: #FFF;
            h2{
                font-size: 30px;
                margin-bottom: 15px;
            }
            p{
                font-size: 18px;
                color: rgb(255, 255, 255, 0.90);
                text-transform: uppercase;
                margin-bottom: 5px;
            }
            h3{
                font-size: 22px;
                margin-bottom: 00;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 16px;
                input{
                    max-width: 280px;
                    border-bottom: 2px dashed #44FF02 !important;
                }
                a{
                    height: 40px;
                    width: 40px;
                    background: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                }
                .done-btn{
                    
                    background: #44FF0226;
                    &:hover{
                        background: #44FF02;
                        img{
                            filter: brightness(0);
                        }
                    }
                }
            }
        }
        &-right{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 100%;
            img{
                margin-left: auto;
                text-align: right;
                max-width: 80px;
            }
        }
    }
    
    .player-console-content{
        padding-top: 20px;
        min-height: calc(100vh - 242px);
        padding-right: 20px;
        padding: 24px 20px;
        h3{
            font-size: 26px;
            margin-bottom: 16px;
        }
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
            li{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 30px;
                &:last-child{
                    margin-bottom: 0;
                }
                span{
                    font-size: 16px;
                    font-family: "Source Code Pro", monospace;
                    color: rgba(255, 255, 255, 0.9);
                }
                strong{
                    font-size: 20px;
                    color: #44FF02;
                }
            }
        }
        &.player-console-right{
            border-left: 1px dashed rgba(255, 255, 255, 0.20);
            padding: 0;
        }
        .console-right-content{
            border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
            padding: 22px 20px;
            
        }
        .tx-btn{
            height: 50px;
            width: 250px;
            margin-top: 35px;
            font-size: 16px;
        }
  
            .invite-content-btn{
                font-size: 16px;
                height: 40px;
                width: 200px;
                margin-left: auto;
                margin-top: 22px;
                &.leaderboard{
                    margin-bottom: -8px;
                }
            }
        
    }
    /* .notification-alart{
      position: fixed;
      top: 25px;
      right: auto;
      left: auto;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999999999999999;
      .notification-inner{
        width: 290px;
        height: 50px;
        font-size: 16px;
        background: #2F352F;
      }
    } */
    @media only screen and (max-width: 1550px) {
        .identity-inner {
            padding: 10px 0px;
        }
        .player-console-content {
            min-height: calc(100vh - 220px);
            h3 {
                font-size: 22px;
                margin-bottom: 9px;
            }
            ul{
                li{
                    margin-bottom: 20px;
                }
            }
        }
    }
    @media only screen and (max-width: 1200px) {
        .identity-left {
            h2{
                margin-bottom: 3px;
            }
        }
         .player-console-content {
            min-height: calc(100vh - 208px);
            .console-right-content{
                padding: 19px 20px;
            }
         }
         .tx-btn{
            font-family: 15px;
         }
    }
    @media only screen and (max-width: 1024px) {
        .identity{
            &-inner{
                padding: 15px 0px;
            }
        }
        .player-console-content{
            min-height: calc(100vh - 198px);
        }
        .identity-left {
            h2{
                font-size: 24px;
                margin-bottom: 5px;
            }
            h3{
                font-size: 18px;
            }
        }
        .tx-btn{
            font-size: 14px;
        }
    }
    
    @media only screen and (max-width: 767px) {
        .identity-left {
            h3 {
                .done-btn{
                    height: 32px;
                    width: 32px;
                }
            }
        }
        .player-console-content {
            min-height: auto;
            &.player-console-right{
                border-left: none;
                border-top: 1px dashed rgba(255, 255, 255, 0.20);
            }
            h3{
                font-size: 22px;
            }
            ul{
                li{
                    margin-bottom: 7px;
                    span{
                        font-size: 14px;
                    }
                    strong{
                        font-size: 14px;
                    }
                }
            }
        }
         .identity-right img {
            display: none;
        }
        
    }
    @media only screen and (max-width: 575px) {
        .identity-left{
            h2{
                font-size: 22px;
            }
            p{
                font-size: 15px;
            }
            h3{
                font-size: 16px;
            }
        }
       
    }
    
`;
export default PlayerConsoleStyle;
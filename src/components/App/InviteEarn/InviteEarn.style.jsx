import styled from "styled-components";


const InviteEarnStyle = styled.div`
    position: relative;
    z-index: 111;
    
    .invite-earn-top{
        border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
        width: 100%;
        &-inner{
            padding: 19px 0px;
        }
        &-left{
            color: #FFF;
            h2{
                font-size: 30px;
                margin-bottom: 10px;
            }
            p{
                font-size: 18px;
                color: rgb(255, 255, 255, 0.90);
                margin-bottom: 0px;
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
    
    .invite-earn-content{
        padding-top: 20px;
        min-height: calc(100vh - 205px);
        padding-right: 20px;
        padding: 25px 20px;
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
                margin-bottom: 20px;
                &:last-child{
                    margin-bottom: 0;
                }
                span{
                    font-size: 16px;
                    font-family: "Source Code Pro", monospace;
                    color: rgba(255, 255, 255, 0.9);
                }
                strong{
                    font-size: 18px;
                    color: #44FF02;
                }
            }
        }
        form{
            margin-top: 20px;
            label{
                font-size: 16px;
                font-family: "Source Code Pro", monospace;
            }
            .input-flex{
                margin-top: 8px;
                border: 2px dotted rgba(255,255,255,0.5);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 5px;
                input{
                    border: none;
                    outline: none;
                    padding: 5px 15px 5px 10px;
                    background: none;
                    max-width: 100%;
                    width: 100%;
                    font-size: 18px;
                    color: #FFF;
                }
                .copy-share-btns{
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 3px;
                    button{
                        height: 40px;
                        width: 40px;
                    }
                }
            }
        }
        
        &.invite-earn-content-right{
            border-left: 1px dashed rgba(255, 255, 255, 0.20);
            padding: 0;
        }
        .invite-content{
            border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
            padding: 27px 20px;
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
    }
    
    @media only screen and (max-width: 1550px) {
        .invite-earn-top{
            &-inner{
                padding: 18px 0px 13px 0px; 
            }
            &-left {
                h2{
                    font-size: 26px;
                    margin-bottom: 10px;
                }
                p{
                    margin-bottom: -5px;
                }
            }
            &-right {
                img{
                    margin-top: -5px;
                }
            }
        }
        .invite-earn-content {
            min-height: calc(100vh - 181px);
            h3{
                font-size: 24px;
            }
            ul{
                li{
                    margin-bottom: 8px;
                }
            }
            form{
                margin-top: 8px;
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        .invite-earn-top{
            &-inner{
                padding: 15px 0px;
            }
        }
        .invite-earn-content {
            min-height: calc(100vh - 182px);
        }
    }
    
    
    @media only screen and (max-width: 767px) {
        .invite-earn-top-left {
            h2{
                font-size: 24px;
                margin-bottom: 5px;
            }
            h3{
                font-size: 18px;
            }
        }
        .invite-earn{
            margin-bottom: 30px;
        }
        .invite-earn-content {
            min-height: auto;
            border-left: none;
            border-top: 1px dashed rgba(255, 255, 255, 0.20);
             .invite-content {
                .invite-content-btn{
                    margin-left: 0;
                    margin-right: auto;
                }
             }
            form{
                margin-top: 10px;
            }
            h3{
                font-size: 22px;
            }
            p{
                margin-bottom: 0;
                font-size: 14px;
            }
            ul{
                li{
                    margin-bottom: 10px;
                    span{
                        font-size: 14px;
                    }
                    strong{
                        font-size: 14px;
                    }
                }
            }
        }
        .invite-earn-top-right img {
            display: none;
        }
    }
    @media only screen and (max-width: 575px) {
        .invite-earn-top-left{
            h2{
                font-size: 22px;
            }
            p{
                font-size: 15px;
            }
        }
        
    }
    
`;
export default InviteEarnStyle;
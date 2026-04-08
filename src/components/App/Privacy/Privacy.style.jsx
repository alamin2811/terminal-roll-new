import styled from "styled-components";


const PrivacyStyle = styled.div`
    position: relative;
    z-index: 111;
    .privacy-top{
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
    
    .privacy-content{
        padding: 20px 0px 30px 0px;
        .privacy-list{
            margin-bottom: 20px;
            h3{
                font-size: 22px;
                color: #FFF;
                margin-bottom: 20px;
                span{
                    color: #44FF02;
                }
            }
            p{
                font-size: 16px;
                line-height: 175%;
                color: rgba(255, 255, 255,0.9);
                margin-bottom: 8px;
                a{
                    color: #44FF02;
                    text-decoration: none;
                }
            }
            ul{
                margin-bottom: 8px;
                li{
                    font-family: "Source Code Pro", monospace;
                    font-size: 17px;
                }
            }
        }
        
    }
    
    @media only screen and (max-width: 1550px) {
        .privacy-top{
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
    }
    @media only screen and (max-width: 1024px) {
        .privacy-top{
            &-inner{
                padding: 15px 0px;
            }
        }
    }
    
    
    @media only screen and (max-width: 767px) {
        .privacy-top-left {
            h2{
                font-size: 24px;
                margin-bottom: 5px;
            }
            h3{
                font-size: 18px;
            }
        }
        .privacy-content {
            .privacy-list {
                h3{
                    font-size: 18px;
                    line-height: 180%;
                    margin-bottom: 5px;
                }
                p{
                    font-size: 14px;
                }
                ul{
                    li{
                        font-size: 14px;
                    }
                }
                
            }
        }
        .privacy-top-right img {
            display: none;
        }
    }
    @media only screen and (max-width: 575px) {
        .privacy-top-left {
            h2{
                font-size: 22px;
                margin-bottom: 5px;
            }
            p{
                font-size: 15px;
            }
        }
    }
`;
export default PrivacyStyle;
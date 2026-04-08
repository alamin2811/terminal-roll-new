import styled from "styled-components";

const LeaderboardStyle = styled.div`
    position: relative;
    z-index: 111;
    
    .leaderboard-top{
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
    
    .leaderboard-content{
        min-height: calc(100vh - 242px);
        padding-top: 16px;
    }
    
    .leaderboard-dropdown{
        position: relative;
        .dropdown-value{
            font-size: 20px;
            color: #FFF;
            position: relative;
            max-width: max-content;
            cursor: pointer;
            &::after {
              content: ">";
              position: absolute;
              z-index: 0;
              font-size: 25px;
              font-weight: 300;
              top: 0px;
              right: -35px;
              transform: rotate(90deg);
            }
        }
        .droplist{
            position: absolute;
            z-index: 1111;
            top: 35px;
            left: 0px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(25px);
            width: 160px;
            border-radius: 5px;
            padding: 8px 6px;
            ul{
                list-style: none;
                padding: 0;
                margin: 0;
                li{
                    padding: 5px 10px;
                    cursor: pointer;
                    border-radius: 5px;
                    font-size: 15px;
                    &:hover{
                        color: #FFF;
                        background: rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }
    }
    
    .leaderboard-table{
        position: relative;
        .table-head{
            ul{
                padding-bottom: 7px;
                border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
                li{
                    font-size: 17px;
                    line-height: 180%;
                    font-weight: 500;
                    font-family: "Source Code Pro", monospace;
                    text-transform: uppercase;
                    
                }
            }
        }
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 0px;
            border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
            li{
                text-align: left;
                &:nth-child(1){
                    width: 10%;
                }
                &:nth-child(2){
                    width: 50%;
                    padding: 0px 15px;
                }
                &:nth-last-child(1){
                    text-align: right;
                    width: 35%;
                    
                }
            }
        }
        .table-body{
            ul{
                li{
                    color: #FFF;
                    font-size: 20px;
                    span{
                        color: #44FF02;
                    }
                }
            }
        }
    }
    
    @media only screen and (max-width: 1550px) {
        .leaderboard-top{
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
        .leaderboard-content {
            min-height: calc(100vh - 181px);
            
        }
        .leaderboard-table{
            .table-body{
                ul{
                    padding: 12px 0px;
                    li{
                        font-size: 18px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        .leaderboard-top{
            &-inner{
                padding: 15px 0px;
            }
        }
        .leaderboard-table{
            &::after{
                right: -11px;
            }
            .table-head{
            }
            .table-body{
                ul{
                    padding: 10px 0px;
                    li{
                        font-size: 16px;
                    }
                }
            }
        }
        
    }
    
    
    @media only screen and (max-width: 767px) {
        .leaderboard-top-left {
            h2{
                font-size: 24px;
                margin-bottom: 5px;
            }
            h3{
                font-size: 18px;
            }
        }
        .leaderboard-top-right img {
            display: none;
        }
        .leaderboard-table{
            .table-head{
            }
            .table-body{
                ul{
                    padding: 8px 0px;
                    li{
                        font-size: 15px;
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 575px) {
        .leaderboard-top-left{
            h2{
                font-size: 22px;
            }
            p{
                font-size: 15px;
            }
        }
        
    }
    
`;
export default LeaderboardStyle;

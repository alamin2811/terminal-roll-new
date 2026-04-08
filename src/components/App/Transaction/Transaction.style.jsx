import styled from "styled-components";


const TransactionStyle = styled.div`
    position: relative;
    z-index: 111;
    .tx-top{
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
    
    .tx-table{
        padding-top: 20px;
        ul{
            list-style: none;
            padding: 0;
            margin: 0 -10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            li{ 
                padding: 5px 10px;
                &:nth-child(1){
                    width: 15%;
                }
                &:nth-child(2){
                    width: 29%;
                }
                &:nth-child(3){
                    width: 17%;
                }
                &:nth-child(4){
                    width: 17%;
                }
                &:nth-child(5){
                    width: 17%;
                }
                &:nth-last-child(1){
                    text-align: right;
                    width: 5%;
                    img{
                        margin-left: auto;
                        max-width: 18px;
                    }
                }
            }
        }
        .table-head{
            border-bottom: 1px dashed rgba(255,255,255,0.2);
            ul{
                padding-bottom: 5px;
                li{
                    font-family: "Source Code Pro", monospace;
                    text-transform: uppercase;
                }
            }
            
        }
        .table-body{
            .table-row{
                padding: 10px 0px;
                border-bottom: 1px dashed rgba(255,255,255,0.2);
                ul{
                    li{
                        font-size: 20px;
                        span{
                            &.completed{
                                color: #44FF02;
                            }
                            &.pending{
                                color: #FFBF33;
                            }
                            &.failed{
                                color: #FF1D1D;
                            }
                        }
                    }
                }
            }
        }
    }
    
    @media only screen and (max-width: 1550px) {
        .tx-top{
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
        
        .tx-table {
            .table-body {
                .table-row{
                    ul{
                        li{
                            font-size: 18px;
                        }
                    }
                }
            }
        }
        
    }
    @media only screen and (max-width: 1024px) {
        .tx-top{
            &-inner{
                padding: 15px 0px;
            }
        }
        .tx-table {
            padding-top: 10px;
            .table-body {
                .table-row{
                    padding: 5px 0px;
                    ul{
                        li{
                            &:nth-child(2){
                                width: 32%;
                            }
                            &:nth-child(3){
                                width: 19%;
                            }
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
    
    
    @media only screen and (max-width: 767px) {
        .tx-top-left {
            h2{
                font-size: 24px;
                margin-bottom: 5px;
            }
            h3{
                font-size: 18px;
            }
        }
        .tx-top-right img {
            display: none;
        }
        
        .table-scrollable{
            overflow-x: scroll;
            margin-right: -2px;
        }
    
        
        .tx-table {
            min-width: 650px;
            .table-body {
                .table-row{
                    padding: 2px 0px;
                    ul{
                        li{
                            font-size: 15px;
                        }
                    }
                }
            }
        }
    }
    @media only screen and (max-width: 575px) {
        .tx-top-left {
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
export default TransactionStyle;

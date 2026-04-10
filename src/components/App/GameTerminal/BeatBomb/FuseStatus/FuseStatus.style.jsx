import styled from "styled-components";


const FuseStatusStyle = styled.div`
    position: relative;
    z-index: 11;
    h6{
        font-family: Source Code Pro;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        text-transform: uppercase;
        color: #819E77;

    }
    .fuse-status-content{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 15px;
        
    }
    
    .fuse-timer{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 105px;
        min-width: 105px;
        max-width: 105px;
        max-width: 105px;
        background: #FF22440D;
        border: 1px solid #FF224433;
        position: relative;
        &::after{
            content: '';
            height: 80px;
            width: 80px;
            border-radius: 100%;
            background: transparent;
            border: 5px solid #FF2244;
            position: absolute;
            z-index: 0;
        }
        h5{
            position: relative;
            z-index: 1;
            font-family: Source Code Pro;
            font-weight: 600;
            font-size: 24px;
            line-height: 16px;
            text-align: center;
            color: #FF2244;
            
        }
        p{
            position: relative;
            z-index: 1;
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            color: #FF2244;
            margin-bottom: 0;

        }
    }
    
    .fuse-list{
        width: 100%;
        background: #FF22440D;
        border: 1px solid #FF224433;
        padding: 10px 15px;
        ul{
            margin: 0;
            padding: 0;
            li{
                display: flex;
                align-items: center;
                justify-content: space-between;
                span{
                    font-family: Source Code Pro;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 23px;
                    text-transform: uppercase;
                    color: #819E77;
                }
                
                h4{
                    font-family: Source Code Pro;
                    font-weight: 600;
                    font-size: 24px;
                    line-height: 23px;
                    text-align: right;
                    color: #FF2244;
                }
                
                strong{
                    font-family: Source Code Pro;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 23px;
                    text-align: right;
                    color: #FF2244;
                }
                
            }
        }
    }
    
    @media only screen and (max-width: 480px) {
        .fuse-timer{
            min-width: 100%;
            max-width: 100%;
        }
        .fuse-status-content{
            flex-direction: column;
        }
    }
    
`;
export default FuseStatusStyle;


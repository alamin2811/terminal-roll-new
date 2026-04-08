import styled from "styled-components";


const PaginationStyle = styled.div`
    padding: 15px 0px;
    ul{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        max-width: 246px;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 10px;
        
        li{
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                width: 40px;
                font-size: 20px;
                color: #FFF;
                text-decoration: none;
                img{
                    filter: brightness(100) grayscale(100%) saturate(0);
                    margin: auto;
                    width: 18px;
                }
                &.active,
                &:hover{
                    color: #44FF02;
                    background: rgba(255, 255, 255, 0.15);
                }
            }
            &:nth-child(1),
            &:nth-last-child(1){
                background: rgba(255, 255, 255, 0.15);
            }
            
        }
    } 
    .pagination-btn{
        position: relative;
        &.left{
            img{
                margin-right: -3px;
            }
        }
        &.right{
            img{
                margin-left: -5px;
            }
        }
        .btn-shape{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0E150E;
            transition: 0.3s;
            height: 4px;
            width: 4px;
            &1{
                left: 0;
                top: 0;
                &::after{
                    left: 4px;
                    top: 4px;
                }
            }
            &2{
                right: 0;
                top: 0;
                &::after{
                    right: 4px;
                    top: 4px;
                }
            }
            &3{
                left: 0;
                bottom: 0;
                &::after{
                    left: 4px;
                    bottom: 4px;
                }
            }
            &4{
                right: 0;
                bottom: 0;
                &::after{
                    right: 4px;
                    bottom: 4px;
                }
            }
            &::after{
                content: '';
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0E150E;
                opacity: 0;
                transition: 0.3s;
                height: 4px;
                width: 4px;
            }
        }
        &:hover {
            .btn-shape{
                &::after{
                    opacity: 1;
                }
            }
        }
    }

    @media only screen and (max-width: 991px) {
        
    }
    
`;
export default PaginationStyle;

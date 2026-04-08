import styled from "styled-components";


const HeaderStyle = styled.div`
    border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
    width: 100%;
    position: relative;
    z-index: 99999;
    .header-inner{
        padding: 15px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 160px;
            height: 50px;
            img{
                width: 100%;
            }
        }
        .header-right{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 16px;
            .menu-btn{
                border: none;
                outline: none;
                background: none;
                padding: 0;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    max-width: 30px;
                }
            }
            
        }
        .connect-btn{
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(68, 255, 2, 0.2);
            height: 50px;
            width: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: #44FF02;
            font-size: 16px;
        }
    }

    .menu-bg{
        background: #101710;
        z-index: 99999999;
        max-width: 360px;
        .menu-inner{
            position: relative;
            height: 100vh;
        }
        .menu-close-btn{
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
        .menu-green-shape{
            position: absolute;
            z-index: 0;
        }
        .menu-green-shape1{
            top: 0;
            left: 0;
        }
        .menu-green-shape2{
            bottom: 0;
            left: 0;
        }
        .menu-bg-graph{
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
            
        .drawer-body{
            position: relative;
            z-index: 2;
            padding: 40px 40px 20px 40px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-direction: column;
            height: 100%;
        }
        .menu-list{
            list-style: none;
            padding: 0;
            margin: 0;
            li{
                a{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    transition: 0.3s;
                    font-size: 18px;
                    color: #FFF;
                    margin-bottom: 30px;
                    text-decoration: none;
                    img{
                        width: 0px;
                        transition: 0.3s;
                    }
                    &:hover{
                        gap: 6px;
                        color: #44FF02;
                        img{
                            width: 10px;
                        }
                    }
                }
            }
        }
    }
    
    .menu-footer{
        h6{
            padding-top: 15px;
            a{
                font-size: 15px;
                color: rgba(255,255,255,0.7);
                transition: 0.3s;
                text-decoration: none;
                &:hover{
                    color: #FFF;
                }
            }
        }
        .social-links{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 20px;
            margin-top: 30px;
            width: 100%;
            a{
                height: 50px;
                width: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(255, 255, 255,0.15);
                border: none;
                outline: none;
                .btn-shape {
                    background: #1B2D17;
                }
            }
        }
    }
    
    @media only screen and (max-width: 1550px) {
        .header-inner {
            padding: 11px 0px;
        }
    }
    @media only screen and (max-width: 1024px) {
        .header-inner{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .logo{
                max-width: 127px;
            }
            .connect-btn{
                height: 40px;
                width: 120px;
                
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .menu-bg{
            max-width: 300px !important;
            .drawer-body{
                padding-left: 18px;
                padding-right: 18px;
            }
        }
        .header-inner .header-right{
            gap: 8px;
        }
    }
    @media only screen and (max-width: 575px) {
        .header-inner{
          .logo{
            max-width: 110px;
          }
        }   
    }
    @media only screen and (max-width: 400px) {
        .header-inner{
            margin: 0px -8px;
        }
    }
    
`;
export default HeaderStyle;
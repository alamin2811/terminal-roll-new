import styled from "styled-components";


const BodyWrapperStyle = styled.div`
    &.body-wrapper{
        position: relative;
        .bg-graph{
            height: 100vh;
            width: 100%;
            z-index: 2;
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
            
            &.fixed{
                position: fixed;
            }
        }
        .green-shape1{
            width: 18%;
            left: 20%;
            top: 80px;
            //position: fixed;
            position: absolute;
        }
        .green-shape2{
            width: 18%;
            right: 20%;
            top: 80px;
            //position: fixed;
            position: absolute;
        }
        .green-shape3{
            width: 18%;
            left: 20%;
            bottom: 0;
            //position: fixed;
            position: absolute;
        }
        .green-shape4{
            width: 18%;
            right: 20%;
            bottom: 0;
            //position: fixed;
            position: absolute;
        }
        .right-line{
            position: fixed;
            right: 0;
            top: 0px;
            z-index: 0;
            width: 20%;
            height: 100vh;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1' stroke-linecap='round' stroke-dasharray='1 6'%3E%3Cline x1='0' y1='0' x2='40' y2='0'/%3E%3Cline x1='0' y1='0' x2='0' y2='40'/%3E%3C/g%3E%3C/svg%3E");
        }
        .left-line{
            position: fixed;
            left: 0;
            top: 0px;
            width: 20%;
            height: 110%;
            z-index: 0;
            transform: rotateY(180deg);
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1' stroke-linecap='round' stroke-dasharray='1 6'%3E%3Cline x1='0' y1='0' x2='40' y2='0'/%3E%3Cline x1='0' y1='0' x2='0' y2='40'/%3E%3C/g%3E%3C/svg%3E");
        }
        &.no-green-shape{
            .green-shape1, .green-shape2, .green-shape3, .green-shape4{
                display: none;
            }
        }
        
        &.terminal{
            .green-shape1, 
            .green-shape2{
                top: 200px;
            }
        }
        &.chose-game-page{
            .green-shape3, 
            .green-shape4{
                bottom: 70px;
            }
        }
    }
    
    /* .relative{
        position: relative;
        &.z-9{
            z-index: 9;
        }
    } */
    
    @media only screen and (max-width: 1550px) {
        &.body-wrapper{
            .right-line,
            .left-line{
                width: 12%;
                background-size: 36px 36px;
            }
            .green-shape1{
                width: 18%;
                left: 12%;
                top: 72px;
            }
            .green-shape2{
                width: 18%;
                right: 12%;
                top: 72px;
            }
            .green-shape3{
                width: 18%;
                left: 12%;
            }
            .green-shape4{
                width: 18%;
                right: 12%;
            }
            &.terminal{
                .green-shape1, 
                .green-shape2{
                    top: 180px;
                }
            }
            
        }
        
    }
    @media only screen and (max-width: 1300px) {
        &.body-wrapper{
            &.chose-game-page{
                .green-shape3, 
                .green-shape4{
                    bottom: 75px;
                }
            }
        }
    }
    @media only screen and (max-width: 1200px) {
        &.body-wrapper{
            .right-line,
            .left-line{
                width: 7%;
                background-size: 25.5px 25.5px;
            }
            .green-shape1{
                width: 18%;
                left: 7%;
            }
            .green-shape2{
                width: 18%;
                right: 7%;
            }
            .green-shape3{
                width: 18%;
                left: 7%;
            }
            .green-shape4{
                width: 18%;
                right: 7%;
            }
            &.terminal{
                .green-shape1, 
                .green-shape2{
                    top: 175px;
                }
            }
            
            &.chose-game-page{
                .green-shape3, 
                .green-shape4{
                    bottom: 65px;
                }
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        &.body-wrapper{
            .right-line,
            .left-line{
                width: 0;
            }
            .green-shape1{
                width: 270px;
                left: 2.5%;
            }
            .green-shape2{
                width: 270px;
                right: 2.5%;
            }
            .green-shape3{
                width: 270px;
                left: 2.5%;
            }
            .green-shape4{
                width: 270px;
                right: 2.5%;
            }
            &.terminal{
                .green-shape1, 
                .green-shape2{
                    top: 180px;
                }
            }
        }
        
    }
    @media only screen and (max-width: 780px) {
        &.body-wrapper{
            .right-line,
            .left-line{
                width: 0;
            }
            .green-shape1{
                width: 270px;
                left: 2.5%;
            }
            .green-shape2{
                width: 270px;
                right: 2.5%;
            }
            .green-shape3{
                width: 270px;
                left: 2.5%;
            }
            .green-shape4{
                width: 270px;
                right: 2.5%;
            }
        }
        
    }
    @media only screen and (max-width: 767px) {
        &.body-wrapper{
            .right-line,
            .left-line{
                width: 0;
            }
            .green-shape1{
                width: 270px;
                left: 3%;
            }
            .green-shape2{
                width: 270px;
                right: 3%;
            }
            .green-shape3{
                width: 270px;
                left: 3%;
            }
            .green-shape4{
                width: 270px;
                right: 3%;
            }
            &.terminal{
                .green-shape1, 
                .green-shape2{
                    top: 265px;
                }
            }
             &.chose-game-page{
                
                .green-shape3,
                .green-shape4{
                    bottom: 80px;
                }                
            }
        }
        
    }
    @media only screen and (max-width: 480px) {
        &.body-wrapper{
            &.terminal{
                &.terminal-free-roll{
                    .green-shape1,
                    .green-shape2{
                        top: 280px;
                    }
                }
            }
        }
        
    }
    
`;
export default BodyWrapperStyle;
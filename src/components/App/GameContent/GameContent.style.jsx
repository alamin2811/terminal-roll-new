import styled from "styled-components";


const GameContentStyle = styled.div`
    position: relative;
    z-index: 11;
    .game-content-inner{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: calc(100vh - 83px);
        width: 100%; 
        .game-btn{
            margin-bottom: 30px;
            width: 300px;
            height: 75px;
            font-size: 24px;
            gap: 22px;
        }
    }
    
    
    @media only screen and (max-width: 1550px) {
        .game-content-inner{
            height: calc(100vh - 75px);
            .game-btn{
                height: 65px;
                width: 280px;
                font-size: 22px;
            }
        }
    }
    @media only screen and (max-width: 1200px) {
        .game-content-inner{
            .game-btn{
                height: 60px;
                width: 250px;
                font-size: 20px;
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        .game-content-inner{
            .game-btn{
                width: 240px;
                height: 60px;
                font-size: 18px;
                gap: 15px;
            }
        }
    }
    
`;
export default GameContentStyle;
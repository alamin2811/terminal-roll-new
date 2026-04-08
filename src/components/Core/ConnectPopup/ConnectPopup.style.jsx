import styled from "styled-components";


const ConnectPopupStyle = styled.div`
    position: relative;
    /* z-index: 9999; */
    .modal.fade{
        background: rgba(0,0,0,0.2);
        opacity: 1 !important;
        backdrop-filter: blur(6px);
    }
    .connect-popup-content{
        background: #171E17;
        position: relative;
        border-radius: 0;
        border: none;
        padding: 0;
        max-width: 370px;
        margin: auto;
        text-align: center;
        h2{
            color: #FFF;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p{
            font-size: 17px;
            margin-bottom: 30px;
            color: #FFF;
        }
        button{
            height: 60px;
            margin: auto;
            background: rgba(255, 255, 255, 0.1);
            width: 100%;
            margin-bottom: 30px;
            font-size: 20px;
            position: relative;
            img{
                position: absolute;
                left: 15px;
                top: 18px;
            }
            .btn-shape{
                background: #171E17;
            }
            
        }
    }
    .modal-body{
        position: relative;
        overflow: hidden;
        padding: 30px 35px 5px 35px;
         &::after{
            content: '';
            height: 100px;
            width: 100px;
            margin: auto;
            background: rgba(68, 255, 2, 0.4);
            filter: blur(100px);
            position: absolute;
            left: 40%;
            top: -50px;
            z-index: 1;
        }
        .modal-shape{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #080B08;
            height: 4px;
            width: 4px;
        }
        .modal-shape1{
            left: 0;
            top: 0;
        }
        .modal-shape2{
            right: 0;
            top: 0;
        }
        .modal-shape3{
            left: 0;
            bottom: 0;
        }
        .modal-shape4{
            right: 0;
            bottom: 0;
        }
    }
    
    
    @media only screen and (max-width: 1024px) {
        
    }
    
`;
export default ConnectPopupStyle;
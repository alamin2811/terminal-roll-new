import styled from "styled-components";


const SharePopupStyle = styled.div`
    .modal-backdrop.show{
        z-index: 111;
    }
    .modal{
        backdrop-filter: blur(6px);
        z-index: 99999;
    }
    .modal.show .modal-dialog{
        max-width: 370px;
        width: 100%;
        margin: auto;
    }
    .modal-content{
        background: #171E17;
        border-radius: 0;
        border: none;
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
    .modal-body{
        padding: 30px 40px 40px 40px;
        overflow: hidden;
        position: relative;
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
        h3{
            font-size: 24px;
            text-align: center;
            color: #FFF;
        }
    }
    
    .modal-close-btn{
        position: absolute;
        top: -50px;
        right: 0px;
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
    
    
    .social-links{
        display: flex;
        align-items: center;
        justify-content: space-between;
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
    @media only screen and (max-width: 480px) {
        .modal-close-btn{
            position: absolute;
            top: -60px;
            right: 50px;
        }
    }
    
`;
export default SharePopupStyle;
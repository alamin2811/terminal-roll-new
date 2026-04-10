import styled from "styled-components";
import CatchhuntRangeShape from '../../../../assets/images/shape/catch-hunt-range-shape.png'
import PumploopRangeShape from '../../../../assets/images/shape/pump-loop-range-shape.png'
import BeatbombRangeShape from '../../../../assets/images/shape/beatbomb-range-shape.png'


const BitFlipStyle = styled.div`
    .bit-flip-top{
        border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
        width: 100%;
        position: relative;
        z-index: 1111;
    }
    .bit-flip-inner{
        padding: 19px 0px;
    }
    .bit-flip-left{
        h2{
            font-size: 30px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 18px;
            color: #44FF02;
            button {
                img{
                    filter: invert(70%) sepia(24%) saturate(528%) hue-rotate(55deg) brightness(130%) contrast(95%);
                }
            }
        }
        p{
            font-size: 16px;
            margin-bottom: 0;
            color: #819E77;
        }
    }
    .bit-flip-right{
        text-align: right;
        .balance{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 15px;
            margin-bottom: 15px;
            h3{
                font-size: 24px;
                margin-bottom: 0;
                color: #44FF02;
            }
            button{
                height: 34px;
                width: 90px;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: 90%;
                transition: 0.3s;
                background: #44FF0226;
                color: #44FF02;
                .btn-text{
                    justify-content: flex-start;
                    span{
                        margin-top: 8px;
                        margin-bottom: 7px;
                        
                    }
                }
                &:hover{
                    color: #000;
                    background: #44FF02;
                }
            }
        }
        p{
            font-size: 16px;
            margin-bottom: 0;
            color: #819E77;
        }
    }
    .bit-flip-bottom{
        height: auto;
        position: relative;
        z-index: 111;
        .custom-container{
            height: 100%;
        }
    }
    .bit-flip-content{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        padding-bottom: 20px;
        margin-right: -32px;
        padding-right: 12px;
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
            margin-top: 24px;
            li{
                margin-bottom: 2px; 
                a{
                    color: #44FF02;
                    font-size: 17px;
                    font-family: "Source Code Pro", monospace;
                    text-decoration: none;
                }
                
            }
        }
        .terminal-btn{
            width: 100%;
            padding-right: 20px;
        }
        
        button{
            height: 55px;
            width: 100%;
            font-size: 24px;
            img{
                margin-right: 18px;
            }
        }
    }
    .bit-flip-main-content{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
        margin-bottom: 12px;
        margin-left: -20px;
        width: calc(100% + 20px);
        padding-left: 20px;
        .left{
            width: 66.67%;
            border-right: 1px dashed rgba(255, 255, 255, 0.20);
            padding-right: 20px;
            padding-bottom: 20px;
            position: relative;
            .beatflip-shape{
                position: absolute;
                top: 0;
                z-index: 0;
                width: 70%;
                &.shape-left{
                    left: -20px;
                    transform: scaleX(-1);
                }
                &.shape-right{
                    right: 0;
                }
            }
            .terminal{
                width: 100%;
                position: relative;
                z-index: 11;
                .terminal-inner{
                    height: auto;
                    min-height: 430px;
                }
                .terminal-body{
                    padding-bottom: 0;
                }
            }
            .chose-btn{
                height: 100px;
                width: 100%;
                border: 1px solid #44FF021A;
                background: #44FF020D;
                padding: 12px 20px;
                text-align: center;
                display: flex;
                align-content: center;
                justify-content: center;
                flex-direction: column;
                row-gap: 10px;
                cursor: pointer;
                transition: 0.3s;
                position: relative;
                z-index: 11;
                &.active, 
                &:hover{
                    border: 1px solid #44FF0280;
                    h3{
                        color: #44FF02;
                    }
                }
                h6{
                    font-family: Source Code Pro;
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 100%;
                    text-align: center;
                    text-transform: uppercase;
                    color: #819E77;
                    margin-bottom: 0;
                }
                h3{
                    font-family: Source Code Pro;
                    font-weight: 500;
                    font-size: 24px;
                    line-height: 100%;
                    text-align: center;
                    text-transform: uppercase;
                    color: #44FF0280;
                    margin-bottom: 0;
                    transition: 0.3s;
                }
                p{
                    margin-bottom: 0;
                    font-size: 14px;
                    line-height: 100%;
                    color: #819E77;
                }
            }
            
        }
        .right{
            width: 33.33%;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            height: 550px;
            .top{
                width: 100%;
                h6{
                font-family: Source Code Pro;
                font-weight: 500;
                font-size: 14px;
                line-height: 120%;
                margin-bottom: 0;
                text-transform: uppercase;
                color: #819E77;
                margin-bottom: 0;
            }
            ul{
                margin-top: 0px;
                li{
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    span{
                        font-family: Source Code Pro;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 36px;
                        text-transform: uppercase;
                        color: #819E77;
                    }
                    h4{
                        font-family: Source Code Pro;
                        font-weight: 600;
                        font-size: 24px;
                        line-height: 36px;
                        letter-spacing: 0%;
                        text-align: right;
                        color: #44FF02;
                    }
                    strong{
                        font-family: Source Code Pro;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 36px;
                        text-align: right;
                        color: #44FF02;
                    }
                }    
            }
            }
            .bottom{
                padding-top: 20px;
                width: 100%;
                h6{
                    font-family: Source Code Pro;
                    font-weight: 500;
                    font-size: 14px;
                    line-height: 120%;
                    text-transform: uppercase;
                    color: #819E77;
                }
                ul{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    gap: 7px;
                    li{
                        .number{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 27px;
                            width: 27px;
                            border: 1px solid #44FF021A;
                            background: #44FF020D;
                            font-family: Source Code Pro;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 100%;
                            color: #44FF024D;
                            &.active{
                                border: 1px solid #44FF0280;
                                color: #44FF02;
                            }
                        }
                    }
                }
            }
        }
    }
    .page-links{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
        margin: 0px -20px;
        a{
            height: 39px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-right: 1px dashed rgba(255, 255, 255, 0.20);
            padding: 5px 25px;
            font-family: Source Code Pro;
            font-weight: 600;
            font-size: 16px;
            line-height: 150%;
            text-align: center;
            text-transform: uppercase;
            text-decoration: none;
            position: relative;
            gap: 10px;
            cursor: pointer;
            z-index: 1111;
            &::before{
                content: '';
                height: 6px;
                width: 6px;
                display: none;
            }
            &.active{
                &::before{
                    display: block;
                }
            }
            &.bitflip{
                color: #44FF0280;
                &:hover,
                &.active{
                    color: #44FF02;
                    background: #44FF021A;
                }
                &::before{
                    background: #44FF02;
                }
            }
            &.cacheundt{
                color: #00FFAA80;
                &:hover, 
                &.active{
                    color: #00FFAA;
                    background: #00FFAA1A;
                }
                &::before{
                    background: #00FFAA;
                }
            }
            &.pumploop{
                color: #FFE60080;
                &:hover,
                &.active{
                    color: #FFE600;
                    background: #FFE6001A;
                }
                &::before{
                    background: #FFE600;
                }
            }
            &.beatbomb{
                color: #FF224480;
                &:hover,
                &.active{
                    color: #FF2244;
                    background: #FF22441A;
                }
                &::before{
                    background: #FF2244;
                }
            }
        }
    }
    
    /* catch hunt content */
    .cache-hunt-top{
        .bit-flip-left {
            h2{
                color: #00FFAA;
            }
        }
        .bit-flip-right {
            .balance {
                button{
                    background: #00FFAA26;
                    color: #00FFAA;
                }
                h3{
                    color: #00FFAA;
                }
            }
        }
    }
    .cache-hunt-main-content{
        .terminal-line{
            color: #00FFAA66;
            span{
                &:nth-child(1){
                    color: #00FFAA;
                }
            }
            &:nth-last-child(1){
                color: #00FFAA;
            }
        }
        
        .right {
            min-height: 586px;
            .top {
                ul {
                    li {
                        h4{
                            color: #00FFAA;
                        }
                        strong{
                            color: #00FFAA;
                        }
                    }
                }
            }
        }
        
        .catch-nodes{
            position: relative;
            z-index: 11;
            h5{
                font-family: Source Code Pro;
                font-weight: 600;
                font-size: 14px;
                line-height: 120%;
                text-transform: uppercase;
                margin-bottom: 10px;
                color: #819E77;
            }
            ul{
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                margin: 0px -7.5px;
                flex-wrap: wrap;
                row-gap: 15px;
                cursor: pointer;
                li{
                    width: 20%;
                    padding: 0px 7.5px;
                    .catch-nods-btn{
                        height: 45px;
                        width: 100%;
                        border: 1px solid #00FFAA1A;
                        background: #00FFAA0D;
                        transition: 0.3s;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        h6{
                            font-family: Source Code Pro;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 100%;
                            text-transform: uppercase;
                            margin-bottom: 5px;
                            color: #819E77;
                            transition: 0.3s;
                        }
                        p{
                            margin-bottom: 0;
                            font-family: Source Code Pro;
                            font-weight: 500;
                            font-size: 10px;
                            line-height: 140%;
                            text-align: center;
                            text-transform: uppercase;
                            color: #819E7780;
                            transition: 0.3s;
                        }
                        &:hover{
                             border: 1px solid #00FFAA4D;
                             h6{
                                color: #00FFAA;
                             }
                             p{
                                color: #819E77; 
                             }
                        }
                    }
                }
            }
        }
    }
    .catch-hunt-progress-content{
        margin-bottom: 20px;
        &:nth-last-child(1){
            margin-bottom: 0;
        }
        h6{
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            margin-bottom: 10px;
            color: #819E77B2;
            margin-bottom: 10px;
        }
        .progress-bar{
            height: 5px;
            background: #FFFFFF26;
            border-radius: 0;
            margin-bottom: 8px;
            .progress{
                background: #00FFAA;
                border-radius: 0;
                
            }
        }
        .progress-value{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #819E77;
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;

        }
    }
    .catch-hunt-range-slider{
        width: 100%;
        .range-fill {
          height: 100%;
          background: #00FFAA;
        }
        .range-bubble {
            .range-value{
                background: url(${CatchhuntRangeShape});
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        
    }
    .catch-hunt-main-btn{
        background: #00FFAA !important;
    }
    
    
    /* pump-loop style */
    .pump-loop-top{
        .bit-flip-left {
            h2{
                color: #FFE600;
            }
        }
        .bit-flip-right {
            .balance {
                button{
                    background: #FFE60026;
                    color: #FFE600;
                }
                h3{
                    color: #FFE600;
                }
            }
        }
    }
    .pump-loop-main-content{
        .terminal-line{
            color: #FFE60066;
            span{
                &:nth-child(1){
                    color: #FFE600;
                }
            }
            &:nth-last-child(1){
                color: #FFE600;
            }
        }
        .left {
            .terminal {
                .terminal-inner{
                    min-height: 350px;
                }
            }
        }
        
        .right {
            min-height: 654px;
            .top {
                ul {
                    li {
                        h4{
                            color: #FFE600;
                        }
                        strong{
                            color: #FFE600;
                        }
                    }
                }
            }
        }
        
        
    }
    .pump-loop-progress-content{
        margin-bottom: 20px;
        &:nth-last-child(1){
            margin-bottom: 0;
        }
        h6{
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            margin-bottom: 10px;
            color: #819E77B2;
            margin-bottom: 10px;
        }
        .progress-bar{
            height: 5px;
            background: #FFFFFF26;
            border-radius: 0;
            margin-bottom: 8px;
            .progress{
                background: #FFE600;
                border-radius: 0;
                &.progress-danger{
                    background: #FF2244;
                }
            }
        }
        .progress-value{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #819E77;
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;

        }
        &.danger{
            h6{
                color: #A83232B2 !important;
            }
            .progress-value{
                color: #A83232;
            }
            
        }
    }
    .pump-loop-range-slider{
        width: 100%;
        .range-fill {
          height: 100%;
          background: #FFE600;
        }
        .range-bubble {
            .range-value{
                background: url(${PumploopRangeShape});
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        
    }
    .pump-loop-main-btn{
        background: #FFE600 !important;
    }
    
    
    /* beat bomb style */
    
    /* catch hunt content */
    .beatbomb-top{
        .bit-flip-left {
            h2{
                color: #FF2244;
            }
        }
        .bit-flip-right {
            .balance {
                button{
                    background: #FF224426;
                    color: #FF2244;
                }
                h3{
                    color: #FF2244;
                }
            }
        }
    }
    .beatbomb-main-content{
        .terminal-line{
            color: #FF224466;
            span{
                &:nth-child(1){
                    color: #FF2244;
                }
            }
            &:nth-last-child(1){
                color: #FF2244;
            }
        }
        
        .right {
            min-height: 586px;
            .top {
                ul {
                    li {
                        h4{
                            color: #FF2244;
                        }
                        strong{
                            color: #FF2244;
                        }
                    }
                }
            }
        }
    }
    .catch-hunt-progress-content{
        margin-bottom: 20px;
        &:nth-last-child(1){
            margin-bottom: 0;
        }
        h6{
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;
            margin-bottom: 10px;
            color: #819E77B2;
            margin-bottom: 10px;
        }
        .progress-bar{
            height: 5px;
            background: #FFFFFF26;
            border-radius: 0;
            margin-bottom: 8px;
            .progress{
                background: #FF2244;
                border-radius: 0;
                
            }
        }
        .progress-value{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #819E77;
            font-family: Source Code Pro;
            font-weight: 500;
            font-size: 14px;
            line-height: 100%;

        }
    }
    .beatbomb-range-slider{
        width: 100%;
        .range-fill {
          height: 100%;
          background: #FF2244;
        }
        .range-bubble {
            .range-value{
                background: url(${BeatbombRangeShape});
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        
    }
    .beatbomb-btn{
        background: #FF2244 !important;
    }
    
    
    
    
    @media only screen and (max-width: 1550px) {
        .page-links{
            a{
                height: 36px;
            }
        }
        .bit-flip-inner{
            padding: 14px 0px 10px 0px;
        }
        .bit-flip-bottom{
            height: auto;
        }
        .bit-flip-content {
            .terminal-inner {
                height: calc(100vh - 260px);
            }
            ul{
                margin-top: 16px;
                li{
                margin-bottom: 2px;
                    a{
                        font-size: 16px;
                    }
                }
            }
            button{
                height: 50px;
                font-size: 20px;
            }
        }
        .bit-flip-left{
            button{
                img{
                    max-width: 32px;
                }
            }
        }
        .bit-flip-left,
        .bit-flip-right{
            h2{
                margin-bottom: 10px;
            }
            .balance {
                margin-bottom: 18px;
                h3{
                    font-size: 26px;
                }
            }
            p{
                font-size: 16px;
            }
        }
        .bit-flip-main-content {
            margin-left: -15px;
            width: calc(100% + 15px);
        }
    }
    @media only screen and (max-width: 1200px) {
        .page-links{
            a{
                height: 28px;
            }
        }
    }
    @media only screen and (max-width: 1024px) {
        .page-links{
            margin: 0px -15px;
            a{
                height: 32px;
            }
        }
        .bit-flip-inner{
            padding: 18px 0px 12px 0px;
        }
        .bit-flip-left{
            button{
                img{
                    max-width: 28px;
                }
            }
        }
        .bit-flip-left,
        .bit-flip-right{
            h2{
                font-size: 24px;
                margin-bottom: 15px;
            }
            .balance {
                margin-bottom: 13px;
                h3{
                    font-size: 24px;
                }
            }
            p{
                font-size: 16px;
            }
        }
        /* .bit-flip-bottom{
            height: calc(100vh - 183px);
        } */
        .bit-flip-content {
            margin-right: -27px;
            ul{
                li{
                    a{
                        font-size: 15px;
                    }
                }
            }
            .terminal-btn{
                padding-right: 15px;
            }
            button {
                height: 58px;
                width: 100%;
                font-size: 20px;
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .page-links{
            a{
                width: 25%;
            }
        }
        .bit-flip-content {
            .terminal-inner {
                height: calc(100vh - 345px);
            }
        }
        .bit-flip-right{
            margin-top: 20px;
            .balance {
                flex-direction: row-reverse;
            }
            p{
                text-align: left;
            }
        }
        /* .bit-flip-bottom{
            height: calc(100vh - 272px);
        } */
        .bit-flip-left{
            button{
                img{
                    max-width: 24px;
                }
            }
        }
        .bit-flip-left,
        .bit-flip-right{
            h2{
                font-size: 22px;
            }
            .balance {
                margin-bottom: 10px;
                h3{
                    font-size: 22px;
                }
            }
            p{
                font-size: 15px;
            }
        }
        .bit-flip-main-content{
            flex-wrap: wrap-reverse;
            .left{
                width: 100%;
                border-top: 1px dashed rgba(255, 255, 255, 0.20);
                border-right: 0;
                margin-left: -15px;
                width: calc(100% + 20px);
                padding-left: 15px;
                .terminal {
                    .terminal-inner{
                        min-height: 360px;
                    }
                }
                .beatflip-shape{
                    &.shape-left{
                        left: -5px;
                    }
                }
                
            }
            .right{
                width: 100%;
                padding-left: 0;
                height: auto;
                .bottom{
                    margin-top: 20px;
                }
            }
            
        }
        
        
        /* cache-hunt style */
        .bit-flip-main-content {
            .right{
                min-height: auto;
            }
        }
        
        
    }
    @media only screen and (max-width: 575px) {
        .page-links{
            flex-wrap: wrap;
            a{
                width: 50%;
                &:nth-child(1){
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
                }
                &:nth-child(2){
                    border-bottom: 1px dashed rgba(255, 255, 255, 0.20);
                    border-right: none;
                }
                &:nth-last-child(1){
                    border-right: none;
                }
            }
        }
        /* cache-hunt style */
        .cache-hunt-main-content {
            .catch-nodes {
                ul{
                    li{
                        width: 25%;
                    }
                }
            }
        }
    }
    
    @media only screen and (max-width: 425px) {
        /* cache-hunt style */
        .cache-hunt-main-content {
            .catch-nodes {
                ul{
                    li{
                        width: 33.33%;
                    }
                }
            }
        }
    }
    
    /* @media only screen and (max-width: 480px) {
        .bit-flip-bottom {
            height: calc(100vh - 295px);
            overflow: hidden;
        }
        .bit-flip-content {
            .terminal-inner {
                height: calc(100vh - 365px);
            }
        }
        .bit-flip-left,
        .bit-flip-right{
            p{
                font-size: 15px;
                max-width: 300px;
            }
        }
    } */
    
`;
export default BitFlipStyle;
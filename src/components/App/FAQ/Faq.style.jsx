import styled from "styled-components";


const FaqStyle = styled.div`
    position: relative;
    z-index: 111;
  .faq-top {
    border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
    width: 100%;
    &-inner {
      padding: 19px 0px;
    }
    &-left {
      color: #fff;
      h2 {
        font-size: 30px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        color: rgb(255, 255, 255, 0.9);
        margin-bottom: 0px;
      }
    }
    &-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      img {
        margin-left: auto;
        text-align: right;
        max-width: 80px;
      }
    }
  }
  
  .faq-content{
    padding-top: 20px;
    min-height: calc(100vh - 200px);
  }
  .faq-inner{
    border-top: 1px dashed rgba(255,255,255,0.2);
  }
  
  
  .faq-item {
    border-bottom: 1px dashed rgba(255,255,255,0.2);
}

    .question {
        cursor: pointer;
        padding: 18px 0;
        display: flex;
        gap: 12px;
        font-weight: 500;
        position: relative;
        padding-right: 30px;
        .q-left{
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 12px;
            font-size: 22px;
            color: #FFF;
            span{
                color: #44FF02;
            }
        }
        .faq-icon{
            width: 22px;
            position: absolute;
            right: 0;
            &.icon-plus{
                height: 22px;
            }
            &.icon-minus{
                height: 2px !important;
                margin-top: 12px;
            }
        }
    }
    
    /* Wrapper handles height animation */
    .answer-wrapper {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease;
    }
    
    /* Actual content animation */
    .answer {
        padding: 0 0 16px;
        opacity: 0;
        transform: translateY(-6px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        display: flex;
        gap: 12px;
        font-size: 16px;
        line-height: 180%;
        font-family: "Source Code Pro", monospace;
        padding-right: 30px;
        span{
            font-size: 22px;
            color: #FFF;
            font-family: 'screwtop-regular', sans-serif;
        }
    }
    
    /* ACTIVE STATE */
    .faq-item.active .answer-wrapper {
        max-height: 200px; /* enough for content */
    }
    
    .faq-item.active .answer {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Optional highlight */
    .faq-item.active .question {
        color: #00ffd5;
    }

  @media only screen and (max-width: 1550px) {
    .faq-top {
      &-inner {
        padding: 18px 0px 13px 0px;
      }
      &-left {
        h2 {
          font-size: 26px;
          margin-bottom: 10px;
        }
        p {
          margin-bottom: -5px;
        }
      }
      &-right {
        img {
          margin-top: -5px;
        }
      }
    }
    
    .faq-content{
        min-height: calc(100vh - 180px);
    }
    
  }
  @media only screen and (max-width: 1200px) {
    .question {
        .q-left{
            font-size: 20px;
        }
    }
    .answer {
        span{
            font-size: 20px;
        }
    }
  }
  @media only screen and (max-width: 1024px) {
    .faq-top {
      &-inner {
        padding: 15px 0px;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .faq-top-left {
      h2 {
        font-size: 24px;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 18px;
      }
    }
    .faq-top-right img {
      display: none;
    }
    .faq-content{
        min-height: calc(100vh - 165px);
    }
    .question {
        .q-left{
            font-size: 18px;
        }
        .faq-icon{
            width: 18px;
            .icon-plus{
                height: 18px;
            }
        }
    }
    .answer {
        font-size: 15px;
        span{
            font-size: 18px;
        }
    }
  }

  @media only screen and (max-width: 575px) {
    .faq-top-left {
      h2 {
        font-size: 22px;
      }
      p {
        font-size: 15px;
      }
    }
    
    .question {
        padding: 15px 0;
        .q-left{
            font-size: 15px;
        }
    }
    .answer {
        span{
            font-size: 15px;
        }
    }
    
    .answer {
        font-size: 14px;
    }
    
  }
    
`;
export default FaqStyle;

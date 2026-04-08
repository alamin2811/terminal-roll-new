import styled from "styled-components";

const ContactStyle = styled.div`
  position: relative;
  z-index: 111;
  .Contact-top {
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

  .Contact-left {
    min-height: calc(100vh - 225px);
    border-right: 1px dashed rgba(255, 255, 255, 0.3);
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 30px;
    h3 {
      font-size: 26px;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      margin-bottom: 10px;
    }
    form {
      margin-top: 20px;
      label {
        text-transform: uppercase;
        margin-bottom: 5px;
        width: 100%;
        display: flex;
        font-family: "Source Code Pro", monospace;
      }
      .form-input {
        position: relative;
      }
      input {
        width: 100%;
        background: transparent;
        border: 2px dotted rgba(255, 255, 255, 0.5);
        outline: none;
        margin-bottom: 20px;
        font-size: 18px;
        height: 50px;
        padding: 5px 15px;
        color: white;
      }
      .support-dropwown {
        border: 2px dotted rgba(255, 255, 255, 0.5);
        margin-bottom: 20px;
        position: relative;
        &::after {
          content: ">";
          position: absolute;
          z-index: 0;
          font-size: 20px;
          top: 10px;
          right: 15px;
          transform: rotate(90deg);
        }
        select {
          width: 100%;
          font-size: 18px;
          height: 50px;
          padding: 5px 15px;
          color: white;
          width: 100%;
          background: transparent;
          outline: none;
          -webkit-appearance: none;
          position: relative;
          border: none;
          z-index: 1;
          option {
            background: #091009;
          }
        }
      }
      textarea {
        width: 100%;
        background: transparent;
        border: 2px dotted rgba(255, 255, 255, 0.5);
        outline: none;
        margin-bottom: 20px;
        font-size: 18px;
        min-height: 130px;
        padding: 5px 15px;
        color: white;
        resize: vertical;
      }
      .submit-btn {
        font-size: 22px;
        height: 65px;
        width: 100%;
        color: #000000;
        svg {
          animation: loaderAnimate 4s linear infinite;
        }
      }

      .field-error {
        color: #ff4d4f;
        font-size: 13px;
        margin: 6px 0 14px;
        display: block;
        font-family: "Source Code Pro", monospace;
        text-transform: capitalize;
        position: absolute;
        top: -35px;
        right: 0;
      }
    }
    /* Optional: stronger visibility */
    .form-input:has(.field-error) input,
    .form-input:has(.field-error) textarea,
    .form-input:has(.field-error) .support-dropwown {
      border: 2px dotted rgba(255, 77, 79, 0.5);
    }
  }

  .Contact-right {
    padding: 20px;
    padding-right: 0;
    .join-tg-btn {
      width: 100%;
      gap: 11px;
      font-size: 22px;
      height: 65px;
    }
  }

  @keyframes loaderAnimate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .status-item {
    margin-top: 12px;
  }

  .status-btn {
    width: 100%;
    padding: 9px;
    background-color: #ffffff26;
    color: #44ff02;
  }

  @media only screen and (max-width: 1550px) {
    .Contact-top {
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
    .Contact-left {
      form {
        .submit-btn {
          height: 60px;
          font-size: 20px;
        }
      }
    }
    .Contact-right {
      .join-tg-btn {
        height: 60px;
        font-size: 20px;
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    .Contact-left {
      h3 {
        font-size: 22px;
      }
      p {
        font-size: 15px;
      }
    }
    .Contact-left {
      form {
        .submit-btn {
          font-size: 18px;
          height: 50px;
        }
      }
    }
    .Contact-right {
      .join-tg-btn {
        font-size: 18px;
        height: 50px;
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    .Contact-top {
      &-inner {
        padding: 15px 0px;
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .Contact-top-left {
      h2 {
        font-size: 24px;
        margin-bottom: 5px;
      }
      h3 {
        font-size: 18px;
      }
    }
    .Contact-left {
      border-right: 0;
      padding-right: 0;
    }
    .Contact-right {
      padding-left: 0;
    }
    .Contact-content {
      margin-bottom: 20px;
      .custom-container {
        border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
      }
    }
    .Contact-top-right img {
      display: none;
    }
    .Contact-left {
      p {
        font-size: 14px;
      }
    }
    .Contact-left {
      padding-bottom: 0;
      form {
        input,
        textarea {
          font-size: 16px;
        }
        .support-dropwown {
          select {
            font-size: 16px;
          }
        }
      }
    }
  }

  @media only screen and (max-width: 575px) {
    .Contact-top-left {
      h2 {
        font-size: 22px;
      }
      p {
        font-size: 15px;
      }
    }
  }
`;
export default ContactStyle;

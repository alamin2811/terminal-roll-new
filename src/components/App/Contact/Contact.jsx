import React, { useEffect, useRef, useState } from "react";
import ContactStyle from "./Contact.style";
import emailjs from "@emailjs/browser";
import ContactShape from "../../../assets/images/shape/contact-shape.png";
import tgIcon from "../../../assets/images/icon/tg.png";
import CheckIcon from "../../../assets/images/icon/check.png";
import { FiLoader } from "react-icons/fi";

const Contact = () => {
  const contactForm = useRef();

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    support_type: "",
    message: "",
  });

  const makeEmtyInputs = () => {
    setStatus(null);
    setLoading(false);
    setSuccess(false);
    setFailed(false);
    setFormData({ email: "", support_type: "", message: "" });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name == "email") {
      const validationErrors = validateEmail();
      setErrors(validationErrors);
    }
  };

  const validateEmailAddress = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateEmail = () => {
    const newErrors = {};
    if (formData.email && !validateEmailAddress(formData.email))
      newErrors.email = "Enter a valid Email";
    return newErrors;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.support_type.trim()) newErrors.support_type = "Required";
    if (formData.email && !validateEmailAddress(formData.email))
      newErrors.email = "Enter a valid Email";
    if (!formData.message.trim()) newErrors.message = "Required";
    return newErrors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (
      formData.email != "" &&
      formData.support_type != "" &&
      formData.message != ""
    ) {
      setStatus(null);
      setLoading(true);
      setSuccess(false);
      setFailed(false);

      emailjs
        .sendForm("service_gnsw8sa", "template_32isrml", contactForm.current, {
          publicKey: "YfzB5Eyg7qhngfPTf",
        })
        .then(
          () => {
            setFailed(false);
            setSuccess(true);
            setLoading(false);
            setStatus("✅ Message sent successfully!");
            contactForm.current.reset(); // clear form after success
          },
          (error) => {
            setFailed(true);
            setSuccess(false);
            setLoading(false);
            setStatus("❌ Failed to send message. Please try again!");
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  useEffect(() => {
    if (success) {
      setLoading(false);

      const timeoutId = setTimeout(() => {
        makeEmtyInputs();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }

    if (failed) {
      setLoading(false);

      const timeoutId = setTimeout(() => {
        makeEmtyInputs();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [success, failed]);

  return (
    <ContactStyle>
      <div className="Contact-top">
        <div className="custom-container">
          <div className="Contact-top-inner">
            <div className="row">
              <div className="col-md-10">
                <div className="Contact-top-left">
                  <h2>Contact support</h2>
                  <p>We’re here to help</p>
                </div>
              </div>
              <div className="col-md-2">
                <div className="Contact-top-right">
                  <img src={ContactShape} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Contact-content">
        <div className="custom-container">
          <div className="row m-0">
            <div className="col-md-6 p-0">
              <div className="Contact-left">
                <h3>have a question? </h3>
                <p>
                  If something doesn’t look right, or you have a question about
                  gameplay, balances, or results, reach out and we’ll respond.
                </p>
                <p>Support is handled by real people.</p>
                <form ref={contactForm} onSubmit={sendEmail}>
                  <label htmlFor="email">Email Address</label>

                  <div className="form-input">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    {errors.email && (
                      <span className="field-error">{errors.email}</span>
                    )}
                  </div>

                  <label htmlFor="support_type">Support Request Type</label>
                  <div className="form-input">
                    <div className="support-dropwown">
                      <select
                        name="support_type"
                        value={formData.support_type}
                        onChange={handleChange}
                      >
                        <option value="">-- Choose Type --</option>
                        <option value="Deposit">Deposit</option>
                        <option value="Withdraw">Withdraw</option>
                        <option value="Gameplay">Gameplay</option>
                      </select>
                    </div>

                    {errors.support_type && (
                      <span className="field-error">{errors.support_type}</span>
                    )}
                  </div>

                  <label htmlFor="message">Message</label>
                  <div className="form-input">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>

                    {errors.message && (
                      <span className="field-error">{errors.message}</span>
                    )}
                  </div>

                  <button
                    className="primary-btn lg submit-btn hover-btn"
                    type="submit"
                  >
                    <span className="btn-text">
                      <span>{loading && <FiLoader />} Send Message</span>
                      <span>{loading && <FiLoader />} Send Message</span>
                    </span>
                    <span className="btn-shape btn-shape1"></span>
                    <span className="btn-shape btn-shape2"></span>
                    <span className="btn-shape btn-shape3"></span>
                    <span className="btn-shape btn-shape4"></span>
                  </button>

                  {status && success && (
                    <div className="status-item">
                      <button
                        type="button"
                        className="primary-btn lg status-btn hover-btn"
                        disabled
                      >
                        <span className="btn-text">
                          <span>
                            <img src={CheckIcon} alt="" /> Message sent
                            successfully
                          </span>
                          <span>
                            <img src={CheckIcon} alt="" /> Message sent
                            successfully
                          </span>
                        </span>
                        <span className="btn-shape btn-shape1"></span>
                        <span className="btn-shape btn-shape2"></span>
                        <span className="btn-shape btn-shape3"></span>
                        <span className="btn-shape btn-shape4"></span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="Contact-right">
                <button className="secondary-btn lg join-tg-btn hover-btn">
                  <span className="btn-text">
                    <span>
                      <img src={tgIcon} alt="icon" /> Join Telegram
                    </span>
                    <span>
                      <img src={tgIcon} alt="icon" /> Join Telegram
                    </span>
                  </span>
                  <span className="btn-shape btn-shape1"></span>
                  <span className="btn-shape btn-shape2"></span>
                  <span className="btn-shape btn-shape3"></span>
                  <span className="btn-shape btn-shape4"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContactStyle>
  );
};

export default Contact;

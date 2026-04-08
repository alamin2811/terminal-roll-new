import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const AnimatedWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "animate" && prop !== "delay",
})`
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  transition-delay: ${({ delay }) => delay}ms;

  ${({ animate }) =>
    animate &&
    css`
      opacity: 1;
      transform: translateY(0);
      animation: bounceInUp 0.7s ease-out;
      animation-delay: ${({ delay }) => delay}ms;
    `}

  ${({ disableAnimation }) =>
    disableAnimation &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}

  @keyframes bounceInUp {
    0% {
      transform: translateY(48px);
    }
    60% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const ScrollAnimate = ({ children, delay = 0 }) => {
  const [isInView, setIsInView] = useState(false);
  const [disableAnimation, setDisableAnimation] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const checkWindowSize = () => {
      setDisableAnimation(window.innerWidth <= 991);
    };

    checkWindowSize(); // Initial check
    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  useEffect(() => {
    if (disableAnimation) {
      setIsInView(true); // Make content visible without animation
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [disableAnimation]);

  if (disableAnimation) {
    return <div>{children}</div>;
  }

  return (
    <AnimatedWrapper ref={ref} animate={isInView} delay={delay}>
      {children}
    </AnimatedWrapper>
  );
};

export default ScrollAnimate;

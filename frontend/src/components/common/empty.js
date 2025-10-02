import React from "react";
import EmptyBoxImg from "../../assets/Empty.json";
import styled from "styled-components";
import Lottie from "lottie-react";

const LottieWrapper = styled.div`
  flex: 1;
  max-width: 200px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 200px;
  }

  @media (max-width: 480px) {
    max-width: 150px;
  }
`;

const EmptyBox = ({ message }) => {
  return (
    <>
      <div className="empty-box">
        <div className="noFound-image">
          <LottieWrapper>
            <Lottie animationData={EmptyBoxImg} loop={true} />
          </LottieWrapper>
        </div>
        <div className="message">Oops! Sorry, {message}</div>
      </div>
    </>
  );
};

export default EmptyBox;

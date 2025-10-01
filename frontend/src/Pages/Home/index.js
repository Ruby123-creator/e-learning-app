import React, { useEffect, useState } from "react";
import img from "../../assets/images/main-img.png";
import AboutUs from "./aboutus";
import Teaches from "./Teachers";
import Information from "./subject";
import styled from "styled-components";
import { ReactTyped } from "react-typed";

import Exam from "./Exam";
import studyItem from "../../assets/study.json"
import Lottie from "lottie-react";

function TypingAnimation() {
  return (
    <h2 style={{ color: "white" }}>
      <ReactTyped
        strings={[
          " Welcome to our Learning Platform",
        ]}
       typeSpeed={100}   // ⬅️ Increase value → slower typing (default ~50)
  backSpeed={50}    // ⬅️ Increase value → slower backspacing
  backDelay={1500}  // ⬅️ Pause before deleting
        loop
      />
    </h2>
  );
}
const LottieWrapper = styled.div`
  flex: 1;
  max-width: 600px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 300px;
  }
`;
const HomeCom = () => {
  return (
    <div className="home">
      <div className="hero-section">
        {/* LEFT SIDE - Text */}
        <div className="hero-text">
          {
            TypingAnimation()
          }
          <p>
            This is a space where students can learn, explore, and achieve their
            goals. We provide the best guidance and resources to help you
            succeed. Start your journey of growth and excellence with us today.
          </p>
        </div>

        {/* RIGHT SIDE - Image */}
         <LottieWrapper>
                  <Lottie animationData={studyItem} loop={true} />
                </LottieWrapper>
        
      </div>

      <div className="section enquiry">
        <div className="about-us">
          <AboutUs />
        </div>
      
      </div>
      <div>
        <Teaches />
      </div>

      <div>
        <Information />
      </div>
      <div>
        <Exam />
      </div>
    </div>
  );
};

export default HomeCom;

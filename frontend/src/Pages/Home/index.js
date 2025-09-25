import React, { useEffect, useState } from "react";
import img from "../../assets/images/main-img.png";
import AboutUs from "./aboutus";
import Teaches from "./Teachers";
import Information from "./subject";
import Exam from "./Exam";
const HomeCom = () => {
  return (
    <div className="home">
      <div className="hero-section">
        {/* LEFT SIDE - Text */}
        <div className="hero-text">
          <h1>Welcome to Our Learning Platform</h1>
          <p>
            This is a space where students can learn, explore, and achieve their
            goals. We provide the best guidance and resources to help you
            succeed. Start your journey of growth and excellence with us today.
          </p>
        </div>

        {/* RIGHT SIDE - Image */}
        <div className="hero-image">
          <img src={img} alt="student-img" className="student-img" />
        </div>
      </div>

      <div className="section enquiry">
        <div className="about-us">
          <AboutUs />
        </div>
        {/* <div className='enquiry-form'>
         

          </div> */}
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

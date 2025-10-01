import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import profile1 from "../../assets/images/profile1.png";

import profile2 from "../../assets/images/profile2.png";
import profile3 from "../../assets/images/profile3.png";
import profile4 from "../../assets/images/profile4.png";
import profile5 from "../../assets/images/profile5.png";
import profile6 from "../../assets/images/profile6.png";

const students = [
  
  {
    image: profile2,
    name: "Sangam Kumar",
    reviews:"An institute where study with fun and fulfill your dreams.Helping students learn and grow every day.🔥" 
    
  },
  {
    image: profile3,
    name: "Vaishnavi",
    reviews: "Each and every student gets attention and support. The faculty is knowledgeable and responsive. Clean classrooms, proper discipline, and a passion for teaching you can't ask for more",
   
  },
  {
    image: profile4,
    name: "Lovely",
    reviews: "I have interacted with the teachers at the institute—they are humble, knowledgeable, and extremely helpful. They proactively go the extra mile to ensure students receive a better education. I highly recommend it to everyone",
    
  },
   {
    image: profile5,
    name: "Sanjeev Kumar",
    reviews:"The best coaching I know in my area as, here learning is fun with experiments and with experienced teachers. Where you can test yourself by monthly tests and daily questions. The same questions came to boards which sir gave us in coaching.",

  },
   {
    image: profile6,
    name: "Dikshant",
    reviews:  "The teacher has created such a supportive environment that made it easier to grow and learn Thank you for making it easier for me to achieve my goal with such wonderful classes",
    
  },
  {
    image: profile1,
    name: "Ayush Pal",
    reviews: "The teachers here truly care about each student’s success. Regular tests, feedback sessions, and doubt clearing have helped my child improve a lot in just a few month",
   
  },
];

const Wrapper = styled.div`
  background: #0E1111;
  padding: 0px;
  text-align: center;
  margin-inline: 25px;
  padding-bottom: 40px;
`;

const headerStyle = {
  fontSize: "22px",
  marginBottom: "30px",
  color: "#eae7e7ff",
};
const SliderWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 650px;
  }

   @media (max-width: 768px) {
    max-width: 260px;
  }

  @media (max-width: 360px) {
    max-width: 240px;
  }

`;

const Card = styled.div`
  max-width: 300px;
  width: 90%;
 
  padding: 10px;
  margin: auto;
  height: 100%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  background-color: #0E1111;
  transition: all 0.3s ease;

 @media (max-width: 1200px) {
    max-width: 260px;
  }

  @media (max-width: 768px) {
    max-width: 200px;
  }

   @media (max-width: 360px) {
    max-width: 180px;
  }
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #4c4c4cff;
  margin-bottom: 5px;
`;

const Name = styled.div`
  font-size: 1rem;
  color: #cfc7c1;
  
`;

const Subject = styled.p`
  color: #a3a0a0ff;
  font-style: italic;
 
`;

const Detail = styled.p`
  font-size: 0.65rem;
  color: #333;
  margin: 2px 0;
  text-align: center;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  font-size: 1.5rem;
  color: #cfc7c1;
  cursor: pointer;
`;

const PrevArrow = styled(Arrow)`
  left: -35px;
`;

const NextArrow = styled(Arrow)`
  right: -35px;
`;

const CustomPrevArrow = ({ onClick }) => (
  <PrevArrow onClick={onClick}>
    <FaArrowLeft />
  </PrevArrow>
);

const CustomNextArrow = ({ onClick }) => (
  <NextArrow onClick={onClick}>
    <FaArrowRight />
  </NextArrow>
);

const Teaches = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Wrapper>
      
  <h2 style={headerStyle} >What Our Student Says</h2>
      <SliderWrapper>
        <Slider {...settings}>
          {students.map((item, index) => (
            <Card key={index}>
              <ProfileImage src={item.image} alt={item.name} />
              <Name>{item.name}</Name>
              <Subject>{item.reviews}</Subject>
             
            </Card>
          ))}
        </Slider>
      </SliderWrapper>
    </Wrapper>
  );
};

export default Teaches;

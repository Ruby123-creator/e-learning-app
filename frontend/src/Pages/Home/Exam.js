import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1744354582020.json";
import learning from "../../assets/learning.json"
import styled from "styled-components";
import EnquiryForm from "./enquiryForm";

const Container = styled.div`
  background-color: #0E1111;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  color: #222;

  @media (max-width: 480px) {
    padding: 2rem 0rem;
  }
`;

const Wrapper = styled.div`
  max-width: 1150px;
  width: 100%;
  text-align: center;
`;

const FlexSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  margin-inline: 25px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;



const LottieWrapper = styled.div`
  flex: 1;
  max-width: 450px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 300px;
  }

  @media (max-width: 480px) {
    max-width: 250px;
  }
`;
function Exam() {
  return (
    
       <Container>
       <Wrapper>
      <FlexSection>
          <EnquiryForm/>

        <LottieWrapper>
          <Lottie animationData={learning} loop={true} />
        </LottieWrapper>
      </FlexSection>
      </Wrapper>
      </Container>
  );
}

export default Exam;

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/Animation - 1744354582020.json";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
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

const TextContent = styled.div`
  flex: 1;
  text-align: left;
  max-width: 600px;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: #044e1f;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 18px;
    color: #444;
    margin-bottom: 2rem;
    line-height: 1.6;

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

const ExamList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ExamBadge = styled.div`
  background-color: #e0f2e9;
  color: #066f2d;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  font-size: 16px;
  border-radius: 30px;
  border: 2px solid #c6e8d5;
  transition: 0.3s ease;

  &:hover {
    background-color: #c6e8d5;
    color: #044e1f;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 0.5rem 1rem;
  }
`;

const LottieWrapper = styled.div`
  flex: 1;
  max-width: 500px;
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
        <TextContent>
          <h3>Your Path to Success in Competitive Exams Begins Here</h3>
          <p>
            We offer basic preparation for all major competitive exams, focusing
            on strengthening your fundamentals and building confidence. With
            clear explanations, interactive learning, and consistent support, we
            guide you step-by-step toward success.
          </p>
          <ExamList>
            {[
              "Board",
              "NEET",
              "JEE",
              "ICAR",
              "NDA",
              "VLDA",
              "HAU",
              "KVPY",
              "B.Sc Agriculture",
            ].map((exam, index) => (
              <ExamBadge key={index}>{exam}</ExamBadge>
            ))}
          </ExamList>
        </TextContent>

        <LottieWrapper>
          <Lottie animationData={animationData} loop={true} />
        </LottieWrapper>
      </FlexSection>
      </Wrapper>
      </Container>
  );
}

export default Exam;

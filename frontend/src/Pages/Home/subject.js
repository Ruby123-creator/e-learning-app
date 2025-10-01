import React from "react";
import styled from "styled-components";
import eco from "../../assets/images/economic-growth.png" 
import bio from "../../assets/images/bacteria.png";
import agri from "../../assets/images/planting.png";

import chem from "../../assets/images/chem.png";
import physics from "../../assets/images/physics.png";
import math from "../../assets/images/math.png";
import eng from "../../assets/images/eng.png";

import commerce from "../../assets/images/data-analysis.png";

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

const SubjectSection = styled.div`
  background-color: #0E1111;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #e6e4e4ff;
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 20px;
`;

const Item = styled.div`
  background: #cfc7c1;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 160px;
  flex: 1 1 160px;
  border: 1px solid rgb(200, 200, 200);

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex: 1 1 120px;
    max-width: 120px;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    flex: 1 1 90px;
    max-width: 90px;
    padding: 1rem;
  }
`;

const Icon = styled.div`
  margin-bottom: 15px;
  width: 48px;
  height: 48px;

  img,
  svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    color: #555;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333843;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Information = () => {
  return (
    <Container>
      <Wrapper>
        <SubjectSection>
          <SectionTitle>Subjects We Cover</SectionTitle>

          <Grid>
            <Item>
              <Icon>
                <img src={physics} alt="physics" />
              </Icon>
              <Label>Physics</Label>
            </Item>
            <Item>
              <Icon>
                <img src={chem} alt="chemistry" />
              </Icon>
              <Label>Chemistry</Label>
            </Item>
            <Item>
              <Icon>
                <img src={math} alt="maths" />
              </Icon>
              <Label>Mathematics</Label>
            </Item>
            <Item>
              <Icon>
                <img src={bio} alt="biology" />
              </Icon>
              <Label>Biology</Label>
            </Item>
            <Item>
              <Icon>
                <img src={agri} alt="agriculture" />
              </Icon>
              <Label>Agriculture</Label>
            </Item>
            <Item>
              <Icon>
                <img src={commerce} alt="commerce" />
              </Icon>
              <Label>Commerce</Label>
            </Item>
            <Item>
              <Icon>
              <img src={eco} alt="economics" />
              </Icon>
              <Label>Economics</Label>
            </Item>
            <Item>
              <Icon>
                <img src={eng} alt="english" />
              </Icon>
              <Label>English</Label>
            </Item>
          </Grid>
        </SubjectSection>
      </Wrapper>
    </Container>
  );
};

export default Information;

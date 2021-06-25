import React from 'react';

import Container from "../../Container/Container";

import styled from 'styled-components';
import { fontFamily, colorText } from "../../../scss/styles";

const AppTitle = styled.h1`
  margin: 0 0 8px 0;
  color: ${ colorText.primary };
  font-size: 64px;
  font-family: ${ fontFamily.exo2 };
  line-height: 1;
`;

const AppSubtitle = styled.p`
  margin: 0;
  color: ${ colorText.primary };
  font-weight: bold;
  font-size: 24px;
  font-family: ${ fontFamily.exo2 };
  line-height: 1.17;
`;

const BannerWrapper = styled.div`
  padding: 32px 0;
  text-align: center;
`;

const Banner = ({ token }) => {
  if (token) {
    return null;
  }
  return (
    <BannerWrapper>
      <Container>
        <AppTitle>Проектная кухня</AppTitle>
        <AppSubtitle>Место, где готовится новый опыт</AppSubtitle>
      </Container>
    </BannerWrapper>
  );
};

export default Banner;

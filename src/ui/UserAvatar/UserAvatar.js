import React from 'react';
import styled from 'styled-components';

import { colorBase, colorBackground } from '../../scss/styles';

import userAvatar from '../../images/icons/avatar.svg';

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${( { width } ) => width}px;
  height: ${( { height } ) => height}px;
  background-color: ${colorBase.accent};
  border: 2px solid ${colorBackground.secondary};
  border-radius: 50%;
`;

const AllienAvatar = ({ alt, width, height}) => (
  <AvatarWrapper width={width} height={height}>
    <img width={ Math.round(width * 0.6) } height={ Math.round(height * 0.7) } src={ userAvatar } alt={alt} />
  </AvatarWrapper>
);

export default AllienAvatar;

import React from 'react';

import styled from 'styled-components';
import { colorBackground } from '../../../scss/styles'

import Tags from '../../Tags/Tags';

const TagsCloud = () => (
  <TagsCloudContainer>
    <Title>Популярные теги</Title>
    <Tags />
  </TagsCloudContainer>
);

export default TagsCloud;

const TagsCloudContainer = styled.div`
  padding: 16px;
  background-color: ${colorBackground.secondary};
  border-radius: 20px;
`;

const Title = styled.p`
  margin-top: 0;
  margin-bottom: 16px;
`;

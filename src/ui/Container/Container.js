import styled from 'styled-components';

import { sizes, media } from '../../scss/styles';

const Container = styled.div`
  width: 100%;
  max-width: ${ sizes.xl }px;
  margin: 0 auto;
  padding: 0 16px;

  ${media.lg`
    max-width: ${ sizes.lg }px;
    padding: 0 12px;
  `};
  ${media.md`
    max-width: ${ sizes.md }px;
    padding: 0 8px;
  `};
  ${media.s`
    min-width: ${ sizes.s }px;
    padding: 0 4px;
  `};
`;

export default Container;

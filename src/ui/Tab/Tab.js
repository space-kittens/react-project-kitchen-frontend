import styled from 'styled-components';

import { btnReset } from '../../scss/mixins';
import { colorText, colorBase } from '../../scss/styles';

const Tab = styled.button`
  ${btnReset}

  display: inline-block;
  padding: 16px 24px;
  color: ${({isActive}) => isActive ? colorText.primary : colorText.secondary};
  line-height: inherit;
  box-shadow: inset 0 -2px 0 ${( { isActive } ) => isActive ? colorBase.accent : 'transparent'};

  &:hover,
  &:focus {
    outline: 1px solid ${colorBase.accent};
  }
`;

export default Tab;

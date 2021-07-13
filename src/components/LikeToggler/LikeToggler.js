import React from 'react';
import styled from 'styled-components';
import { btnReset } from '../../scss/mixins'
import { colorBase, colorText, animation } from '../../scss/styles'

const LikeToggler = ({ isActive, children }) => (
  <LikeBtn isActive={ isActive }>
    { children }
    <HeartIcon isActive={isActive} />
  </LikeBtn>
);

export default LikeToggler;

const LikeBtn = styled.button`
  ${btnReset}

  display: flex;
  align-items: center;
  color: ${( { isActive } ) => isActive ? colorBase.alert : colorText.primary};
  transition: ${animation.defaultTransition};

  &:hover,
  &:focus {
    color: ${colorBase.alert};

    & > svg {
      stroke: ${colorBase.alert};
    }
  }

  &:focus {
    outline: 0;
    box-shadow:
      2px 2px ${colorBase.alert},
      -2px -2px ${colorBase.alert};
  }

  &:active {
    opacity: 0.8;
  }
`;

const HeartIcon = ({isActive}) => (
  <StyledIcon
    isActive={ isActive }
    viewBox='0 0 22 19'
    width='22'
    height='19'
    stroke={ isActive ? colorBase.alert : colorText.primary }
    fill={ isActive ? colorBase.alert : 'transparent' }>
    <path d='M19.1327 2.31877L19.1331 2.3191C19.5511 2.73699 19.8828 3.23316 20.1091 3.77926C20.3354 4.32537 20.4518 4.9107 20.4518 5.50183C20.4518 6.09295 20.3354 6.67828 20.1091 7.22439C19.8828 7.77049 19.5511 8.26666 19.1331 8.68455L19.1329 8.68472L18.0729 9.74472L11 16.8176L3.9271 9.74472L2.8671 8.68472C2.02295 7.84056 1.54871 6.69564 1.54871 5.50183C1.54871 4.30801 2.02295 3.16309 2.8671 2.31893C3.71126 1.47478 4.85618 1.00053 6.05 1.00053C7.24381 1.00053 8.38873 1.47478 9.23289 2.31893L10.2929 3.37893L11 4.08604L11.7071 3.37893L12.7671 2.31893L12.7673 2.31877C13.1852 1.90068 13.6813 1.56902 14.2274 1.34274C14.7735 1.11647 15.3589 1 15.95 1C16.5411 1 17.1265 1.11647 17.6726 1.34274C18.2187 1.56902 18.7148 1.90068 19.1327 2.31877Z' strokeWidth='2' strokeLinecap='round'/>
  </StyledIcon>
);

const StyledIcon = styled.svg`
  display: inline-block;
  margin-left: 8px;
  transition: inherit;
`;

import React from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { PlusIcon, EditIcon } from '../Icons/Icons';

import { btnReset } from '../../scss/mixins';
import { colorBase } from '../../scss/styles';

const defaultStyles = css`
  padding: 8px 16px;
  background-color: ${colorBase.accent};
  border-radius: 20px;
`;

const iconedElStyles = css`
  display: flex;
  align-items: center;

  & > svg {
    margin-right: 8px;
  }
`;

export const FollowBtn = ( { children, onClick, className } ) => (
  <IconedBtn className={ className } onClick={ onClick }>
    <PlusIcon /> { children }
  </IconedBtn>
);

export const EditLink = ( { children, onClick, className, to } ) => (
  <IconedLink to={to} className={ className } onClick={ onClick }>
    <EditIcon /> { children }
  </IconedLink>
);

export const Btn = styled.button`
  ${btnReset}
  ${defaultStyles}
`;

const StyledLink = styled(Link)`
  ${defaultStyles}
`;

const IconedLink = styled(StyledLink)`
  ${iconedElStyles}
`;

const IconedBtn = styled(Btn)`
  ${iconedElStyles}
`;

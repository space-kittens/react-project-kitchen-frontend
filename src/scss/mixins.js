import { css } from 'styled-components';
import { fontFamily } from './styles';

export const listReset = css`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const btnReset = css`
  padding: 0;
  background-color: transparent;
  border: 0;
`;

export const textStyles = {
  caption: css`
    font-size: 12px;
    line-height: 1.33;
  `,
  headline: css`
    font-weight: bold;
    font-size: 24px;
    font-family: ${fontFamily.exo2};
    line-height: 1.17;
  `
};

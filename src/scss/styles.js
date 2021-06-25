import { css } from 'styled-components';

export const sizes = {
  xl: 1140,
  lg: 1024,
  md: 768,
  s: 320,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce(
  (accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label] / 16;
    accumulator[label] = (...args) => css`
      @media (max-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

export const colorDefault = {
  black: '#0000000',
  white: '#ffffff',
  transparent: 'rgba(255, 255, 255, 0)',
};

export const colorBase = {
  input: '#2F2F37',
  accent: '#4C4CFF',
  divider: '#2F2F37',
  alert: '#F20D33',
  success: '#00CCCC',
  disabled: '#3A3A55',
};

export const colorBackground = {
  primary: '#131316',
  secondary: '#1C1C21',
};

export const colorText = {
  primary: '#F2F2F3',
  secondary: '#8585AD',
};

export const fontFamily = {
  jetBrains: '"JetBrains Mono", "Courier", monospace',
  exo2: '"Exo 2", "Arial", sans-serif',
};

export const animation = {
  defaultTransition: '0.3s ease',
};

export const viewports = {
  sm: '320px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
  xxl: '1920px',
};

export const retina = {
  dpi: '144dpi',
  dppx: '1.5dppx',
};

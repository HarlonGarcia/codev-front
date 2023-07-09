import { createStitches } from '@stitches/react';

const colors = {
  primary: '#02010A',
  secondary: '#120F26',
  title: '#8625df',
  text: '#c392ef',
  highlight: '#50fa7b',
  error: '#ff5555',
};

const fonts = {
  default: 'Raleway',
  code: 'Fira Code',
};

export const { styled, theme, globalCss, getCssText } = createStitches({
  theme: {
    colors,
    fonts,
    space: {
      navbarHeight: '3.25rem',
    },
    sizes: {
      full: '100%',
      navbarHeight: '3.25rem',
    }
  },
  media: {
    xs: '(min-width: 460px)',
    sm: '(min-width: 580px)',
    md: '(min-width: 750px)',
    lg: '(min-width: 880px)',
  },
});
import { createStitches } from '@stitches/react';

const colors = {
  primary: '#02010A',
  title: '#8625df',
  text: '#c392ef',
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
  },
});
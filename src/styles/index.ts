import { createStitches } from '@stitches/react';

const colors = {
  primary: '#02010A',
  secondary: '#120F26',
  title: '#8625df',
  text: '#c392ef',
  highlight: '#50fa7b',
  error: '#ff5555',
  glass: 'linear-gradient(to left bottom, rgba(5, 2, 25, 0.1), rgba(65, 86, 114, 0.1), rgba(5, 2, 25, 0.1))',
  shadow: 'rgba(5, 2, 25, 0.4)',
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
  utils: {
    wrapperPadding: (value: string) => ({
      padding: value,
      paddingTop: `calc($navbarHeight + ${value})`,
    }),
  }
});
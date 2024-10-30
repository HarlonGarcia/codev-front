import { createStitches } from '@stitches/react';

export const colors = {
  primary: '#02010A',
  secondary: '#120F26',
  title: '#8625df',
  text: '#c392ef',
  textDarker: 'rgba(150, 100, 175, 1)',
  coolgrey: '#8690B3',
  lavender: '#E6F0FF',
  blue: '#234fff',
  highlight: '#50fa7b',
  highlightDarker: 'rgba(110, 220, 120, 0.7)',
  alert: '#DBF227',
  error: '#ff5555',
   
  glass: 'linear-gradient(to left bottom, rgba(5, 2, 8, 0.3), rgba(10, 0, 10, 0.3), rgba(5, 2, 8, 0.3))',
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
    xl: '(min-width: 1080px)',
    xl2: '(min-width: 1260px)',
    xl3: '(min-width: 1440px)',
    xl4: '(min-width: 1800px)',
  },
  utils: {
    wrapperPadding: (value: string) => ({
      padding: value,
      paddingTop: `calc($navbarHeight + ${value})`,
    }),
  }
});
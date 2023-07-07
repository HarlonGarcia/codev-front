import { globalCss } from '.';

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Raleway',
    },
    {
      fontFamily: 'Fira Code',
    }
  ],
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
  },
  body: {
    fontFamily: '$default',
    backgroundColor: '$primary',
    color: '$text',
  },
  'h1, h2, h3, h4, h5, h6': {
    color: '$title',
  },
  a: {
    textDecoration: 'none',
  },
  button: {
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
});
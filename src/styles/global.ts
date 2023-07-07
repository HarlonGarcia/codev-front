import { globalCss } from ".";

export const globalStyles = globalCss({
  "@font-face": [
    {
      fontFamily: 'Raleway',
    },
    {
      fontFamily: 'Fira Code',
    }
  ],
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    '-webkit-font-smoothing': 'antialiased',
  },
  body: {
    backgroundColor: "$primary",
    color: "$text",
    fontFamily: '$default',
  },
});
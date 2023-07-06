import { createStitches } from "@stitches/react";

export const { styled, theme, globalCss, getCssText } = createStitches({
  theme: {
    colors: {
      primary: '#020202',
      text: '#FFFFFF',
    },
    fonts: {
      default: 'Raleway',
      code: 'Fira Code',
    },
  },
});
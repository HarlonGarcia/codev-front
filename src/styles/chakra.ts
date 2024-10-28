import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      background: '#02010A',
      color: '#c392ef',
      fontFamily: 'Raleway',
    }
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: `'Raleway', sans-serif` },
      },
    },
  },
});
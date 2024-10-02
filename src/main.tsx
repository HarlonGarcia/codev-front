import React from 'react';

import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { queryClient } from './services/queryClient.ts';
import { globalStyles } from './styles/global.ts';

import './translation';

const chakraStyles = (
  <Global
    styles={`
      body {
        background: #02010A;
        color: #c392ef;
        font-family: 'Raleway';
      },
    `}
  />
);

globalStyles()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      {chakraStyles}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);

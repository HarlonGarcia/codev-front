import React from 'react';

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import ReactDOM from 'react-dom/client';
import { system } from 'styles/chakra.ts';
import { GARBAGE_COLLECTION_INTERVAL } from 'utils/constants.ts';

import App from './App.tsx';
import { createIDBPersister, queryClient } from './services/queryClient.ts';
import { globalStyles } from './styles/global.ts';

import './translation';

globalStyles()

const persister = createIDBPersister();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: GARBAGE_COLLECTION_INTERVAL,
      }}
    >
      <ChakraProvider value={system}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </PersistQueryClientProvider>
  </React.StrictMode>,
);

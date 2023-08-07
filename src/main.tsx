import React from 'react';
import ReactDOM from 'react-dom/client';

import './translation';
import App from './App.tsx';
import { globalStyles } from './styles/global.ts';

globalStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

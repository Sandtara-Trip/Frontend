// src/main.jsx
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/index.css';
import { routes } from './root/routes';
import AppWrapper from './root/AppWrapper';
import './i18n.js';
import './registerSW';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <AppWrapper router={routes} />
  </StrictMode>
);
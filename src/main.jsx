// src/main.jsx
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { routes } from './root/routes';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
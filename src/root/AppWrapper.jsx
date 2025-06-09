import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

const AppWrapper = ({ router }) => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppWrapper;

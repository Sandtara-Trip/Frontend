import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NavbarBefore from './NavbarBefore';
import NavbarAfter from './NavbarAfter';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <NavbarAfter /> : <NavbarBefore />;
};

export default Navbar;

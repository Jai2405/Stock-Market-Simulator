import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';

export default function MainLayout({ children }) {
  const location = useLocation();

  // Define the route(s) where you want to hide the sidebar
  const hideSidebar = location.pathname.startsWith('/stock/');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavBar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {!hideSidebar && <SideBar />} {/* Conditionally render SideBar */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

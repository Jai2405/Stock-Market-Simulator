import React from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

export default function NavBar() {
  return (    
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default' 
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between', 
          alignItems: 'center',
          px: 3,
          py: 1 
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1 
          }}
        >
          <img 
            src="/bull-horns-svgrepo-com.svg" 
            alt="Bull Horns" 
            style={{ 
              height: 32, 
              width: 'auto' 
            }} 
          />
          <Typography 
            component={Link} 
            to="/"
            sx={{ 
              color: 'text.primary',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.25rem'
            }}
          >
            Bull&Bear
          </Typography>
        </Box>
        
        <Box 
          component="nav" 
          sx={{ 
            display: 'flex', 
            gap: 3,
            alignItems: 'center' 
          }}
        >
          <Link 
            to="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <HomeOutlinedIcon fontSize="small" />
            Home
          </Link>
          <Link 
            to="/portfolio" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <AccountBalanceWalletOutlinedIcon fontSize="small" />
            Portfolio
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
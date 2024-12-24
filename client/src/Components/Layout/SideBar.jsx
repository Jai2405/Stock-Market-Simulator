import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingStocks from './TrendingStocks';

export default function SideBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (e) => {
    if (searchQuery.trim()) {
      navigate(`/stock/${searchQuery.trim()}`);
    }
  };

  return (
    <Box 
      sx={{
        width: 300,
        height: '100%',
        minHeight: '100vh',
        bgcolor: 'background.paper',
        borderRight: 'px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        marginLeft:'1.8rem'
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSearch}
        sx={{mt: 1.3 ,mb: 2 }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Search Stocks"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  type="submit" 
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      <TrendingStocks />
    </Box>
  );
}